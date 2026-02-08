import { motion as Motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950 text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1686425374911-e0d752e09806"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-zinc-950/20 to-zinc-950" />
      </div>

      <div className="relative z-10 max-w-4xl px-6 text-center">
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs font-medium tracking-widest uppercase mb-6">
            Digital Product Designer
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1] mb-8">
            Building digital <br />
            <span className="text-zinc-500 font-serif italic">experiences</span> that matter.
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            I craft minimalist interfaces and interactive narratives that help brands connect with their audience through thoughtful design.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-black font-medium rounded-full transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              View Selected Works
            </Motion.button>
            <Motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium rounded-full hover:bg-white/20 transition-colors"
            >
              Read My Story
            </Motion.button>
          </div>
        </Motion.div>
      </div>

      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-500 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        <Motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={20} />
        </Motion.div>
      </Motion.div>
    </section>
  );
}
