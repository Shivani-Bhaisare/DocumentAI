import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  MdOutlineArrowOutward,
  MdOutlineCheckCircle,
  MdOutlineBolt,
  MdOutlineDescription,
} from "react-icons/md";

const ease = [0.22, 1, 0.36, 1];
const viewportCfg = { once: false, amount: 0.25 };

/* ───────────── Variants ───────────── */

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease },
  },
};

const wordItem = {
  hidden: { y: "110%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: { duration: 0.8, ease } },
};

/* ───────────── Content ───────────── */

const headingLines = ["Turn documents into", "intelligent workflows"];

const stats = [
  { value: 98, suffix: "%", label: "Extraction accuracy" },
  { value: 12, suffix: "x", label: "Faster processing" },
  { value: 40, suffix: "M+", label: "Documents processed" },
];

// fields shown on the invoice + in the extracted panel
const FIELDS = [
  { key: "Vendor", value: "Northgate Capital" },
  { key: "Invoice no.", value: "#4471" },
  { key: "Date", value: "12 Sep 2026" },
  { key: "Total", value: "$12,480.00" },
];

/* ───────────── Count-up number ───────────── */

const Counter = ({ to, suffix }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { amount: 0.6 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) {
      setN(0);
      return;
    }
    const c = animate(0, to, {
      duration: 1.8,
      ease,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => c.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
};

/* ───────────── Small animation helpers ───────────── */

// types the text out letter by letter when it mounts
const Typewriter = ({ text, delay = 0.2 }) => {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? text.length : 0);

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    let id;
    const t = setTimeout(() => {
      id = setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length) clearInterval(id);
      }, 45);
    }, delay * 1000);
    return () => {
      clearTimeout(t);
      clearInterval(id);
    };
  }, [text, delay, reduce]);

  return <>{text.slice(0, n)}</>;
};

// little sparkles that burst out once (mounted when "done")
const Sparkles = () => (
  <span className="pointer-events-none absolute left-3 top-1/2">
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const a = (i / 6) * Math.PI * 2;
      return (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-[#6EE7A8]"
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos(a) * 22,
            y: Math.sin(a) * 22,
            opacity: 0,
            scale: 0.3,
          }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      );
    })}
  </span>
);

/* ───────────── Document scanner animation ─────────────
   - invoice card with a scan beam sweeping top -> bottom (synced to the steps)
   - fields highlight one by one as the beam passes
   - "Extracted data" rows slide in, sweep with light and type their values
   - cards float gently, sparkles burst when the result is sent
   Speed: change STEP_MS (one step = one field)
*/

const STEP_MS = 800;
const CYCLE_STEPS = FIELDS.length + 3;

const ScannerScene = () => {
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(reduce ? FIELDS.length + 1 : 0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setTick((t) => (t >= CYCLE_STEPS - 1 ? 0 : t + 1)),
      STEP_MS
    );
    return () => clearInterval(id);
  }, [reduce]);

  const done = tick > FIELDS.length;

  return (
    <div className="relative mx-auto h-[430px] w-full max-w-[520px] sm:h-[460px]">
      {/* soft glow behind (breathing) */}
      <motion.div
        animate={reduce ? undefined : { scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4F7CFF]/25 blur-3xl"
      />

      {/* ───── Invoice card ───── */}
      <motion.div
        animate={reduce ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 top-0 w-[64%]"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -4 }}
          whileInView={{ opacity: 1, y: 0, rotate: -2 }}
          viewport={viewportCfg}
          transition={{ duration: 1, ease }}
          className="relative overflow-hidden rounded-3xl border border-white bg-white p-5 shadow-[0_30px_70px_-25px_rgba(30,50,120,0.45)]"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#3B4FD8]">
                <MdOutlineDescription />
              </span>
              <div>
                <p className="font-body text-[11px] font-semibold text-[#111827]">INVOICE</p>
                <p className="font-body text-[9px] text-[#9CA3AF]">scan_0047.pdf</p>
              </div>
            </div>
            <span className="font-body rounded-full bg-[#F3F4F6] px-2 py-0.5 text-[9px] font-medium text-[#6B7280]">
              Page 1/1
            </span>
          </div>

          <div className="space-y-2.5">
            {FIELDS.map((f, i) => {
              const active = tick > i;
              const justHit = tick === i + 1;
              return (
                <motion.div
                  key={f.key}
                  animate={{
                    backgroundColor: active ? "rgba(59,79,216,0.08)" : "rgba(59,79,216,0)",
                    boxShadow: active
                      ? "0 0 0 1.5px rgba(59,79,216,0.55)"
                      : "0 0 0 1.5px rgba(59,79,216,0)",
                    scale: justHit ? [1, 1.04, 1] : 1,
                  }}
                  transition={{ duration: 0.45 }}
                  className="rounded-lg px-2.5 py-1.5"
                >
                  <p className="font-body text-[9px] uppercase tracking-wider text-[#9CA3AF]">
                    {f.key}
                  </p>
                  <p className="font-body text-xs font-semibold text-[#111827]">{f.value}</p>
                </motion.div>
              );
            })}
            {/* fake text lines */}
            <div className="space-y-1.5 pt-1">
              <div className="h-1.5 w-full rounded-full bg-[#EEF0F4]" />
              <div className="h-1.5 w-4/5 rounded-full bg-[#EEF0F4]" />
              <div className="h-1.5 w-3/5 rounded-full bg-[#EEF0F4]" />
            </div>
          </div>

          {/* scan beam: sweeps down, then fades while the result is sent */}
          {!reduce && (
            <motion.div
              className="pointer-events-none absolute inset-x-0 z-10"
              initial={{ top: "0%", opacity: 1 }}
              animate={{ top: ["0%", "100%", "100%"], opacity: [1, 1, 0] }}
              transition={{
                duration: (CYCLE_STEPS * STEP_MS) / 1000,
                times: [0, 0.6, 0.68],
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="h-10 -translate-y-full bg-gradient-to-t from-[#4F7CFF]/30 to-transparent" />
              <div className="h-[2px] w-full bg-[#4F7CFF] shadow-[0_0_14px_3px_rgba(79,124,255,0.8)]" />
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* ───── Extracted data card ───── */}
      <motion.div
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute bottom-0 right-0 w-[62%]"
      >
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 4 }}
          whileInView={{ opacity: 1, y: 0, rotate: 2 }}
          viewport={viewportCfg}
          transition={{ duration: 1, delay: 0.25, ease }}
          className="rounded-3xl bg-[#0E1630] p-5 text-white shadow-[0_30px_70px_-20px_rgba(14,22,48,0.7)]"
        >
          <div className="mb-3 flex items-center justify-between">
            <p className="font-body text-[11px] font-semibold tracking-wide text-white/90">
              Extracted data
            </p>
            <span className="flex items-center gap-1.5 font-body text-[10px] text-[#7FA2FF]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7FA2FF] opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#7FA2FF]" />
              </span>
              {done ? "Done" : "Reading…"}
            </span>
          </div>

          <div className="space-y-2">
            {FIELDS.map((f, i) => (
              <div key={f.key} className="flex h-8 items-center">
                <AnimatePresence>
                  {tick > i && (
                    <motion.div
                      initial={{ opacity: 0, x: 28, scale: 0.94 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ type: "spring", stiffness: 220, damping: 20 }}
                      className="relative flex w-full items-center justify-between overflow-hidden rounded-lg bg-white/[0.07] px-3 py-1.5"
                    >
                      {/* light sweep */}
                      {!reduce && (
                        <motion.span
                          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                          initial={{ x: "-120%" }}
                          animate={{ x: "420%" }}
                          transition={{ duration: 0.9, ease: "easeOut" }}
                        />
                      )}
                      <span className="font-body text-[10px] text-white/55">{f.key}</span>
                      <span className="font-body text-[11px] font-medium">
                        <Typewriter text={f.value} delay={0.15} />
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {done && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 240, damping: 18 }}
                className="relative mt-3 flex items-center gap-1.5 rounded-lg bg-[#1E8E5A]/20 px-3 py-1.5 font-body text-[10px] font-medium text-[#6EE7A8]"
              >
                {!reduce && <Sparkles />}
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.4, 1] }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex"
                >
                  <MdOutlineCheckCircle />
                </motion.span>
                Sent to ERP · 1.2s
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* floating chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewportCfg}
        transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.9 }}
        className="absolute right-2 top-2 z-20"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="font-body flex items-center gap-2 rounded-2xl border border-[#274690]/10 bg-white/90 px-3 py-2 text-xs font-medium text-[#274690] shadow-lg backdrop-blur"
        >
          <MdOutlineBolt className="text-[#F59E0B]" />
          Workflow triggered
        </motion.div>
      </motion.div>
    </div>
  );
};

/* ───────────── Page ───────────── */

const Landingpage = () => {
  const reduce = useReducedMotion();

  // mouse parallax on the scene (desktop only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });
  const sceneX = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const sceneY = useTransform(sy, [-0.5, 0.5], [-10, 10]);

  const onMove = (e) => {
    if (e.pointerType !== "mouse" || reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen w-full overflow-hidden bg-[#F7F8FC]">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600;700&display=swap');

          html, body { scroll-behavior: smooth; }
          .font-display { font-family: 'Newsreader', serif; }
          .font-body { font-family: 'Inter', sans-serif; }

          /* animated gradient text */
          .shimmer-text {
            background: linear-gradient(90deg, #2F4BD8, #7B5CFF, #1FA3FF, #2F4BD8);
            background-size: 250% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: shimmer 6s linear infinite;
          }
          @keyframes shimmer {
            0% { background-position: 0% 50%; }
            100% { background-position: 250% 50%; }
          }

          /* aurora blobs */
          .aurora { filter: blur(70px); }

          /* subtle grid */
          .bg-grid {
            background-image:
              linear-gradient(rgba(47,75,216,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(47,75,216,0.06) 1px, transparent 1px);
            background-size: 44px 44px;
            mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 80%);
            -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 80%);
          }

          /* button shine */
          .btn-shine { position: relative; overflow: hidden; }
          .btn-shine::after {
            content: "";
            position: absolute; top: 0; bottom: 0; left: 0; width: 40%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
            transform: translateX(-130%) skewX(-20deg);
            animation: btnShine 4.5s ease-in-out infinite;
          }
          @keyframes btnShine {
            0% { transform: translateX(-130%) skewX(-20deg); }
            55%, 100% { transform: translateX(330%) skewX(-20deg); }
          }

          @media (prefers-reduced-motion: reduce) {
            .btn-shine::after, .shimmer-text { animation: none; }
          }
        `}</style>

        {/* background */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="bg-grid absolute inset-0" />
          <motion.div
            className="aurora absolute -left-24 top-10 h-96 w-96 rounded-full bg-[#7B5CFF]/30"
            animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="aurora absolute -right-20 top-40 h-96 w-96 rounded-full bg-[#1FA3FF]/30"
            animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
            transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Your own Navbar component goes here, e.g. <Navbar /> */}

        {/* HERO */}
        <section
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 pt-28 md:px-10 md:pt-32 lg:grid-cols-[1.05fr_0.95fr]"
        >
          {/* LEFT */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={viewportCfg}
            className="text-center lg:text-left"
          >
            <motion.div
              variants={fadeUp}
              className="font-body mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-[#2F4BD8]/15 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-[#2F4BD8] shadow-sm backdrop-blur lg:mx-0"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2F4BD8] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#2F4BD8]" />
              </span>
              AI document automation
            </motion.div>

            <motion.h1
              variants={container}
              className="font-body text-4xl font-semibold leading-[1.08] tracking-tight text-[#0F1A33] sm:text-5xl xl:text-[3.4rem]"
            >
              {headingLines.map((line, li) => (
                <span key={li} className="block">
                  {line.split(" ").map((word, wi, arr) => {
                    const hot = li === 1 && word === "intelligent";
                    return (
                      <span
                        key={wi}
                        className={`inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] ${
                          wi < arr.length - 1 ? "mr-[0.25em]" : ""
                        }`}
                      >
                        <motion.span
                          variants={wordItem}
                          className={`inline-block ${hot ? "shimmer-text" : ""}`}
                        >
                          {word}
                        </motion.span>
                      </span>
                    );
                  })}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-body mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-[#4B5575] lg:mx-0"
            >
              OCR, AI extraction, workflow automation and secure document
              management, unified in one enterprise platform.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="btn-shine font-body flex items-center gap-2 rounded-full bg-[#0F1A33] px-7 py-3 text-sm font-medium text-white shadow-lg shadow-[#0F1A33]/20"
              >
                Start working now
                <MdOutlineArrowOutward aria-hidden="true" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="font-body rounded-full border border-[#2F4BD8]/20 bg-white/70 px-7 py-3 text-sm font-medium text-[#1A2340] backdrop-blur hover:bg-white"
              >
                See how it works
              </motion.button>
            </motion.div>

            {/* stats */}
            <motion.div
              variants={fadeUp}
              className="mt-10 grid grid-cols-3 gap-4 border-t border-[#2F4BD8]/10 pt-6"
            >
              {stats.map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <p className="font-body text-2xl font-semibold text-[#0F1A33] sm:text-3xl">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="font-body mt-1 text-[11px] text-[#6B7490] sm:text-xs">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div style={reduce ? undefined : { x: sceneX, y: sceneY }}>
            <ScannerScene />
          </motion.div>
        </section>
      </div>
    </MotionConfig>
  );
};

export default Landingpage;