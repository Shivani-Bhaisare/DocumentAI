import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  ScanLine,
  BrainCircuit,
  Database,
  CheckCircle2,
  Workflow,
  Building2,
} from "lucide-react";

const viewportCfg = { once: false, amount: 0.2 };
const BRAND = "#274690";
const ACCENT = "#274690";

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

// DOCUMENT → OCR → AI UNDERSTANDING → DATA EXTRACTION → VALIDATION → WORKFLOW AUTOMATION → BUSINESS SYSTEMS
const pipeline = [
  { label: "Document", icon: FileText, x: 60, y: 90 },
  { label: "OCR", icon: ScanLine, x: 213, y: 250 },
  { label: "AI Understanding", icon: BrainCircuit, x: 367, y: 90 },
  { label: "Data Extraction", icon: Database, x: 520, y: 250 },
  { label: "Validation", icon: CheckCircle2, x: 673, y: 90 },
  { label: "Workflow Automation", icon: Workflow, x: 827, y: 250 },
  { label: "Business Systems", icon: Building2, x: 940, y: 90, isEnd: true },
];

// Build a smooth S-curve path through the points above
const buildPath = (pts) => {
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i];
    const p1 = pts[i + 1];
    const dx = (p1.x - p0.x) / 2;
    d += ` C ${p0.x + dx} ${p0.y}, ${p1.x - dx} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  return d;
};

const pathD = buildPath(pipeline);

const nodeContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.6 } },
};

const nodeItem = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 16 },
  },
};

const DocumentToAction = () => {
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
        .wf-node-circle {
          cursor: pointer;
          background: #FFFFFF;
          border: 1.5px solid rgba(39,70,144,0.18);
          box-shadow: 0 8px 20px rgba(39,70,144,0.1);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .wf-node-circle:hover {
          transform: scale(1.1);
          box-shadow: 0 14px 30px rgba(39,70,144,0.2);
        }
        .wf-message-text {
          background: linear-gradient(160deg, #274690 0%, #1c3568 100%);
          box-shadow: 0 16px 40px rgba(39,70,144,0.26);
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
        className="relative z-10 max-w-2xl mx-auto text-center mb-10 md:mb-12"
      >
        <motion.span
          variants={headerItem}
          className="inline-block text-[#274690]/70 text-xs md:text-sm font-medium tracking-widest uppercase mb-2"
        >
          From Document Capture to Business Action
        </motion.span>
        <motion.h2
          variants={headerItem}
          className="text-2xl md:text-4xl font-bold text-[#1A2340] leading-tight"
        >
          One Continuous, Automated Pipeline
        </motion.h2>
      </motion.div>

      {/* Winding path — desktop */}
      <div className="relative z-10 max-w-5xl mx-auto mb-10 md:mb-14 hidden md:block">
        <svg
          viewBox="0 0 1000 320"
          preserveAspectRatio="none"
          className="w-full h-[280px]"
        >
          <motion.path
            d={pathD}
            fill="none"
            stroke={`${BRAND}33`}
            strokeWidth="2"
          />
          <motion.path
            d={pathD}
            fill="none"
            stroke={ACCENT}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={viewportCfg}
            transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
          />
        </svg>

        {/* Traveling dot along the path */}
        <motion.div
          className="absolute w-3 h-3 rounded-full"
          style={{
            offsetPath: `path("${pathD}")`,
            background: ACCENT,
            boxShadow: `0 0 12px ${ACCENT}`,
            top: 0,
            left: 0,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportCfg}
          transition={{ delay: 2 }}
        >
          <motion.div
            style={{ offsetPath: `path("${pathD}")` }}
            animate={{ offsetDistance: ["0%", "100%"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: 2.1 }}
            className="absolute w-3 h-3 rounded-full"
          />
        </motion.div>

        {/* Nodes */}
        <motion.div
          variants={nodeContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportCfg}
          className="absolute inset-0"
        >
          {pipeline.map((step) => {
            const Icon = step.icon;
            const top = (step.y / 320) * 100;
            const left = (step.x / 1000) * 100;
            const labelBelow = step.y < 160;
            return (
              <motion.div
                key={step.label}
                variants={nodeItem}
                className="absolute flex flex-col items-center"
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {!labelBelow && (
                  <span className="text-[#1A2340] text-xs font-semibold whitespace-nowrap mb-1.5">
                    {step.label}
                  </span>
                )}
                <div
                  className="wf-node-circle w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: step.isEnd ? ACCENT : "#FFFFFF",
                    borderColor: step.isEnd ? ACCENT : "rgba(39,70,144,0.18)",
                  }}
                >
                  <Icon size={18} color={step.isEnd ? "#FFFFFF" : BRAND} />
                </div>
                {labelBelow && (
                  <span className="text-[#1A2340] text-xs font-semibold whitespace-nowrap mt-1.5">
                    {step.label}
                  </span>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Mobile fallback — simple vertical list */}
      <motion.div
        variants={nodeContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportCfg}
        className="relative z-10 flex flex-col gap-3 mb-10 md:hidden"
      >
        {pipeline.map((step) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.label}
              variants={nodeItem}
              className="wf-node-circle flex items-center gap-3 rounded-xl px-4 py-3 w-full"
              style={{ borderRadius: "12px" }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ background: step.isEnd ? ACCENT : `${BRAND}14` }}
              >
                <Icon size={16} color={step.isEnd ? "#FFFFFF" : BRAND} />
              </div>
              <span className="text-[#1A2340] text-sm font-semibold">
                {step.label}
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Message */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportCfg}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="relative z-10 max-w-2xl mx-auto text-center"
      >
        <p className="wf-message-text inline-block text-white text-base md:text-lg font-semibold leading-snug rounded-2xl px-6 py-6 md:px-8 md:py-7">
          One platform to capture, understand, automate and manage documents.
        </p>
      </motion.div>
    </section>
  );
};

export default DocumentToAction;
