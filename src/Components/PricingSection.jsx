import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

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

const barVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.2 },
  }),
};

const DEFAULT_PLANS = [
  {
    id: "starter",
    name: "Starter",
    description: "For small teams and growing workflows",
    monthlyPrice: 4999,
    yearlyPrice: 49990,
    currency: "INR",
    documentGenerationLimit: 100,
    userLimit: 10,
    storageLimitGB: 50,
    aiCredits: 2000,
    ocrLimit: 1000,
    badge: "Startups & Teams",
    isMostPopular: false,
    features: { "ai.processing": true, "workflows.enabled": true },
  },
  {
    id: "business",
    name: "Business",
    description: "For scaling departments with high volume",
    monthlyPrice: 14999,
    yearlyPrice: 149990,
    currency: "INR",
    documentGenerationLimit: 1000,
    userLimit: 50,
    storageLimitGB: 250,
    aiCredits: 10000,
    ocrLimit: 5000,
    badge: "Most Popular",
    isMostPopular: true,
    features: { "ai.processing": true, "workflows.multi_step": true, "integrations.slack": true },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For multi-organisation control and security",
    monthlyPrice: 39999,
    yearlyPrice: 399990,
    currency: "INR",
    documentGenerationLimit: 10000,
    userLimit: 500,
    storageLimitGB: 1000,
    aiCredits: 50000,
    ocrLimit: 25000,
    badge: "Enterprise",
    isMostPopular: false,
    features: { "ai.processing": true, "security.sso": true, "workflows.multi_step": true },
  },
];

const PricingSection = () => {
  const [plans, setPlans] = useState(DEFAULT_PLANS);
  const [annualBilling, setAnnualBilling] = useState(false);

  const apiBase = (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) || "https://document-automation-backend-1jte.onrender.com/api";
  const appBase = (typeof import.meta !== "undefined" && import.meta.env?.VITE_APP_URL) || "";

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const cleanBase = apiBase.replace(/\/+$/, "");
        let res = await fetch(`${cleanBase}/public/plans`);
        if (!res.ok) res = await fetch(`${cleanBase}/public/subscription-plans`);
        if (res.ok) {
          const json = await res.json();
          if (active && json?.data && Array.isArray(json.data) && json.data.length > 0) {
            const sorted = [...json.data].sort(
              (a, b) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99) || (a.monthlyPrice ?? 0) - (b.monthlyPrice ?? 0)
            );
            setPlans(sorted);
          }
        }
      } catch (e) {
        console.warn("Could not load dynamic plans, using default tiers:", e);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [apiBase]);

  const formatPrice = (plan) => {
    const symbol = plan.currency === "USD" ? "$" : plan.currency === "EUR" ? "€" : "₹";
    if (annualBilling) {
      const annualMonthly = plan.yearlyPrice ? Math.round(plan.yearlyPrice / 12) : Math.round(plan.monthlyPrice * 0.85);
      return `${symbol}${annualMonthly.toLocaleString()}`;
    }
    return `${symbol}${Math.round(plan.monthlyPrice).toLocaleString()}`;
  };

  const getPoints = (plan) => {
    const pts = [];
    if (plan.unlimitedDocumentGeneration || plan.documentGenerationLimit === -1 || plan.documentGenerationLimit === 0) {
      pts.push("Unlimited document automation");
    } else {
      pts.push(`${plan.documentGenerationLimit?.toLocaleString() || 100} documents / month`);
    }

    if (plan.aiCredits) pts.push(`${plan.aiCredits.toLocaleString()} AI requests / month`);
    if (plan.ocrLimit) pts.push(`${plan.ocrLimit.toLocaleString()} OCR pages / month`);
    if (plan.storageLimitGB) pts.push(`${plan.storageLimitGB} GB cloud storage`);
    if (plan.userLimit) pts.push(`Up to ${plan.userLimit} team members`);

    const f = plan.features || {};
    if (f["workflows.multi_step"] || f["workflows.multi_level"]) {
      pts.push("Multi-step & conditional approval workflows");
    } else if (f["workflows.enabled"]) {
      pts.push("Automated document workflows");
    }

    if (f["security.sso"]) {
      pts.push("Single Sign-On (SSO) & audit vault");
    } else if (f["security.rbac"]) {
      pts.push("Role-based access control (RBAC)");
    }

    return pts.slice(0, 7);
  };

  const loginUrl = appBase ? `${appBase.replace(/\/+$/, "")}/login` : "/login";

  return (
    <section id="pricing" className="relative w-full overflow-hidden bg-white py-16 md:py-24 px-6 md:px-12">
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
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(39,70,144,0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .pr-bar:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(39,70,144,0.14);
          border-color: rgba(39,70,144,0.35);
        }
        .pr-bar-featured {
          background: linear-gradient(180deg, #274690 0%, #152750 100%);
          border-color: transparent;
          box-shadow: 0 16px 45px rgba(39,70,144,0.28);
        }
        .pr-bar-featured:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 55px rgba(39,70,144,0.38);
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
        className="relative z-10 max-w-2xl mx-auto text-center mb-10 md:mb-14"
      >
        <motion.span
          variants={headerItem}
          className="inline-block text-[#274690]/70 text-xs md:text-sm font-bold tracking-widest uppercase mb-2"
        >
          Pricing Plans
        </motion.span>
        <motion.h2
          variants={headerItem}
          className="text-2xl md:text-4xl font-extrabold text-[#1A2340] leading-tight mb-3"
        >
          Scale Your Automation With Your Business
        </motion.h2>
        <motion.p variants={headerItem} className="text-[#5B6478] text-base mb-6">
          Predictable pricing with full feature transparency. Directly synchronized with our enterprise tier limits.
        </motion.p>

        {/* Monthly / Annual Toggle */}
        <motion.div variants={headerItem} className="inline-flex items-center gap-3 bg-slate-100 p-1.5 rounded-full border border-slate-200">
          <button
            type="button"
            onClick={() => setAnnualBilling(false)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              !annualBilling ? "bg-[#274690] text-white shadow" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Monthly Billing
          </button>
          <button
            type="button"
            onClick={() => setAnnualBilling(true)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              annualBilling ? "bg-[#274690] text-white shadow" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Annual Billing
            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
              Save 15%
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* PLAN CARDS */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {plans.map((plan, i) => {
          const featured = plan.isMostPopular || plan.code === "business" || i === 1;
          const points = getPoints(plan);
          const priceStr = formatPrice(plan);

          return (
            <motion.div
              key={plan.id || plan.name}
              custom={i}
              variants={barVariant}
              initial="hidden"
              whileInView="visible"
              viewport={viewportCfg}
              className={`pr-bar ${featured ? "pr-bar-featured" : ""} flex flex-col justify-between p-6 sm:p-8 relative`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3
                    className="text-xl font-bold tracking-tight"
                    style={{ color: featured ? "#FFFFFF" : INK }}
                  >
                    {plan.name || plan.planName}
                  </h3>
                  {(plan.badge || featured) && (
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        featured
                          ? "bg-white/20 text-white border border-white/30"
                          : "bg-[#274690]/10 text-[#274690] border border-[#274690]/20"
                      }`}
                    >
                      {plan.badge || (featured ? "Most Popular" : "Plan")}
                    </span>
                  )}
                </div>

                <p
                  className="text-xs md:text-sm min-h-[36px] mb-5"
                  style={{ color: featured ? "rgba(255,255,255,0.8)" : "#5B6478" }}
                >
                  {plan.description || "Enterprise AI document extraction & workflows"}
                </p>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b" style={{ borderColor: featured ? "rgba(255,255,255,0.15)" : "rgba(39,70,144,0.12)" }}>
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className="text-3xl sm:text-4xl font-black tracking-tight"
                      style={{ color: featured ? "#FFFFFF" : INK }}
                    >
                      {priceStr}
                    </span>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: featured ? "rgba(255,255,255,0.7)" : "#7B8498" }}
                    >
                      / month
                    </span>
                  </div>
                  {annualBilling && (
                    <p
                      className="text-[11px] mt-1 font-medium"
                      style={{ color: featured ? "rgba(255,255,255,0.65)" : "#6A7488" }}
                    >
                      Billed annually ({plan.currency === "USD" ? "$" : plan.currency === "EUR" ? "€" : "₹"}
                      {(plan.yearlyPrice ? Math.round(plan.yearlyPrice) : Math.round(plan.monthlyPrice * 10)).toLocaleString()}/yr)
                    </p>
                  )}
                </div>

                {/* Features & Entitlements List */}
                <ul className="flex flex-col gap-3 mb-8">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{
                          background: featured ? "rgba(255,255,255,0.2)" : "rgba(39,70,144,0.1)",
                        }}
                      >
                        <Check
                          size={11}
                          strokeWidth={3}
                          color={featured ? "#FFFFFF" : BRAND}
                        />
                      </div>
                      <span
                        className="text-xs md:text-sm font-medium leading-relaxed"
                        style={{ color: featured ? "rgba(255,255,255,0.92)" : "#3A4257" }}
                      >
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-2 pt-2">
                <a href={`${appUrl}?inquiry=${encodeURIComponent(plan.name)}`} className="block w-full">
                  <button
                    type="button"
                    className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                      featured
                        ? "bg-white text-[#274690] hover:bg-slate-50 hover:shadow-lg hover:scale-[1.02]"
                        : "bg-[#274690] text-white hover:bg-[#1f3770] hover:shadow-lg hover:scale-[1.02]"
                    }`}
                  >
                    <span>Request This Plan</span>
                    <ArrowRight size={15} />
                  </button>
                </a>
                <a href={`${appUrl}?plan=${encodeURIComponent(plan.name)}`} className="block w-full">
                  <button
                    type="button"
                    className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      featured
                        ? "text-white/80 hover:text-white hover:bg-white/10"
                        : "text-[#274690] hover:text-[#1f3770] hover:bg-blue-50/60"
                    }`}
                  >
                    <span>View Details & Limits</span>
                  </button>
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default PricingSection;