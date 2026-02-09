import { motion as Motion } from "framer-motion";
import { ArrowRight, Mail, Github, Linkedin, Download } from "lucide-react";

export function ClosingJourney() {
  return (
    <section id="contact" className="bg-zinc-950 pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Philosophy Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
          <div className="relative">
            <Motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-cyan-500">The Philosophy</h2>
              <div className="space-y-8">
                <p className="text-3xl md:text-4xl font-serif italic text-zinc-300 leading-snug">
                  "I believe code is not just instructions for a machine, but a medium for solving human problems with elegance and precision."
                </p>
                <p className="text-lg text-zinc-500 leading-relaxed max-w-xl">
                  My journey as a backend developer has taught me that the most complex systems should feel invisible to the user. Whether I'm architecting a distributed database or training an AI model, my goal remains the same: to create something meaningful, robust, and beautiful.
                </p>
              </div>
            </Motion.div>
          </div>
          
          <div className="relative aspect-square">
  {/* GLOW */}
  <div className="absolute inset-0 bg-cyan-400/30 rounded-full blur-[80px] animate-pulse" />

  {/* ROTATING RING */}
  <Motion.div
    animate={{
      rotate: 360,
      transition: { duration: 40, repeat: Infinity, ease: "linear" },
    }}
    className="absolute inset-0 border-2 border-cyan-400/60 rounded-full shadow-[0_0_40px_rgba(34,211,238,0.35)]"
  />

  {/* INNER RING */}
  <div className="absolute inset-20 border-2 border-cyan-400/40 rounded-full shadow-[0_0_30px_rgba(34,211,238,0.25)]" />

  {/* CENTER TEXT */}
  <div className="absolute inset-0 flex items-center justify-center">
    <span className="text-6xl md:text-9xl font-black text-cyan-400/20 tracking-tighter">
      BUILD
    </span>
  </div>
</div>

        </div>

        {/* Final CTA */}
        <div className="text-center py-40 border-t border-white/5">
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-9xl font-bold text-white tracking-tighter mb-12">
              Let's build something <br />
              <span className="text-cyan-400 italic font-serif">meaningful.</span>
            </h2>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-20">
              <Motion.a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=kushwaha1112002@gmail.com&su=Let’s%20Connect%20Aakash&body=Hi%20Aakash,%0A%0AI%20checked%20your%20portfolio%20and%20would%20love%20to%20connect."
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="group relative flex items-center gap-4 px-12 py-6
             bg-cyan-500 text-black font-bold uppercase tracking-[0.2em] text-sm
             rounded-full"
>
  Send a Message
  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
</Motion.a>

              
              <Motion.a
                href="https://drive.google.com/file/d/1k4kmsiLNRvLwSaMsPpjjIWnweGS4iJGH/view?usp=sharing"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-4 px-12 py-6 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-[0.2em] text-sm rounded-full hover:bg-white/10 transition-all"
              >
                <Download size={20} /> Get Resume
              </Motion.a>
            </div>

            <div className="flex justify-center gap-12">
              <a href="https://github.com/AakashKushwaha07" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.3em] text-[10px] font-bold">
                <Github size={18} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/aakash-kushwaha-2486b0285" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.3em] text-[10px] font-bold">
                <Linkedin size={18} /> LinkedIn
              </a>
            </div>
          </Motion.div>
        </div>

        {/* Footer info */}
        <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-zinc-600 text-[10px] uppercase tracking-[0.4em] font-bold">
          <p>© 2026 Aakash Kr. Kushwaha — All Rights Reserved</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-cyan-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-cyan-500 transition-colors">Legal</a>
          </div>
        </div>
      </div>
    </section>
  );
}
