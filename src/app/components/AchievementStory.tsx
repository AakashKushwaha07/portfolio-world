import { motion as Motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Award, Zap, Users, Globe } from "lucide-react";

interface CounterProps {
  value: number;
  label: string;
  icon: React.ReactNode;
  suffix?: string;
}

function Counter({ value, label, icon, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="group p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all duration-500">
      <div className="text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tighter">
        {count}{suffix}
      </div>
      <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold">
        {label}
      </div>
    </div>
  );
}

export function AchievementStory() {
  return (
    <section id="achievements" className="py-32 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <Motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-cyan-500 mb-6">Milestones</h2>
            <h3 className="text-4xl md:text-6xl font-medium text-white mb-8 tracking-tight leading-tight">
              Evidence of <br />
              <span className="italic font-serif text-zinc-400">Craftsmanship</span>
            </h3>
            <p className="text-lg text-zinc-400 leading-relaxed mb-10 max-w-lg">
              Beyond the code, I focus on building systems that scale and solutions that matter. Every milestone represents a challenge conquered and a lesson learned in the pursuit of technical excellence.
            </p>
            <div className="flex gap-4">
              <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest">
                Excellence Focused
              </div>
              <div className="px-6 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest">
                AI Integrated
              </div>
            </div>
          </Motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Counter value={10} suffix="+" label="Projects Completed" icon={<Zap size={32} />} />
            <Counter value={1} label="Global Awards" icon={<Award size={32} />} />
            <Counter value={1} label="Years Experience" icon={<Globe size={32} />} />
            <Counter value={10} suffix="k+" label="Users Impacted" icon={<Users size={32} />} />
          </div>
        </div>
      </div>
    </section>
  );
}
