import React from "react";
import { Icon } from "@iconify/react";

const GITHUB = "https://github.com/AakashKushwaha07?tab=repositories";

const projectsZone = {
  id: "projects",
  x: 0,
  z: 90,
  color: 0x10b981,

  /* ===================== LABEL ===================== */
  labelJSX: (
    <div id="label-projects" className="world-label flex flex-col items-center gap-2 opacity-0">
      <div className="w-10 h-10 bg-emerald-900/80 border border-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
        <Icon icon="solar:folder-with-files-linear" className="text-emerald-200" width="20" />
      </div>
      <div className="bg-zinc-900/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider border border-white/20">
        Project Hub
      </div>
    </div>
  ),

  /* ===================== MODAL ===================== */
  modalJSX: (
    <div
      id="modal-projects"
      className="modal-panel w-full max-w-5xl bg-[#121214] border border-zinc-700 rounded-2xl shadow-2xl
                 overflow-hidden hidden transform scale-95 opacity-0 flex flex-col max-h-[85vh]"
    >
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600"></div>

      <div className="p-6 sm:p-8 flex-1 overflow-y-auto custom-scroll">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Mission Log</h2>
            <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">
              9 Real Projects • Backend-first • Deployed-ready mindset
            </p>
          </div>
          <button className="close-modal text-zinc-500 hover:text-white transition-colors">
            <Icon icon="solar:close-circle-linear" width="28" />
          </button>
        </div>

        {/* GITHUB CTA */}
        <a
          href={GITHUB}
          target="_blank"
          rel="noreferrer"
          className="mb-8 flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/70
                     px-5 py-4 hover:border-emerald-500/50 transition-all"
        >
          <div className="flex items-center gap-3">
            <Icon icon="logos:github-icon" width="20" className="invert" />
            <div>
              <div className="text-sm font-bold text-white">GitHub Repository Hub</div>
              <div className="text-xs text-zinc-400">
                All projects • commits • structure • real code
              </div>
            </div>
          </div>
          <Icon icon="solar:arrow-right-up-linear" width="18" className="text-zinc-400" />
        </a>

        {/* PROJECT GRID */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* 1 */}
          <ProjectCard
            icon="solar:document-text-linear"
            tag="AI / ML"
            title="AI Resume Builder"
            desc="Resume parsing, skill extraction, job-description matching, and ATS-style feedback system with upgrade-ready design."
            tech={["Python", "NLP", "Similarity Scoring"]}
          />

          {/* 2 */}
          <ProjectCard
            icon="solar:chart-square-linear"
            tag="ML / Web"
            title="Predictive Student Performance System"
            desc="Analyzes attendance, marks, and activity data to predict outcomes using ML models with JSP + MySQL integration."
            tech={["JSP", "MySQL", "ML Model"]}
          />

          {/* 3 */}
          <ProjectCard
            icon="solar:chat-round-linear"
            tag="Backend"
            title="Realtime Chat Application"
            desc="WebSocket-based chat system with Spring Boot backend, MongoDB persistence, authentication, and CORS-safe deployment."
            tech={["Spring Boot", "WebSocket", "MongoDB"]}
          />

          {/* 4 */}
          <ProjectCard
            icon="solar:user-check-linear"
            tag="Auth System"
            title="User Registration & Login System"
            desc="Secure authentication system using Java, JSP, Servlets, sessions, and MySQL with clean MVC separation."
            tech={["Java", "JSP", "MySQL"]}
          />

          {/* 5 */}
          <ProjectCard
            icon="solar:cpu-bolt-linear"
            tag="Backend"
            title="Java Backend Project Suite"
            desc="Collection of backend services covering CRUD, REST APIs, validation, database integration, and layered architecture."
            tech={["Java", "Spring Boot", "REST"]}
          />

          {/* 6 */}
          <ProjectCard
            icon="solar:database-linear"
            tag="Data"
            title="Database Management Projects"
            desc="Hands-on SQL and database-driven projects focusing on schema design, queries, joins, and performance."
            tech={["MySQL", "SQL", "DBMS"]}
          />

          {/* 7 */}
          <ProjectCard
            icon="solar:network-linear"
            tag="Networking"
            title="Networking & System Labs"
            desc="Projects and simulations based on Cisco networking concepts: routing, switching, and enterprise setups."
            tech={["Networking", "Cisco", "System Design"]}
          />

          {/* 8 */}
          <ProjectCard
            icon="solar:rocket-linear"
            tag="Automation"
            title="Python Automation Tasks"
            desc="Automation scripts and utilities developed during internship focusing on efficiency and task reduction."
            tech={["Python", "Automation"]}
          />

          {/* 9 */}
          <ProjectCard
            icon="solar:layers-linear"
            tag="Portfolio"
            title="3D Interactive Developer Portfolio"
            desc="Game-like 3D portfolio with animated zones, modals, and structured storytelling of skills and projects."
            tech={["React", "UI/UX", "3D UI"]}
          />
        </div>

        <div className="mt-6 text-xs text-zinc-500">
          Each project is backed by real code. Recruiters can verify depth, structure, and commits directly on GitHub.
        </div>
      </div>
    </div>
  ),
};

/* ===================== CARD COMPONENT ===================== */
function ProjectCard({ icon, tag, title, desc, tech }) {
  return (
    <div className="group relative bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden
                    hover:border-emerald-500/50 transition-all">
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <Icon icon={icon} width="22" />
          </div>
          <span className="px-2 py-1 bg-zinc-800 rounded text-[10px] uppercase text-zinc-400 font-mono">
            {tag}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>

        <p className="text-sm text-zinc-400 leading-relaxed mb-4 flex-grow">
          {desc}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((t) => (
            <span key={t} className="text-[10px] px-2 py-1 rounded bg-zinc-800 text-zinc-400">
              {t}
            </span>
          ))}
        </div>

        <a
          href={GITHUB}
          target="_blank"
          rel="noreferrer"
          className="w-full py-2 rounded bg-zinc-800 hover:bg-emerald-600 hover:text-white
                     text-zinc-300 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Icon icon="logos:github-icon" className="invert" width="14" />
          View Code
        </a>
      </div>
    </div>
  );
}

export default projectsZone;
