import { Icon } from "@iconify/react";
import { motion as Motion } from "framer-motion";
import type { Variants } from "framer-motion";
import * as certModule from "../../../data/certifications"; // ✅ uses your src/data/certifications.js

// ✅ robust import (works with export const + default)
const certifications = Array.isArray(certModule.certifications)
  ? certModule.certifications
  : Array.isArray((certModule as any).default)
  ? (certModule as any).default
  : [];

// ✅ TS-safe Variants
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

const CATS = [
  "All",
  "Programming",
  "AI",
  "Data",
  "Web",
  "Blockchain",
  "Networking",
  "Automation",
  "Internship",
  "Assessment",
] as const;

type Cat = (typeof CATS)[number];

export default {
  id: "certifications",
  x: -2,
  z: -101,
  color: 0x06b6d4,

  // ✅ animated label
  labelJSX: (
    <Motion.div
      id="label-certifications"
      className="world-label flex flex-col items-center gap-2 opacity-0 select-none"
      initial={{ opacity: 0, y: 10, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <Motion.div
        animate={{ y: [0, -6, 0], rotate: [0, 2, 0, -2, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-11 h-11 bg-black/55 border border-cyan-400/45 rounded-full flex items-center justify-center
                   shadow-[0_0_70px_rgba(34,211,238,0.22)] backdrop-blur"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/25 to-sky-500/10 blur-md" />
        <Icon icon="solar:medal-ribbon-linear" className="text-cyan-200 relative" width="20" />
      </Motion.div>

      <div className="bg-zinc-900/70 px-2.5 py-1 rounded-full text-[10px] font-extrabold text-white uppercase tracking-[0.22em]
                      border border-white/10 shadow-[0_0_50px_rgba(34,211,238,0.10)]">
        Certifications
      </div>
    </Motion.div>
  ),

  // ✅ NOTE:
  // This file is an "object export" (not a React component), so we cannot use useState/useMemo here safely.
  // So: we render a premium grid + quick category chips (non-interactive) + preview defaults.
  // Clicking a card opens your `link` (verify url) if available, otherwise opens the image.
  modalJSX: (
    <div
      id="modal-certifications"
      className="modal-panel w-full max-w-6xl hidden opacity-0 scale-95 transform
                 bg-[#0b0c10] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
    >
      <div className="h-1.5 bg-gradient-to-r from-cyan-600 via-sky-500 to-cyan-600" />

      <div className="flex-1 overflow-y-auto custom-scroll">
        <div className="relative">
          {/* glows */}
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/14 blur-3xl" />
          <div className="absolute -bottom-32 -right-28 h-80 w-80 rounded-full bg-sky-500/12 blur-3xl" />
          <div className="absolute top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-blue-400/8 blur-3xl" />

          <div className="relative p-6 md:p-8">
            {/* header */}
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="text-[11px] uppercase tracking-[0.35em] text-white/50 font-bold">
                  Proof of Learning • Infosys • Cisco • Coursera • Microsoft
                </div>
                <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-white leading-tight">
                  Certifications — <span className="text-cyan-300">organized by track</span>
                </h2>
                <p className="mt-2 text-sm text-white/55 max-w-3xl">
                  From programming fundamentals to AI, data, networking, and internships — each badge links to a verification page (when available)
                  and includes the certificate image stored in <span className="text-white/70 font-semibold">/public/certificates/...</span>.
                </p>
              </div>

              <button className="close-modal text-zinc-500 hover:text-white transition-colors">
                <Icon icon="solar:close-circle-linear" width="28" />
              </button>
            </div>

            {/* category chips (display only) */}
            <div className="mt-5 flex flex-wrap gap-2">
              {CATS.map((c) => (
                <span
                  key={c}
                  className="px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.22em] font-bold
                             bg-white/[0.03] border border-white/10 text-white/60"
                >
                  {c}
                </span>
              ))}
            </div>

            {/* main grid */}
            <div className="mt-6 grid grid-cols-1 xl:grid-cols-12 gap-5">
              {/* left: list */}
              <div className="xl:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {certifications.map((c: any, i: number) => {
                    const href =
                      c?.link && c.link !== "#" ? c.link : c?.image || "#";

                    return (
                      <Motion.a
                        key={`${c.title}-${i}`}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={i}
                        className="group rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden
                                   hover:bg-white/[0.04] transition-colors shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
                        title={c?.link && c.link !== "#" ? "Open verification link" : "Open certificate image"}
                      >
                        {/* image */}
                        <div className="relative h-[150px] bg-black/40 overflow-hidden">
                          <img
                            src={c.image}
                            alt={c.title}
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-300"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-transparent" />

                          <div className="absolute top-3 left-3 flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-[0.20em] font-bold
                                             bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                              {c.category}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold
                                             bg-white/[0.03] border border-white/10 text-white/60">
                              {c.date}
                            </span>
                          </div>

                          <div className="absolute top-3 right-3">
                            <Icon
                              icon="solar:arrow-right-up-linear"
                              width="18"
                              className="text-white/30 group-hover:text-white/70 transition-colors"
                            />
                          </div>
                        </div>

                        {/* text */}
                        <div className="p-4">
                          <div className="text-sm font-extrabold text-white/85 leading-snug line-clamp-2">
                            {c.title}
                          </div>
                          <div className="mt-1 text-xs text-white/45">
                            {c.issuer}
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="text-[11px] text-white/50">
                              {c.link && c.link !== "#"
                                ? "Verification available"
                                : "Image stored locally"}
                            </div>

                            <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-white/40">
                              open →
                            </span>
                          </div>
                        </div>
                      </Motion.a>
                    );
                  })}
                </div>
              </div>

              {/* right: preview panel (first item) */}
              <div className="xl:col-span-5">
                <Motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  custom={0}
                  className="rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden sticky top-6"
                >
                  <div className="p-4 flex items-center justify-between border-b border-white/10">
                    <div className="text-xs uppercase tracking-[0.25em] text-white/60 font-bold">
                      Highlight
                    </div>
                    <div className="text-[10px] text-white/40">
                      preview
                    </div>
                  </div>

                  <div className="relative w-full h-[360px] bg-black/40">
                    <img
                      src={certifications?.[0]?.image}
                      alt={certifications?.[0]?.title}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0b0c10]/60 via-transparent to-transparent" />
                  </div>

                  <div className="p-4">
                    <div className="text-sm font-extrabold text-white/85">
                      {certifications?.[0]?.title || "—"}
                    </div>
                    <div className="mt-1 text-xs text-white/45">
                      {certifications?.[0]?.issuer || "—"} • {certifications?.[0]?.date || "—"}
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <a
                        href={
                          certifications?.[0]?.link && certifications?.[0]?.link !== "#"
                            ? certifications?.[0]?.link
                            : certifications?.[0]?.image
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 rounded-2xl bg-white text-black font-bold hover:bg-zinc-200 transition-colors"
                      >
                        Verify / Open
                      </a>

                      <button
                        type="button"
                        className="close-modal px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/10 text-white/80 font-bold
                                   hover:bg-white/[0.07] transition-colors"
                      >
                        Close
                      </button>
                    </div>

                    <div className="mt-3 text-xs text-white/45">
                      Want clickable category filtering + “click card to change preview” inside the modal?
                      I can do it, but it needs this modal to be a small React component (so we can use state).
                    </div>
                  </div>
                </Motion.div>
              </div>
            </div>

            {/* footer */}
            <div className="mt-6 text-xs text-white/45">
              Total certificates: <span className="text-white/70 font-semibold">{certifications.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
