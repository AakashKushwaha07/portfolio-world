import { motion as Motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ph4_2 from "../../assets/ph4_2.png";

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const designation = ["Java Backend Developer", "AI Builder", "Problem Solver"];

  // ✅ Show text for 5s, then hide
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setShowIntro(false), 5000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[180vh] w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background */}
      <Motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <img
          src={ph4_2}
          alt="Aakash Hero"
          className="w-full h-full object-cover object-[100%_15%]"
        />
      </Motion.div>

      {/* ✅ Intro text overlay (auto disappears after 5s) */}
      <AnimatePresence>
        {showIntro && (
          <Motion.div
            style={{ opacity: bgOpacity }}
            className="relative z-10 text-center px-6"
            initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Motion.span
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "1em" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="block text-xs md:text-sm font-bold uppercase text-cyan-400 mb-8 ml-[1em]"
            >
              Established 2026
            </Motion.span>

            <div className="overflow-hidden mb-6">
              <Motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white"
              >
                AAKASH <span className="text-zinc-500 italic font-serif">KUSHWAHA</span>
              </Motion.h1>
            </div>

            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-2xl mx-auto">
              {designation.map((text, i) => (
                <Motion.span
                  key={text}
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1, delay: 0.8 + i * 0.2 }}
                  className="text-zinc-400 text-sm md:text-base uppercase tracking-[0.2em] font-medium flex items-center gap-4"
                >
                  {text}
                  {i < designation.length - 1 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" />
                  )}
                </Motion.span>
              ))}
            </div>

            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
              <div className="w-[1px] h-24 bg-gradient-to-b from-cyan-500 to-transparent animate-pulse" />
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* ...rest same */}
    </section>
  );
}
