import { Icon } from "@iconify/react";
import { motion as Motion } from "framer-motion";

export default {
  id: "leadership",
  x: 163,
  z: 145,
  color: 0xec4899,

  /* ===================== LABEL ===================== */
  labelJSX: (
    <Motion.div
      id="label-leadership"
      className="world-label flex flex-col items-center gap-2 opacity-0 select-none"
      initial={{ opacity: 0, y: 10, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-11 h-11 bg-black/55 border border-pink-400/50 rounded-full
                   flex items-center justify-center shadow-[0_0_60px_rgba(236,72,153,0.25)]"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500/30 to-rose-500/10 blur-md" />
        <Icon icon="solar:users-group-rounded-linear" className="text-pink-200 relative" width="20" />
      </Motion.div>

      <div className="bg-zinc-900/70 px-2.5 py-1 rounded-full text-[10px] font-extrabold
                      text-white uppercase tracking-[0.22em] border border-white/10">
        Leadership
      </div>
    </Motion.div>
  ),

  /* ===================== MODAL ===================== */
  modalJSX: (
    <div
      id="modal-leadership"
      className="modal-panel w-full max-w-4xl hidden opacity-0 scale-95 transform
                 bg-[#0b0c10] border border-white/10 rounded-3xl shadow-2xl
                 overflow-hidden flex flex-col max-h-[85vh]"
    >
      {/* top bar */}
      <div className="h-1.5 bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600" />

      {/* scroll container */}
      <div className="flex-1 overflow-y-auto custom-scroll">
        <div className="relative p-6 md:p-8">
          {/* glows */}
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-pink-500/15 blur-3xl" />
          <div className="absolute -bottom-32 -right-28 h-80 w-80 rounded-full bg-rose-500/12 blur-3xl" />

          {/* header */}
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.35em] text-white/50 font-bold">
                Collaboration • Ownership • Accountability
              </div>
              <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-white">
                Leadership & Teamwork
              </h2>
              <p className="mt-2 text-sm text-white/55 max-w-2xl">
                I take ownership beyond individual tasks — coordinating with peers,
                unblocking teams, and ensuring delivery quality while staying hands-on
                with development.
              </p>
            </div>

            {/* close */}
            <button className="close-modal text-zinc-500 hover:text-white transition-colors">
              <Icon icon="solar:close-circle-linear" width="28" />
            </button>
          </div>

          {/* CONTENT */}
          <div className="mt-8 space-y-8">

            {/* ROLE */}
            <Motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon icon="solar:shield-star-linear" className="text-pink-300" width="22" />
                <h3 className="text-sm font-extrabold uppercase tracking-[0.22em] text-white/70">
                  Team Leadership
                </h3>
              </div>

              <p className="text-sm text-white/65 leading-relaxed">
                Acted as a <span className="text-white font-semibold">team lead / coordinator</span>
                during academic and project-based work — aligning teammates on requirements,
                distributing responsibilities, and reviewing outputs to maintain consistency
                and technical quality.
              </p>
            </Motion.div>

            {/* IMPACT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: "solar:users-group-rounded-linear",
                  title: "Team Coordination",
                  text: "Bridged communication gaps between developers, ensuring clarity on tasks and timelines.",
                },
                {
                  icon: "solar:checklist-linear",
                  title: "Ownership",
                  text: "Took responsibility for end-to-end completion instead of isolated contributions.",
                },
                {
                  icon: "solar:target-linear",
                  title: "Execution Focus",
                  text: "Prioritized deliverables, resolved blockers, and kept the team aligned with goals.",
                },
              ].map((item, i) => (
                <Motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.02] p-4"
                >
                  <Icon icon={item.icon} width="22" className="text-pink-300 mb-2" />
                  <div className="text-sm font-bold text-white/80">{item.title}</div>
                  <div className="mt-1 text-xs text-white/55 leading-relaxed">
                    {item.text}
                  </div>
                </Motion.div>
              ))}
            </div>

            {/* SOFT SKILLS */}
            <Motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
            >
              <h3 className="text-sm font-extrabold uppercase tracking-[0.22em] text-white/70 mb-3">
                Leadership Traits
              </h3>

              <div className="flex flex-wrap gap-2">
                {[
                  "Clear Communication",
                  "Mentoring Juniors",
                  "Decision Making",
                  "Conflict Resolution",
                  "Time Management",
                  "Adaptability",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-xs font-semibold
                               bg-pink-500/10 border border-pink-500/20 text-pink-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Motion.div>

            {/* FOOTER NOTE */}
            <div className="text-xs text-white/45">
              Leadership to me means <span className="text-white/70 font-semibold">taking responsibility</span>,
              not authority — enabling teams to perform better while staying technically involved.
            </div>

            {/* CTA */}
            <div className="flex justify-end">
              <button
                type="button"
                className="close-modal px-5 py-2 rounded-2xl bg-white/[0.04] border border-white/10
                           text-white/80 font-bold hover:bg-white/[0.07] transition-colors"
              >
                Return to World
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
