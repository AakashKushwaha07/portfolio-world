import { ProjectCard } from "./ProjectCard";

const projects = [
  {
    title: "Nova Ecosystem",
    category: "Product Design • Fintech",
    image: "https://images.unsplash.com/photo-1758218112859-f96701f214a4",
    year: "2025"
  },
  {
    title: "Lumina Labs",
    category: "Brand Identity • AI",
    image: "https://images.unsplash.com/photo-1759724141139-d5bc97539bf8",
    year: "2024"
  },
  {
    title: "Vortex Motion",
    category: "Web Design • 3D",
    image: "https://images.unsplash.com/photo-1670834416065-5b4419def835",
    year: "2024"
  }
];

export function WorkSection() {
  return (
    <section id="work" className="py-24 md:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Selected Work</h2>
            <h3 className="text-4xl md:text-6xl font-medium tracking-tight">
              Crafting solutions for the <span className="text-zinc-400 font-serif italic">digital age.</span>
            </h3>
          </div>
          <p className="text-zinc-500 max-w-xs pb-2">
            A curated collection of projects where strategy meets aesthetic excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {projects.map((project, i) => (
            <div key={project.title} className={i === 1 ? "md:mt-32" : ""}>
              <ProjectCard {...project} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
