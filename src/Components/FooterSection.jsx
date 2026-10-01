import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const viewportCfg = { once: false, amount: 0.2 };

const columns = [
  {
    title: "Product",
    links: ["AI Automation", "OCR", "Workflows", "Integrations", "Analytics", "Pricing"],
  },
  {
    title: "Solutions",
    links: ["Invoice Processing", "Contract Processing", "HR Documents", "Financial Documents", "Forms & Applications"],
  },
  {
    title: "Resources",
    links: ["Documentation", "API", "Help Center", "Guides", "Contact"],
  },
  {
    title: "Company",
    links: ["About", "Security", "Privacy", "Terms"],
  },
];

const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const FooterSection = () => {
  return (
    <footer
      className="relative w-full overflow-hidden py-10 md:py-12 px-6 md:px-12"
      style={{ background: "linear-gradient(160deg, #000000 0%, #2F4FA3 100%)" }}
    >
      <style>{`
        .ft-grid {
          background-image: radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px);
          background-size: 26px 26px;
          mask-image: radial-gradient(ellipse 900px 500px at 15% 0%, black 30%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse 900px 500px at 15% 0%, black 30%, transparent 75%);
        }
        .ft-triangle {
          background-color: rgba(0, 0, 0, 0.1);
          clip-path: polygon(77% 0, 100% 0%, 100% 100%, 22% 100%);
        }
        .ft-link {
          color: rgba(255,255,255,0.72);
          transition: color 0.2s ease;
        }
        .ft-link:hover {
          color: #FFFFFF;
        }
        .ft-divider {
          height: 1px;
          background: rgba(255,255,255,0.14);
        }
        .ft-wave {
          position: absolute;
          top: -1px;
          left: 0;
          width: 100%;
          height: 60px;
          transform: translateY(-99%);
          line-height: 0;
        }
        .ft-wave svg {
          width: 100%;
          height: 100%;
          display: block;
        }
      `}</style>

      {/* Wavy top edge — SVG, so the curve stays smooth at any width */}
      <div className="ft-wave">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path
            d="M0,20 C240,60 480,0 720,20 C960,40 1200,0 1440,20 L1440,60 L0,60 Z"
            fill="#000000"
          />
        </svg>
      </div>

      <div className="ft-grid pointer-events-none absolute inset-0 z-0" />
      <div className="ft-triangle pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportCfg}
          className="grid grid-cols-2 md:grid-cols-6 gap-10 md:gap-8 mb-10"
        >
          {/* Brand */}
          <motion.div variants={fadeUp} className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <img
                src={logo}
                alt="Logo"
                className="h-8 sm:h-9 w-auto object-contain"
              />
              <span className="text-white font-semibold text-lg">DocuCore AI</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-[220px]">
              Intelligent document automation for growing organisations.
            </p>
          </motion.div>

          {/* Link columns */}
          {columns.map((col) => (
            <motion.div key={col.title} variants={fadeUp}>
              <h4 className="text-white text-sm font-semibold mb-4">{col.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="ft-link text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportCfg}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="relative z-10 w-full"
      >
        <div className="ft-divider w-full mb-5" />
        <p className="text-white/50 text-sm text-center">
          © 2026 DocuCore AI — Intelligent Document Automation
        </p>
      </motion.div>
    </footer>
  );
};

export default FooterSection;