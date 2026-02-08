import { motion as Motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ExternalLink, ShieldCheck } from "lucide-react";
import * as certModule from "../../data/certifications";

const list = Array.isArray(certModule.certifications)
  ? certModule.certifications
  : Array.isArray(certModule.default)
  ? certModule.default
  : [];

export function CertificationShowcase() {
  return (
    <section id="certs" className="py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-cyan-500 mb-6">
            Validation
          </h2>
          <h3 className="text-4xl md:text-5xl font-medium text-white tracking-tight">
            Technical Credentials
          </h3>
        </Motion.div>

        {list.length === 0 ? (
          <div className="text-center text-zinc-400">
            No certificates loaded. Check{" "}
            <code className="text-zinc-200">src/data/certifications.js</code>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {list.map((cert, i) => {
              const hasLink = cert?.link && cert.link !== "#";

              return (
                <Motion.div
                  key={`${cert?.title || "cert"}-${cert?.issuer || "issuer"}-${
                    cert?.date || "date"
                  }-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="group relative"
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 bg-zinc-900">
                    {/* IMAGE LAYER (always visible) */}
                    <div className="absolute inset-0 z-0 bg-white">
                      <ImageWithFallback
                        src={cert?.image || "/certificates/placeholder.png"}
                        alt={cert?.title || "Certificate"}
                        className="w-full h-full object-contain bg-white p-3 transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </div>

                    {/* SOFT OVERLAY (doesn't kill white certificates) */}
                    <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                    {/* CONTENT */}
                    <div className="absolute bottom-6 left-6 right-6 z-20">
                      <div className="flex items-center gap-2 text-cyan-400 text-[10px] uppercase tracking-widest font-bold mb-2">
                        <ShieldCheck size={14} /> {cert?.issuer || "Issuer"}
                      </div>

                      <h4 className="text-xl font-bold text-white mb-4 leading-tight line-clamp-2">
                        {cert?.title || "Certificate Title"}
                      </h4>

                      <div className="flex items-center justify-between">
                        <span className="text-zinc-400 text-sm font-medium">
                          {cert?.date || ""}
                        </span>

                        {hasLink ? (
                          <Motion.a
                            href={cert.link}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white hover:bg-cyan-500 hover:text-black transition-colors"
                            aria-label="Verify certificate (opens official site)"
                            title="Verify certificate (opens official site)"
                          >
                            <ExternalLink size={16} />
                          </Motion.a>
                        ) : (
                          <div
                            className="p-3 rounded-full bg-white/10 border border-white/15 text-white/40 cursor-not-allowed"
                            title="Verification link not added yet"
                            aria-hidden="true"
                          >
                            <ExternalLink size={16} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
