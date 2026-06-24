export class SolarSessionTimer {
  private ctx: AudioContext | null = null;
  private t0 = 0;
  private activeOscillators: OscillatorNode[] = [];
  private rafQueue: number[] = [];

  constructor(
    private perSpeakerSec: number,
    private onStage: (s: 1 | 2 | 3 | 4) => void,
    private onMidpoint: () => void,
    private onNightSwitch: () => void
  ) {}

  start() {
    this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.t0 = this.ctx.currentTime;
    const D = this.perSpeakerSec;
    const s2 = D * 0.25;
    const s3 = D * 0.50;
    const s4 = D - 120;
    const mid = s3 + (s4 - s3) / 2;

    this.at(0, () => {
      this.onStage(1);
      this.playDawnAudio();
    });
    this.at(s2, () => {
      this.onStage(2);
      this.stopAllAudio(); // Stage 2: Noon (Absolute Silence)
    });
    this.at(s3, () => {
      this.onStage(3);
    });
    this.at(mid, () => {
      this.onMidpoint();
      this.playMidpointTone(); // 150 Hz for 3s
    });
    this.at(s4, () => {
      this.onStage(4);
      this.playSunsetAudio(); // High-pass sweep 5k -> 12k over 120s
    });
    this.at(D, () => {
      this.stopAllAudio();
      this.onNightSwitch();
    });
  }

  stop() {
    this.rafQueue.forEach((id) => cancelAnimationFrame(id));
    this.rafQueue = [];
    this.stopAllAudio();
    if (this.ctx && this.ctx.state !== "closed") {
      try {
        this.ctx.close();
      } catch (e) {
        console.error("Error closing AudioContext:", e);
      }
    }
  }

  private at(sec: number, fn: () => void) {
    if (!this.ctx) return;
    const target = this.t0 + sec;
    let rAF_id: number;
    const tick = () => {
      if (!this.ctx) return;
      if (this.ctx.currentTime >= target) {
        fn();
      } else {
        rAF_id = requestAnimationFrame(tick);
        // keep track of rAF to cancel if stop() is called early
      }
    };
    rAF_id = requestAnimationFrame(tick);
    this.rafQueue.push(rAF_id);
  }

  private stopAllAudio() {
    this.activeOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    });
    this.activeOscillators = [];
  }

  private playDawnAudio() {
    if (!this.ctx) return;
    this.stopAllAudio();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 90; // 80-120 Hz range
    
    // -40dB roughly translates to 0.01 gain
    gain.gain.value = 0.01;
    
    osc.connect(gain);
    gain.connect(this.ctx.destination); // ONLY connect to destination
    osc.start();
    this.activeOscillators.push(osc);
  }

  private playMidpointTone() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 150;
    
    // Smooth envelope to avoid clicking
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime + 2.9);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 3.0);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 3.0);
  }

  private playSunsetAudio() {
    if (!this.ctx) return;
    this.stopAllAudio();
    
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    // Use a rich sawtooth wave to provide high frequencies for the filter
    osc.type = "sawtooth";
    osc.frequency.value = 100; 
    
    filter.type = "highpass";
    // Sweep from 5kHz to 12kHz over 120s
    filter.frequency.setValueAtTime(5000, this.ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(12000, this.ctx.currentTime + 120);

    gain.gain.value = 0.05; // Constant gain

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    this.activeOscillators.push(osc);
  }
}
