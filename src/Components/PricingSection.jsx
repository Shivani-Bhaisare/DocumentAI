import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const viewportCfg = { once: false, amount: 0.2 };
const BRAND = "#274690";
const INK = "#1A2340";

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

// Ascending order reflects the "scale with your business" idea literally —
// each tier sits taller than the last, like steps on a growth chart.
const tiers = [
  {
    name: "Starter",
    tagline: "For small teams",
    points: ["Document capture & OCR", "Basic workflow automation", "Email support"],
    heightClass: "md:h-[280px]",
  },
  {
    name: "Business",
    tagline: "For growing organisations",
    points: ["Everything in Starter", "Advanced AI extraction", "Multi-team management", "Priority support"],
    heightClass: "md:h-[360px]",
  },
  {
    name: "Enterprise",
    tagline: "For advanced organisational requirements",
    points: ["Everything in Business", "Multi-organisation governance", "Dedicated onboarding", "Custom integrations"],
    heightClass: "md:h-[440px]",
    featured: true,
  },
];

const barVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.35 },
  }),
};

const PricingSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 md:py-24 px-6 md:px-12">
      <style>{`
        .pr-surface {
          background:
            radial-gradient(ellipse 900px 600px at 50% -10%, rgba(39,70,144,0.05), transparent 60%),
            radial-gradient(ellipse 700px 500px at 85% 100%, rgba(39,70,144,0.06), transparent 60%),
            #FFFFFF;
        }
        .pr-grid {
          background-image: radial-gradient(rgba(39,70,144,0.16) 1px, transparent 1px);
          background-size: 26px 26px;
          mask-image: radial-gradient(ellipse 900px 700px at 50% 30%, black 40%, transparent 85%);
          -webkit-mask-image: radial-gradient(ellipse 900px 700px at 50% 30%, black 40%, transparent 85%);
        }
        .pr-bar {
          background: #FFFFFF;
          border: 1.5px solid rgba(39,70,144,0.16);
          border-bottom: none;
          border-radius: 18px 18px 0 0;
          box-shadow: 0 -8px 24px rgba(39,70,144,0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .pr-bar:hover {
          transform: translateY(-10px);
          box-shadow: 0 -16px 32px rgba(39,70,144,0.14);
        }
        .pr-bar-featured {
          background: linear-gradient(180deg, #274690 0%, #1c3568 100%);
          border-color: transparent;
          box-shadow: 0 -16px 40px rgba(39,70,144,0.22);
        }
        .pr-bar-featured:hover {
          transform: translateY(-10px);
          box-shadow: 0 -24px 48px rgba(39,70,144,0.32);
        }
        .pr-baseline {
          height: 2px;
          background: rgba(39,70,144,0.16);
        }
      `}</style>

      <div className="pr-surface absolute inset-0 z-0" />
      <div className="pr-grid pointer-events-none absolute inset-0 z-0" />

      {/* HEADER */}
      <motion.div
        variants={headerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportCfg}
        className="relative z-10 max-w-2xl mx-auto text-center mb-14 md:mb-20"
      >
        <motion.span
          variants={headerItem}
          className="inline-block text-[#274690]/70 text-xs md:text-sm font-medium tracking-widest uppercase mb-2"
        >
          Pricing
        </motion.span>
        <motion.h2
          variants={headerItem}
          className="text-2xl md:text-4xl font-bold text-[#1A2340] leading-tight mb-3"
        >
          Scale Your Automation With Your Business
        </motion.h2>
        <motion.p variants={headerItem} className="text-[#5B6478] text-base">
          Keep pricing simple.
        </motion.p>
      </motion.div>

      {/* Ascending bars — three tiers rising like steps, appearing one by one */}
      <div className="relative z-10 max-w-4xl mx-auto flex items-end justify-center gap-4 md:gap-6">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            custom={i}
            variants={barVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportCfg}
            className={`pr-bar ${tier.featured ? "pr-bar-featured" : ""} ${
              tier.heightClass
            } flex-1 min-w-0 h-auto flex flex-col px-5 md:px-7 py-7 md:py-8`}
          >
            <h3
              className="text-lg md:text-xl font-semibold mb-1"
              style={{ color: tier.featured ? "#FFFFFF" : INK }}
            >
              {tier.name}
            </h3>
            <p
              className="text-sm mb-5 md:mb-6"
              style={{ color: tier.featured ? "rgba(255,255,255,0.75)" : "#5B6478" }}
            >
              {tier.tagline}
            </p>
            <ul className="flex flex-col gap-2.5 md:gap-3">
              {tier.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <Check
                    size={15}
                    color={tier.featured ? "#FFFFFF" : BRAND}
                    className="mt-0.5 shrink-0"
                  />
                  <span
                    className="text-[13px] md:text-sm leading-relaxed"
                    style={{ color: tier.featured ? "rgba(255,255,255,0.9)" : "#3A4257" }}
                  >
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;