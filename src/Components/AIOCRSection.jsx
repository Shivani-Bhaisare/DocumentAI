import React from "react";
import { motion } from "framer-motion";
import {
  Brain,
  ScanText,
  Tag,
  FileSearch,
  ListChecks,
  BookOpenText,
  ShieldCheck,
  FileImage,
  FileText,
  Image as ImageIcon,
  Type,
  Search,
} from "lucide-react";

const viewportCfg = { once: false, amount: 0.2 };

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

// Same blur-fade card animation used in CoreFeatures, applied to each panel
const panelVariant = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// ---- Panel data ---------------------------------------------------------
// Same navy brand colour as CoreFeatures throughout — no rainbow palette.
const BRAND = "#274690";

const aiLeft = [
  { label: "Classification", icon: Tag },
  { label: "Extraction", icon: FileSearch },
];
const aiRight = [
  { label: "Field Recognition", icon: ListChecks },
  { label: "Content Understanding", icon: BookOpenText },
  { label: "Validation", icon: ShieldCheck },
];

const ocrLeft = [
  { label: "Scanned Documents", icon: FileImage },
  { label: "PDFs", icon: FileText },
];
const ocrRight = [
  { label: "Images", icon: ImageIcon },
  { label: "Text Recognition", icon: Type },
  { label: "Searchable Content", icon: Search },
];

// Fixed layout coordinates inside a 380 x 300 box
const HUB = { x: 175, y: 150 };
const LEFT_POS = [
  { x: 55, y: 65 },
  { x: 55, y: 235 },
];
const RIGHT_POS = [
  { x: 330, y: 60 },
  { x: 330, y: 150 },
  { x: 330, y: 240 },
];
const LEFT_LABEL_POS = [
  { x: 118, y: 92 },
  { x: 118, y: 208 },
];

// ---- Hub + spoke diagram (Webex-style, CoreFeatures colour scheme) ------

const HubDiagram = ({ title, HubIcon, left, right, delayBase }) => {
  return (
    <motion.div
      variants={panelVariant}
      whileHover={{ y: -4 }}
      className="relative flex flex-col items-center cursor-pointer"
    >
      <div className="relative" style={{ width: 380, height: 300 }}>
        <svg viewBox="0 0 380 300" className="absolute inset-0 w-full h-full" fill="none">
          {/* Left connectors — navy, coloured lines */}
          {left.map((item, i) => {
            const p = LEFT_POS[i];
            const d = `M ${HUB.x} ${HUB.y} C ${HUB.x - 60} ${HUB.y + (p.y - HUB.y) * 0.2}, ${p.x + 70} ${p.y}, ${p.x + 34} ${p.y}`;
            return (
              <motion.path
                key={item.label}
                d={d}
                stroke={BRAND}
                strokeOpacity="0.6"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={viewportCfg}
                transition={{ duration: 0.7, ease: "easeInOut", delay: delayBase + i * 0.18 }}
              />
            );
          })}

          {/* Right connectors — soft navy curves */}
          {right.map((item, i) => {
            const p = RIGHT_POS[i];
            const d = `M ${HUB.x} ${HUB.y} C ${HUB.x + 70} ${HUB.y + (p.y - HUB.y) * 0.25}, ${p.x - 60} ${p.y}, ${p.x - 26} ${p.y}`;
            return (
              <motion.path
                key={item.label}
                d={d}
                stroke={BRAND}
                strokeOpacity="0.28"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={viewportCfg}
                transition={{ duration: 0.7, ease: "easeInOut", delay: delayBase + 0.4 + i * 0.15 }}
              />
            );
          })}
        </svg>

        {/* Left: navy pill labels sitting on the line */}
        {left.map((item, i) => {
          const lp = LEFT_LABEL_POS[i];
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportCfg}
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 220, damping: 16, delay: delayBase + i * 0.18 + 0.2 }}
              className="absolute z-10 rounded-full px-3 py-1 text-[10px] md:text-[11px] font-semibold text-white cursor-pointer whitespace-nowrap"
              style={{
                left: lp.x,
                top: lp.y,
                transform: "translate(-50%, -50%)",
                background: BRAND,
                boxShadow: `0 6px 14px ${BRAND}55`,
              }}
            >
              {item.label}
            </motion.div>
          );
        })}

        {/* Left: square icon boxes */}
        {left.map((item, i) => {
          const p = LEFT_POS[i];
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label + "-box"}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportCfg}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 220, damping: 16, delay: delayBase + i * 0.18 }}
              className="absolute z-10 w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer"
              style={{
                left: p.x,
                top: p.y,
                transform: "translate(-50%, -50%)",
                background: "#274690" + "0D",
                border: "1px solid rgba(39,70,144,0.15)",
                boxShadow: "0 8px 18px rgba(39,70,144,0.12)",
              }}
            >
              <Icon size={18} style={{ color: BRAND }} />
              <span
                className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-white"
                style={{ background: BRAND }}
              />
            </motion.div>
          );
        })}

        {/* Right: dashed outline circle nodes with label */}
        {right.map((item, i) => {
          const p = RIGHT_POS[i];
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportCfg}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 220, damping: 16, delay: delayBase + 0.4 + i * 0.15 }}
              className="absolute z-10 flex items-center gap-2 cursor-pointer"
              style={{ left: p.x, top: p.y, transform: "translate(-50%, -50%)" }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ border: `1.5px dashed ${BRAND}66` }}
              >
                <Icon size={15} style={{ color: BRAND }} />
              </div>
              <span className="text-[10px] md:text-[11px] text-[#4A5470] font-medium leading-tight max-w-[80px]">
                {item.label}
              </span>
            </motion.div>
          );
        })}

        {/* Central hub */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportCfg}
          transition={{ type: "spring", stiffness: 180, damping: 16, delay: delayBase }}
          whileHover={{ scale: 1.1 }}
          className="absolute z-20 flex items-center justify-center cursor-pointer"
          style={{
            left: HUB.x,
            top: HUB.y,
            transform: "translate(-50%, -50%)",
            width: 68,
            height: 68,
            borderRadius: "9999px",
            background: BRAND,
            boxShadow: `0 12px 28px ${BRAND}55`,
          }}
        >
          <HubIcon className="text-white" size={28} strokeWidth={1.8} />
        </motion.div>
      </div>

      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportCfg}
        transition={{ duration: 0.6, delay: delayBase + 1.1 }}
        className="mt-2 text-[#1A2340] text-base md:text-lg font-semibold"
      >
        {title}
      </motion.h3>
    </motion.div>
  );
};

// ---- Section --------------------------------------------------------

const panelContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const AIOCRSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 md:py-24 px-6 md:px-12">
      <style>{`
        .aio-surface {
          background:
            radial-gradient(ellipse 900px 600px at 50% -10%, rgba(39,70,144,0.05), transparent 60%),
            radial-gradient(ellipse 700px 500px at 85% 100%, rgba(39,70,144,0.06), transparent 60%),
            #FFFFFF;
        }
        .aio-grid {
          background-image: radial-gradient(rgba(39,70,144,0.16) 1px, transparent 1px);
          background-size: 26px 26px;
          mask-image: radial-gradient(ellipse 900px 700px at 50% 30%, black 40%, transparent 85%);
          -webkit-mask-image: radial-gradient(ellipse 900px 700px at 50% 30%, black 40%, transparent 85%);
        }
        .aio-blob-1 {
          background: radial-gradient(circle, rgba(39,70,144,0.16) 0%, transparent 70%);
          filter: blur(14px);
        }
        .aio-blob-2 {
          background: radial-gradient(circle, rgba(30,142,90,0.12) 0%, transparent 70%);
          filter: blur(14px);
        }
        .aio-tagline {
          background: #FFFFFF;
          border: 1px solid rgba(39,70,144,0.12);
          box-shadow: 0 10px 26px rgba(39,70,144,0.08);
        }
      `}</style>

      {/* Decorative background layer — same visual language as CoreFeatures */}
      <div className="aio-surface absolute inset-0 z-0" />
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="aio-grid absolute inset-0" />
        <motion.div
          className="aio-blob-1 absolute w-[380px] h-[380px] rounded-full"
          style={{ top: "-6%", left: "10%" }}
          animate={{ x: [0, 30, -15, 0], y: [0, 20, -10, 0], scale: [1, 1.06, 0.97, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="aio-blob-2 absolute w-[320px] h-[320px] rounded-full"
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
        className="relative z-10 max-w-2xl mx-auto text-center mb-10 md:mb-14"
      >
        <motion.span
          variants={headerItem}
          className="inline-block text-[#274690]/70 text-xs md:text-sm font-medium tracking-widest uppercase mb-2"
        >
          AI + OCR
        </motion.span>
        <motion.h2
          variants={headerItem}
          className="text-2xl md:text-4xl font-bold text-[#1A2340] leading-tight"
        >
          AI Intelligence Meets Intelligent Document Capture
        </motion.h2>
      </motion.div>

      {/* TWO VISUAL PANELS */}
      <motion.div
        variants={panelContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportCfg}
        className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6 place-items-center"
      >
        <HubDiagram
          title="AI Document Intelligence"
          HubIcon={Brain}
          left={aiLeft}
          right={aiRight}
          delayBase={0.1}
        />
        <HubDiagram
          title="OCR Engine"
          HubIcon={ScanText}
          left={ocrLeft}
          right={ocrRight}
          delayBase={0.1}
        />
      </motion.div>

      {/* TAGLINE */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={viewportCfg}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="aio-tagline relative z-10 max-w-2xl mx-auto mt-14 md:mt-16 rounded-2xl px-6 py-6 md:px-10 md:py-8 text-center"
      >
        <p className="text-[#1A2340] text-base md:text-xl font-semibold leading-relaxed">
          Capture information with OCR. Understand it with AI. Automate what
          happens next.
        </p>
      </motion.div>
    </section>
  );
};

export default AIOCRSection;
