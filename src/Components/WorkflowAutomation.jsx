import React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Cpu,
  FileSearch,
  CheckCircle2,
  ThumbsUp,
  Flag,
  Route,
  GitBranch,
  ClipboardCheck,
  ShieldCheck,
  Bolt,
} from "lucide-react";

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

// ---- Workflow builder steps ---------------------------------------------

const workflowSteps = [
  { label: "Trigger", icon: Zap },
  { label: "Process", icon: Cpu },
  { label: "Extract", icon: FileSearch },
  { label: "Validate", icon: CheckCircle2 },
  { label: "Approve", icon: ThumbsUp },
  { label: "Complete", icon: Flag },
];

const STEP_GAP = 0.18;

// ---- Feature highlights --------------------------------------------------

const highlights = [
  { label: "Automated document routing", icon: Route },
  { label: "Conditional workflows", icon: GitBranch },
  { label: "Approval steps", icon: ClipboardCheck },
  { label: "Validation", icon: ShieldCheck },
  { label: "Automated actions", icon: Bolt },
];

const highlightContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const highlightItem = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const WorkflowAutomation = () => {
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
        .wf-builder {
          background: #FFFFFF;
          border: 1px solid rgba(39,70,144,0.12);
          box-shadow: 0 10px 30px rgba(39,70,144,0.08);
        }
        .wf-step {
          cursor: pointer;
          background: #FFFFFF;
          border: 1px solid rgba(39,70,144,0.15);
          box-shadow: 0 8px 18px rgba(39,70,144,0.08);
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .wf-step:hover {
          border-color: rgba(39,70,144,0.35);
          box-shadow: 0 14px 28px rgba(39,70,144,0.16);
        }
        .wf-highlight {
          cursor: pointer;
          background: #FFFFFF;
          border: 1px solid rgba(39,70,144,0.12);
          box-shadow: 0 6px 18px rgba(39,70,144,0.06);
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .wf-highlight:hover {
          border-color: rgba(39,70,144,0.28);
          box-shadow: 0 12px 26px rgba(39,70,144,0.14);
        }
      `}</style>

      {/* Decorative background */}
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

      {/* SECTION HEADER */}
      <motion.div
        variants={headerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportCfg}
        className="relative z-10 max-w-2xl mx-auto text-center mb-12 md:mb-16"
      >
        <motion.span
          variants={headerItem}
          className="inline-block text-[#274690]/70 text-xs md:text-sm font-medium tracking-widest uppercase mb-2"
        >
          Workflow Automation
        </motion.span>
        <motion.h2
          variants={headerItem}
          className="text-2xl md:text-4xl font-bold text-[#1A2340] leading-tight"
        >
          Build Workflows That Run Automatically
        </motion.h2>
      </motion.div>

      {/* WORKFLOW BUILDER UI */}
      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={viewportCfg}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="wf-builder relative z-10 max-w-5xl mx-auto rounded-2xl px-4 py-8 md:px-10 md:py-10 mb-14 md:mb-20 overflow-x-auto"
      >
        <div className="relative flex items-center justify-between min-w-[720px] md:min-w-0">
          {/* Connecting track */}
          <div
            className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5"
            style={{ background: "rgba(39,70,144,0.15)" }}
          />
          {/* Animated progress line, drawn on scroll-in */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportCfg}
            transition={{ duration: 1.6, ease: "easeInOut", delay: 0.3 }}
            className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 origin-left"
            style={{ background: BRAND }}
          />
          {/* Small dot continuously travelling the line, once it's drawn in */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportCfg}
            transition={{ delay: 1.9, duration: 0.3 }}
            className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 pointer-events-none"
          >
            <motion.span
              className="absolute w-2.5 h-2.5 rounded-full -translate-y-1/2"
              style={{ background: ACCENT, top: "50%", boxShadow: `0 0 10px ${ACCENT}` }}
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 2.1 }}
            />
          </motion.div>

          {workflowSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 16, scale: 0.85 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={viewportCfg}
                whileHover={{ y: -4, scale: 1.06 }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 18,
                  delay: 0.3 + (i + 1) * STEP_GAP,
                }}
                className="wf-step relative z-10 flex flex-col items-center gap-2 rounded-xl px-4 py-4 w-24 md:w-28"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${BRAND}14` }}
                >
                  <Icon size={18} style={{ color: BRAND }} />
                </div>
                <span className="text-[#1A2340] text-xs md:text-sm font-semibold text-center">
                  {step.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* FEATURE HIGHLIGHTS */}
      <motion.div
        variants={highlightContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportCfg}
        className="relative z-10 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4"
      >
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              variants={highlightItem}
              whileHover={{ y: -4, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="wf-highlight flex flex-col items-start gap-3 rounded-xl px-4 py-5"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: `${BRAND}14` }}
              >
                <Icon size={16} style={{ color: BRAND }} />
              </div>
              <span className="text-[#1A2340] text-xs md:text-sm font-medium leading-snug">
                {item.label}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default WorkflowAutomation;
