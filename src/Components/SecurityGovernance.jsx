import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  KeyRound,
  Archive,
  ScrollText,
  Boxes,
} from "lucide-react";
import video1 from "../assets/video1.mp4";

const viewportCfg = { once: false, amount: 0.2 };
const BRAND = "#274690";
const ACCENT = "#1E8E5A";

const headerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const headerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const features = [
  {
    n: "01",
    label: "Role-Based Access",
    desc: "Control access across users and teams.",
    icon: KeyRound,
  },
  {
    n: "02",
    label: "Secure Document Storage",
    desc: "Keep business documents protected and organised.",
    icon: Archive,
  },
  {
    n: "03",
    label: "Audit Trails",
    desc: "Track important activities across the platform.",
    icon: ScrollText,
  },
  {
    n: "04",
    label: "Data Isolation",
    desc: "Keep organisation data securely separated.",
    icon: Boxes,
  },
];

const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
};

const gridItem = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const SecurityGovernance = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 md:py-24 px-6 md:px-12">
      <style>{`
        .wf-surface {
          background:
            radial-gradient(ellipse 900px 600px at 50% -10%, rgba(39,70,144,0.05), transparent 60%),
            radial-gradient(ellipse 700px 500px at 85% 100%, rgba(39,70,144,0.06), transparent 60%),
            #FFFFFF;
        }
        .wf-grid {
          background-image: radial-gradient(rgba(39,70,144,0.16) 1px, transparent 1px);
          background-size: 26px 26px;
          mask-image: radial-gradient(ellipse 900px 700px at 50% 30%, black 40%, transparent 85%);
          -webkit-mask-image: radial-gradient(ellipse 900px 700px at 50% 30%, black 40%, transparent 85%);
        }
        .wf-blob-1 {
          background: radial-gradient(circle, rgba(39,70,144,0.16) 0%, transparent 70%);
          filter: blur(14px);
        }
        .wf-blob-2 {
          background: radial-gradient(circle, rgba(30,142,90,0.12) 0%, transparent 70%);
          filter: blur(14px);
        }
        .wf-hero-tile {
          background: linear-gradient(160deg, #274690 0%, #1c3568 100%);
          box-shadow: 0 16px 40px rgba(39,70,144,0.26);
          position: relative;
          overflow: hidden;
        }
        .wf-hero-tile::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            135deg,
            rgba(255,255,255,0.05) 0px,
            rgba(255,255,255,0.05) 1px,
            transparent 1px,
            transparent 14px
          );
        }
        .wf-bento-tile {
          cursor: pointer;
          background: #FFFFFF;
          border: 1px solid rgba(39,70,144,0.12);
          box-shadow: 0 8px 20px rgba(39,70,144,0.07);
          transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
        }
        .wf-bento-tile:hover {
          border-color: rgba(39,70,144,0.3);
          box-shadow: 0 14px 30px rgba(39,70,144,0.15);
          transform: translateY(-3px);
        }
      `}</style>

      {/* Decorative background — identical to WorkflowAutomation */}
      <div className="wf-surface absolute inset-0 z-0" />
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="wf-grid absolute inset-0" />
        <motion.div
          className="wf-blob-1 absolute w-[380px] h-[380px] rounded-full"
          style={{ top: "-6%", left: "10%" }}
          animate={{ x: [0, 30, -15, 0], y: [0, 20, -10, 0], scale: [1, 1.06, 0.97, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="wf-blob-2 absolute w-[320px] h-[320px] rounded-full"
          style={{ bottom: "-8%", right: "8%" }}
          animate={{ x: [0, -25, 15, 0], y: [0, -15, 10, 0], scale: [1, 0.95, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* HEADER */}
      <motion.div
        variants={headerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportCfg}
        className="relative z-10 max-w-2xl mx-auto text-center mb-10 md:mb-14"
      >
        <motion.span
          variants={headerItem}
          className="inline-block text-[#274690]/70 text-xs md:text-sm font-medium tracking-widest uppercase mb-2"
        >
          Security & Governance
        </motion.span>
        <motion.h2
          variants={headerItem}
          className="text-2xl md:text-4xl font-bold text-[#1A2340] leading-tight"
        >
          Enterprise Security Built In
        </motion.h2>
      </motion.div>

      {/* Bento grid: hero shield tile + 4 numbered feature tiles */}
      <motion.div
        variants={gridContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportCfg}
        className="relative z-10 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-3 md:gap-4"
      >
        {/* Hero tile — spans 2 cols x 2 rows on desktop */}
        <motion.div
          variants={gridItem}
          className="wf-hero-tile col-span-2 row-span-2 rounded-2xl px-6 py-7 md:px-8 md:py-9 flex flex-col justify-between"
        >
          {/* Background video */}
          <video
            className="absolute inset-0 z-0 h-full w-full object-cover"
            src={video1}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
          {/* Blue tint so the text stays readable (remove this div for a raw video) */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(39,70,144,0.35) 0%, rgba(28,53,104,0.78) 100%)",
            }}
          />

          <div
            className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.14)" }}
          >
            <ShieldCheck size={22} color="#FFFFFF" />
          </div>
          <div className="relative z-10">
            <p className="text-white text-lg md:text-2xl font-bold leading-snug mb-2">
              Enterprise-grade protection, by default.
            </p>
            <p className="text-white/65 text-sm leading-snug">
              Access, storage, activity and data — governed at every layer.
            </p>
          </div>
        </motion.div>

        {/* Four feature tiles */}
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.label}
              variants={gridItem}
              className="wf-bento-tile rounded-2xl px-4 py-5 md:px-5 md:py-6 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: `${BRAND}14` }}
                >
                  <Icon size={16} style={{ color: BRAND }} />
                </div>
                <span
                  className="text-xs font-semibold"
                  style={{ color: `${BRAND}55` }}
                >
                  {f.n}
                </span>
              </div>
              <div>
                <p className="text-[#1A2340] text-sm font-semibold leading-tight mb-1">
                  {f.label}
                </p>
                <p className="text-[#1A2340]/55 text-xs leading-snug">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default SecurityGovernance;