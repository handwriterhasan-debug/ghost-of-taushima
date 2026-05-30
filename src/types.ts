/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SamuraiLore {
  id: string;
  title: string;
  codename: string;
  clan: string;
  relic: string;
  status: 'ONLINE' | 'STANDBY' | 'STEALTH' | 'RECON';
  description: string;
  image: string;
  specs: {
    coreFreq: string;
    combatRating: string;
    neuralSync: string;
  };
}

export interface MenuItem {
  name: string;
  id: string;
  active: boolean;
}
