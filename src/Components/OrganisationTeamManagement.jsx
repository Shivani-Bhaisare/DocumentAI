import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Layers,
  UsersRound,
  User,
  Check,
  KeyRound,
  Users,
  FileLock2,
  Network,
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

// Organisation → Departments → Teams → Users, each level nests deeper
const hierarchy = [
  { label: "Organisation", desc: "The top-level account", icon: Building2 },
  { label: "Departments", desc: "Split by function", icon: Layers },
  { label: "Teams", desc: "Grouped inside each department", icon: UsersRound },
  { label: "Users", desc: "Individual members", icon: User },
];

const treeContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

const treeItem = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const capabilities = [
  { label: "Role-based access", icon: KeyRound },
  { label: "Team permissions", icon: Users },
  { label: "Department management", icon: Layers },
  { label: "Document access control", icon: FileLock2 },
  { label: "Multi-organisation architecture", icon: Network },
];

const capContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const capItem = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const OrganisationTeamManagement = () => {
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
        .wf-tree-panel {
          background: #FFFFFF;
          border: 1px solid rgba(39,70,144,0.12);
          box-shadow: 0 10px 30px rgba(39,70,144,0.08);
        }
        .wf-tree-line {
          position: absolute;
          left: 19px;
          top: 44px;
          bottom: 12px;
          width: 1.5px;
          background: rgba(39,70,144,0.18);
        }
        .wf-tree-node {
          cursor: pointer;
          transition: transform 0.25s ease;
        }
        .wf-tree-node:hover {
          transform: translateX(4px);
        }
        .wf-cap-panel {
          background: linear-gradient(160deg, #274690 0%, #1c3568 100%);
          box-shadow: 0 16px 40px rgba(39,70,144,0.28);
        }
        .wf-cap-row {
          cursor: pointer;
          border-top: 1px solid rgba(255,255,255,0.12);
          transition: background 0.25s ease, padding-left 0.25s ease;
        }
        .wf-cap-row:first-child {
          border-top: none;
        }
        .wf-cap-row:hover {
          background: rgba(255,255,255,0.06);
          padding-left: 6px;
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
          Organisation & Team Management
        </motion.span>
        <motion.h2
          variants={headerItem}
          className="text-2xl md:text-4xl font-bold text-[#1A2340] leading-tight"
        >
          Built for the Way Organisations Work
        </motion.h2>
      </motion.div>

      {/* MAIN — structure tree (left) + capability panel (right) */}
      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-5 md:gap-6 items-stretch">
        {/* Structure tree */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={viewportCfg}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="wf-tree-panel relative rounded-2xl px-6 py-8 md:px-8 md:py-9"
        >
          <p className="text-[#1A2340]/50 text-xs font-medium tracking-wide uppercase mb-6">
            One structure, four levels
          </p>
          <div className="relative">
            <div className="wf-tree-line" />
            <motion.div
              variants={treeContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportCfg}
              className="flex flex-col gap-5"
            >
              {hierarchy.map((node, i) => {
                const Icon = node.icon;
                return (
                  <motion.div
                    key={node.label}
                    variants={treeItem}
                    className="wf-tree-node relative flex items-center gap-4"
                    style={{ paddingLeft: `${i * 22}px` }}
                  >
                    <div
                      className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        background: i === 0 ? BRAND : "#FFFFFF",
                        border: `1.5px solid ${i === 0 ? BRAND : "rgba(39,70,144,0.25)"}`,
                      }}
                    >
                      <Icon size={16} color={i === 0 ? "#FFFFFF" : BRAND} />
                    </div>
                    <div>
                      <p className="text-[#1A2340] text-sm md:text-base font-semibold leading-tight">
                        {node.label}
                      </p>
                      <p className="text-[#1A2340]/50 text-xs">{node.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* Capability panel */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={viewportCfg}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="wf-cap-panel rounded-2xl px-6 py-8 md:px-8 md:py-9 flex flex-col"
        >
          <p className="text-white/60 text-xs font-medium tracking-wide uppercase mb-5">
            Key capabilities
          </p>
          <motion.div
            variants={capContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportCfg}
            className="flex flex-col flex-1"
          >
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  variants={capItem}
                  className="wf-cap-row flex items-center gap-3 py-3"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(255,255,255,0.12)" }}
                  >
                    <Icon size={14} color="#FFFFFF" />
                  </div>
                  <span className="text-white text-sm font-medium flex-1">
                    {item.label}
                  </span>
                  <Check size={16} style={{ color: ACCENT }} />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Supporting line */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportCfg}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="relative z-10 max-w-2xl mx-auto text-center text-[#1A2340]/60 text-sm mt-8 md:mt-10"
      >
        This communicates that your software isn't just a personal document tool.
      </motion.p>
    </section>
  );
};

export default OrganisationTeamManagement;
