import { motion as Motion } from "framer-motion";
import { Github, Linkedin, Menu, X, FileText } from "lucide-react";
import { useState, useEffect } from "react";

export function CinematicNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Journey", href: "#journey" },
    { name: "Milestones", href: "#achievements" },
    { name: "Artifacts", href: "#certs" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-8"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-[0.2em] text-white flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-black text-xs">A</span>
          <span className="hidden sm:inline">AAKASH KUSHWAHA</span>
        </Motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link, i) => (
            <Motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-xs uppercase tracking-[0.15em] font-medium text-white/50 hover:text-cyan-400 transition-colors"
            >
              {link.name}
            </Motion.a>
          ))}
          <div className="h-4 w-[1px] bg-white/10 mx-2" />
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-6">
  {/* GitHub */}
  <a
    href="https://github.com/AakashKushwaha07"
    target="_blank"
    rel="noreferrer"
    className="text-white/40 hover:text-white transition-colors"
    aria-label="GitHub"
  >
    <Github size={18} />
  </a>

  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/in/aakash-kushwaha-2486b0285"
    target="_blank"
    rel="noreferrer"
    className="text-white/40 hover:text-white transition-colors"
    aria-label="LinkedIn"
  >
    <Linkedin size={18} />
  </a>

  {/* Resume */}
  <a
    href="https://drive.google.com/file/d/1k4kmsiLNRvLwSaMsPpjjIWnweGS4iJGH/view?usp=sharing"
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold
               bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full
               border border-white/10 transition-all"
  >
    <FileText size={12} />
    Resume
  </a>
</div>

          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/5 p-8 flex flex-col gap-6 md:hidden"
        >
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-medium text-white hover:text-cyan-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </Motion.div>
      )}
    </nav>
  );
}
