import { CinematicNav } from "./components/CinematicNav";
import CityWorld from "./components/cityWorld";
import { HeroScene } from "./components/HeroScene";
import { AchievementStory } from "./components/AchievementStory";
import { CertificationShowcase } from "./components/CertificationShowcase";
import { ProjectChapters } from "./components/ProjectChapters";
import { SkillSystem } from "./components/SkillSystem";
import { ClosingJourney } from "./components/ClosingJourney";
import { useEffect, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // ✅ KEY STATE
  const [mode, setMode] = useState<"world" | "content">("world");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  // ✅ When navbar hash changes → switch to content mode
  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash) {
        setMode("content");
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-sans overflow-x-hidden">
      {/* Loader */}
      <AnimatePresence>
        {!isLoaded && (
          <Motion.div
            key="loader"
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
          >
            <span className="text-cyan-500 text-xs tracking-widest">
              Initializing Journey
            </span>
          </Motion.div>
        )}
      </AnimatePresence>

      {isLoaded && (
        <>
          {/* ✅ NAV ALWAYS PRESENT */}
          <CinematicNav />

          {/* ===== SMART CITY MODE ===== */}
          {mode === "world" && (
            <section className="relative h-screen w-full overflow-hidden">
              <CityWorld />

              {/* Exit to content */}
              <button
                onClick={() => setMode("content")}
                className="absolute bottom-6 right-6 z-[300] px-4 py-3 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs"
              >
                Skip World →
              </button>
            </section>
          )}

          {/* ===== CONTENT MODE ===== */}
          {mode === "content" && (
            <main>
              <section className="relative">
                <HeroScene />

                <div id="journey">
                  <AchievementStory />
                  <CertificationShowcase />
                  <ProjectChapters />
                  <SkillSystem />
                  <ClosingJourney />
                </div>

                {/* 🔙 BACK TO WORLD */}
                <button
                  onClick={() => {
                    setMode("world");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    history.replaceState(null, "", "/");
                  }}
                  className="fixed bottom-6 right-6 z-[300] px-4 py-3 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs"
                >
                  ← Back to World
                </button>
              </section>
            </main>
          )}
        </>
      )}
    </div>
  );
}
