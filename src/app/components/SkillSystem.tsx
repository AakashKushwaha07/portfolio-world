import { motion as Motion } from "framer-motion";

const skills = [
  { name: "Java EE / Jakarta", level: 95, category: "Core" },
  { name: "Spring Ecosystem", level: 90, category: "Core" },
  { name: "Microservices", level: 85, category: "Architecture" },
  { name: "Distributed Systems", level: 80, category: "Architecture" },
  { name: "Python / PyTorch", level: 75, category: "AI" },
  { name: "Kubernetes", level: 80, category: "Infrastructure" },
  { name: "PostgreSQL", level: 90, category: "Database" },
  { name: "Redis / Kafka", level: 85, category: "Messaging" },
  { name: "System Design", level: 90, category: "Core" },
];

export function SkillSystem() {
  return (
    <section className="py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-cyan-500 mb-6">Tools of the Craft</h2>
          <h3 className="text-4xl md:text-5xl font-medium text-white tracking-tight max-w-2xl">
            A visual system of technical expertise.
          </h3>
        </div>

        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          {skills.map((skill, i) => (
            <Motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.1, rotate: (Math.random() - 0.5) * 5 }}
              className="px-8 py-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm relative group cursor-default"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-600 group-hover:text-cyan-500/50 transition-colors">
                  {skill.category}
                </span>
                <span className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {skill.name}
                </span>
              </div>
              
              {/* Decorative hover effect */}
              <div className="absolute inset-0 bg-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10" />
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
