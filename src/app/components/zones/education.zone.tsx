import { Icon } from "@iconify/react";
import { motion as Motion } from "framer-motion";

export default {
  id: "education",
  x: -148,
  z: 0,
  color: 0x6366f1,

  labelJSX: (
    <Motion.div
      id="label-education"
      className="world-label flex flex-col items-center gap-2 opacity-0 select-none"
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <Motion.div
        animate={{ y: [0, -6, 0], rotate: [0, 2, 0, -2, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-11 h-11 rounded-full grid place-items-center
                   bg-black/55 border border-indigo-400/45 backdrop-blur
                   shadow-[0_0_70px_rgba(99,102,241,0.22)]"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/25 to-purple-500/10 blur-md" />
        <Icon icon="solar:graduation-cap-linear" className="text-indigo-200 relative" width="20" />
      </Motion.div>

      <div className="bg-zinc-900/70 px-2.5 py-1 rounded-full text-[10px] font-extrabold text-white uppercase tracking-[0.22em]
                      border border-white/10 shadow-[0_0_50px_rgba(99,102,241,0.10)]">
        Education
      </div>
    </Motion.div>
  ),

  modalJSX: (
    <div
      id="modal-education"
      className="modal-panel w-full max-w-5xl hidden opacity-0 scale-95 transform
                 bg-[#0b0c10] border border-white/10 rounded-3xl shadow-2xl overflow-hidden
                 max-h-[85vh]"   // ✅ important: keeps modal within screen height
    >
      {/* Neon top bar */}
      <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-violet-400 to-purple-500" />

      {/* ✅ Scroll container (this makes whole modal scrollable) */}
      <div className="relative max-h-[calc(85vh-6px)] overflow-y-auto">
        {/* Background glows */}
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/14 blur-3xl" />
        <div className="absolute -bottom-32 -right-28 h-80 w-80 rounded-full bg-purple-500/12 blur-3xl" />
        <div className="absolute top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-violet-400/8 blur-3xl" />

        <div className="relative p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.35em] text-white/50 font-bold">
                Academic Timeline • Greater Noida, Uttar Pradesh
              </div>
              <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-white leading-tight">
                Education — <span className="text-indigo-300">foundation → engineering</span>
              </h2>
              <p className="mt-2 text-sm text-white/55 max-w-2xl">
                CBSE schooling (10th & 12th) in Greater Noida, followed by B.Tech (CSE) at NIET.
                Today my focus is Java backend, DSA, databases, and building production-style projects.
              </p>
            </div>

            {/* Return to World */}
            <div className="flex items-center gap-2">
              <button className="close-modal mt-4 text-xs text-zinc-500 hover:text-white uppercase tracking-widest">
              Return to World
            </button>
            </div>
          </div>

          {/* Main grid */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* LEFT */}
            <div className="lg:col-span-7 space-y-5">
              {/* College card */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
                <div className="relative">
                  {/* ✅ Genuine NIET image */}
                  <div
                    className="h-[170px] w-full"
                    style={{
                      backgroundImage:
                        "url('https://www.niet.co.in/assets/frontend/images/niet-college-1.webp')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/40 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-white/50 font-bold">
                      College
                    </div>
                    <div className="mt-1 text-xl font-extrabold text-white">
                      Noida Institute of Engineering & Technology (NIET)
                    </div>
                    <div className="mt-1 text-sm text-white/55">
                      Greater Noida, Uttar Pradesh • Affiliated: Dr. A.P.J. Abdul Kalam Technical University
                    </div>
                  </div>
                </div>

                <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-white/45 font-bold">
                      Focus
                    </div>
                    <div className="mt-1 text-sm text-white/80 font-semibold">
                      Java • Spring Boot • REST APIs
                    </div>
                    <div className="mt-2 text-xs text-white/50">
                      Backend services with clean structure and reliability.
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-white/45 font-bold">
                      Core
                    </div>
                    <div className="mt-1 text-sm text-white/80 font-semibold">
                      DSA • SQL • System Basics
                    </div>
                    <div className="mt-2 text-xs text-white/50">
                      Problem-solving + DB design + fundamentals.
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-white/45 font-bold">
                      Build Style
                    </div>
                    <div className="mt-1 text-sm text-white/80 font-semibold">
                      Real-world projects
                    </div>
                    <div className="mt-2 text-xs text-white/50">
                      End-to-end delivery: deploy + polish + iterate.
                    </div>
                  </div>
                </div>
              </div>

              {/* School card */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
                <div className="relative">
                  {/* ✅ Genuine DVMPS (Greater Noida) image */}
                  <div
                    className="h-[160px] w-full"
                    style={{
                      backgroundImage:
                        "url('https://www.dvmps.in/images/about/about-1.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/40 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-white/50 font-bold">
                      School (CBSE)
                    </div>
                    <div className="mt-1 text-lg font-extrabold text-white">
                      D.V.M Public School
                    </div>
                    <div className="mt-1 text-sm text-white/55">
                      Greater Noida, Uttar Pradesh • Central Board of Secondary Education (CBSE)
                    </div>
                  </div>
                </div>

                <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <div className="text-sm font-bold text-white/80">Milestones</div>
                    <div className="mt-1 text-xs text-white/55">
                      Completed 10th and 12th under CBSE — built strong fundamentals and consistency.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <div className="text-sm font-bold text-white/80">Foundation</div>
                    <div className="mt-1 text-xs text-white/55">
                      Discipline + logical thinking — now applied to backend engineering and DSA.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: progress + remarks (same vibe) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 md:p-6 shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
                <div className="flex items-center justify-between">
                  <div className="text-xs uppercase tracking-[0.25em] text-white/60 font-bold">
                    Progress Report
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-white/50">
                    current focus
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {[
                    { label: "Backend Development", value: 84 },
                    { label: "DSA / Problem Solving", value: 76 },
                    { label: "Database (SQL + Mongo)", value: 78 },
                    { label: "Projects / Delivery", value: 82 },
                  ].map((x) => (
                    <div key={x.label} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-bold text-white/80">{x.label}</div>
                        <div className="text-xs font-extrabold text-indigo-300">{x.value}%</div>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                          style={{ width: `${x.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-xs text-white/45">
                  Consistent practice + projects = recruiter-ready profile.
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 md:p-6 shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
                <div className="flex items-center justify-between">
                  <div className="text-xs uppercase tracking-[0.25em] text-white/60 font-bold">
                    Remarks
                  </div>
                  <Icon icon="solar:pen-2-linear" width="18" className="text-white/50" />
                </div>

                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <div className="text-sm font-bold text-white/80">Strength</div>
                    <div className="mt-1 text-xs text-white/55">
                      Strong Java backend direction — you build systems, not just screens.
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <div className="text-sm font-bold text-white/80">Next Upgrade</div>
                    <div className="mt-1 text-xs text-white/55">
                      Add 1–2 production-style projects (auth, caching, logging, deployment).
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-end">
            <button className="close-modal mt-4 text-xs text-zinc-500 hover:text-white uppercase tracking-widest">
              Return to World
            </button>
          </div>
        </div>
      </div>
    </div>
  ),
};
