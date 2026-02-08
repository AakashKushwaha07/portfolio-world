import { Icon } from "@iconify/react";
import { motion as Motion } from "framer-motion";
import type { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as any,
      delay: ((custom as number) ?? 0) * 0.06,
    },
  }),
};

const chip: Variants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.03, y: -2, transition: { duration: 0.18 } },
};

function SkillCard({
  icon,
  label,
  sub,
  tone = "blue",
}: {
  icon: string;
  label: string;
  sub?: string;
  tone?: "blue" | "cyan" | "purple" | "green";
}) {
  const toneBorder =
    tone === "cyan"
      ? "hover:border-cyan-400/50"
      : tone === "purple"
      ? "hover:border-purple-400/50"
      : tone === "green"
      ? "hover:border-emerald-400/50"
      : "hover:border-blue-500/50";

  const toneGlow =
    tone === "cyan"
      ? "hover:shadow-[0_0_24px_rgba(34,211,238,0.20)]"
      : tone === "purple"
      ? "hover:shadow-[0_0_24px_rgba(168,85,247,0.20)]"
      : tone === "green"
      ? "hover:shadow-[0_0_24px_rgba(16,185,129,0.18)]"
      : "hover:shadow-[0_0_24px_rgba(59,130,246,0.20)]";

  return (
    <Motion.div
      variants={chip}
      initial="rest"
      whileHover="hover"
      className={`bg-zinc-900 border border-zinc-800 p-3 rounded-xl flex items-start gap-3 transition-colors ${toneBorder} ${toneGlow}`}
    >
      <div className="mt-0.5 h-9 w-9 rounded-lg bg-white/[0.03] border border-white/10 grid place-items-center">
        <Icon icon={icon} width="20" />
      </div>
      <div className="min-w-0">
        <div className="text-sm text-zinc-100 font-semibold truncate">{label}</div>
        {sub ? <div className="text-[11px] text-zinc-500 leading-snug">{sub}</div> : null}
      </div>
    </Motion.div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <Motion.span
      whileHover={{ y: -2, scale: 1.03 }}
      transition={{ duration: 0.16 }}
      className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs text-blue-300 font-medium"
    >
      {children}
    </Motion.span>
  );
}

function Meter({ label, value, hint }: { label: string; value: number; hint?: string }) {
  return (
    <Motion.div variants={fadeUp} custom={0} className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold text-white/80">{label}</div>
        <div className="text-xs font-extrabold text-blue-300">{value}%</div>
      </div>
      <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"
          style={{ width: `${value}%` }}
        />
      </div>
      {hint ? <div className="mt-2 text-xs text-white/45">{hint}</div> : null}
    </Motion.div>
  );
}

export default {
  id: "skills",
  x: -153,
  z: -104,
  color: 0x3b82f6,

  labelJSX: (
    <Motion.div
      id="label-skills"
      className="world-label flex flex-col items-center gap-2 opacity-0 select-none"
      initial={{ opacity: 0, y: 10, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <Motion.div
        animate={{ y: [0, -6, 0], rotate: [0, 2, 0, -2, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="w-11 h-11 bg-black/55 border border-blue-400/45 rounded-full flex items-center justify-center
                   shadow-[0_0_70px_rgba(59,130,246,0.22)] backdrop-blur relative"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/25 to-cyan-500/10 blur-md" />
        <Icon icon="solar:shield-star-linear" className="text-blue-200 relative" width="20" />
      </Motion.div>

      <div className="bg-zinc-900/70 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-extrabold text-white uppercase tracking-[0.22em]
                      border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.10)]">
        Skill Armory
      </div>
    </Motion.div>
  ),

  modalJSX: (
    <div
      id="modal-skills"
      className="modal-panel w-full max-w-5xl bg-[#0b0c10] border border-white/10 rounded-3xl shadow-2xl overflow-hidden hidden transform scale-95 opacity-0 flex flex-col max-h-[85vh]"
    >
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"></div>

      <div className="flex-1 overflow-y-auto custom-scroll">
        <div className="relative">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/14 blur-3xl" />
          <div className="absolute -bottom-32 -right-28 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-sky-400/8 blur-3xl" />

          <div className="relative p-6 sm:p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <Motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }}
                  className="text-2xl md:text-3xl font-extrabold text-white tracking-tight"
                >
                  Skill Inventory
                </Motion.h2>
                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">
                  Java Backend • DSA • Systems • Shipping mindset
                </p>
              </div>

              <button className="close-modal text-zinc-500 hover:text-white transition-colors">
                <Icon icon="solar:close-circle-linear" width="28" />
              </button>
            </div>

            <Motion.div
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            >
              <Motion.div variants={fadeUp} custom={0}>
                <Meter label="Backend Engineering" value={84} hint="APIs, auth, WebSocket, clean architecture mindset" />
              </Motion.div>
              <Motion.div variants={fadeUp} custom={1}>
                <Meter label="DSA / Problem Solving" value={78} hint="Patterns: sliding window, trees, hashing, two pointers" />
              </Motion.div>
              <Motion.div variants={fadeUp} custom={2}>
                <Meter label="Databases" value={80} hint="MySQL + MongoDB • schema • joins • indexes • queries" />
              </Motion.div>
            </Motion.div>

            <Motion.div initial="hidden" animate="show" className="space-y-8">
              <Motion.div variants={fadeUp} custom={3}>
                <h3 className="text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wide flex items-center gap-2">
                  <Icon icon="solar:code-linear" />
                  Languages
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <SkillCard icon="logos:java" label="Java" sub="Primary backend language • OOP • collections" />
                  <SkillCard icon="logos:python" label="Python" sub="Scripting • automation • ML basics" tone="cyan" />
                  <SkillCard icon="solar:database-linear" label="SQL" sub="Joins • indexing • query optimization" tone="purple" />
                  <SkillCard icon="logos:javascript" label="JavaScript" sub="UI logic • async • tooling" />
                  <SkillCard icon="logos:html-5" label="HTML" sub="Semantics • accessibility basics" tone="cyan" />
                  <SkillCard icon="logos:css-3" label="CSS / Tailwind" sub="Design systems • responsive UI" tone="purple" />
                </div>
              </Motion.div>

              <Motion.div variants={fadeUp} custom={4}>
                <h3 className="text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wide flex items-center gap-2">
                  <Icon icon="solar:server-linear" />
                  Backend Engineering
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <SkillCard icon="simple-icons:springboot" label="Spring Boot" sub="REST APIs • validation • layered architecture" tone="green" />
                  <SkillCard icon="simple-icons:springsecurity" label="Spring Security" sub="Auth • JWT • RBAC" tone="green" />
                  <SkillCard icon="solar:chat-round-dots-linear" label="WebSockets / Realtime" sub="STOMP • chat systems • live updates" />
                  <SkillCard icon="carbon:data-structured" label="JDBC / Servlets / JSP" sub="Server-side rendering • MVC flow" tone="purple" />
                  <SkillCard icon="simple-icons:swagger" label="Swagger / OpenAPI" sub="API docs • endpoint testing" tone="cyan" />
                  <SkillCard icon="solar:shield-check-linear" label="API Best Practices" sub="Pagination • status codes • error design" />
                </div>
              </Motion.div>

              <Motion.div variants={fadeUp} custom={5}>
                <h3 className="text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wide flex items-center gap-2">
                  <Icon icon="solar:database-linear" />
                  Databases
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <SkillCard icon="logos:mysql" label="MySQL" sub="Schema design • joins • constraints" tone="cyan" />
                  <SkillCard icon="logos:mongodb-icon" label="MongoDB" sub="Documents • aggregation basics" tone="green" />
                  <SkillCard icon="simple-icons:redis" label="Redis (Learning)" sub="Caching • sessions • rate limiting" tone="purple" />
                </div>
              </Motion.div>

              <Motion.div variants={fadeUp} custom={6}>
                <h3 className="text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wide flex items-center gap-2">
                  <Icon icon="solar:widget-linear" />
                  Frontend (Project UI Surface)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <SkillCard icon="logos:react" label="React" sub="Components • hooks • state patterns" tone="cyan" />
                  <SkillCard icon="simple-icons:tailwindcss" label="Tailwind CSS" sub="Responsive UI • consistency" tone="purple" />
                  <SkillCard icon="simple-icons:framer" label="Framer Motion" sub="Micro-interactions • transitions" tone="cyan" />
                </div>
              </Motion.div>

              <Motion.div variants={fadeUp} custom={7}>
                <h3 className="text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wide flex items-center gap-2">
                  <Icon icon="solar:toolbox-linear" />
                  Tools & Shipping
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <SkillCard icon="logos:git-icon" label="Git" sub="Branching • PR flow • clean commits" />
                  <SkillCard icon="logos:github-icon" label="GitHub" sub="Repos • collaboration • CI basics" />
                  <SkillCard icon="logos:docker-icon" label="Docker" sub="Containers • deploy-ready" tone="cyan" />
                  <SkillCard icon="simple-icons:postman" label="Postman" sub="API testing • environments" tone="purple" />
                  <SkillCard icon="simple-icons:vercel" label="Vercel" sub="Frontend deployments" tone="cyan" />
                  <SkillCard icon="simple-icons:render" label="Render" sub="Backend deployments" tone="purple" />
                </div>
              </Motion.div>

              <Motion.div variants={fadeUp} custom={8}>
                <h3 className="text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wide flex items-center gap-2">
                  <Icon icon="solar:cpu-bolt-linear" />
                  Computer Science Core
                </h3>

                <div className="flex flex-wrap gap-2">
                  <Pill>DSA</Pill>
                  <Pill>OOP</Pill>
                  <Pill>DBMS</Pill>
                  <Pill>Operating Systems</Pill>
                  <Pill>Computer Networks</Pill>
                  <Pill>System Design (Learning)</Pill>
                  <Pill>REST Principles</Pill>
                  <Pill>Concurrency Basics</Pill>
                </div>

                <div className="mt-3 text-xs text-white/45">
                  Positioning: <span className="text-white/70 font-semibold">Java backend developer</span> with strong CS fundamentals + project delivery.
                </div>
              </Motion.div>

              <Motion.div variants={fadeUp} custom={9} className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.25em] text-white/60 font-bold">
                      Recruiter Snapshot
                    </div>
                    <div className="mt-2 text-sm text-white/75 leading-relaxed">
                      I build backend services in <span className="text-white font-semibold">Java + Spring Boot</span>, work with
                      <span className="text-white font-semibold"> MySQL/MongoDB</span>, and ship projects with
                      <span className="text-white font-semibold"> Git + Docker</span>. I practice DSA consistently and care about clean structure and real-world readiness.
                    </div>
                  </div>

                  <Motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="hidden sm:grid h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 place-items-center"
                    title="Power-up"
                  >
                    <Icon icon="solar:bolt-circle-linear" className="text-blue-200" width="22" />
                  </Motion.div>
                </div>
              </Motion.div>
            </Motion.div>
          </div>
        </div>
      </div>
    </div>
  ),
};
