import React from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Workflow, Building2, ShieldCheck } from "lucide-react";

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

const differentiators = [
  {
    icon: BrainCircuit,
    title: "Intelligent by Design",
    text: "Go beyond text recognition with AI that understands document content, identifies relevant information, and turns unstructured documents into usable data.",
  },
  {
    icon: Workflow,
    title: "Automation at the Core",
    text: "Move beyond extraction. Automatically validate, route, approve, and process documents through configurable workflows.",
  },
  {
    icon: Building2,
    title: "Built for Organisations",
    text: "Manage users, teams, departments, permissions, and document access within a secure multi-organisation environment.",
  },
  {
    icon: ShieldCheck,
    title: "Connected & Governed",
    text: "Connect with your existing business systems while maintaining secure storage, controlled access, and complete activity visibility.",
  },
];

const rowVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 * i },
  }),
};

const iconVariant = {
  hidden: (reversed) => ({
    opacity: 0,
    x: reversed ? 90 : -90,
    rotate: reversed ? 130 : -130,
  }),
  visible: () => ({
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
  }),
};

const WhyDocuCoreAI = () => {
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
          background: #FFFFFF;
          border: 1.5px solid rgba(39,70,144,0.18);
          box-shadow: 0 8px 20px rgba(39,70,144,0.1);
        }
        .wf-message-text {
          background: linear-gradient(160deg, #274690 0%, #1c3568 100%);
          box-shadow: 0 16px 40px rgba(39,70,144,0.26);
        }
        .wf-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(39,70,144,0.18) 50%, transparent);
        }
      `}</style>

      {/* Decorative background — identical to DocumentToAction */}
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
        className="relative z-10 max-w-2xl mx-auto text-center mb-14 md:mb-16"
      >
        <motion.span
          variants={headerItem}
          className="inline-block text-[#274690]/70 text-xs md:text-sm font-medium tracking-widest uppercase mb-2"
        >
          One Platform. From Document to Business Action.
        </motion.span>
        <motion.h2
          variants={headerItem}
          className="text-2xl md:text-4xl font-bold text-[#1A2340] leading-tight"
        >
          Why DocuCore AI?
        </motion.h2>
      </motion.div>

      {/* Differentiators — alternating rows, no cards */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col">
        {differentiators.map((item, i) => {
          const Icon = item.icon;
          const reversed = i % 2 === 1;
          return (
            <React.Fragment key={item.title}>
              <div
                className={`flex items-center gap-6 md:gap-10 py-8 md:py-10 ${
                  reversed ? "flex-row-reverse text-right" : "text-left"
                }`}
              >
                <motion.div
                  custom={reversed}
                  variants={iconVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportCfg}
                  className="wf-node-circle w-16 h-16 rounded-full flex items-center justify-center shrink-0"
                >
                  <Icon size={24} color={BRAND} />
                </motion.div>
                <motion.div
                  custom={i}
                  variants={rowVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportCfg}
                >
                  <h3 className="text-[#1A2340] text-lg md:text-xl font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#5B6478] text-sm md:text-base leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              </div>
              {i < differentiators.length - 1 && (
                <div className="wf-divider w-full" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default WhyDocuCoreAI;
