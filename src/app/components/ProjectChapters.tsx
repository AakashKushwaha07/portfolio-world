import { motion as Motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Github, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const projects = [
  {
    title: "Realtime Chat App",
    category: "JAVA • SPRING BOOT • WEBSOCKETS",
    problem:
      "Building a full-stack chat that supports real-time messaging, presence, auth, and chat history across 1-to-1 + rooms.",
    solution:
      "Implemented a Spring Boot + WebSocket backend with MongoDB, plus a React + Tailwind frontend. Added authentication, room management, presence, and deployment configs.",
    impact:
      "Deployed full stack with MongoDB Atlas persistence and production-ready CORS + Docker setup.",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1800&q=80",
    tech: ["Java", "Spring Boot", "WebSocket", "MongoDB", "React", "Tailwind", "Docker"],
    links: {
      github: "https://github.com/AakashKushwaha07/Realtime-chat-app",
      live: "https://realtime-chat-app-eta-red.vercel.app/",
    },
  },
  {
    title: "AI Resume Builder",
    category: "AI • NLP • ATS",
    problem:
      "Manual resume screening and job matching is slow and inconsistent—candidates need clear ATS-friendly feedback.",
    solution:
      "Built resume parsing + JD matching and ATS-style suggestions using NLP (Sentence-BERT) with a clean UI flow.",
    impact:
      "End-to-end pipeline: parse → match → improvements, designed for real recruiter-style feedback.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1800&q=80",
    tech: ["React", "Tailwind", "Python", "Flask", "Sentence-BERT"],
    links: {
      github: "https://github.com/AakashKushwaha07",
      live: "https://github.com/AakashKushwaha07",
    },
  },
];

type Project = (typeof projects)[number];

function ProjectChapter({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    // ✅ THIS offset is safer when landing directly on #projects
    offset: ["start start", "end start"],
  });

  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });

  // ✅ Keep chapter ALWAYS visible (no more opacity=0 blank screen)
  const scale = useTransform(p, [0, 1], [1, 0.97]);
  const y = useTransform(p, [0, 1], ["0%", "-6%"]);

  const imgY = useTransform(p, [0, 1], ["-10%", "10%"]);
  const imgScale = useTransform(p, [0, 1], [1.18, 1.25]);

  return (
    <div ref={ref} className="min-h-screen relative flex items-center justify-center py-24 overflow-hidden">
      <Motion.div
        style={{ scale, y }}
        className="relative max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
      >
        {/* Project Info */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <Motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-cyan-400/90 font-bold tracking-[0.3em] uppercase text-xs mb-5 block">
              Chapter {index + 1} — {project.category}
            </span>

            <h3 className="text-5xl md:text-7xl font-bold text-white mb-10 tracking-tight leading-[0.95]">
              {project.title}
            </h3>

            <div className="space-y-8 mb-12">
              <div>
                <h4 className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold mb-2">The Problem</h4>
                <p className="text-zinc-300 text-lg leading-relaxed">{project.problem}</p>
              </div>

              <div>
                <h4 className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold mb-2">The Solution</h4>
                <p className="text-zinc-300 text-lg leading-relaxed">{project.solution}</p>
              </div>

              <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
                <h4 className="text-cyan-300 uppercase tracking-widest text-[10px] font-bold mb-2">The Impact</h4>
                <p className="text-white text-lg font-medium italic">{project.impact}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-10">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-[10px] font-bold uppercase tracking-wider"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <Motion.a
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.18)]"
              >
                Live Demo
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Motion.a>

              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:text-cyan-300 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </div>
          </Motion.div>
        </div>

        {/* Project Image */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="h-[420px] lg:h-[640px] relative rounded-3xl overflow-hidden shadow-2xl">
            <Motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
              <ImageWithFallback src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </Motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none" />
          </div>
        </div>
      </Motion.div>
    </div>
  );
}

export function ProjectChapters() {
  return (
    <section id="projects" className="bg-zinc-950">
      {projects.map((project, i) => (
        <ProjectChapter key={project.title} project={project} index={i} />
      ))}
    </section>
  );
}
