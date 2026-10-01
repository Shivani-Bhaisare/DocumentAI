import React, { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { Upload, Cpu, Workflow, Send, FileText, Database, Zap, ChevronDown } from "lucide-react";

/* ───────────── Content (same as before) ───────────── */

const steps = [
  { number: "01", icon: Upload, title: "Upload", description: "Bring documents into the platform." },
  { number: "02", icon: Cpu, title: "Process", description: "OCR and AI understand the document." },
  { number: "03", icon: Workflow, title: "Automate", description: "Apply workflows, rules, and validation." },
  { number: "04", icon: Send, title: "Deliver", description: "Send results to your teams and connected systems." },
];

const flow = [
  { label: "Document", icon: FileText },
  { label: "AI", icon: Cpu },
  { label: "Structured Data", icon: Database },
  { label: "Workflow", icon: Workflow },
  { label: "Action", icon: Zap },
];

const BLUE = "#274690";
const GLOW = "#7C9BFF";
const ease = [0.22, 1, 0.36, 1];

/* ───────────── Animation variants (same pattern as CoreFeatures) ───────────── */

// replays every time the section scrolls back into view
const viewportCfg = { once: false, amount: 0.25 };

const headerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const headerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const cardContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
};

// stagger for the text inside the step card (runs on every step change)
const stepTextContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

/* ───────────── Pipeline node (lights up as the packet reaches it) ───────────── */

const Node = ({ item, i, q }) => {
  const Icon = item.icon;
  const at = i / (flow.length - 1);
  const lit = useTransform(q, [Math.max(at - 0.06, 0), at], [0, 1]);
  const background = useTransform(lit, [0, 1], ["rgba(255,255,255,0.06)", BLUE]);
  const borderColor = useTransform(lit, [0, 1], ["rgba(255,255,255,0.18)", "rgba(143,168,240,1)"]);
  const boxShadow = useTransform(lit, [0, 1], ["0 0 0px rgba(124,155,255,0)", "0 0 26px rgba(124,155,255,0.75)"]);
  const scale = useTransform(lit, [0, 1], [1, 1.1]);
  const color = useTransform(lit, [0, 1], ["rgba(201,212,245,0.55)", "#FFFFFF"]);

  return (
    <div className="flex flex-col items-center">
      <motion.div
        style={{ background, borderColor, boxShadow, scale, color }}
        className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border"
      >
        <Icon size={18} strokeWidth={1.8} />
      </motion.div>
      <motion.span
        style={{ color }}
        className="mt-3 max-w-[4.5rem] text-center text-[10px] font-medium leading-tight sm:max-w-none sm:text-xs md:text-sm"
      >
        {item.label}
      </motion.span>
    </div>
  );
};

/* ───────────── Step progress segment ───────────── */

const Segment = ({ i, p, active, onClick }) => {
  const fill = useTransform(p, (v) => Math.min(1, Math.max(0, v * steps.length - i)));
  return (
    <button
      onClick={onClick}
      aria-label={`Go to step ${steps[i].number}: ${steps[i].title}`}
      aria-current={active}
      className="group flex-1 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#7C9BFF]"
    >
      <span className="block h-[3px] overflow-hidden rounded-full bg-white/15 transition-colors group-hover:bg-white/25">
        <motion.span style={{ scaleX: fill }} className="block h-full origin-left rounded-full bg-[#7C9BFF]" />
      </span>
      <span
        className={`mt-2 hidden text-xs font-medium transition-colors sm:block ${
          active ? "text-white" : "text-[#C9D4F5]/50"
        }`}
      >
        {steps[i].title}
      </span>
    </button>
  );
};

/* ───────────── Main ───────────── */

const HowItWorks = () => {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(p, "change", (v) =>
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length))))
  );

  // pipeline progress (0 → 1), finishes slightly before the end so the last step has dwell time
  const q = useTransform(p, [0.03, 0.92], [0, 1]);
  const packetLeft = useTransform(q, (v) => `${v * 100}%`);
  const lineScale = q;
  const hintOpacity = useTransform(p, [0, 0.05], [1, 0]);
  const blobX = useTransform(p, [0, 1], [-50, 50]);
  const blobY = useTransform(p, [0, 1], [30, -30]);

  const jump = (i) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + total * ((i + 0.5) / steps.length), behavior: reduce ? "auto" : "smooth" });
  };

  const Step = steps[active];
  const StepIcon = Step.icon;
  const PacketIcon = steps[active].icon;

  return (
    <MotionConfig reducedMotion="user">
      <section ref={ref} className="relative w-full bg-[#0B1633]" style={{ height: "420vh" }}>
        <div
          className="sticky top-0 flex w-full flex-col justify-center overflow-hidden px-5 py-6 sm:px-8 sm:py-10 md:px-12"
          style={{ height: "100svh", minHeight: 560 }}
        >
          {/* Background */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 900px 520px at 50% 0%, rgba(74,111,214,0.30), transparent 65%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 45%, black 25%, transparent 85%)",
              maskImage: "radial-gradient(ellipse 90% 80% at 50% 45%, black 25%, transparent 85%)",
            }}
          />
          <motion.div
            aria-hidden
            style={reduce ? undefined : { x: blobX, y: blobY }}
            className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#274690]/40 blur-3xl sm:h-[26rem] sm:w-[26rem]"
          />

          <div className="relative mx-auto flex w-full max-w-5xl flex-col">
            {/* Header — same stagger as CoreFeatures */}
            <motion.div
              variants={headerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportCfg}
              className="mx-auto mb-8 max-w-2xl text-center sm:mb-12 md:mb-14"
            >
              <motion.p
                variants={headerItem}
                className="mb-2 block text-xs font-medium uppercase tracking-widest text-white md:text-sm"
              >
                How it works
              </motion.p>
              <motion.h2
                variants={headerItem}
                className="block text-2xl font-bold leading-tight text-white md:text-4xl"
              >
                From Document to Decision in Four Steps
              </motion.h2>
            </motion.div>

            {/* Pipeline + card + segments — staggered blur-in like the CoreFeatures cards */}
            <motion.div
              variants={cardContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportCfg}
              className="flex flex-col"
            >
              {/* Pipeline */}
              <motion.div variants={cardItem} className="relative">
                <div className="grid grid-cols-5">
                  {flow.map((item, i) => (
                    <Node key={item.label} item={item} i={i} q={q} />
                  ))}
                </div>

                {/* Line + travelling packet (spans centre of first → last node) */}
                <div className="pointer-events-none absolute left-[10%] right-[10%] top-[21px] h-[2px]">
                  <div className="absolute inset-0 rounded-full bg-white/15" />
                  <motion.div
                    style={{ scaleX: lineScale, background: `linear-gradient(90deg, ${BLUE}, ${GLOW})`, boxShadow: `0 0 12px ${GLOW}` }}
                    className="absolute inset-0 origin-left rounded-full"
                  />
                  <motion.div style={{ left: packetLeft }} className="absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                    <div
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#274690] sm:h-8 sm:w-8"
                      style={{ boxShadow: `0 0 0 4px rgba(124,155,255,0.3), 0 0 22px 4px rgba(124,155,255,0.8)` }}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={active}
                          initial={{ scale: 0.4, opacity: 0, rotate: -40 }}
                          animate={{ scale: 1, opacity: 1, rotate: 0 }}
                          exit={{ scale: 0.4, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="flex"
                        >
                          <PacketIcon size={15} strokeWidth={2} />
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Active step card */}
              <motion.div variants={headerItem} className="mx-auto mt-8 w-full max-w-3xl sm:mt-12 md:mt-14">
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                      transition={{ duration: 0.5, ease }}
                      className="relative flex items-center gap-4 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-md sm:gap-7 sm:p-8 md:p-10"
                    >
                      {/* Big outline number slides in */}
                      <motion.span
                        aria-hidden
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease, delay: 0.1 }}
                        className="pointer-events-none absolute -right-2 -top-4 select-none text-[6.5rem] font-extrabold leading-none text-transparent sm:text-[9rem]"
                        style={{ WebkitTextStroke: "1px rgba(143,168,240,0.22)" }}
                      >
                        {Step.number}
                      </motion.span>

                      <span
                        className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white sm:h-16 sm:w-16"
                        style={{
                          background: `linear-gradient(145deg, #3B5FC4, ${BLUE})`,
                          boxShadow: "0 12px 30px rgba(39,70,144,0.55)",
                        }}
                      >
                        <StepIcon size={24} strokeWidth={1.7} />
                      </span>

                      {/* Text stagger: label → title → description */}
                      <motion.div
                        variants={stepTextContainer}
                        initial="hidden"
                        animate="visible"
                        className="relative min-w-0"
                      >
                        <motion.p variants={headerItem} className="text-xs font-semibold text-[#8FA8F0]">
                          Step {Step.number}
                        </motion.p>
                        <motion.h3
                          variants={headerItem}
                          className="mt-1 text-2xl font-semibold text-white sm:text-3xl md:text-4xl"
                        >
                          {Step.title}
                        </motion.h3>
                        <motion.p
                          variants={headerItem}
                          className="mt-1.5 max-w-md text-sm leading-relaxed text-[#B7C3E6] sm:text-base md:text-lg"
                        >
                          {Step.description}
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </motion.div>

              {/* Segments (click to jump) */}
              <motion.div variants={cardItem} className="mx-auto mt-4 flex w-full max-w-3xl gap-2 sm:mt-6 sm:gap-3">
                {steps.map((s, i) => (
                  <Segment key={s.number} i={i} p={p} active={i === active} onClick={() => jump(i)} />
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            style={{ opacity: hintOpacity }}
            className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 flex-col items-center text-[11px] text-[#8FA8F0] sm:bottom-5"
          >
            Scroll to explore
            <motion.span
              animate={reduce ? undefined : { y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={16} />
            </motion.span>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
};

export default HowItWorks;