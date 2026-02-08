import { motion as Motion } from "framer-motion";
import { Menu, X, Github, Twitter, Linkedin } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-medium tracking-tight"
        >
          AAKASH <span className="text-zinc-400">KUSHWAHA</span>
        </Motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <Motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium text-zinc-600 hover:text-black transition-colors"
            >
              {link.name}
            </Motion.a>
          ))}
          <div className="h-4 w-[1px] bg-zinc-200" />
          <div className="flex items-center gap-4">
            <a href="#" className="text-zinc-400 hover:text-black transition-colors"><Twitter size={18} /></a>
            <a href="#" className="text-zinc-400 hover:text-black transition-colors"><Github size={18} /></a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <Motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-white border-b border-zinc-100 px-6 py-8"
        >
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>
        </Motion.div>
      )}
    </nav>
  );
}
