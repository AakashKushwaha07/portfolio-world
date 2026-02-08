import { Icon } from "@iconify/react";

export default {
  id: "contact",
  x: -78,
  z: -36,
  color: 0xf43f5e,

  labelJSX: (
    <div id="label-contact" className="world-label flex flex-col items-center gap-2 opacity-0">
      <div className="w-14 h-14 bg-rose-900/80 border-2 border-rose-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.5)] animate-pulse">
        <Icon icon="solar:login-2-linear" className="text-rose-200" width="28"></Icon>
      </div>
      <div className="bg-zinc-900/80 backdrop-blur px-3 py-1.5 rounded text-xs font-bold text-white uppercase tracking-wider border border-white/20">
        Contect Portal
      </div>
    </div>
  ),

  modalJSX: (
    <div
      id="modal-contact"
      className="modal-panel w-full max-w-lg bg-[#121214] border border-rose-900/30 rounded-2xl shadow-2xl overflow-hidden hidden transform scale-95 opacity-0"
    >
      <div className="h-1.5 w-full bg-gradient-to-r from-rose-600 via-pink-500 to-rose-600"></div>
      <div className="p-8 text-center">
        <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
          <Icon icon="solar:check-circle-linear" className="text-rose-500" width="32"></Icon>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">Journey Complete</h2>
        <p className="text-sm text-zinc-400 mb-6">
          Thanks for exploring my world! Ready to collaborate or hire?
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <a
            href="https://www.linkedin.com/in/aakash-kushwaha-2486b0285"
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center p-4 rounded bg-zinc-900 border border-zinc-800 hover:border-rose-500/50 hover:bg-zinc-800 transition-all"
          >
            <Icon icon="logos:linkedin-icon" width="24" className="mb-2"></Icon>
            <span className="text-xs text-white">LinkedIn</span>
          </a>

          {/* ✅ FIX: email link must be mailto: */}
          <a
            href="mailto:kushwaha1112002@gmail.com?subject=Opportunity%20for%20Aakash%20Kushwaha&body=Hi%20Aakash,%0A%0AI%20visited%20your%20portfolio%20and%20would%20like%20to%20connect%20regarding..."
            className="flex flex-col items-center justify-center p-4 rounded bg-zinc-900 border border-zinc-800 hover:border-rose-500/50 hover:bg-zinc-800 transition-all"
          >
            <Icon icon="solar:letter-linear" width="24" className="mb-2 text-white"></Icon>
            <span className="text-xs text-white">Email Me</span>
          </a>
        </div>

        {/* ✅ FIX: Resume download must be an <a download> link */}
        {/* Put your resume file here: /public/resume/Aakash_Kushwaha_Resume.pdf */}
        <a
          href="/resume/Aakash_Kushwaha_Resume.pdf"
          download
          className="w-full py-3 bg-white text-black font-bold rounded hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
        >
          <Icon icon="solar:download-square-linear" width="20"></Icon>
          Download Resume
        </a>

        <button className="close-modal mt-4 text-xs text-zinc-500 hover:text-white uppercase tracking-widest">
          Return to World
        </button>
      </div>
    </div>
  ),
};
