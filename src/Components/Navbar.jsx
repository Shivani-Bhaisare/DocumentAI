import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png"
const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Automation", href: "#automation" },
  { label: "Integrations", href: "#integrations" },
  { label: "Solutions", href: "#solutions" },
  { label: "Security", href: "#security" },
  { label: "Pricing", href: "#pricing" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        fixed
        top-2
        xs:top-3
        sm:top-4
        left-1/2
        -translate-x-1/2
        z-50
        w-[calc(100%-1rem)]
        sm:w-[calc(100%-2rem)]
        md:w-[94%]
        lg:w-[92%]
        xl:w-[90%]
        2xl:w-[88%]
        max-w-[1400px]
      "
    >
      <div
        className="
          rounded-xl
          sm:rounded-2xl
          border
          border-white/20
          bg-[#022B5B]
          shadow-[0_8px_32px_rgba(0,0,0,0.18)]
          text-white
          overflow-hidden
        "
      >
        {/* ================= HEADER ================= */}
        <div
          className="
            min-h-[58px]
            sm:min-h-[64px]
            md:min-h-[68px]
            px-3
            xs:px-4
            sm:px-5
            md:px-7
            lg:px-8
            xl:px-9
            flex
            items-center
            justify-between
            gap-3
          "
        >
          {/* ================= LOGO ================= */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.03 }}
            className="
              flex
              items-center
              gap-2
              shrink-0
              min-w-0
            "
          >
            <img
              src={logo}
              alt="Logo"
              className="h-8 sm:h-9 md:h-10 w-auto object-contain"
            />
          </motion.a>

          {/* ================= DESKTOP NAVIGATION ================= */}
          <ul
            className="
              hidden
              lg:flex
              items-center
              justify-center
              gap-5
              xl:gap-7
              2xl:gap-9
              flex-1
              mx-4
              xl:mx-8
            "
          >
            {navLinks.map((link, index) => (
              <motion.li
                key={link.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15 + index * 0.07,
                  duration: 0.4,
                }}
                className="shrink-0"
              >
                <a
                  href={link.href}
                  className="
                    relative
                    text-xs
                    xl:text-sm
                    2xl:text-[15px]
                    font-medium
                    text-white/80
                    hover:text-white
                    transition-colors
                    duration-300
                    group
                    whitespace-nowrap
                  "
                >
                  {link.label}

                  <span
                    className="
                      absolute
                      left-0
                      -bottom-1
                      h-[1.5px]
                      w-0
                      bg-white
                      transition-all
                      duration-300
                      group-hover:w-full
                    "
                  />
                </a>
              </motion.li>
            ))}
          </ul>

          {/* ================= RIGHT SIDE ================= */}
          <div
            className="
              hidden
              lg:flex
              items-center
              gap-3
              xl:gap-5
              shrink-0
            "
          >
            {/* Login */}
            <motion.a
              href="#login"
              whileHover={{ y: -1 }}
              className="
                text-xs
                xl:text-sm
                font-medium
                text-white/80
                hover:text-white
                transition-colors
                whitespace-nowrap
              "
            >
              Log in
            </motion.a>

            {/* Request Demo */}
            <motion.a
              href="#demo"
              whileHover={{
                scale: 1.04,
                boxShadow: "0 8px 25px rgba(255,255,255,0.18)",
              }}
              whileTap={{ scale: 0.97 }}
              className="
                text-xs
                xl:text-sm
                font-semibold
                bg-white
                text-[#274690]
                px-3
                py-2
                xl:px-5
                xl:py-2.5
                rounded-lg
                xl:rounded-xl
                shadow-lg
                whitespace-nowrap
              "
            >
              Request demo
            </motion.a>
          </div>

          {/* ================= TABLET / MOBILE MENU BUTTON ================= */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="
              flex
              lg:hidden
              items-center
              justify-center
              w-9
              h-9
              sm:w-10
              sm:h-10
              rounded-lg
              bg-white/10
              border
              border-white/20
              text-white
              shrink-0
              hover:bg-white/15
              transition-colors
            "
          >
            {open ? (
              <X
                size={20}
                className="sm:w-[22px] sm:h-[22px]"
              />
            ) : (
              <Menu
                size={20}
                className="sm:w-[22px] sm:h-[22px]"
              />
            )}
          </motion.button>
        </div>

        {/* ================= MOBILE / TABLET MENU ================= */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="
                lg:hidden
                overflow-hidden
                border-t
                border-white/10
              "
            >
              <div
                className="
                  px-3
                  sm:px-5
                  md:px-7
                  pb-4
                  sm:pb-5
                  pt-3
                  sm:pt-4
                "
              >
                {/* Navigation Links */}
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.label}
                      initial={{
                        opacity: 0,
                        x: -15,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.25,
                      }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="
                          block
                          px-3
                          py-2.5
                          sm:py-3
                          rounded-lg
                          text-sm
                          sm:text-[15px]
                          font-medium
                          text-white/80
                          hover:text-white
                          hover:bg-white/10
                          transition-all
                        "
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>

                {/* Mobile Actions */}
                <div
                  className="
                    mt-3
                    sm:mt-4
                    pt-3
                    sm:pt-4
                    border-t
                    border-white/10
                    flex
                    flex-col
                    gap-2.5
                    sm:gap-3
                  "
                >
                  {/* Login */}
                  <a
                    href="#login"
                    onClick={() => setOpen(false)}
                    className="
                      text-sm
                      sm:text-[15px]
                      font-medium
                      text-white/80
                      hover:text-white
                      px-3
                      py-2.5
                      rounded-lg
                      hover:bg-white/10
                      transition-all
                    "
                  >
                    Log in
                  </a>

                  {/* Request Demo */}
                  <motion.a
                    href="#demo"
                    onClick={() => setOpen(false)}
                    whileTap={{ scale: 0.97 }}
                    className="
                      w-full
                      text-sm
                      sm:text-[15px]
                      font-semibold
                      bg-white
                      text-[#274690]
                      px-4
                      py-3
                      rounded-lg
                      sm:rounded-xl
                      text-center
                      shadow-md
                    "
                  >
                    Request demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
