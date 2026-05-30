/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SamuraiLore } from '../types';
import jinSakaiImg from '../assets/images/jin_sakai_portrait_1780130092786.png';
import khotunKhanImg from '../assets/images/khotun_khan_portrait_1780130112118.png';
import lordShimuraImg from '../assets/images/lord_shimura_portrait_1780130137355.png';

export const SAMURAI_PROFILES: SamuraiLore[] = [
  {
    id: 'samurai-01',
    title: 'Jin Sakai',
    codename: 'The Ghost of Tsushima',
    clan: 'Clan Sakai & Tsushima Allies',
    relic: 'Sakai Family Katana & Ghost Weapons',
    status: 'STEALTH',
    description: 'A samurai lord raised by his uncle, Lord Shimura. After surviving the tragic defeat at Komoda Beach, Jin realizes traditional samurai honor is not enough against Mongol forces. He turns to stealth, assassinations, and surprise attacks to save his people, turning into "The Ghost."',
    image: jinSakaiImg,
    specs: {
      coreFreq: 'PS4 • PS5 • PC Version Available',
      combatRating: 'Ghost Stance & Poison Darts',
      neuralSync: '100% Calibrated',
    }
  },
  {
    id: 'samurai-02',
    title: 'Khotun Khan',
    codename: 'Cunning General of the Horde',
    clan: 'Mongol Empire Invaders',
    relic: 'Heavy Battle Glaive & Armor',
    status: 'ONLINE',
    description: 'The ruthless leader of the Mongol invasion fleet in 1274 Tsushima. A brilliant and merciless strategist who studies Japanese traditions to systematically crush their military, forcing Jin Sakai to fight from the shadows.',
    image: khotunKhanImg,
    specs: {
      coreFreq: 'Cinematic Boss AI System',
      combatRating: 'Merciless Multi-Range Stances',
      neuralSync: '96.2% Lethality',
    }
  },
  {
    id: 'samurai-03',
    title: 'Lord Shimura',
    codename: 'Jito and Honorable Uncle',
    clan: 'Clan Shimura & Kamakura Shogunate',
    relic: 'Ancestral Shimura Katana',
    status: 'STANDBY',
    description: 'The governor (Jito) of Tsushima who raised Jin like a son. He is deeply devoted to the rigid code of samurai honor—demanding direct combat and facing enemies openly. This creates a tragic conflict of ideals with his nephew.',
    image: lordShimuraImg,
    specs: {
      coreFreq: 'Honorable Traditionalist Guide',
      combatRating: 'Masterful Stone Kenjutsu',
      neuralSync: '92.4% Honor Rating',
    }
  }
];

export const CLASSIFIED_LOGS = [
  { time: '1274-11', event: 'Mongol invasion of Tsushima Island begins. Real historical events inspire Sucker Punch\'s fictional storyline.' },
  { time: '2020-07-17', event: 'Ghost of Tsushima officially releases on PS4 to universal praise—attaining an 83/100 Critic score and an exceptional 9.1/10 User score.' },
  { time: '2021-08-20', event: 'Director\'s Cut launches on PS4 and PS5, adding the rich Iki Island story expansion, dualsense haptics, and fast load times.' },
  { time: '2024-05-16', event: 'Director\'s Cut successfully ports to PC with ultrawide viewport, unlocked frame rates, plus DLSS and FSR enhancements.' },
  { time: '2025-Release', event: 'Ghost of Yōtei (the next major game starring female protagonist Atsu set 300 years later near Mount Yōtei) releases on PS5.' },
];

