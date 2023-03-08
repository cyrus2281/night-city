import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface SoundState {
  playSound: (soundName: string, volume?: number) => void;
}

export default create(
  subscribeWithSelector<SoundState>((set) => {
    return {
      playSound: (soundName: string, volume: number = 0.7 ) => {
        const audio = new Audio(soundName);
        audio.volume = volume;
        audio.play();
      },
    };
  })
);
