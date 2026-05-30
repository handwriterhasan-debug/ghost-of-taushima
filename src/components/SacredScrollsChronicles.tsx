import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ScrollTiltCard } from './ScrollTiltCard';
import { IntersectionVideo } from './IntersectionVideo';
import { sfx } from '../utils/audio';

interface SacredScrollsChroniclesProps {
  setIsLogsOpen: (open: boolean) => void;
  setIsDiagnosticsOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
}

const containerStaggerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardEntranceVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 110,
      damping: 17,
      mass: 0.7,
    },
  },
};

export function SacredScrollsChronicles({
  setIsLogsOpen,
  setIsDiagnosticsOpen,
  setIsSearchOpen,
}: SacredScrollsChroniclesProps) {
  // Check user reduced motion preference
  const shouldReduceMotion = useReducedMotion();

  // Track hovered card index for smooth layoutId transitions
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Sword clash visual glitch state
  const [isClashing, setIsClashing] = useState(false);
  const [clashCount, setClashCount] = useState(0);

  const triggerSwordClash = (index: number) => {
    sfx.playSwordClash();
    setHoveredIndex(index);
    if (!shouldReduceMotion) {
      setIsClashing(true);
      setClashCount((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (isClashing) {
      const timer = setTimeout(() => {
        setIsClashing(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isClashing, clashCount]);

  return (
    <section 
      id="articles-section" 
      className="w-full mt-0 relative scroll-mt-24 group/scrolls px-0 animate-gpu"
    >
      <div className={`relative rounded-none border-b border-white/5 bg-neutral-950 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)] lg:aspect-video flex flex-col justify-center p-8 sm:p-12 md:p-16 lg:p-24 xl:px-32 w-full h-full transition-transform duration-300 ${isClashing && !shouldReduceMotion ? 'animate-shake-sec' : ''}`}>
        {/* High-definition smooth sword particles background video in 16:9 autoplay loops */}
        <IntersectionVideo
          src="https://res.cloudinary.com/dxxjtyvmk/video/upload/v1779981166/Smooth_animation_sword_particles_202605281554_hxcxra.mp4"
          className={`absolute inset-0 w-full h-full object-cover object-center brightness-[1.65] contrast-[1.45] saturate-[1.5] opacity-100 select-none pointer-events-none transition-transform duration-[1.5s] ${shouldReduceMotion ? '' : 'scale-[1.15] origin-center group-hover/scrolls:scale-[1.18]'} ${isClashing && !shouldReduceMotion ? 'animate-clash-glitch' : ''}`}
        />

        {/* Premium Vignettes blending the live video with deep solid black, ensuring top and bottom are fully faded into neutral-950 to prevent sharp borders */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/2 to-neutral-950 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/70 via-transparent to-neutral-950/70 z-10 pointer-events-none" />

        {/* Animated Scope Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.025)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none z-10" />

        {/* Interactive Sword Clash Visual Glitch Overlay */}
        {isClashing && !shouldReduceMotion && (
          <div key={clashCount} className="absolute inset-0 z-30 pointer-events-none overflow-hidden flex items-center justify-center">
            {/* Sudden intense lens / blade flash */}
            <div className="absolute inset-0 bg-red-650/15 mix-blend-color-dodge animate-pulse duration-75" />
            <div className="absolute inset-0 bg-white/5 mix-blend-overlay animate-pulse duration-100" />
            
            {/* Intersecting dual-slash steel sparks */}
            <div className="absolute w-[250%] h-[4px] bg-gradient-to-r from-transparent via-white to-transparent transform rotate-[-42deg] animate-slash-left shadow-[0_0_25px_rgba(255,255,255,1),0_0_50px_#ef4444]" />
            <div className="absolute w-[250%] h-[4px] bg-gradient-to-r from-transparent via-white to-transparent transform rotate-[42deg] animate-slash-right shadow-[0_0_25px_rgba(255,255,255,1),0_0_50px_#ef4444]" />
            
            {/* Visual clash epicenter bloom */}
            <div className="absolute w-40 h-40 bg-red-500/25 rounded-full blur-2xl animate-ping duration-200" />
            <div className="absolute w-24 h-24 bg-white/40 rounded-full blur-xl animate-ping duration-300" />
          </div>
        )}

        {/* Actual Glassmorphic Content overlaying the BGM video with smooth scroll animations */}
        <motion.div 
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`relative z-20 w-full h-full flex flex-col justify-center gap-6 lg:gap-8 transition-all duration-300 ${isClashing && !shouldReduceMotion ? 'animate-clash-glitch' : ''}`}
        >
          <div className="text-center space-y-2 mb-4 lg:mb-6">
            <div className="inline-flex items-center gap-2 text-red-500 font-mono text-[10px] font-bold tracking-[0.25em] uppercase bg-black/85 px-3.5 py-1.5 border border-white/10 rounded-full">
              <Sparkles className="w-3 h-3 text-red-500 animate-pulse" />
              DISCOVER SACRED SAMURAI RECORDS
            </div>
            <h2 className="font-serif text-white text-3xl sm:text-4xl font-extrabold tracking-wide uppercase leading-tight">
              SACRED SCROLLS CHRONICLES
            </h2>
            <p className="text-stone-300 text-xs sm:text-[13px] font-sans font-normal max-w-xl mx-auto leading-relaxed">
              Exquisite chronicles detailing the hand-forged weapons, strategic stance controls, and the legendary atmospheric cinematography of Tsushima.
            </p>
          </div>

          {/* Bento style card layout for articles - Opaque glassmorphic layers with staggered entrance flow */}
          <motion.div 
            variants={shouldReduceMotion ? undefined : containerStaggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Article Card 1 */}
            <ScrollTiltCard
              variants={shouldReduceMotion ? undefined : cardEntranceVariants}
              onMouseEnter={() => triggerSwordClash(0)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="border border-white/15 bg-black/85 hover:border-red-500/40 p-6 rounded-3xl h-[310px] lg:h-[330px] group/card relative overflow-hidden cursor-pointer"
            >
              {/* layoutId shared floating background glow context */}
              {hoveredIndex === 0 && (
                <motion.div
                  layoutId="sacredCardHoverGlow"
                  className="absolute inset-0 bg-red-950/15 border-2 border-red-500/30 rounded-3xl pointer-events-none z-0"
                  style={{ mixBlendMode: 'screen' }}
                  transition={{ type: 'spring', stiffness: 220, damping: 25 }}
                />
              )}

              <div className="absolute top-0 right-0 w-32 h-32 bg-red-650/10 blur-3xl rounded-full z-0 pointer-events-none" />
              
              <div className="space-y-3 z-10">
                <span className="text-red-400 text-[9px] font-bold font-mono block uppercase tracking-widest bg-red-950/40 border border-red-500/20 py-1 px-2.5 rounded-full w-fit">
                  GAMEPLAY & STANCES
                </span>
                <h4 className="font-serif font-black text-white text-base lg:text-lg group-hover/card:text-red-500 transition-colors uppercase tracking-wide leading-tight mt-1">
                  Lethal Swordplay <br />
                  & Ghost Combat Stances
                </h4>
                <p className="text-stone-300 font-sans text-[11px] leading-relaxed font-normal">
                  Strike down Mongol shields, spearmen, and heavy brutes using Stone, Water, Wind, Moon, and Ghost stances. Players love that the game uses the organic <strong>wind</strong> to guide exploration instead of giant map GPS markers.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 z-10 flex justify-between items-center bg-transparent mt-auto">
                <span className="font-mono text-[9px] text-stone-400 tracking-wider">SWORD • STEALTH • WIND</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sfx.playConfirm();
                    setIsLogsOpen(true);
                  }}
                  className="text-white hover:text-red-500 font-serif text-[10px] font-black tracking-widest uppercase flex items-center gap-1 cursor-pointer transition-colors"
                >
                  DETAILS <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </ScrollTiltCard>

            {/* Article Card 2 */}
            <ScrollTiltCard
              variants={shouldReduceMotion ? undefined : cardEntranceVariants}
              onMouseEnter={() => triggerSwordClash(1)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="border border-white/15 bg-black/85 hover:border-red-500/40 p-6 rounded-3xl h-[310px] lg:h-[330px] group/card relative overflow-hidden cursor-pointer"
            >
              {/* layoutId shared floating background glow context */}
              {hoveredIndex === 1 && (
                <motion.div
                  layoutId="sacredCardHoverGlow"
                  className="absolute inset-0 bg-red-950/15 border-2 border-red-500/30 rounded-3xl pointer-events-none z-0"
                  style={{ mixBlendMode: 'screen' }}
                  transition={{ type: 'spring', stiffness: 220, damping: 25 }}
                />
              )}

              <div className="absolute top-0 right-0 w-32 h-32 bg-red-650/10 blur-3xl rounded-full z-0 pointer-events-none" />
              
              <div className="space-y-3 z-10">
                <span className="text-red-400 text-[9px] font-bold font-mono block uppercase tracking-widest bg-red-950/40 border border-red-500/20 py-1 px-2.5 rounded-full w-fit">
                  CRITICS & LIFETIME SALES
                </span>
                <h4 className="font-serif font-black text-white text-base lg:text-lg group-hover/card:text-red-500 transition-colors uppercase tracking-wide leading-tight mt-1">
                  Metacritic Acclaim <br />
                  & 13 Million+ Copies Sold
                </h4>
                <p className="text-stone-300 font-sans text-[11px] leading-relaxed font-normal">
                  Earning an <strong>83 Metascore</strong> and a highly impressive <strong>9.1/10 User Score</strong> on Metacritic, Ghost of Tsushima is one of Sucker Punch's biggest successes with over 13 million copies sold worldwide.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 z-10 flex justify-between items-center bg-transparent mt-auto">
                <span className="font-mono text-[9px] text-stone-400 tracking-wider">83 METASCORE • 9.1 USER</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sfx.playConfirm();
                    setIsDiagnosticsOpen(true);
                  }}
                  className="text-white hover:text-red-500 font-serif text-[10px] font-black tracking-widest uppercase flex items-center gap-1 cursor-pointer transition-colors"
                >
                  CRITIQUES <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </ScrollTiltCard>

            {/* Article Card 3 */}
            <ScrollTiltCard
              variants={shouldReduceMotion ? undefined : cardEntranceVariants}
              onMouseEnter={() => triggerSwordClash(2)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="border border-white/15 bg-black/85 hover:border-red-500/40 p-6 rounded-3xl h-[310px] lg:h-[330px] group/card relative overflow-hidden cursor-pointer"
            >
              {/* layoutId shared floating background glow context */}
              {hoveredIndex === 2 && (
                <motion.div
                  layoutId="sacredCardHoverGlow"
                  className="absolute inset-0 bg-red-950/15 border-2 border-red-500/30 rounded-3xl pointer-events-none z-0"
                  style={{ mixBlendMode: 'screen' }}
                  transition={{ type: 'spring', stiffness: 220, damping: 25 }}
                />
              )}

              <div className="absolute top-0 right-0 w-32 h-32 bg-red-650/10 blur-3xl rounded-full z-0 pointer-events-none" />
              
              <div className="space-y-3 z-10">
                <span className="text-red-400 text-[9px] font-bold font-mono block uppercase tracking-widest bg-red-950/40 border border-red-500/20 py-1 px-2.5 rounded-full w-fit">
                  GHOST OF YŌTEI SEQUEL
                </span>
                <h4 className="font-serif font-black text-white text-base lg:text-lg group-hover/card:text-red-500 transition-colors uppercase tracking-wide leading-tight mt-1">
                  Ghost of Yōtei: <br />
                  A New Era & Revenge (2025)
                </h4>
                <p className="text-stone-300 font-sans text-[11px] leading-relaxed font-normal">
                  Set 300 years after Ghost of Tsushima, in year 1603. Sucker Punch returns with a brand-new protagonist, <strong>Atsu</strong>, seeking family retribution next to Mount Yōtei. Exclusively coming to PlayStation 5 in 2025.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 z-10 flex justify-between items-center bg-transparent mt-auto">
                <span className="font-mono text-[9px] text-stone-400 tracking-wider">PS5 EXCLUSIVE • ATSU • 2025</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sfx.playConfirm();
                    setIsSearchOpen(true);
                  }}
                  className="text-white hover:text-red-500 font-serif text-[10px] font-black tracking-widest uppercase flex items-center gap-1 cursor-pointer transition-colors"
                >
                  SEQUEL <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </ScrollTiltCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
