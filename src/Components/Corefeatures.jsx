import React from "react";
import { motion } from "framer-motion";
import {
  Brain,
  ScanText,
  Workflow,
  Database,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Document Intelligence",
    description:
      "Understand documents with AI-powered classification, extraction, and processing.",
  },
  {
    icon: ScanText,
    title: "Intelligent OCR",
    description:
      "Extract text and information from scanned documents, PDFs, and images.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Turn extracted information into automated business processes.",
  },
  {
    icon: Database,
    title: "Structured Data Extraction",
    description:
      "Convert unstructured documents into clean, usable business data.",
  },
];

// once: false so the entrance animation replays every time the section
// scrolls back into view, matching the landing page's behaviour
const viewportCfg = { once: false, amount: 0.25 };

const cardContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// Same stagger pattern used for the trust-strip names on the landing page
const headerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const headerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const CoreFeatures = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 md:py-20 px-6 md:px-12">
      <style>{`
        .cf-surface {
          background:
            radial-gradient(ellipse 900px 600px at 50% -10%, rgba(39,70,144,0.05), transparent 60%),
            radial-gradient(ellipse 700px 500px at 85% 100%, rgba(39,70,144,0.06), transparent 60%),
            #FFFFFF;
        }
        .cf-grid {
          background-image: radial-gradient(rgba(39,70,144,0.16) 1px, transparent 1px);
          background-size: 26px 26px;
          mask-image: radial-gradient(ellipse 900px 700px at 50% 30%, black 40%, transparent 85%);
          -webkit-mask-image: radial-gradient(ellipse 900px 700px at 50% 30%, black 40%, transparent 85%);
        }
        .cf-blob-1 {
          background: radial-gradient(circle, rgba(39,70,144,0.16) 0%, transparent 70%);
          filter: blur(14px);
        }
        .cf-blob-2 {
          background: radial-gradient(circle, rgba(30,142,90,0.12) 0%, transparent 70%);
          filter: blur(14px);
        }
        .cf-card {
          cursor: pointer;
          background: #FFFFFF;
          border: 1px solid rgba(39,70,144,0.12);
          box-shadow: 0 6px 20px rgba(39,70,144,0.06);
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .cf-card:hover {
          border-color: rgba(39,70,144,0.28);
          box-shadow: 0 14px 30px rgba(39,70,144,0.14);
        }
      `}</style>

      {/* Decorative background layer — same visual language as the landing page */}
      <div className="cf-surface absolute inset-0 z-0" />
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="cf-grid absolute inset-0" />
        <motion.div
          className="cf-blob-1 absolute w-[380px] h-[380px] rounded-full"
          style={{ top: "-6%", left: "10%" }}
          animate={{ x: [0, 30, -15, 0], y: [0, 20, -10, 0], scale: [1, 1.06, 0.97, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="cf-blob-2 absolute w-[320px] h-[320px] rounded-full"
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
        className="relative z-10 max-w-3xl mx-auto text-center mb-10 md:mb-12"
      >
        <motion.span
          variants={headerItem}
          className="inline-block text-[#274690]/70 text-xs md:text-sm font-medium tracking-widest uppercase mb-2"
        >
          Core Features
        </motion.span>
        <motion.h2
          variants={headerItem}
          className="text-2xl md:text-4xl font-bold text-[#1A2340] leading-tight"
        >
          Everything You Need for Intelligent Document Automation
        </motion.h2>
      </motion.div>

      {/* FEATURE GRID — all four cards in a single row */}
      <motion.div
        variants={cardContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportCfg}
        className="relative z-10 max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
      >
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              variants={cardItem}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="cf-card flex flex-col items-start gap-4 rounded-xl px-5 py-6 md:px-6 md:py-7"
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-[#274690]/10 flex items-center justify-center">
                <Icon className="text-[#274690]" strokeWidth={1.8} size={20} />
              </div>
              <div>
                <h3 className="text-[#1A2340] text-base md:text-lg font-semibold mb-1">
                  {feature.title}
                </h3>
                <p className="text-[#4A5470] text-xs md:text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default CoreFeatures;
