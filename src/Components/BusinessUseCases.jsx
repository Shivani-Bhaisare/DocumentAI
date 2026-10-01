import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import video1 from "../assets/video4.mp4";
import video2 from "../assets/video2 (2).mp4";
import video3 from "../assets/video2 (3).mp4";
import image1 from "../assets/image1.jfif";
import image2 from "../assets/image2.jfif";
import image3 from "../assets/video3.jfif";
import {
  Receipt,
  FileSignature,
  Users,
  Wallet,
  ClipboardList,
  Workflow,
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

// Mosaic tiles — every tile has a video or image background.
// media.type: "video" | "image"   media.src: imported file above
// overlay: colour tint on top of the media (keeps the mosaic colour mix)
const tiles = [
  {
    label: "Invoice Processing",
    desc: "Extract invoice information automatically.",
    icon: Receipt,
    span: "col-span-2 row-span-2",
    isHero: true,
    media: { type: "video", src: video1 },
    // lighter overlay so the video stays visible
    overlay: "linear-gradient(160deg, rgba(39,70,144,0.3) 0%, rgba(28,53,104,0.5) 100%)",
  },
  {
    label: "Contract Processing",
    desc: "Identify and process important contract information.",
    icon: FileSignature,
    span: "col-span-1 row-span-1",
    media: { type: "image", src: image1 },
    overlay: "linear-gradient(160deg, rgba(10,16,40,0.35) 0%, rgba(10,16,40,0.6) 100%)",
  },
  {
    label: "HR Documents",
    desc: "Automate employee document processing.",
    icon: Users,
    span: "col-span-1 row-span-1",
    media: { type: "video", src: video2 },
    overlay: "linear-gradient(160deg, rgba(30,142,90,0.45) 0%, rgba(10,16,40,0.5) 100%)",
  },
  {
    label: "Financial Documents",
    desc: "Process statements, receipts and financial records.",
    icon: Wallet,
    span: "col-span-1 row-span-1",
    media: { type: "image", src: image2 },
    overlay: "linear-gradient(160deg, rgba(39,70,144,0.5) 0%, rgba(10,16,40,0.6) 100%)",
  },
  {
    label: "Forms & Applications",
    desc: "Extract structured data from submitted forms.",
    icon: ClipboardList,
    span: "col-span-1 row-span-1",
    media: { type: "video", src: video3 },
    overlay: "linear-gradient(160deg, rgba(26,35,64,0.6) 0%, rgba(26,35,64,0.75) 100%)",
  },
  {
    label: "Business Operations",
    desc: "Automate repetitive document-based tasks.",
    icon: Workflow,
    span: "col-span-1 row-span-1",
    media: { type: "image", src: image3 },
    overlay: "linear-gradient(160deg, rgba(10,16,40,0.35) 0%, rgba(10,16,40,0.6) 100%)",
  },
];

const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};

const gridItem = {
  hidden: { opacity: 0, scale: 0.9, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ───────────── Video helper ─────────────
   React sometimes doesn't apply the `muted` attribute, which makes browsers
   block autoplay. This forces muted + play(), and logs a clear error in the
   Console (F12) if the file itself can't be played:
     error code 3 = file corrupt / incomplete
     error code 4 = format or codec not supported (re-encode to H.264)
*/
const TileVideo = ({ src }) => {
  const ref = useRef(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      onError={(e) =>
        console.error("Video failed:", src, "error code:", e.target.error?.code)
      }
      className="wf-media absolute inset-0 w-full h-full object-cover"
    />
  );
};

const BusinessUseCases = () => {
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
        .wf-mosaic-tile {
          cursor: pointer;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .wf-mosaic-tile:hover {
          transform: translateY(-5px) scale(1.015);
          box-shadow: 0 20px 40px rgba(39,70,144,0.2);
        }
        /* media zooms slowly on hover */
        .wf-media {
          transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .wf-mosaic-tile:hover .wf-media {
          transform: scale(1.08);
        }
        @media (prefers-reduced-motion: reduce) {
          .wf-media { transition: none; }
          .wf-mosaic-tile:hover .wf-media { transform: none; }
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
        className="relative z-10 max-w-2xl mx-auto text-center mb-12 md:mb-14"
      >
        <motion.span
          variants={headerItem}
          className="inline-block text-[#274690]/70 text-xs md:text-sm font-medium tracking-widest uppercase mb-2"
        >
          Business Use Cases
        </motion.span>
        <motion.h2
          variants={headerItem}
          className="text-2xl md:text-4xl font-bold text-[#1A2340] leading-tight"
        >
          Built For Real, Everyday Document Work
        </motion.h2>
      </motion.div>

      {/* Mosaic grid — every tile has a video / image background */}
      <motion.div
        variants={gridContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportCfg}
        className="relative z-10 max-w-4xl mx-auto grid grid-cols-3 grid-flow-dense auto-rows-[130px] md:auto-rows-[150px] gap-3 md:gap-4"
      >
        {tiles.map((tile) => {
          const Icon = tile.icon;
          const isHero = tile.isHero;
          return (
            <motion.div
              key={tile.label}
              variants={gridItem}
              className={`wf-mosaic-tile ${tile.span} rounded-2xl px-4 py-4 md:px-5 md:py-5 flex flex-col justify-between relative overflow-hidden bg-[#1A2340]`}
            >
              {/* Background media */}
              {tile.media.type === "video" ? (
                <TileVideo src={tile.media.src} />
              ) : (
                <img
                  src={tile.media.src}
                  alt=""
                  loading="lazy"
                  className="wf-media absolute inset-0 w-full h-full object-cover"
                />
              )}

              {/* Colour tint + bottom gradient so text stays readable */}
              <div className="absolute inset-0" style={{ background: tile.overlay }} />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,16,40,0.8) 0%, rgba(10,16,40,0.15) 60%, transparent 100%)",
                }}
              />

              <div
                className={`relative z-10 rounded-lg flex items-center justify-center backdrop-blur-sm ${
                  isHero ? "w-11 h-11" : "w-9 h-9"
                }`}
                style={{ background: "rgba(255,255,255,0.18)" }}
              >
                <Icon size={isHero ? 20 : 16} color="#FFFFFF" />
              </div>

              <div className="relative z-10">
                <p
                  className={`font-semibold leading-tight mb-1 text-white ${
                    isHero ? "text-lg md:text-xl" : "text-sm"
                  }`}
                >
                  {tile.label}
                </p>
                <p
                  className={`text-white/75 ${
                    isHero ? "text-sm leading-snug" : "text-xs leading-snug"
                  }`}
                >
                  {tile.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default BusinessUseCases;