/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class SoundEffects {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  private whirOsc: OscillatorNode | null = null;
  private whirOsc2: OscillatorNode | null = null;
  private whirGain: GainNode | null = null;
  private whirFilter: BiquadFilterNode | null = null;

  private initContext() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  // A futuristic click-chime sound
  playClick() {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.1); // A6

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch (e) {
      console.warn('Audio play block:', e);
    }
  }

  // Soft sci-fi transition swoosh
  playSwoosh() {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch (e) {
      console.warn('Audio play block:', e);
    }
  }

  // Futuristic digital hum / lock-on confirmation sound
  playConfirm() {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
      osc1.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.08); // E5

      osc2.type = 'square';
      osc2.frequency.setValueAtTime(1046.50, this.ctx.currentTime); // C6
      osc2.frequency.setValueAtTime(1318.51, this.ctx.currentTime + 0.08); // E6

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(this.ctx.currentTime + 0.35);
      osc2.stop(this.ctx.currentTime + 0.35);
    } catch (e) {
      console.warn('Audio play block:', e);
    }
  }

  // Glitchy digital beeping (neural sync activation status)
  playGlitch() {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.setValueAtTime(300, this.ctx.currentTime + 0.04);
      osc.frequency.setValueAtTime(50, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch (e) {
      console.warn('Audio play block:', e);
    }
  }

  // A realistic synthesized clean steel-on-steel clashing chime with metallic resonance
  playSwordClash() {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      
      // High-register metallic frequency components
      const frequencies = [880, 1200, 1500, 2200];
      const oscillators: OscillatorNode[] = [];
      const mainGain = this.ctx.createGain();

      // Sharp peak at start, then long decay for metal ring
      mainGain.gain.setValueAtTime(0.12, now);
      mainGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      // Low frequency punch/impact
      const impactOsc = this.ctx.createOscillator();
      const impactGain = this.ctx.createGain();
      impactOsc.type = 'triangle';
      impactOsc.frequency.setValueAtTime(120, now);
      impactOsc.frequency.exponentialRampToValueAtTime(30, now + 0.15);
      impactGain.gain.setValueAtTime(0.18, now);
      impactGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      
      impactOsc.connect(impactGain);
      impactGain.connect(this.ctx.destination);
      impactOsc.start(now);
      impactOsc.stop(now + 0.2);

      // Create shimmering ring
      frequencies.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const bandGain = this.ctx.createGain();
        
        // Add random slight detune for raw steel feel
        osc.type = idx % 2 === 0 ? 'sine' : 'sawtooth';
        osc.frequency.setValueAtTime(freq + (Math.random() * 8 - 4), now);
        
        // Quick high frequency shift representing scrape
        osc.frequency.exponentialRampToValueAtTime(freq * 0.95, now + 0.1);

        bandGain.gain.setValueAtTime(idx === 0 ? 0.08 : 0.04, now);
        // Vary decay to simulate metal resonance
        bandGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5 + idx * 0.1);

        osc.connect(bandGain);
        bandGain.connect(mainGain);
        oscillators.push(osc);
      });

      // Quick white noise burst for sparks/friction
      const bufferSize = this.ctx.sampleRate * 0.1; // 100ms
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noiseNode = this.ctx.createBufferSource();
      noiseNode.buffer = buffer;
      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.08, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      
      noiseNode.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noiseNode.start(now);
      noiseNode.stop(now + 0.15);

      mainGain.connect(this.ctx.destination);
      oscillators.forEach(osc => {
        osc.start(now);
        osc.stop(now + 0.9);
      });
    } catch (e) {
      console.warn('Audio play block:', e);
    }
  }

  // Soft traditional/mechanical gear and parchment whir loop
  startWhir() {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      this.stopWhir();

      const now = this.ctx.currentTime;
      this.whirOsc = this.ctx.createOscillator();
      this.whirOsc2 = this.ctx.createOscillator();
      this.whirFilter = this.ctx.createBiquadFilter();
      this.whirGain = this.ctx.createGain();

      this.whirOsc.type = 'triangle';
      this.whirOsc.frequency.setValueAtTime(115, now);

      this.whirOsc2.type = 'sine';
      this.whirOsc2.frequency.setValueAtTime(230, now);

      this.whirFilter.type = 'lowpass';
      this.whirFilter.frequency.setValueAtTime(400, now);

      this.whirGain.gain.setValueAtTime(0, now);
      this.whirGain.gain.linearRampToValueAtTime(0.012, now + 0.12);

      this.whirOsc.connect(this.whirFilter);
      this.whirOsc2.connect(this.whirFilter);
      this.whirFilter.connect(this.whirGain);
      this.whirGain.connect(this.ctx.destination);

      this.whirOsc.start(now);
      this.whirOsc2.start(now);
    } catch (e) {
      console.warn('Audio whir start block:', e);
    }
  }

  updateWhir(intensity: number) {
    if (this.muted || !this.ctx) return;
    const now = this.ctx.currentTime;
    const clIntensity = Math.max(0, Math.min(1, intensity));

    if (this.whirOsc) {
      // Linear/Exponential target shift (115Hz at center, rising up to 260Hz)
      const targetFreq = 115 + clIntensity * 145;
      this.whirOsc.frequency.setTargetAtTime(targetFreq, now, 0.06);
    }
    if (this.whirOsc2) {
      // Doubled harmonic rising up to 520Hz
      const targetFreq2 = 230 + clIntensity * 290;
      this.whirOsc2.frequency.setTargetAtTime(targetFreq2, now, 0.06);
    }
    if (this.whirFilter) {
      // Filter frequency gets brighter as the card is tilted and lifted
      const targetCutoff = 400 + clIntensity * 500;
      this.whirFilter.frequency.setTargetAtTime(targetCutoff, now, 0.06);
    }
    if (this.whirGain) {
      // Gain shifts between 0.012 (flat) and 0.07 (highly interactive swell)
      const targetGain = 0.012 + clIntensity * 0.058;
      this.whirGain.gain.setTargetAtTime(targetGain, now, 0.06);
    }
  }

  stopWhir() {
    try {
      if (this.whirGain && this.ctx) {
        const now = this.ctx.currentTime;
        this.whirGain.gain.cancelScheduledValues(now);
        this.whirGain.gain.setValueAtTime(this.whirGain.gain.value, now);
        this.whirGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

        const oscToStop = this.whirOsc;
        const osc2ToStop = this.whirOsc2;
        setTimeout(() => {
          try {
            oscToStop?.stop();
            osc2ToStop?.stop();
          } catch (_) {}
        }, 200);
      }
    } catch (e) {
      console.warn('Audio whir stop block:', e);
    } finally {
      this.whirOsc = null;
      this.whirOsc2 = null;
      this.whirGain = null;
      this.whirFilter = null;
    }
  }
}

export const sfx = new SoundEffects();
