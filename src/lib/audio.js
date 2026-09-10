const soundMap = new Map();

export const audio = {
  enabled: false,
  init() { this.enabled = true; },
  register(name, src) { soundMap.set(name, src); },
  play(name) {
    if (!this.enabled || !soundMap.has(name)) return;
    const sound = new Audio(soundMap.get(name));
    sound.volume = 0.18;
    sound.play().catch(() => undefined);
  },
};