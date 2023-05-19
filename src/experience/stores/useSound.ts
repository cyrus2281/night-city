import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import {  AudioConfig, Subtitle } from "../utils/interfaces";

interface SoundState {
  playSound: (audioConfig: AudioConfig) => void;
  subtitleQueue: Subtitle[];
  showSubtitle: (subtitle: string, duration: number) => void;
  removeSubtitle: (id: string) => void;
}

export default create(
  subscribeWithSelector<SoundState>((set, get) => {
    return {
      playSound: (audioConfig: AudioConfig) => {
        if (!window.isMute) {
          const audio = new Audio(audioConfig.path);
          audio.volume = audioConfig.defaultVolume || 0.7;
          audio.play();
        }
        if (audioConfig.subtitle) {
          get().showSubtitle(
            audioConfig.subtitle,
            audioConfig.duration || 1000
          );
        }
      },
      subtitleQueue: [],
      showSubtitle: (message: string, duration: number) => {
        const id = Math.random().toString();
        set((state) => ({
          subtitleQueue: [
            ...state.subtitleQueue,
            { message, duration, id, remove: () => state.removeSubtitle(id) },
          ],
        }));
      },
      removeSubtitle: (id: string) => {
        set((state) => ({
          subtitleQueue: state.subtitleQueue.filter(
            (subtitle) => subtitle.id !== id
          ),
        }));
      },
    };
  })
);
