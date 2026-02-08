import { Icon } from "@iconify/react";

export default {
  id: "about",
  x: -60,
  z: -40,
  color: 0xa855f7,

  labelJSX: (
    <div id="label-about" className="world-label flex flex-col items-center gap-2 opacity-0">
          <div className="w-10 h-10 bg-purple-900/80 border border-purple-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <Icon icon="solar:user-id-linear" className="text-purple-200" width="20"></Icon>
          </div>
          <div className="bg-zinc-900/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider border border-white/20">
            About Base
          </div>
        </div>
  ),

  modalJSX: (
    <div
          id="modal-about"
          className="modal-panel w-full max-w-2xl bg-[#121214] border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden hidden transform scale-95 opacity-0 flex flex-col max-h-[85vh]"
        >
          <div className="h-1.5 w-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600"></div>
          <div className="p-6 sm:p-8 flex-1 overflow-y-auto custom-scroll">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Backend Origin Story</h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 text-[10px] font-mono border border-purple-500/20">
                    LEVEL 1
                  </span>
                  <span className="text-xs text-zinc-500 uppercase tracking-wider">About Me</span>
                </div>
              </div>
              <button className="close-modal text-zinc-500 hover:text-white transition-colors">
                <Icon icon="solar:close-circle-linear" width="28"></Icon>
              </button>
            </div>
            <div className="prose prose-invert prose-sm max-w-none text-zinc-400">
              <p className="text-base leading-relaxed">
                <strong className="text-white">I don't just write code; I architect solutions.</strong> My journey began
                with a curiosity about how massive systems handle data. That curiosity evolved into a deep passion for{" "}
                <span className="text-purple-400">Java Backend Development</span>.
              </p>
              <p>
                I thrive on the logic behind the scenes—optimizing database queries, structuring APIs, and ensuring
                seamless communication between servers. Solving complex problems using{" "}
                <span className="text-purple-400">Data Structures &amp; Algorithms</span> feels like completing a
                challenging level in a game; it requires strategy, precision, and efficiency.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6 not-prose">
                <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                  <Icon icon="solar:code-circle-linear" className="text-purple-400 mb-2" width="24"></Icon>
                  <h4 className="text-white text-sm font-semibold">Problem Solver</h4>
                  <p className="text-xs text-zinc-500 mt-1">Turning abstract issues into concrete logic.</p>
                </div>
                <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                  <Icon
                    icon="solar:server-square-linear"
                    className="text-purple-400 mb-2"
                    width="24"
                  ></Icon>
                  <h4 className="text-white text-sm font-semibold">System Architect</h4>
                  <p className="text-xs text-zinc-500 mt-1">Building scalable, efficient backend systems.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

  ),
};
