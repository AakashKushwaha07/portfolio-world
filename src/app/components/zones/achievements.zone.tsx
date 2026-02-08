import { Icon } from "@iconify/react";
import { motion as Motion } from "framer-motion";

const achievements = [
  {
    title: "NCET+ SDE (Java) — Certificate of Recognition",
    type: "Competition / Assessment",
    year: "2025",
    icon: "solar:cup-star-linear",
    tone: "amber",
    detail:
      "Recognition for Java-based SDE assessment performance — reinforces backend readiness and problem-solving.",
  },
  {
    title: "Microsoft AI Skills Challenge",
    type: "Batch / Challenge",
    year: "2024",
    icon: "simple-icons:microsoft",
    tone: "yellow",
    detail:
      "Completed structured AI learning challenge — consistent progress and curiosity in emerging tech.",
  },
  {
    title: "Cisco Networking Academy — Track Progress",
    type: "Batch / Program",
    year: "2025",
    icon: "simple-icons:cisco",
    tone: "amber",
    detail:
      "Completed core networking modules (Intro → Switching/Routing → Enterprise) to strengthen CS fundamentals.",
  },
  {
    title: "Infosys Springboard — Multi-course Completion",
    type: "Batch / Learning Sprint",
    year: "2024–2025",
    icon: "solar:book-2-linear",
    tone: "yellow",
    detail:
      "Completed multiple tracks: Java, JS, Deep Learning, Data Visualization — consistent skill accumulation.",
  },
];

const hacks = [
  {
    label: "Hackathons",
    value: "2+",
    hint: "Build under time pressure • teamwork • shipping",
    icon: "solar:rocket-linear",
  },
  {
    label: "Competitions",
    value: "3+",
    hint: "Assessments • coding challenges • recognition",
    icon: "solar:cup-linear",
  },
  {
    label: "Batches",
    value: "6+",
    hint: "Structured learning • completion proof",
    icon: "solar:calendar-linear",
  },
];

export default {
  id: "achievements",
  x: 150,
  z: -104,
  color: 0xeab308,

  // ✅ animated label (floating trophy)
  labelJSX: (
    <Motion.div
      id="label-achievements"
      className="world-label flex flex-col items-center gap-2 opacity-0 select-none"
      initial={{ opacity: 0, y: 10, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Motion.div
        animate={{ y: [0, -6, 0], rotate: [0, 2, 0, -2, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-11 h-11 bg-black/55 border border-yellow-400/45 rounded-full flex items-center justify-center
                   shadow-[0_0_70px_rgba(234,179,8,0.22)] backdrop-blur"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-500/25 to-amber-500/10 blur-md" />
        <Icon icon="solar:trophy-linear" className="text-yellow-200 relative" width="20" />
      </Motion.div>

      <div className="bg-zinc-900/70 px-2.5 py-1 rounded-full text-[10px] font-extrabold text-white uppercase tracking-[0.22em]
                      border border-white/10 shadow-[0_0_50px_rgba(234,179,8,0.10)]">
        Achievements
      </div>
    </Motion.div>
  ),

  // ✅ cinematic achievements modal (jumping ball + transitions + batches/hackathons/competitions)
  modalJSX: (
    <div
      id="modal-achievements"
      className="modal-panel w-full max-w-5xl hidden opacity-0 scale-95 transform
                 bg-[#0b0c10] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
    >
      <div className="h-1.5 bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500" />

      <div className="flex-1 overflow-y-auto custom-scroll">
        <div className="relative">
          {/* glows */}
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-yellow-500/15 blur-3xl" />
          <div className="absolute -bottom-32 -right-28 h-80 w-80 rounded-full bg-amber-500/12 blur-3xl" />
          <div className="absolute top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-orange-400/8 blur-3xl" />

          <div className="relative p-6 md:p-8">
            {/* header */}
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="text-[11px] uppercase tracking-[0.35em] text-white/50 font-bold">
                  Milestones • Batches • Hackathons • Competitions
                </div>

                <div className="mt-2 flex items-center gap-3">
                  {/* ✅ jumping “trophy orb” */}
                  <div className="relative">
                    <Motion.div
                      animate={{ y: [0, -16, 0], rotate: [0, 12, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                      className="h-12 w-12 rounded-full border border-yellow-400/40 bg-yellow-500/10 grid place-items-center
                                 shadow-[0_0_90px_rgba(234,179,8,0.18)]"
                    >
                      <Icon icon="solar:trophy-linear" className="text-yellow-200" width="22" />
                    </Motion.div>
                    <Motion.div
                      animate={{ opacity: [0.25, 0.6, 0.25], scale: [0.95, 1.1, 0.95] }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-8 rounded-full bg-yellow-500/30 blur-md"
                    />
                  </div>

                  <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                    Achievements — <span className="text-yellow-300">proof of execution</span>
                  </h2>
                </div>

                <p className="mt-2 text-sm text-white/55 max-w-3xl">
                  This section highlights structured learning completions (batches), competitive recognitions, and challenge-based work.
                  It’s built to show recruiters: <span className="text-white/70 font-semibold">consistency + outcomes</span>.
                </p>
              </div>

              <button className="close-modal text-zinc-500 hover:text-white transition-colors">
                <Icon icon="solar:close-circle-linear" width="28" />
              </button>
            </div>

            {/* stats row */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {hacks.map((x, i) => (
                <Motion.div
                  key={x.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.02] p-5"
                >
                  <div className="flex items-start justify-between">
                    <Icon icon={x.icon} width="22" className="text-yellow-300" />
                    <div className="text-2xl font-extrabold text-white">{x.value}</div>
                  </div>
                  <div className="mt-2 text-sm font-bold text-white/80">{x.label}</div>
                  <div className="mt-1 text-xs text-white/50">{x.hint}</div>
                </Motion.div>
              ))}
            </div>

            {/* timeline */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <div className="text-xs uppercase tracking-[0.25em] text-white/60 font-bold">
                  Highlight Timeline
                </div>
                <div className="text-[10px] text-white/40">hover cards</div>
              </div>

              <div className="mt-4 space-y-3">
                {achievements.map((a, i) => (
                  <Motion.div
                    key={a.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -3, scale: 1.01 }}
                    className="group rounded-3xl border border-white/10 bg-white/[0.02] p-5
                               hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="h-11 w-11 rounded-2xl bg-black/40 border border-white/10 grid place-items-center shrink-0">
                          <Icon icon={a.icon} width="22" className="text-yellow-300" />
                        </div>

                        <div className="min-w-0">
                          <div className="text-sm md:text-base font-extrabold text-white/85 leading-snug">
                            {a.title}
                          </div>
                          <div className="mt-1 text-xs text-white/45">
                            {a.type} • {a.year}
                          </div>
                          <div className="mt-2 text-xs text-white/55 leading-relaxed">
                            {a.detail}
                          </div>

                          {/* animated tags */}
                          <div className="mt-3 flex flex-wrap gap-2">
                            {["Consistency", "Proof", "Execution"].map((t, idx) => (
                              <Motion.span
                                key={t}
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ duration: 2.4, repeat: Infinity, delay: idx * 0.2 }}
                                className="px-2 py-0.5 rounded-full text-[10px] font-bold
                                           bg-yellow-500/10 border border-yellow-500/20 text-yellow-300"
                              >
                                {t}
                              </Motion.span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Icon
                        icon="solar:arrow-right-up-linear"
                        width="18"
                        className="text-white/25 group-hover:text-white/60 transition-colors"
                      />
                    </div>
                  </Motion.div>
                ))}
              </div>
            </div>

            {/* footer */}
            <div className="mt-8 flex items-center justify-between gap-3">

               <button className="close-modal mt-4 text-xs text-zinc-500 hover:text-white uppercase tracking-widest">
              Return to World
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
