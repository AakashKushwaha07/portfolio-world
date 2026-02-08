import { motion as Motion } from "framer-motion";
import { ArrowRight, Mail, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="bg-white pt-24 pb-12 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-20 mb-24">
          <div className="max-w-2xl">
            <Motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-medium tracking-tight mb-10"
            >
              Let's create something <br />
              <span className="text-zinc-400">extraordinary.</span>
            </Motion.h2>
            <Motion.a
              href="mailto:hello@alexchen.design"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-4 text-2xl md:text-3xl font-medium group"
            >
              hello@alexchen.design
              <Motion.div
                whileHover={{ x: 10 }}
                className="bg-black text-white p-3 rounded-full"
              >
                <ArrowRight size={24} />
              </Motion.div>
            </Motion.a>
          </div>

          <div className="flex flex-col gap-10">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">Social</h4>
              <ul className="space-y-4">
                <li><a href="https://www.linkedin.com/in/aakash-kushwaha-2486b0285" className="flex items-center gap-2 text-zinc-600 hover:text-black transition-colors font-medium"><Linkedin size={18} /> LinkedIn</a></li>
                <li><a href="#" className="flex items-center gap-2 text-zinc-600 hover:text-black transition-colors font-medium"><Instagram size={18} /> Instagram</a></li>
                <li><a href="https://drive.google.com/file/d/1k4kmsiLNRvLwSaMsPpjjIWnweGS4iJGH/view?usp=sharing" className="flex items-center gap-2 text-zinc-600 hover:text-black transition-colors font-medium">Read.cv</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">Location</h4>
              <p className="text-zinc-600 font-medium">Brooklyn, New York <br />Remote Worldwide</p>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-400 text-sm">
            © 2026 Aakash kr.Kushwaha Design. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-zinc-400">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
