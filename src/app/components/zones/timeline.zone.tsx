import { Icon } from "@iconify/react";

export default {
  id: "timeline",
  x: 80,
  z: -85,
  color: 0xf97316,

  labelJSX: (
    <div id="label-timeline" className="world-label flex flex-col items-center gap-2 opacity-0">
      <div className="w-10 h-10 bg-orange-900/80 border border-orange-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.4)]">
        <Icon icon="solar:history-linear" className="text-orange-200" width="20" />
      </div>
      <div className="bg-zinc-900/80 px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider border border-white/20">
        Timeline
      </div>
    </div>
  ),

  modalJSX: (
    <div
          id="modal-timeline"
          className="modal-panel w-full max-w-2xl bg-[#121214] border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden hidden transform scale-95 opacity-0 flex flex-col max-h-[85vh]"
        >
          <div className="h-1.5 w-full bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600"></div>
          <div className="p-6 sm:p-8 flex-1 overflow-y-auto custom-scroll">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">The Journey</h2>
                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">Education &amp; Growth</p>
              </div>
              <button className="close-modal text-zinc-500 hover:text-white transition-colors">
                <Icon icon="solar:close-circle-linear" width="28"></Icon>
              </button>
            </div>
            <div className="relative pl-4 sm:pl-8 space-y-8 before:absolute before:left-2 sm:before:left-4 before:top-2 before:bottom-0 before:w-px before:bg-zinc-700">
              <div className="relative pl-6">
                <div className="absolute -left-[29px] sm:-left-[37px] top-1.5 w-3 h-3 rounded-full bg-orange-500 ring-4 ring-[#121214]"></div>
                <span className="text-[10px] font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                  2023 - Present
                </span>
                <h3 className="text-lg font-semibold text-white mt-2">Deep Dive into Backend</h3>
                <p className="text-sm text-zinc-400 mt-1">
                  Focusing on Spring Boot, Microservices architecture, and advanced DSA problems.
                </p>
              </div>
              <div className="relative pl-6">
                <div className="absolute -left-[29px] sm:-left-[37px] top-1.5 w-3 h-3 rounded-full bg-zinc-600 ring-4 ring-[#121214]"></div>
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800/50 px-2 py-0.5 rounded border border-zinc-700">
                  2022
                </span>
                <h3 className="text-lg font-semibold text-white mt-2">Java Core Mastery</h3>
                <p className="text-sm text-zinc-400 mt-1">
                  Mastered Object-Oriented Programming, Multithreading, and Collections framework. Built first
                  console-based apps.
                </p>
              </div>
              <div className="relative pl-6">
                <div className="absolute -left-[29px] sm:-left-[37px] top-1.5 w-3 h-3 rounded-full bg-zinc-600 ring-4 ring-[#121214]"></div>
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800/50 px-2 py-0.5 rounded border border-zinc-700">
                  2020 - 2024
                </span>
                <h3 className="text-lg font-semibold text-white mt-2">B.Tech Computer Science</h3>
                <p className="text-sm text-zinc-400 mt-1">
                  Foundation in OS, DBMS, and Logic Building. Started the journey into the world of code.
                </p>
              </div>
            </div>
          </div>
        </div>
  ),
};
