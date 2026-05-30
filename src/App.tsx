/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Search, 
  Menu, 
  Volume2, 
  VolumeX, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  ArrowRight, 
  Cpu, 
  Shield, 
  Zap, 
  Target, 
  Activity, 
  RefreshCw,
  Sparkles,
  Mail
} from 'lucide-react';

import { SAMURAI_PROFILES, CLASSIFIED_LOGS } from './data/samurai';
import { DiagnosticsHUD, SearchOverlay, LogsDrawer, CommonSectionOverlay } from './components/HUDOverlays';
import { TextScramble } from './components/TextScramble';
import { IntersectionVideo } from './components/IntersectionVideo';
import { ScrollTiltCard } from './components/ScrollTiltCard';
import { SacredScrollsChronicles } from './components/SacredScrollsChronicles';
import { MotionSwords } from './components/MotionSwords';
import { sfx } from './utils/audio';

const containerStaggerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const cardEntranceVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      mass: 0.8,
    },
  },
};

const headerParentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const headerItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 140,
      damping: 18,
    },
  },
};

const footerStaggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.35,
    },
  },
};

const footerItemVariants = {
  hidden: { opacity: 0, y: -15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 130,
      damping: 16,
    },
  },
};

export default function App() {
  // Profiles & navigation state
  const [profileIndex, setProfileIndex] = useState(0);
  const activeProfile = SAMURAI_PROFILES[profileIndex];

  // Overlay state managers
  const [isDiagnosticsOpen, setIsDiagnosticsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLogsOpen, setIsLogsOpen] = useState(false);
  const [activeCommonOverlay, setActiveCommonOverlay] = useState<'about' | 'articles' | 'contact' | null>(null);

  // Scroll active section tab tracker state
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'articles' | 'contact'>('home');

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [stampMessenger, setStampMessenger] = useState<'ghost' | 'shimura' | 'khan'>('ghost');

  // Interface animation controls
  const [isMuted, setIsMuted] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);
  const [scannerStatus, setScannerStatus] = useState('');
  const [scanResult, setScanResult] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  // Scroll positioning event observer to sync active tab with high-perf check callback (throttled)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const elements = [
            { id: 'cinema-container', tab: 'home' },
            { id: 'about-section', tab: 'about' },
            { id: 'articles-section', tab: 'articles' },
            { id: 'contact-section', tab: 'contact' }
          ];

          for (const item of elements) {
            const el = document.getElementById(item.id);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (window.scrollY >= top - 250 && window.scrollY < top + height - 250) {
                setActiveTab((prev) => (prev !== item.tab ? (item.tab as any) : prev));
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler helper
  const scrollToSection = (section: 'home' | 'about' | 'articles' | 'contact') => {
    setActiveTab(section);
    sfx.playClick();
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(`${section}-section`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Web audio state sync
  useEffect(() => {
    // Initial welcome sound on first interaction
    const welcomeTrigger = () => {
      sfx.playConfirm();
      window.removeEventListener('click', welcomeTrigger);
    };
    window.addEventListener('click', welcomeTrigger);
    return () => window.removeEventListener('click', welcomeTrigger);
  }, []);

  // Cyber scan simulator handler
  const handleDiscoverScan = () => {
    if (scannerActive) return;
    sfx.playConfirm();
    setScannerActive(true);
    setScanResult(false);
    
    // Series of cyberpunk HUD status reports
    const statuses = [
      'LOAD SYSTEM CHRONOLOGY: INITIALIZING GAME ENGINE...',
      'CONFIGURING PLAYSTATION 5 & PC STEAM LINK CODES...',
      'GETTING CHARACTER PROFILES: JIN SAKAI & MONGOL ARMY...',
      'MAPPING GAME CONTROLLER HAPTICS & LORE SCRIPTS...',
      'COMPILING SHADER CACHE FOR ULTRA RESOLUTION - SUCCESS!'
    ];

    statuses.forEach((status, idx) => {
      setTimeout(() => {
        setScannerStatus(status);
        sfx.playGlitch();
      }, idx * 500);
    });

    setTimeout(() => {
      setScannerActive(false);
      setScanResult(true);
      sfx.playConfirm();
    }, statuses.length * 500 + 400);
  };

  const handleNextProfile = () => {
    sfx.playSwoosh();
    setProfileIndex((prev) => (prev + 1) % SAMURAI_PROFILES.length);
  };

  const handlePrevProfile = () => {
    sfx.playSwoosh();
    setProfileIndex((prev) => (prev - 1 + SAMURAI_PROFILES.length) % SAMURAI_PROFILES.length);
  };

  const handleToggleMute = () => {
    const muted = sfx.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      sfx.playClick();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col items-center selection:bg-red-650 selection:text-white pb-32 overflow-x-hidden">
      
      {/* Pristine high-fidelity black canvas with subtle radial illumination */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-neutral-950 to-black pointer-events-none z-0" />

      {/* STICKY GLASSMOCK NAV HEADER */}
      <motion.header 
        variants={headerParentVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 right-0 z-50 bg-black/75 backdrop-blur-md border-b border-white/[0.04] py-3.5 px-6 md:px-12 flex justify-between items-center shadow-lg"
      >
        {/* Left branding with brand logo in stagger */}
        <motion.div 
          variants={headerItemVariants}
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <MotionSwords className="w-4.5 h-4.5 text-red-650" />
          <span className="font-serif text-stone-100 font-bold text-xs tracking-[0.25em] uppercase select-none group-hover:text-red-500 transition-colors">
            GHOST OF TSUSHIMA
          </span>
        </motion.div>

        {/* Center navigation links in stagger */}
        <motion.nav 
          variants={headerItemVariants}
          className="hidden md:flex items-center gap-7 font-serif text-[11px] tracking-[0.2em] font-medium text-stone-400"
        >
          {[
            { id: 'home', label: 'THEATRE HUB' },
            { id: 'about', label: 'ABOUT THE GHOST' },
            { id: 'articles', label: 'SACRED SCROLLS' },
            { id: 'contact', label: 'SEALED SUMMONS' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-${tab.id}`}
                onClick={() => scrollToSection(tab.id as any)}
                className={`relative pb-1 transition-colors duration-200 cursor-pointer uppercase font-semibold text-[10.5px] ${
                  isActive ? 'text-white' : 'hover:text-stone-200 text-stone-400'
                }`}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="activeStickyTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
              </button>
            );
          })}
        </motion.nav>

        {/* Right audio, diagnostics and log panel icons in stagger */}
        <motion.div 
          variants={headerParentVariants}
          className="flex items-center gap-3"
        >
          {/* Audio toggle button */}
          <motion.button 
            variants={headerItemVariants}
            id="audio-toggle-btn-sticky"
            onClick={handleToggleMute}
            className="h-8.5 px-3 rounded-full border border-white/10 hover:border-white/20 transition-all flex items-center gap-2 bg-white/[0.03] backdrop-blur-md text-stone-300 hover:text-white cursor-pointer text-[10px] font-sans font-bold tracking-wider"
            title={isMuted ? "Enable system sounds" : "Mute system sounds"}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-stone-500" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-red-500" />
            )}
            <div className="flex items-end gap-[1.5px] h-2.5">
              <span className={`w-[1.5px] bg-red-600 ${isMuted ? 'h-[1.5px]' : 'wave-bar h-1'}`} />
              <span className={`w-[1.5px] bg-red-605 ${isMuted ? 'h-[1.5px]' : 'wave-bar h-2'}`} />
              <span className={`w-[1.5px] bg-red-600 ${isMuted ? 'h-[1.5px]' : 'wave-bar h-1.5'}`} />
            </div>
          </motion.button>

          {/* Diagnostics trigger */}
          <motion.button 
            variants={headerItemVariants}
            id="diagnostics-trigger-sticky"
            onClick={() => {
              sfx.playConfirm();
              setIsDiagnosticsOpen(true);
            }}
            className="p-2 border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-md rounded-full text-stone-300 hover:text-white transition-all cursor-pointer"
            title="Open profile diagnostics"
          >
            <User className="w-3.5 h-3.5" />
          </motion.button>

          {/* Search trigger */}
          <motion.button 
            variants={headerItemVariants}
            id="search-trigger-sticky"
            onClick={() => {
              sfx.playConfirm();
              setIsSearchOpen(true);
            }}
            className="p-2 border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-md rounded-full text-stone-300 hover:text-white transition-all cursor-pointer"
            title="Search archive"
          >
            <Search className="w-3.5 h-3.5" />
          </motion.button>

          {/* Logs trigger */}
          <motion.button 
            variants={headerItemVariants}
            id="logs-trigger-sticky"
            onClick={() => {
              sfx.playConfirm();
              setIsLogsOpen(true);
            }}
            className="p-2 border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-md rounded-full text-stone-300 hover:text-white transition-all cursor-pointer"
            title="Open operations console log"
          >
            <Menu className="w-3.5 h-3.5" />
          </motion.button>
        </motion.div>
      </motion.header>

      {/* Floating nav for mobile screen sizes */}
      <div className="fixed bottom-4 left-4 right-4 z-40 bg-zinc-950/90 border border-white/10 p-2.5 rounded-2xl backdrop-blur-lg flex md:hidden items-center justify-around shadow-2xl">
        {[
          { id: 'home', label: 'THEATRE' },
          { id: 'about', label: 'ABOUT' },
          { id: 'articles', label: 'SCROLLS' },
          { id: 'contact', label: 'SUMMONS' }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id as any)}
              className={`text-[9.5px] font-serif font-bold tracking-widest px-3 py-1.5 rounded-lg transition-all ${
                isActive ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' : 'text-stone-400 hover:text-stone-100'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Spacer for sticky header */}
      <div className="h-20" />

      {/* Main 16:9 Cinematic Container Frame Wrapper */}
      <div className="w-full select-none z-10 relative">
        <div 
          id="cinema-container"
          className="w-full aspect-video flex flex-col justify-between relative bg-black border-y border-white/10 overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.9)] text-stone-200 font-sans"
        >
        {/* Absolute Video Frame with high-fidelity seamless crossfade depending on active section */}
        <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none overflow-hidden bg-black">
          {/* Default/Primary Samurai Video Backdrop */}
          <IntersectionVideo
            src="https://res.cloudinary.com/dxxjtyvmk/video/upload/v1779965963/Samurai_walking_with_particles_202605281541_hozvpn.mp4"
            className={`absolute inset-0 w-full h-full object-cover object-center brightness-110 contrast-110 scale-[1.15] origin-center transition-opacity duration-1000 ease-in-out ${
              activeCommonOverlay === 'about' ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          />

          {/* About Section: Specialized Particles/Samurai Background video */}
          <IntersectionVideo
            src="https://res.cloudinary.com/dxxjtyvmk/video/upload/v1779968735/Animation_particles_samurai_moving_202605281546_zm84gt.mp4"
            className={`absolute inset-0 w-full h-full object-cover object-center brightness-110 contrast-110 scale-[1.15] origin-center transition-opacity duration-1000 ease-in-out ${
              activeCommonOverlay === 'about' ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          />

          {/* Pristine iOS-style Vignettes (Soft, transparent, highly optimized with zero frame lag) */}
          <div className="absolute inset-y-0 left-0 w-full md:w-[50%] bg-gradient-to-r from-black/85 via-black/40 to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/80 via-black/25 to-transparent z-10" />
        </div>

        {/* HUD Scanner Overlay triggerable via Discover - Redesigned into Apple System Diagnostic UI */}
        <AnimatePresence>
          {scannerActive && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 z-40 flex flex-col justify-center items-center pointer-events-auto backdrop-blur-md"
            >
              {/* iOS style sleek loader line */}
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-0 left-0 right-0 h-[3px] bg-red-650 shadow-[0_0_12px_#ef4444]"
              />
              
              <div className="text-center font-sans space-y-4 max-w-sm p-6 border border-white/10 bg-neutral-900/95 rounded-2xl shadow-2xl backdrop-blur-xl">
                <div className="flex justify-center mb-1">
                  <Cpu className="text-red-500 w-8 h-8 animate-pulse" />
                </div>
                <div className="text-white font-semibold tracking-wide text-sm">Sakai Clan Game Compass</div>
                <div className="text-[11px] text-stone-400 font-mono leading-relaxed h-8">
                  {scannerStatus || 'Reading game system states...'}
                </div>
                {/* Micro info grid */}
                <div className="grid grid-cols-4 gap-2 pt-3 text-[9px] font-mono text-stone-300 border-t border-white/5">
                  <div>PLAT: PS5/PC</div>
                  <div>FPS: 60/120</div>
                  <div>HDR: ENABLED</div>
                  <div>INPUT: DUALSENSE</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- CUSTOM BEAUTIFUL HUD TELEMETRY INFO BAR --- */}
        <header className="w-full z-30 flex justify-between items-center px-10 pt-8 relative">
          <div className="flex items-center gap-2 font-mono text-[9.5px] tracking-[0.2em] text-stone-400">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_6px_#dc2626]" />
            GHOST OF TSUSHIMA GAME COMMAND HUD
          </div>
          <div className="flex items-center gap-3 font-mono text-[9px] tracking-[0.25em] text-stone-500">
            <span>SYS_FEED: ONLINE</span>
            <span className="text-red-500 font-bold animate-pulse">• 120HZ COMPILING</span>
          </div>
        </header>

        {/* --- CENTER MAIN HERO AREA --- */}
        <main className="w-full h-full flex items-center px-10 md:px-14 z-10 relative mt-2">
          
          <div className="w-full max-w-xl space-y-5 relative">
            
            {/* iOS style Archive Tag */}
            <div className="flex items-center gap-1.5 text-red-500 text-[10px] font-sans tracking-[0.2em] font-bold">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_#dc2626]" />
              TRIPLE-A CINEMATIC GAME COMPANION
            </div>

            {/* Giant Apple Event Cinematic Titles - Styled with Classic Cinzel Premium Serif */}
            <div className="space-y-2 select-none font-serif">
              <h1 className="text-4xl sm:text-[4.2rem] text-white uppercase tracking-[0.06em] font-bold leading-none drop-shadow-md">
                <TextScramble text="GHOST OF" duration={1000} />
              </h1>
              <h1 className="text-4xl sm:text-[4.2rem] text-stone-300 uppercase tracking-[0.06em] font-semibold leading-none drop-shadow-md">
                <TextScramble text="TSUSHIMA" duration={1200} />
              </h1>
            </div>

            {/* Explanatory subtitle */}
            <p className="text-stone-300/95 font-sans text-xs sm:text-[13px] tracking-wide font-normal leading-relaxed max-w-md select-text drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Experience the breath-taking open world of late 13th-century Japan. Follow Jin Sakai as he faces the ruthless invasion led by Khotun Khan—descendant of Genghis Khan—playable on PlayStation 4, PlayStation 5, and PC.
            </p>

            {/* Action buttons & HUD scan result */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
              <button
                id="cta-discover-btn"
                onClick={handleDiscoverScan}
                className="h-11 px-8 rounded-full bg-white text-black hover:bg-white/90 transition-all duration-300 font-sans text-xs tracking-wider font-semibold uppercase inline-flex items-center justify-center cursor-pointer shadow-lg active:scale-95 animate-pulse"
              >
                Discover
              </button>              {/* Interactive scanning feedback box */}
              {scanResult && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-2 px-4 border border-red-500/20 bg-red-950/20 backdrop-blur-md rounded-full text-[10px] font-mono tracking-wide flex items-center gap-2 shadow-sm text-red-400"
                >
                  <Target className="w-3.5 h-3.5 animate-pulse text-red-500" />
                  <span>PLAYSTATION 5 & PC LORE SYNCHRONIZATION: COMPLETE</span>
                </motion.div>
              )}
            </div>
          </div>
        </main>

        {/* --- BOTTOM SECTION PANEL --- */}
        <footer className="w-full z-30 flex justify-between items-end px-10 pb-8 relative">
          
          {/* Social media interaction column icons */}
          <motion.div 
            variants={footerStaggerVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-6 z-20"
          >
            {[
              { id: 'fb', icon: Facebook, name: '@GHOST_OF_TSUSHIMA_OFFICIAL', url: '#' },
              { id: 'ig', icon: Instagram, name: '@PLAYSTATION_TSUSHIMA', url: '#' },
              { id: 'tw', icon: Twitter, name: '@SUCKERPUNCHPROD', url: '#' },
              { id: 'yt', icon: Youtube, name: '@PLAYSTATION', url: '#' },
            ].map((social) => {
              const Icon = social.icon;
              return (
                <motion.div 
                  variants={footerItemVariants} 
                  key={social.id} 
                  className="relative"
                >
                  {/* Tooltip text showing social handle */}
                  <AnimatePresence>
                    {hoveredSocial === social.id && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: -28, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute left-1/2 -translate-x-1/2 bg-neutral-950 border border-neutral-800 text-stone-400 px-2.5 py-1 rounded text-[9px] font-mono tracking-wider whitespace-nowrap shadow-xl"
                      >
                        {social.name}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <a
                    id={`social-${social.id}`}
                    href={social.url}
                    onMouseEnter={() => {
                      sfx.playGlitch();
                      setHoveredSocial(social.id);
                    }}
                    onMouseLeave={() => setHoveredSocial(null)}
                    onClick={(e) => {
                      e.preventDefault();
                      sfx.playConfirm();
                      // Seamless direct connect simulated on diagnostic logger
                      setScannerStatus(`CONNECTED SECURE TUNNEL TO ${social.name}`);
                      setScannerActive(true);
                      setTimeout(() => setScannerActive(false), 1200);
                    }}
                    className="text-stone-400 hover:text-white transition-colors p-2.5 inline-block border border-transparent hover:border-white/10 hover:bg-white/5 rounded-full cursor-pointer"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Mouse / Scroll Status layout - iOS styled */}
          <div className="hidden lg:flex flex-col items-center gap-2 select-none">
            <motion.div 
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-5 h-8 border border-white/20 hover:border-red-500/50 rounded-full flex justify-center pt-1.5 transition-colors cursor-pointer"
              onClick={() => {
                sfx.playClick();
                handleNextProfile();
              }}
              title="Click mouse scroll indicator to switch core"
            >
              <span className="w-1 h-2 bg-stone-400 rounded-full animate-pulse" />
            </motion.div>
            <span className="text-[8px] font-sans text-stone-500 tracking-[0.2em] font-bold uppercase">CYCLE CHARACTERS</span>
          </div>

          {/* Bottom Right Glassmorphic Lore Card widget - iOS Frosted Card */}
          <div className="w-full max-w-md rounded-2xl bg-neutral-900/65 border border-white/10 p-4 select-none text-xs flex gap-4 shadow-2xl relative overflow-hidden backdrop-blur-xl">
            
            {/* Left side: Classy iOS profile thumbnail showing requested image */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-white/10 bg-black/60 flex-shrink-0 relative flex flex-col items-center justify-center shadow-inner">
              <img 
                src={activeProfile.image} 
                alt={activeProfile.title} 
                className="absolute inset-0 w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/15 z-10 pointer-events-none" />
              
              {/* Animated Scope Grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.04)_1px,transparent_1px)] bg-[size:6px_6px] pointer-events-none z-10" />
              
              {/* Glowing radar sweep bar moving up and down */}
              <motion.div 
                animate={{ y: [-15, 65, -15] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                className="absolute left-0 right-0 h-[1.5px] bg-red-600/40 blur-[0.5px] z-10"
              />
            </div>

            {/* Right side: Information & Actions */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-sans text-[11px] font-extrabold tracking-wider text-white">
                    {activeProfile.title}
                  </h4>
                  {/* Small core rotating trigger */}
                  <button 
                    id="rotate-core-widget"
                    onClick={handleNextProfile}
                    className="text-stone-400 hover:text-red-500 transition-all p-0.5 cursor-pointer hover:rotate-90 duration-300"
                    title="Load next core profile"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-stone-400 text-[10px] leading-relaxed line-clamp-2 pr-1 select-text font-normal">
                  {activeProfile.description}
                </p>
              </div>

              {/* Bottom Row Actions matching the "Read More" link from the reference image */}
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
                <button
                  id="card-read-more"
                  onClick={() => {
                    sfx.playConfirm();
                    setIsDiagnosticsOpen(true);
                  }}
                  className="text-stone-300 hover:text-red-500 font-sans text-[9px] tracking-wider uppercase font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  Read More
                </button>
                
                {/* Core Cycle Indicator Dot-capsules */}
                <div className="flex gap-1.5">
                  {SAMURAI_PROFILES.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        sfx.playSwoosh();
                        setProfileIndex(idx);
                      }}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        idx === profileIndex ? 'w-4 bg-red-600' : 'w-1.5 bg-white/10 hover:bg-white/30'
                      }`}
                      title={`Switch to core ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </footer >

      </div > {/* Close #cinema-container */}
    </div > {/* Close Cinema Wrapper */}

    {/* --- SECTION 2: ABOUT THE GHOST (ABOUT US) --- */}
    <section 
      id="about-section" 
      className="w-full mt-0 relative scroll-mt-24 group/about px-0"
    >
      <div className="relative rounded-none border-b border-white/5 bg-neutral-950 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)] lg:aspect-video flex flex-col justify-center p-8 sm:p-12 md:p-16 lg:p-24 xl:px-32 w-full h-full">
      {/* Real-time samurai moving particles action background video with maximum intensity and brightness */}
      <IntersectionVideo
        src="https://res.cloudinary.com/dxxjtyvmk/video/upload/v1779968735/Animation_particles_samurai_moving_202605281546_zm84gt.mp4"
        className="absolute inset-0 w-full h-full object-cover object-center brightness-[1.65] contrast-[1.4] saturate-[1.5] opacity-100 select-none pointer-events-none transition-transform duration-[1.5s] scale-[1.15] origin-center group-hover/about:scale-[1.18]"
      />
      
      {/* Soft Vignettes allowing maximum video detail & glow while raising bottom and top edge opacity to 100% neutral-950 to avoid any sharp lines */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/2 to-neutral-950 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/70 via-transparent to-neutral-950/70 z-10 pointer-events-none" />
      
      {/* Animated Scope Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.025)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none z-10" />

      {/* Actual Glassmorphic Content overlaying the BGM video with smooth scroll animations */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-20 w-full h-full flex flex-col justify-center gap-6 lg:gap-8"
      >
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
          
          {/* Left Side: Detailed Narrative and Path title */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-7 space-y-5"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-red-500 font-mono text-[10px] font-bold tracking-[0.25em] uppercase bg-black/85 px-3 py-1.5 border border-white/10 rounded-full backdrop-blur-md">
                <span className="w-1.5 h-1.5 bg-red-650 rounded-full animate-ping" />
                SACRED PATH // MONGOL INVASION WAR CHRONOLOGY
              </div>
              <h2 className="font-serif text-white text-3xl sm:text-4xl md:text-5xl tracking-wide font-black uppercase leading-[1.1]">
                WE WEAVE LEGEND <br />
                <span className="text-red-500 font-extrabold tracking-normal">WITH SWIFT RESOLUTE STEEL</span>
              </h2>
            </div>

            <p className="text-stone-100 font-sans text-xs sm:text-[13px] tracking-wide font-normal leading-relaxed max-w-xl bg-black/85 p-5 rounded-2xl border border-white/10 backdrop-blur-xl select-text shadow-lg">
              Experience the legendary battle of Tsushima. When the ruthless Mongol Empire led by Khotun Khan (grandson of Genghis Khan) launches a devastating invasion in 1274, Jin Sakai stands as the island's final hope. By casting aside the rigid samurai code, Jin transforms into the fearsome \"Ghost\"—waging a shadows-and-steel guerrilla war playable in spectacular fidelity on PlayStation 4, PlayStation 5, and PC.
            </p>

            {/* Left-aligned aesthetic indicators */}
            <div className="flex flex-wrap gap-2.5">
              <span className="inline-block text-[9px] font-mono text-stone-300 tracking-widest uppercase bg-black/90 border border-white/15 px-3.5 py-2 rounded-full backdrop-blur-md font-semibold shadow-sm">
                PLATFORMS: PS5 • PC • DECK
              </span>
              <span className="inline-block text-[9px] font-mono text-red-300 tracking-widest uppercase bg-gradient-to-r from-red-950/90 to-red-900/90 border border-red-500/30 px-3.5 py-2 rounded-full backdrop-blur-md font-semibold shadow-sm">
                THE WAY OF THE GHOST
              </span>
            </div>
          </motion.div>

          {/* Right Side: Floating Statistics Grid and Sub-narratives in Glassmorphic Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 space-y-6"
          >
            
            {/* Stats widgets - high contrast opaque overlays */}
            <div className="grid grid-cols-3 gap-3">
              
              <div className="bg-black/85 border border-white/15 p-4 rounded-2xl relative overflow-hidden group/stat hover:border-red-500/40 transition-all duration-300 backdrop-blur-xl text-center shadow-lg">
                <span className="text-stone-400 block text-[9px] font-bold uppercase font-serif tracking-wider">HONOR VS GHOST</span>
                <span className="text-xl sm:text-2xl font-serif font-black text-white block mt-1 tracking-tight group-hover/stat:text-red-500 transition-colors flex justify-center items-center">SHADOW</span>
                <span className="text-stone-300 text-[9px] block font-sans mt-0.5 font-medium">Jin Sakai Playstyle</span>
              </div>

              <div className="bg-black/85 border border-white/15 p-4 rounded-2xl relative overflow-hidden group/stat hover:border-red-500/40 transition-all duration-300 backdrop-blur-xl text-center shadow-lg">
                <span className="text-stone-400 block text-[9px] font-bold uppercase font-serif tracking-wider">STANCING SKILLS</span>
                <span className="text-xl sm:text-2xl font-serif font-black text-red-500 block mt-1 tracking-tight font-extrabold text-glow flex justify-center items-center">5 STANCES</span>
                <span className="text-stone-300 text-[9px] block font-sans mt-0.5 font-medium">Dynamic Battle Swaps</span>
              </div>

              <div className="bg-black/85 border border-white/15 p-4 rounded-2xl relative overflow-hidden group/stat hover:border-red-500/40 transition-all duration-300 backdrop-blur-xl text-center shadow-lg">
                <span className="text-stone-400 block text-[9px] font-bold uppercase font-serif tracking-wider">LIBERATIONS</span>
                <span className="text-xl sm:text-2xl font-serif font-black text-white block mt-1 tracking-tight group-hover/stat:text-red-500 transition-colors flex justify-center items-center">120+ CAMPS</span>
                <span className="text-stone-300 text-[9px] block font-sans mt-0.5 font-medium">Savage Mongol Hordes</span>
              </div>

            </div>

            {/* Sub-narratives columns - highly opaque frosted cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-4 sm:p-5 border border-white/15 bg-black/85 rounded-2xl transition-all duration-300 relative group/card backdrop-blur-xl shadow-lg hover:border-red-500/30">
                <div className="absolute top-0 left-0 w-[2px] h-0 bg-red-650 transition-all duration-500 group-hover/card:h-full" />
                <h4 className="font-serif text-white font-bold text-xs uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                  Guiding Wind
                </h4>
                <p className="text-stone-300 text-[10.5px] leading-relaxed font-normal">
                  Beautiful wind streams, golden songbirds, and foxes guide you smoothly through white fields.
                </p>
              </div>

              <div className="p-4 sm:p-5 border border-white/15 bg-black/85 rounded-2xl transition-all duration-300 relative group/card backdrop-blur-xl shadow-lg hover:border-red-500/30">
                <div className="absolute top-0 left-0 w-[2px] h-0 bg-red-650 transition-all duration-500 group-hover/card:h-full" />
                <h4 className="font-serif text-white font-bold text-xs uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                  Stance Switches
                </h4>
                <p className="text-stone-300 text-[10.5px] leading-relaxed font-normal">
                  Strike down shields, spearmen, and heavy Mongol brutes using Stone, Water, Wind, Moon, and Ghost.
                </p>
              </div>

            </div>

          </motion.div>

        </div>

      </motion.div>
      </div>
    </section>

    {/* --- SECTION 3: SACRED SCROLLS (ARTICLES CHRONOLOGY) --- */}
    <SacredScrollsChronicles
      setIsLogsOpen={setIsLogsOpen}
      setIsDiagnosticsOpen={setIsDiagnosticsOpen}
      setIsSearchOpen={setIsSearchOpen}
    />

    {/* --- SECTION 4: SEALED MESSAGE REQUISITION (CONTACT FORM) --- */}
    <section 
      id="contact-section" 
      className="w-full mt-0 py-24 px-6 md:px-12 bg-neutral-950/70 border-b border-white/5 relative z-10 scroll-mt-24"
    >
      <div className="max-w-[1240px] w-full mx-auto">
        <div className="w-full bg-neutral-900/40 border border-white/10 rounded-[32px] p-8 md:p-14 shadow-[0_30px_70px_rgba(0,0,0,0.85)] backdrop-blur-md relative overflow-hidden">
        
        {/* Subtle decorative ink graphic effects */}
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-red-600/5 blur-[80px] rounded-full" />
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-red-600/5 blur-[80px] rounded-full" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Form left descriptors and Interactive Messenger Selection */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-red-500 font-mono text-[10px] font-bold tracking-[0.25em] uppercase">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping" />
                SECURE MESSAGE STACK // DIRECT GATEWAY
              </div>
              
              <h2 className="font-serif text-white text-3xl sm:text-4xl font-extrabold tracking-wide uppercase leading-tight">
                SEND SEALED REQUISITIONS
              </h2>
              
              <p className="text-stone-400 font-sans text-xs sm:text-[12.5px] leading-relaxed font-light">
                Draft your custom writs directly. Select a Character Messenger below to theme and seal your summons, delivering it across Tsushima to <strong className="text-white">itxhasanzai@gmail.com</strong>.
              </p>
            </div>

            {/* Messenger Selector Grid */}
            <div className="space-y-3.5 pt-2">
              <span className="text-[9px] font-mono text-stone-500 uppercase block tracking-widest font-semibold">
                SELECT CHARACTER MESSENGER
              </span>
              
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'ghost', name: 'Jin Sakai', label: 'THE GHOST', activeBg: 'bg-red-950/20 text-red-400 border-red-500/70', inactiveBg: 'bg-black/30 text-stone-400 hover:text-stone-200 border-white/5 hover:border-white/20' },
                  { id: 'shimura', name: 'Lord Shimura', label: 'THE SAMURAI', activeBg: 'bg-amber-950/20 text-amber-400 border-amber-500/70', inactiveBg: 'bg-black/30 text-stone-400 hover:text-stone-200 border-white/5 hover:border-white/20' },
                  { id: 'khan', name: 'Khotun Khan', label: 'THE CONQUEROR', activeBg: 'bg-zinc-900/50 text-white border-zinc-400', inactiveBg: 'bg-black/30 text-stone-400 hover:text-stone-200 border-white/5 hover:border-white/20' }
                ].map((messenger) => {
                  const isCurSel = stampMessenger === messenger.id;
                  return (
                    <button
                      key={messenger.id}
                      id={`messenger-sel-${messenger.id}`}
                      onClick={() => {
                        sfx.playConfirm();
                        setStampMessenger(messenger.id as any);
                      }}
                      className={`p-3 rounded-2xl border text-center transition-all duration-300 cursor-pointer flex flex-col justify-center items-center gap-1.5 select-none relative group/btn ${isCurSel ? messenger.activeBg + ' shadow-[0_4px_20px_rgba(0,0,0,0.5)]' : messenger.inactiveBg}`}
                    >
                      {/* Interactive hover glow */}
                      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                      
                      <span className="font-serif text-[11px] font-black tracking-wide truncate block w-full">{messenger.name}</span>
                      <span className="text-[7.5px] font-mono uppercase tracking-[0.15em] block opacity-80">{messenger.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Messenger Details Widget Card - Dynamically animated with smooth custom trans */}
            <div className="relative overflow-hidden bg-black/45 border border-white/10 rounded-2xl p-4.5 space-y-3 shadow-inner">
              {/* Dynamic Gradient corner */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${
                stampMessenger === 'ghost' ? 'from-red-600/10' : stampMessenger === 'shimura' ? 'from-amber-600/10' : 'from-zinc-500/10'
              } to-transparent blur-xl`} />
              
              <div className="flex items-center gap-2">
                {stampMessenger === 'ghost' ? (
                  <MotionSwords className="w-4 h-4 text-red-500" />
                ) : stampMessenger === 'shimura' ? (
                  <Shield className="w-4 h-4 text-amber-500" />
                ) : (
                  <Target className="w-4 h-4 text-zinc-400" />
                )}
                
                <span className={`text-[9px] font-mono font-bold uppercase tracking-[0.18em] ${
                  stampMessenger === 'ghost' ? 'text-red-500' : stampMessenger === 'shimura' ? 'text-amber-500' : 'text-zinc-400'
                }`}>
                  {stampMessenger === 'ghost' ? 'GHOST INK CREST' : stampMessenger === 'shimura' ? 'SHIMURA JITO DECREE' : 'MONGOL EMPIRE SIGNET'}
                </span>
              </div>

              <blockquote className="italic text-[11px] text-stone-300 border-l border-red-650/40 pl-2.5">
                {stampMessenger === 'ghost' 
                  ? '"I have no honor. But I will not let my people suffer."' 
                  : stampMessenger === 'shimura' 
                    ? '"Honor is not just for yourself... it is what binds society together."' 
                    : '"I am the grandson of Genghis Khan. I do not ask for surrender. I claim it."'
                }
              </blockquote>

              <div className="text-[10px] text-stone-400 font-sans flex items-center gap-1.5 font-light">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span>Delivery route: <strong className="text-stone-300 font-medium">
                  {stampMessenger === 'ghost' && 'Hidden under night shadow forest roads.'}
                  {stampMessenger === 'shimura' && 'Carried in royal gold standard messenger convoy.'}
                  {stampMessenger === 'khan' && 'Charged directly with iron armored Mongol horsemen.'}
                </strong></span>
              </div>
            </div>
          </div>

          {/* Form right inputs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {contactSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 25 }}
                className="p-8 text-center bg-black/50 border border-white/10 rounded-2.5xl space-y-6 shadow-2xl relative overflow-hidden"
              >
                {/* Glow flash on seal submission */}
                <div className={`absolute inset-0 w-full h-full opacity-5 pointer-events-none ${
                  stampMessenger === 'ghost' ? 'bg-red-500' : stampMessenger === 'shimura' ? 'bg-amber-500' : 'bg-zinc-400'
                }`} />

                <div className={`w-18 h-18 mx-auto rounded-full flex items-center justify-center border shadow-xl relative ${
                  stampMessenger === 'ghost' 
                    ? 'bg-red-950/20 border-red-500/30 text-red-500' 
                    : stampMessenger === 'shimura' 
                      ? 'bg-amber-950/20 border-amber-500/30 text-amber-400' 
                      : 'bg-zinc-900 border-zinc-400/30 text-white'
                }`}>
                  {stampMessenger === 'ghost' ? (
                    <MotionSwords className="w-9 h-9 text-red-500" isAnimateBounce={true} />
                  ) : stampMessenger === 'shimura' ? (
                    <Shield className="w-9 h-9 text-amber-500 animate-bounce" />
                  ) : (
                    <Target className="w-9 h-9 text-zinc-300 animate-bounce" />
                  )}
                </div>
                
                <div className="space-y-2.5 max-w-md mx-auto">
                  <h3 className="font-serif text-white text-xl font-bold uppercase tracking-widest">Writ Summons Dispatched</h3>
                  <p className="text-stone-300 text-xs sm:text-[13px] leading-relaxed font-light">
                    {stampMessenger === 'ghost' && 'Your secret scroll has been secured under the Sakai Ghost Crest. Jin Sakai has melted into the Omi village mist to complete your dispatch.'}
                    {stampMessenger === 'shimura' && 'The Shimura royal Jito guard has received your sealed message with gold ribbons. Your petition travels safely and honorably.'}
                    {stampMessenger === 'khan' && 'General Khotun Khan orders his heavy cavalry vanguard to route your dispatch immediately through occupied Tsushima.'}
                  </p>
                  <p className="text-[11px] text-stone-500 font-mono">
                    Notification securely flagged and queued for: itxhasanzai@gmail.com
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      sfx.playConfirm();
                      setContactSubmitted(false);
                    }}
                    className="px-7 py-3 rounded-full border border-white/10 hover:border-white/20 text-stone-300 hover:text-white text-[10px] font-serif font-black tracking-widest uppercase transition-all duration-300 bg-white/5 hover:bg-white/[0.08] cursor-pointer"
                  >
                    SEND ANOTHER DISPATCH WRIT
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                layout
                className="bg-black/45 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-4.5 shadow-2xl relative"
              >
                {/* Decorative background watermarks / visual characters */}
                <div className="absolute top-4 right-4 text-[9px] font-mono tracking-widest text-stone-600/60 uppercase">
                  ACTIVE SEAL: {stampMessenger}
                </div>

                <div>
                  <label className="text-stone-400 uppercase block text-[8.5px] font-bold mb-1.5 tracking-widest font-mono">
                    YOUR NAME / SAMURAI CLAN
                  </label>
                  <input 
                    id="contact-sender-name-inline"
                    type="text" 
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder={
                      stampMessenger === 'ghost' 
                        ? 'e.g. Jin Sakai of Omi Village' 
                        : stampMessenger === 'shimura' 
                          ? 'e.g. Lord Shimura, Jito of Tsushima' 
                          : 'e.g. General Khotun of the Mongolian Hordes'
                    }
                    className={`w-full bg-neutral-950/70 border border-white/10 rounded-2xl py-3 px-4 text-white placeholder-stone-600 focus:outline-none focus:ring-1 transition-all font-sans text-xs ${
                      stampMessenger === 'ghost' 
                        ? 'focus:border-red-600 focus:ring-red-650/40' 
                        : stampMessenger === 'shimura' 
                          ? 'focus:border-amber-500 focus:ring-amber-500/40' 
                          : 'focus:border-zinc-400 focus:ring-zinc-400/40'
                    }`} 
                  />
                </div>

                <div>
                  <label className="text-stone-400 uppercase block text-[8.5px] font-bold mb-1.5 tracking-widest font-mono">
                    SECURE REQUISITION MESSAGE
                  </label>
                  <textarea 
                    id="contact-message-inline"
                    rows={4} 
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder={
                      stampMessenger === 'ghost' 
                        ? 'Deliver this message in shadow using complete secrecy...' 
                        : stampMessenger === 'shimura' 
                          ? 'Submit your honorable query for official samurai review...' 
                          : 'Command absolute attention. Declare your conditions directly...'
                    }
                    className={`w-full bg-neutral-950/70 border border-white/10 rounded-2xl py-3 px-4 text-white placeholder-stone-600 focus:outline-none focus:ring-1 transition-all resize-none font-sans text-xs ${
                      stampMessenger === 'ghost' 
                        ? 'focus:border-red-600 focus:ring-red-650/40' 
                        : stampMessenger === 'shimura' 
                          ? 'focus:border-amber-500 focus:ring-amber-500/40' 
                          : 'focus:border-zinc-400 focus:ring-zinc-400/40'
                    }`}
                  />
                </div>

                <div className="pt-2">
                  <button 
                    id="contact-send-btn-inline"
                    disabled={!contactMessage.trim()}
                    onClick={() => {
                      if (contactMessage.trim()) {
                        sfx.playConfirm();
                        setContactSubmitted(true);
                        setContactName('');
                        setContactMessage('');
                      }
                    }} 
                    className={`w-full text-stone-100 font-serif font-black tracking-[0.2em] py-3.5 rounded-full uppercase transition-all duration-350 text-[10.5px] cursor-pointer shadow-lg active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
                      stampMessenger === 'ghost' 
                        ? 'bg-red-700 hover:bg-red-600 shadow-red-950/40 hover:shadow-red-600/20' 
                        : stampMessenger === 'shimura' 
                          ? 'bg-amber-600 hover:bg-amber-500 text-neutral-950 font-bold shadow-amber-950/40 hover:shadow-amber-500/20' 
                          : 'bg-zinc-700 hover:bg-zinc-600 shadow-zinc-950/40 hover:shadow-zinc-500/20'
                    }`}
                  >
                    {stampMessenger === 'ghost' && 'DISPATCH SUMMONS VIA GHOST SHADOW'}
                    {stampMessenger === 'shimura' && 'DELIVER SOLEMN WRIT WITH SAMURAI HONOR'}
                    {stampMessenger === 'khan' && 'FORCE DISPATCH BY MONGOL COMMAND'}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

        </div>

      </div>

      </div>
    </section>

      {/* --- FLOATING DECRYPTION PANELS & MODALS --- */}

      {/* Profile Neural Diagnostics Overlay */}
      <DiagnosticsHUD 
        isOpen={isDiagnosticsOpen}
        onClose={() => setIsDiagnosticsOpen(false)}
        activeProfile={activeProfile}
      />

      {/* Fuzzy Archive Search Index */}
      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        profiles={SAMURAI_PROFILES}
        onSelectProfile={(p) => {
          // Find index matching select
          const foundIdx = SAMURAI_PROFILES.findIndex(item => item.id === p.id);
          if (foundIdx !== -1) {
            setProfileIndex(foundIdx);
          }
        }}
      />

      {/* Chronological terminal logs drawer */}
      <LogsDrawer 
        isOpen={isLogsOpen}
        onClose={() => setIsLogsOpen(false)}
        logs={CLASSIFIED_LOGS}
      />

      {/* Common Section Overlays (About, Articles, Contact) */}
      <CommonSectionOverlay 
        isOpen={activeCommonOverlay !== null}
        onClose={() => setActiveCommonOverlay(null)}
        title={activeCommonOverlay || ''}
        type={activeCommonOverlay || 'about'}
      />

    </div >
  );
}
