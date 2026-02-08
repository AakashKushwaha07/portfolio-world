import { Icon } from "@iconify/react";
import { motion as Motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

// ✅ your real links
const LINKS = {
  github: "https://github.com/AakashKushwaha07?tab=repositories",
  leetcode: "https://leetcode.com/u/kushwaha11/",
};

const orbitTech = [
  { name: "Java", icon: "logos:java" },
  { name: "Spring", icon: "logos:spring-icon" },
  { name: "React", icon: "logos:react" },
  { name: "MySQL", icon: "logos:mysql" },
  { name: "MongoDB", icon: "logos:mongodb-icon" },
  { name: "Docker", icon: "logos:docker-icon" },
  { name: "GitHub", icon: "logos:github-icon" },
];

const liveData = Array.from({ length: 12 }).map((_, i) => ({
  t: `${i + 1}`,
  perf: 45 + Math.round(Math.sin(i / 2) * 12) + (i % 3) * 3,
  build: 30 + Math.round(Math.cos(i / 2) * 14) + (i % 4) * 2,
}));

// ✅ tuned to your profile: Java backend + Spring + DB + DSA + React surface + deployment
const radarData = [
  { skill: "Java Backend", v: 90 },
  { skill: "Spring APIs", v: 86 },
  { skill: "DB/SQL", v: 82 },
  { skill: "DevOps", v: 68 },
  { skill: "React UI", v: 72 },
  { skill: "DSA", v: 78 },
];

export default {
  id: "techstack",
  x: -142,
  z: 111,
  color: 0x0ea5e9,

  // ✅ 3D-ish floating label
  labelJSX: (
    <Motion.div
      id="label-techstack"
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
                   bg-black/55 border border-sky-400/45 backdrop-blur
                   shadow-[0_0_70px_rgba(56,189,248,0.22)]"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-500/25 to-blue-500/10 blur-md" />
        <Icon icon="solar:cpu-bolt-linear" className="text-sky-200 relative" width="20" />
      </Motion.div>

      <div
        className="bg-zinc-900/70 px-2.5 py-1 rounded-full text-[10px] font-extrabold text-white uppercase tracking-[0.22em]
                   border border-white/10 shadow-[0_0_50px_rgba(56,189,248,0.10)]"
      >
        Tech Stack
      </div>
    </Motion.div>
  ),

  // ✅ Stunning modal: logo orbit + animated cards + live graphs (Recharts)
  modalJSX: (
    <div
      id="modal-techstack"
      className="modal-panel w-full max-w-5xl hidden opacity-0 scale-95 transform
                 bg-[#0b0c10] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
    >
      {/* Neon top bar */}
      <div className="h-1.5 bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-500" />

      {/* Background glows */}
      <div className="relative">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute -bottom-32 -right-28 h-80 w-80 rounded-full bg-blue-500/12 blur-3xl" />
        <div className="absolute top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-cyan-400/8 blur-3xl" />

        <div className="relative p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.35em] text-white/50 font-bold">
                Aakash Kushwaha • Java Backend Developer
              </div>
              <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-white leading-tight">
                Stack cockpit — <span className="text-sky-300">3D orbit</span> of how I build systems
              </h2>
              <p className="mt-2 text-sm text-white/55 max-w-2xl">
                The orbit is a visual map of my workflow: <span className="text-white/80 font-semibold">Java + Spring</span> at the core for
                backend APIs, <span className="text-white/80 font-semibold">MySQL/MongoDB</span> for data, <span className="text-white/80 font-semibold">Docker</span>{" "}
                for deployment, and <span className="text-white/80 font-semibold">React</span> for clean UI surfaces.
                Click GitHub / LeetCode to verify projects and problem-solving practice.
              </p>
            </div>

            {/* ✅ attach GitHub + LeetCode (kept same layout style) */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href={LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.22em] font-bold
                           bg-white/[0.04] border border-white/10 text-white/70 hover:bg-white/[0.07] transition-colors
                           flex items-center gap-2"
                title="Open my GitHub repositories"
              >
                <Icon icon="logos:github-icon" width="14" />
                GitHub
              </a>

              <a
                href={LINKS.leetcode}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.22em] font-bold
                           bg-white/[0.04] border border-white/10 text-white/70 hover:bg-white/[0.07] transition-colors
                           flex items-center gap-2"
                title="Open my LeetCode profile"
              >
                <Icon icon="simple-icons:leetcode" width="14" className="text-[#FFA116]" />
                LeetCode
              </a>
            </div>
          </div>

          {/* Main grid */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Orbit + chips */}
            <div className="lg:col-span-7">
              <div
                className="rounded-3xl border border-white/10 bg-white/[0.02] p-4 md:p-5
                           shadow-[0_30px_120px_rgba(0,0,0,0.55)]"
                style={{ perspective: 900 }}
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs uppercase tracking-[0.25em] text-white/60 font-bold">
                    Tech Orbit
                  </div>
                  <div className="text-[10px] text-white/40">hover chips</div>
                </div>

                {/* Orbit container */}
                <div className="relative mt-3 h-[230px] w-full rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
                  {/* glow blobs */}
                  <div className="absolute inset-0 opacity-80">
                    <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />
                    <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
                  </div>

                  {/* rings */}
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="h-[170px] w-[170px] rounded-full border border-white/10 shadow-[0_0_80px_rgba(56,189,248,0.10)]" />
                    <div className="absolute h-[120px] w-[120px] rounded-full border border-white/10 opacity-60" />
                  </div>

                  {/* orbit icons */}
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="relative h-[180px] w-[180px]">
                      {orbitTech.map((t, i) => (
                        <Motion.div
                          key={t.name}
                          className="absolute left-1/2 top-1/2"
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.08 * i, duration: 0.5 }}
                          style={{
                            transform: `translate(-50%, -50%) rotate(${(360 / orbitTech.length) * i}deg) translateY(-86px) rotate(-${
                              (360 / orbitTech.length) * i
                            }deg)`,
                          }}
                        >
                          <Motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                            className="h-11 w-11 rounded-full bg-black/60 border border-white/10 grid place-items-center backdrop-blur
                                       shadow-[0_0_40px_rgba(56,189,248,0.10)]"
                            title={t.name}
                          >
                            <Icon icon={t.icon} width="24" />
                          </Motion.div>
                        </Motion.div>
                      ))}
                    </div>
                  </div>

                  {/* center core */}
                  <div className="absolute inset-0 grid place-items-center">
                    <Motion.div
                      animate={{ scale: [1, 1.06, 1] }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                      className="h-12 w-12 rounded-full bg-sky-500/15 border border-sky-400/30
                                 shadow-[0_0_90px_rgba(56,189,248,0.20)] grid place-items-center"
                      title="Core: Java Backend • APIs • Problem Solving"
                    >
                      <Icon icon="solar:cpu-bolt-linear" className="text-sky-200" width="22" />
                    </Motion.div>
                  </div>
                </div>

                {/* chips */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {orbitTech.map((t) => (
                    <Motion.div
                      key={t.name}
                      whileHover={{ y: -2, scale: 1.02 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-2xl
                                 bg-white/[0.03] border border-white/10 text-white/75"
                    >
                      <Icon icon={t.icon} width="18" />
                      <span className="text-xs font-semibold">{t.name}</span>
                    </Motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Charts (kept same — you asked to keep rest same) */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-5">
              <div className="h-[230px] w-full rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
                <div className="px-4 pt-4 flex items-center justify-between">
                  <div className="text-xs uppercase tracking-[0.25em] text-white/60 font-bold">
                    LeetCode / System Signals
                  </div>
                  <a
                    href={LINKS.leetcode}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-white/40 hover:text-white/70 transition-colors"
                    title="Open LeetCode profile"
                  >
                    open →
                  </a>
                </div>

                <div className="h-[195px] px-2 pb-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={liveData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="t" tick={{ fontSize: 10, fill: "rgba(255,255,255,0.45)" }} />
                      <YAxis tick={{ fontSize: 10, fill: "rgba(255,255,255,0.45)" }} />
                      <Tooltip
                        contentStyle={{
                          background: "rgba(10,10,15,0.9)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: 12,
                          color: "white",
                        }}
                      />
                      <Line type="monotone" dataKey="perf" strokeWidth={2.5} dot={false} />
                      <Line type="monotone" dataKey="build" strokeWidth={2.5} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="h-[230px] w-full rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
                <div className="px-4 pt-4 flex items-center justify-between">
                  <div className="text-xs uppercase tracking-[0.25em] text-white/60 font-bold">
                    Skill Radar
                  </div>
                  <a
                    href={LINKS.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-white/40 hover:text-white/70 transition-colors"
                    title="Open GitHub repositories"
                  >
                    repos →
                  </a>
                </div>

                <div className="h-[195px] px-2 pb-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: "rgba(255,255,255,0.55)" }} />
                      <PolarRadiusAxis tick={{ fontSize: 10, fill: "rgba(255,255,255,0.35)" }} />
                      <Radar dataKey="v" strokeWidth={2} fillOpacity={0.25} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA (same layout, just links attached + text updated) */}
          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="text-xs text-white/45">
              GitHub shows my real projects (Java/Spring/Full-stack). LeetCode shows my problem-solving consistency.
            </div>

            <div className="flex items-center gap-2">
              <a
                href={LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-2xl bg-white text-black font-bold hover:bg-zinc-200 transition-colors"
              >
                View GitHub Repos
              </a>
              <a
                href={LINKS.leetcode}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/10 text-white/80 font-bold
                           hover:bg-white/[0.07] transition-colors"
              >
                View LeetCode
              </a>
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
