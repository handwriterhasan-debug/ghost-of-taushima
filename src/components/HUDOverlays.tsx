/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Terminal, Cpu, Shield, Activity, Volume2, Database } from 'lucide-react';
import { MotionSwords } from './MotionSwords';
import { sfx } from '../utils/audio';
import { SamuraiLore } from '../types';

interface DiagnosticsProps {
  isOpen: boolean;
  onClose: () => void;
  activeProfile: SamuraiLore;
}

export function DiagnosticsHUD({ isOpen, onClose, activeProfile }: DiagnosticsProps) {
  React.useEffect(() => {
    if (isOpen) {
      sfx.playConfirm();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="diagnostics-modal" className="absolute inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="w-full max-w-md border border-white/10 bg-zinc-900/90 backdrop-blur-2xl p-6 rounded-3xl relative overflow-hidden font-sans text-xs text-stone-300 shadow-2xl"
          >
            {/* Top scanning animation line - Apple Blue */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-red-650 shadow-[0_0_8px_#dc2626]" />
            
            <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="text-red-500 w-4 h-4" />
                <span className="text-white font-bold tracking-wide text-xs">Character Stats & Gameplay Diagnostics</span>
              </div>
              <button 
                id="close-diagnostics-btn"
                onClick={() => {
                  sfx.playClick();
                  onClose();
                }}
                className="text-stone-400 hover:text-white p-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 font-sans">
              {/* Dynamic character portrait banner */}
              <div className="h-44 w-full rounded-2xl overflow-hidden relative border border-white/5 bg-black/60 shadow-inner">
                <img 
                  src={activeProfile.image} 
                  alt={activeProfile.title} 
                  className="w-full h-full object-cover object-center" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/20 to-transparent z-10" />
                <div className="absolute bottom-3 left-3.5 z-20">
                  <span className="text-[9px] font-mono tracking-[0.2em] text-red-500 uppercase block font-black">PORTRAIT INDEX</span>
                  <h3 className="font-serif text-stone-100 text-[15px] font-black uppercase tracking-wider">{activeProfile.title}</h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="border border-white/5 bg-white/[0.03] p-3 rounded-2xl">
                  <span className="text-stone-500 block text-[9px] font-bold uppercase tracking-wider">CODENAME</span>
                  <span className="font-semibold text-white tracking-wide text-xs">{activeProfile.codename}</span>
                </div>
                <div className="border border-white/5 bg-white/[0.03] p-3 rounded-2xl">
                  <span className="text-stone-500 block text-[9px] font-bold uppercase tracking-wider">STATUS STATE</span>
                  <span className="font-semibold text-red-500 tracking-wide flex items-center gap-1.5 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_6px_#dc2626]" />
                    {activeProfile.status}
                  </span>
                </div>
              </div>

              <div className="border border-white/5 bg-white/[0.03] p-3 rounded-2xl space-y-2">
                <span className="text-stone-500 block text-[9px] font-bold uppercase tracking-wider">CHARACTER IN-GAME SYNC STATUS</span>
                <div className="flex justify-between items-center text-[11px] font-medium text-stone-300">
                  <span>GAMEPLAY LORE INTEGRATION</span>
                  <span className="text-red-500 font-bold">{activeProfile.specs.neuralSync}</span>
                </div>
                <div className="w-full bg-black/35 h-2 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: '0%' }}
                    animate={{ width: activeProfile.specs.neuralSync }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="bg-red-600 h-full rounded-full shadow-[0_0_8px_#dc2626]"
                  />
                </div>
              </div>

              <div className="border border-white/5 bg-white/[0.03]/40 p-3 rounded-2xl space-y-2">
                <span className="text-stone-400 block text-[9px] font-bold uppercase tracking-wider mb-1">KEY GAMEPLAY DETAILS</span>
                <div className="space-y-1.5 text-[11px] font-medium text-stone-300">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-stone-400" /> ARMOR STABILIZATION</span>
                    <span className="text-red-500 font-semibold select-none">100% OK</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1.5"><MotionSwords className="w-3.5 h-3.5 text-stone-400" /> WEAPONRY PRESETS</span>
                    <span className="text-red-500 font-semibold select-none">READY</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-stone-400" /> PLATFORMS & MODES</span>
                    <span className="text-red-500 font-semibold select-all font-mono">{activeProfile.specs.coreFreq}</span>
                  </div>
                </div>
              </div>

              <div className="text-[9px] text-stone-500 font-mono tracking-wide pt-2 border-t border-white/5 flex justify-between">
                <span>PLATFORMS: PS5 • PC • DECK</span>
                <span>SECURE TRIPLE-A FAN PORTAL</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: SamuraiLore[];
  onSelectProfile: (profile: SamuraiLore) => void;
}

export function SearchOverlay({ isOpen, onClose, profiles, onSelectProfile }: SearchProps) {
  const [query, setQuery] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      sfx.playConfirm();
    }
  }, [isOpen]);

  const filtered = profiles.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.codename.toLowerCase().includes(query.toLowerCase()) ||
    p.clan.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="search-modal" className="absolute inset-0 z-50 flex items-start justify-center bg-black/75 p-4 sm:p-12 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            className="w-full max-w-lg bg-zinc-900/95 border border-white/10 rounded-3xl p-6 font-sans text-xs text-stone-300 shadow-2xl backdrop-blur-3xl"
          >
            <div className="flex justify-between items-center mb-5">
              <span className="text-red-500 font-bold flex items-center gap-2 text-sm"><Search className="w-4 h-4" /> Search Index</span>
              <button 
                id="close-search-btn"
                onClick={() => {
                  sfx.playClick();
                  onClose();
                }}
                className="text-stone-400 hover:text-white border border-white/10 hover:bg-white/5 px-3 py-1 rounded-full transition-all cursor-pointer font-sans"
              >
                Cancel
              </button>
            </div>

            <div className="relative mb-5">
              <input
                id="search-input"
                type="text"
                placeholder="Search profiles or clans..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  sfx.playGlitch();
                }}
                className="w-full bg-black/45 border border-white/10 rounded-2xl py-2.5 pl-10 pr-4 text-white placeholder-stone-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors font-sans text-sm"
                autoFocus
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
            </div>

            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              <div className="text-stone-500 uppercase text-[9px] font-bold tracking-wider mb-2">RESULTS ({filtered.length})</div>
              {filtered.length > 0 ? (
                filtered.map((profile) => (
                  <button
                    id={`search-item-${profile.id}`}
                    key={profile.id}
                    onClick={() => {
                      sfx.playConfirm();
                      onSelectProfile(profile);
                      onClose();
                    }}
                    className="w-full flex justify-between items-center text-left p-3 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all cursor-pointer group"
                  >
                    <div>
                      <span className="font-bold text-white group-hover:text-red-500 block text-xs">{profile.title}</span>
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider font-mono font-medium">{profile.codename} // {profile.clan}</span>
                    </div>
                    <div className="text-right font-sans">
                      <span className="text-stone-300 block font-bold text-[10px]">{profile.specs.combatRating}</span>
                      <span className="text-red-500 block text-[10px] font-bold">{profile.specs.neuralSync} Sync</span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-6 text-stone-500 font-sans">
                  No matching secure records found.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  logs: Array<{ time: string; event: string }>;
}

export function LogsDrawer({ isOpen, onClose, logs }: DrawerProps) {
  React.useEffect(() => {
    if (isOpen) {
      sfx.playConfirm();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            id="logs-drawer-backdrop"
            onClick={() => {
              sfx.playClick();
              onClose();
            }} 
            className="absolute inset-0 bg-black/60 z-40 backdrop-blur-xs cursor-pointer"
          />
          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 24, stiffness: 140 }}
            className="absolute top-0 right-0 bottom-0 w-80 max-w-full bg-zinc-950/95 border-l border-white/10 z-50 p-6 font-sans text-xs flex flex-col backdrop-blur-3xl"
          >
            <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
              <span className="text-red-500 font-bold flex items-center gap-2 text-sm"><Terminal className="w-4 h-4" /> System Logs</span>
              <button 
                id="close-logs-btn"
                onClick={() => {
                  sfx.playClick();
                  onClose();
                }}
                className="text-stone-400 hover:text-white border border-white/10 px-2 py-1 rounded-full transition-all cursor-pointer bg-white/5 hover:bg-white/10"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Core specs widgets */}
            <div className="mb-6 space-y-3 font-sans">
              <div className="border border-white/5 bg-white/[0.02] p-3 rounded-2xl">
                <div className="flex items-center justify-between text-[11px] mb-1 font-medium">
                  <span className="text-stone-500 tracking-wide">CPU WORKLOAD</span>
                  <span className="text-stone-300 font-bold">12.4%</span>
                </div>
                <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-red-600 h-full w-[12.4%]" />
                </div>
              </div>

              <div className="border border-white/5 bg-white/[0.02] p-3 rounded-2xl">
                <div className="flex items-center justify-between text-[11px] mb-1 font-medium">
                  <span className="text-stone-500 tracking-wide">SYSTEM OVERLINK</span>
                  <span className="text-red-500 font-bold select-none">CONNECTED</span>
                </div>
                <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full w-[88%] animate-pulse" />
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1 font-sans">
              <span className="text-stone-500 text-[9px] font-bold block uppercase tracking-wider">CHRONOLOGICAL AUDIT</span>
              {logs.map((log, index) => (
                <div key={index} className="border-l-2 border-red-500/40 pl-3 py-1 space-y-1 bg-white/[0.01] rounded-r-lg">
                  <div className="text-[10px] text-stone-500 font-mono font-bold flex items-center gap-1.5">
                    <Database className="w-3 h-3 text-red-500/60" /> [{log.time}]
                  </div>
                  <p className="text-stone-300 leading-relaxed text-[10.5px] font-normal">{log.event}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-white/5 pt-4 text-stone-500 text-[9px] text-center select-none font-mono">
              SYSTEM CONSOLE LOG SHELL V1.0.4 - SECURE
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface CommonOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: 'about' | 'articles' | 'contact';
}

export function CommonSectionOverlay({ isOpen, onClose, title, type }: CommonOverlayProps) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      sfx.playConfirm();
      setIsSubmitted(false);
      setName('');
      setMessage('');
    }
  }, [isOpen]);

  const renderContent = () => {
    switch (type) {
      case 'about':
        return (
          <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2 scrollbar-thin text-stone-300 font-sans tracking-wide leading-relaxed text-[12.5px] font-normal">
            <div className="space-y-1 pb-3 border-b border-white/5">
              <span className="text-red-500 font-bold uppercase text-[9px] tracking-widest font-mono">GAME MANUAL // DEEP LORE</span>
              <h2 className="font-serif text-white font-bold text-lg tracking-wider">WHAT IS GHOST OF TSUSHIMA?</h2>
            </div>
            
            <p className="leading-relaxed">
              <span className="text-white font-semibold">Ghost of Tsushima</span> is an open-world samurai action game developed by Sucker Punch Productions and published by Sony Interactive Entertainment. Originally launched on July 17, 2020, it has gained universal praise for its cinematic combat, Japanese landscapes, emotional storyline, and stunning art direction.
            </p>

            <div className="border-l-2 border-red-650 pl-3 bg-red-950/20 py-1.5 rounded-r-lg my-3">
              <p className="text-stone-300 italic text-[11px] leading-relaxed">
                "Traditional samurai honor demands facing enemies head-on. But when darkness threatens to swallow Tsushima, a new warrior must arise in the shadows."
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-red-500 text-[11px] font-bold uppercase tracking-wider">The Story: Honor vs Survival</h3>
              <p className="leading-relaxed">
                Set in 1274 Japan during the first Mongol invasion of Tsushima Island, players assume the role of <strong className="text-white">Jin Sakai</strong>. After Mongol forces led by the ruthless <strong className="text-white">Khotun Khan</strong> completely defeat the direct samurai defense, Jin barely survives and Jito <strong className="text-white">Lord Shimura</strong> is captured.
              </p>
              <p className="leading-relaxed">
                Jin realizes that rigid honor is suicide against the enemy, and begins utilizing stealth, assassinations, fear tactics, and poisons — forging the identity of <strong className="text-white">The Ghost</strong>, which creates an intense emotional conflict between legacy and survival.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-white/5">
              <h3 className="font-serif text-red-500 text-[11px] font-bold uppercase tracking-wider">Is it Historically Accurate?</h3>
              <div className="space-y-1 text-[11.5px]">
                <p><span className="text-green-500 font-bold">✓ Accurate:</span> The Mongol invasion of Tsushima actually occurred in 1274, bringing tragic devastation. The game's landscapes, weapon steel inspirations, and traditional architecture reflect real history.</p>
                <p><span className="text-red-500 font-bold">✗ Animated Fiction:</span> Jin Sakai, Lord Shimura, Yuna, and Khotun Khan are fictional characters. The stealth "Ghost" techniques are fictional, and armor styles from multiple distinct historical eras are merged together for visual cinematography.</p>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-white/5 text-[9.5px] text-stone-500 font-mono text-center flex justify-between items-center">
              <span>LORE VERIFIED // JULY 17, 2020 Release</span>
              <span className="text-red-500 animate-pulse font-bold">• 100% COMPLETE</span>
            </div>
          </div>
        );
      case 'articles':
        return (
          <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2 scrollbar-thin">
            <div className="space-y-1 pb-2 border-b border-white/5 mb-2">
              <span className="text-red-500 font-mono text-[9px] font-bold uppercase tracking-widest">SACRED RECORDS // TSUSHIMA CHRONOLOGY</span>
            </div>
            
            <div className="space-y-3.5">
              <div className="border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] p-4 rounded-2xl transition-all duration-300">
                <span className="text-red-500 text-[10px] font-bold block uppercase tracking-wider font-mono">ARTICLE NO. 01</span>
                <h4 className="font-serif font-bold text-white text-[13.5px] mt-0.5 mb-1.5 tracking-wider">The Sakai Katana: Legacy of Hand-Folded Steel</h4>
                <p className="text-stone-300 font-sans text-[11.5px] font-normal leading-relaxed">
                  Uncover the history and craftsmanship behind Jin Sakai's legacy blade. Forged by master steel-smiths, this sacred family artifact represents both the honor Jin fights to preserve and the lethal fury he unleashes when invoking the spirit of The Ghost.
                </p>
              </div>

              <div className="border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] p-4 rounded-2xl transition-all duration-300">
                <span className="text-red-500 text-[10px] font-bold block uppercase tracking-wider font-mono">ARTICLE NO. 02</span>
                <h4 className="font-serif font-bold text-white text-[13.5px] mt-0.5 mb-1.5 tracking-wider">Masters of Kenjutsu: Harnessing The 5 Lethal Stances</h4>
                <p className="text-stone-300 font-sans text-[11.5px] font-normal leading-relaxed">
                  A high-fidelity analysis of classic Kenjutsu. Master the tactical switches between the Stone Stance for swordsmen, Water Stance for shield wielders, Wind Stance for spearmen, Moon Stance for brutes, and the legendary, fearsome Ghost Stance.
                </p>
              </div>

              <div className="border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] p-4 rounded-2xl transition-all duration-300">
                <span className="text-red-500 text-[10px] font-bold block uppercase tracking-wider font-mono">ARTICLE NO. 03</span>
                <h4 className="font-serif font-bold text-white text-[13.5px] mt-0.5 mb-1.5 tracking-wider">The Guiding Wind & Monochrome Cinematic Directing</h4>
                <p className="text-stone-300 font-sans text-[11.5px] font-normal leading-relaxed">
                  Inside the artistic direction that eliminated standard mini-maps. Discover how the environment acts as your compass—guiding wind patterns, calling foxes, golden song birds, and the iconic "Kurosawa Mode" filter honoring classical samurai cinema.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 text-[9.5px] text-stone-500 font-mono text-center flex justify-between items-center">
              <span>SERIF FONTS REGISTERED</span>
              <span className="text-red-500 font-bold">PLAYSTATION & PC COMPATIBLE</span>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center space-y-4 font-sans select-none"
              >
                <div className="w-14 h-14 bg-red-650/10 border border-red-500/25 rounded-full flex items-center justify-center mx-auto text-red-500 shadow-[0_0_12px_rgba(239,68,68,0.25)]">
                  <MotionSwords className="w-7 h-7 text-red-500" />
                </div>
                
                <div className="space-y-2 px-2">
                  <h3 className="font-serif text-white font-bold text-base uppercase tracking-widest leading-tight">SUMMONS DISPATCHED</h3>
                  <p className="text-stone-300 text-[11.5px] leading-relaxed max-w-sm mx-auto">
                    "Your sacred writs have been carried by the Guiding Wind of Tsushima. The Ronin has received your call and will reply through the encrypted channels at <strong className="text-red-500">itxhasanzai@gmail.com</strong>."
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    id="contact-reset-btn"
                    onClick={() => {
                      sfx.playConfirm();
                      setIsSubmitted(false);
                    }}
                    className="px-5 py-2 rounded-full border border-white/10 hover:border-red-500/30 text-stone-400 hover:text-white transition-all text-[9.5px] uppercase font-bold bg-white/[0.02] cursor-pointer"
                  >
                    Send Another Writs
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-3 font-sans text-xs">
                <div className="text-center pb-2 border-b border-white/5 mb-1.5">
                  <p className="text-red-500 font-bold font-mono text-[9px] uppercase tracking-widest">SECURE LINK STATION</p>
                  <h3 className="font-serif font-bold text-white text-sm uppercase tracking-widest mt-0.5">SEND SEALED SUMMONS</h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-stone-500 uppercase block text-[8.5px] font-bold mb-1 tracking-wider font-mono">RECIPIENT CHANNEL</label>
                    <input 
                       id="contact-email"
                       type="email" 
                       value="itxhasanzai@gmail.com" 
                       readOnly 
                       className="w-full bg-black/45 border border-white/10 rounded-2xl py-2.5 px-3.5 text-stone-300 focus:outline-none font-mono text-[10.5px] select-all cursor-default" 
                    />
                  </div>

                  <div>
                    <label className="text-stone-500 uppercase block text-[8.5px] font-bold mb-1 tracking-wider font-mono">YOUR NAME / SAMURAI CLAN</label>
                    <input 
                      id="contact-sender-name"
                      type="text" 
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      placeholder="e.g. Jin Sakai of Omi Village"
                      className="w-full bg-black/45 border border-white/10 rounded-2xl py-2.5 px-3.5 text-white placeholder-stone-600 focus:outline-none focus:border-red-600/85 focus:ring-1 focus:ring-red-600 transition-colors font-sans text-[11px]" 
                    />
                  </div>

                  <div>
                    <label className="text-stone-500 uppercase block text-[8.5px] font-bold mb-1 tracking-wider font-mono">SECURE SEAL REQUISITION WRIT</label>
                    <textarea 
                      id="contact-message"
                      rows={3} 
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                      placeholder="Enter sealed message description..." 
                      className="w-full bg-black/45 border border-white/10 rounded-2xl py-2.5 px-3.5 text-white placeholder-stone-600 focus:outline-none focus:border-red-600/85 focus:ring-1 focus:ring-red-600 transition-colors resize-none font-sans text-[11px]"
                    />
                  </div>

                  <button 
                    id="contact-send-btn"
                    disabled={!message.trim()}
                    onClick={() => {
                      if (message.trim()) {
                        sfx.playConfirm();
                        setIsSubmitted(true);
                      }
                    }} 
                    className="w-full bg-red-700 hover:bg-red-600 hover:shadow-[0_0_12px_rgba(220,38,38,0.4)] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold tracking-wider py-2.5 rounded-full uppercase transition-all duration-300 text-[10px] cursor-pointer shadow-md check-pulse active:scale-95"
                  >
                    DISPATCH WRITS TO SHOGUNATE
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id={`overlay-${type}`} className="absolute inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="w-full max-w-md bg-zinc-900/95 border border-white/10 rounded-3xl p-6 relative shadow-2xl backdrop-blur-3xl"
          >
            <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
              <span className="text-red-500 font-bold uppercase tracking-widest font-serif text-xs flex items-center gap-1.5 select-none">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_6px_#dc2626]" />
                {title} INDEX
              </span>
              <button 
                id={`close-overlay-${type}`}
                onClick={() => {
                  sfx.playClick();
                  onClose();
                }}
                className="text-stone-400 hover:text-white border border-white/10 px-3 py-1 rounded-full text-[10px] transition-all font-sans cursor-pointer bg-white/5 hover:bg-white/10 uppercase tracking-wider font-semibold"
              >
                Close
              </button>
            </div>

            {renderContent()}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
