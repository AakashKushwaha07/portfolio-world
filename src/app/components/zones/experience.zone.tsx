import { Icon } from "@iconify/react";
import { motion as Motion } from "framer-motion";

const timelines = [
  {
    role: "Java Backend Developer (Projects)",
    org: "Personal + Academic Builds",
    time: "2024 — Present",
    icon: "logos:java",
    accent: "from-green-500/25 to-emerald-500/10",
    bullets: [
      "Built backend-first apps using Spring Boot patterns (controllers → services → repositories).",
      "Worked with MySQL + MongoDB for storage; wrote queries, validations, and clean DB flows.",
      "Integrated realtime features (WebSocket/STOMP) in chat-style systems and handled CORS/deploy issues.",
      "Focused on clean structure, readable code, and deployment readiness.",
    ],
    tags: ["Spring Boot", "REST APIs", "MySQL", "MongoDB", "WebSocket"],
  },
  {
    role: "AI Resume Builder (Full-stack + ML integration)",
    org: "Capstone / Portfolio Project",
    time: "2025",
    icon: "solar:cpu-bolt-linear",
    accent: "from-emerald-400/20 to-lime-400/8",
    bullets: [
      "Implemented resume parsing + skill extraction pipeline and similarity scoring with job descriptions.",
      "Designed features: ATS feedback, skill-gap analysis, and career path suggestions (upgrade-ready architecture).",
      "Iterated on UI/UX while keeping file structure strict and maintainable.",
    ],
    tags: ["NLP", "Similarity Scoring", "UI/UX", "Project Architecture"],
  },
  {
    role: "Internship — Python Programming",
    org: "CodSoft",
    time: "2023",
    icon: "logos:python",
    accent: "from-emerald-500/18 to-green-500/8",
    bullets: [
      "Worked on Python tasks/projects focused on problem solving and practical implementations.",
      "Strengthened fundamentals: data handling, functions, modular coding, and debugging.",
    ],
    tags: ["Python", "Problem Solving", "Clean Code"],
  },
  {
    role: "Internship — Artificial Intelligence",
    org: "Skill Intern India (MSME)",
    time: "2024",
    icon: "simple-icons:ibm",
    accent: "from-green-500/15 to-emerald-500/8",
    bullets: [
      "Explored AI fundamentals and applied learning through guided tasks and structured modules.",
      "Built stronger foundation in ML/AI concepts for future integration into real products.",
    ],
    tags: ["AI Fundamentals", "Applied Learning", "Structured Modules"],
  },
];

export default {
  id: "experience",
  x: 147,
  z: 0,
  color: 0x22c55e,

  // ✅ animated label (floating briefcase)
  labelJSX: (
    <Motion.div
      id="label-experience"
      className="world-label flex flex-col items-center gap-2 opacity-0 select-none"
      initial={{ opacity: 0, y: 10, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <Motion.div
        animate={{ y: [0, -6, 0], rotate: [0, 2, 0, -2, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-11 h-11 bg-black/55 border border-green-400/45 rounded-full flex items-center justify-center
                   shadow-[0_0_70px_rgba(34,197,94,0.22)] backdrop-blur"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500/25 to-emerald-500/10 blur-md" />
        <Icon icon="solar:briefcase-linear" className="text-green-200 relative" width="20" />
      </Motion.div>

      <div className="bg-zinc-900/70 px-2.5 py-1 rounded-full text-[10px] font-extrabold text-white uppercase tracking-[0.22em]
                      border border-white/10 shadow-[0_0_50px_rgba(34,197,94,0.10)]">
        Experience
      </div>
    </Motion.div>
  ),

  // ✅ cinematic experience modal (animated timeline + scanning bar + hover lifts + scroll)
  modalJSX: (
    <div
      id="modal-experience"
      className="modal-panel w-full max-w-5xl hidden opacity-0 scale-95 transform
                 bg-[#0b0c10] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
    >
      {/* top bar */}
      <div className="h-1.5 bg-gradient-to-r from-green-600 via-emerald-500 to-green-600" />

      <div className="flex-1 overflow-y-auto custom-scroll">
        <div className="relative">
          {/* glows */}
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-green-500/14 blur-3xl" />
          <div className="absolute -bottom-32 -right-28 h-80 w-80 rounded-full bg-emerald-500/12 blur-3xl" />
          <div className="absolute top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-lime-400/8 blur-3xl" />

          <div className="relative p-6 md:p-8">
            {/* header */}
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="text-[11px] uppercase tracking-[0.35em] text-white/50 font-bold">
                  Hands-on Development • Internships • Projects
                </div>

                <div className="mt-2 flex items-center gap-3">
                  {/* ✅ “scanner” badge */}
                  <div className="relative overflow-hidden rounded-2xl border border-green-400/25 bg-green-500/10 px-3 py-2">
                    <Motion.div
                      animate={{ x: ["-120%", "120%"] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-green-300/25 to-transparent"
                    />
                    <div className="relative flex items-center gap-2">
                      <Icon icon="solar:terminal-window-linear" className="text-green-200" width="18" />
                      <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-green-200/90">
                        Active Builder
                      </span>
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                    Experience — <span className="text-green-300">shipping mindset</span>
                  </h2>
                </div>

                <p className="mt-2 text-sm text-white/55 max-w-3xl">
                  My experience is driven by building real systems: Java backend services, data workflows, and AI-powered features —
                  plus internships that strengthened fundamentals and delivery discipline.
                </p>
              </div>

              <button className="close-modal text-zinc-500 hover:text-white transition-colors">
                <Icon icon="solar:close-circle-linear" width="28" />
              </button>
            </div>

            {/* timeline */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* left: timeline cards */}
              <div className="lg:col-span-7 space-y-4">
                {timelines.map((t, i) => (
                  <Motion.div
                    key={t.role}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="group rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden
                               hover:bg-white/[0.04] transition-colors shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
                  >
                    {/* top accent */}
                    <div className={`h-1.5 bg-gradient-to-r ${t.accent}`} />

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="relative h-11 w-11 rounded-2xl bg-black/40 border border-white/10 grid place-items-center shrink-0">
                            <Motion.div
                              animate={{ rotate: [0, 6, 0, -6, 0] }}
                              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                              className="grid place-items-center"
                            >
                              <Icon icon={t.icon} width="22" className="text-green-200" />
                            </Motion.div>
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/5" />
                          </div>

                          <div className="min-w-0">
                            <div className="text-sm md:text-base font-extrabold text-white/85 leading-snug">
                              {t.role}
                            </div>
                            <div className="mt-1 text-xs text-white/45">
                              {t.org} • {t.time}
                            </div>
                          </div>
                        </div>

                        <Icon
                          icon="solar:arrow-right-up-linear"
                          width="18"
                          className="text-white/25 group-hover:text-white/60 transition-colors"
                        />
                      </div>

                      <ul className="mt-4 space-y-2">
                        {t.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-xs text-white/60 leading-relaxed">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-green-400/70" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {t.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-full text-[10px] font-bold
                                       bg-green-500/10 border border-green-500/20 text-green-300 uppercase tracking-[0.20em]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Motion.div>
                ))}
              </div>

              {/* right: “impact panel” */}
              <div className="lg:col-span-5">
                <Motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sticky top-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-xs uppercase tracking-[0.25em] text-white/60 font-bold">
                      What I bring
                    </div>
                    <span className="text-[10px] text-white/40">signal</span>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      {
                        icon: "solar:server-linear",
                        title: "Backend-first mindset",
                        desc: "APIs, data, auth, realtime — build systems that scale beyond demo stage.",
                      },
                      {
                        icon: "solar:shield-check-linear",
                        title: "Quality + structure",
                        desc: "Clean folders, strict naming, readable code, predictable flows.",
                      },
                      {
                        icon: "solar:rocket-linear",
                        title: "Ship + iterate",
                        desc: "Deploy, debug, fix CORS, improve UX — not just “runs locally”.",
                      },
                    ].map((x, i) => (
                      <Motion.div
                        key={x.title}
                        whileHover={{ y: -2, scale: 1.01 }}
                        className="rounded-2xl border border-white/10 bg-black/30 p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="h-9 w-9 rounded-xl bg-white/[0.03] border border-white/10 grid place-items-center">
                            <Icon icon={x.icon} width="18" className="text-green-200" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white/80">{x.title}</div>
                            <div className="mt-1 text-xs text-white/55 leading-relaxed">{x.desc}</div>
                          </div>
                        </div>
                      </Motion.div>
                    ))}
                  </div>

                  <div className="mt-4 text-xs text-white/45">
                    Next: more production features (caching, pagination, logging, test coverage) + one flagship project.
                  </div>

                  <div className="mt-5 flex justify-end">
                    <button
                      type="button"
                      className="close-modal px-5 py-2 rounded-2xl bg-white/[0.04] border border-white/10 text-white/80 font-bold
                                 hover:bg-white/[0.07] transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </Motion.div>
              </div>
            </div>

            {/* footer note */}
            <div className="mt-6 text-xs text-white/40">
              Want me to connect this section with your GitHub repo list and show “top projects shipped” here?
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
