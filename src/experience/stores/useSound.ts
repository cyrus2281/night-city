import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { AudioConfig, Subtitle } from "../utils/interfaces";
import { DEFAULT_MUSIC_VOLUME } from "../utils/constants";
import { sleep } from "../utils/utils";

interface SoundState {
  activeSounds: AudioElement[];
  addSound: (audio: AudioElement) => void;
  removeSound: (audio: AudioElement) => void;
  isMute: boolean;
  setMute: (isMute: boolean) => void;
  toggleMute: () => void;
  playSound: (audioConfig: AudioConfig) => void;
  fadeOutSounds: (callback?: () => void) => Promise<void>;
  fadeInSounds: (callback?: () => void) => Promise<void>;
  subtitleQueue: Subtitle[];
  showSubtitle: (subtitle: string, duration: number) => void;
  removeSubtitle: (id: string) => void;
}

interface AudioElement extends HTMLAudioElement {
  defaultVolume: number;
  name: string;
}

export default create(
  subscribeWithSelector<SoundState>((set, get) => {
    return {
      activeSounds: [],
      addSound: (audio: AudioElement) => {
        set((state) => ({ activeSounds: [...state.activeSounds, audio] }));
      },
      removeSound: (audio: AudioElement) => {
        set((state) => ({
          activeSounds: state.activeSounds.filter((a) => a !== audio),
        }));
      },
      isMute: false,
      setMute: (isMute: boolean) => {
        const { activeSounds } = get();
        if (isMute) {
          activeSounds.forEach((sound) => (sound.volume = 0));
        } else {
          activeSounds.forEach((sound) => (sound.volume = sound.defaultVolume));
        }
        set({ isMute: isMute });
      },
      toggleMute: () => {
        const { isMute, setMute } = get();
        setMute(!isMute);
      },
      playSound: (audioConfig: AudioConfig) => {
        const { addSound, removeSound } = get();
        const isMute = get().isMute;
        const audio = new Audio(audioConfig.path) as AudioElement;
        audio.name = audioConfig.path;
        audio.loop = audioConfig.duration === 0;
        audio.defaultVolume = audioConfig.volume || DEFAULT_MUSIC_VOLUME;
        audio.volume = isMute ? 0 : audio.defaultVolume;
        audio.play();
        addSound(audio);
        audio.onended = () => {
          removeSound(audio);
          audioConfig.onEnded && audioConfig.onEnded();
        };
        if (audioConfig.subtitle) {
          get().showSubtitle(
            audioConfig.subtitle,
            audioConfig.duration || 1000
          );
        }
      },
      fadeOutSounds: async (callback) => {
        const { activeSounds } = get();
        let interval = 0;
        while (interval < 15) {
          activeSounds.forEach((sound) => {
            sound.volume = sound.volume * 0.75;
          });
          await sleep(100);
          interval += 1;
        }
        activeSounds.forEach((sound) => {
          sound.volume = 0;
        });
        callback && callback();
      },
      fadeInSounds: async (callback) => {
        const { activeSounds } = get();
        let interval = 0;
        while (interval < 15) {
          activeSounds.forEach((sound) => {
            sound.volume = Math.min(sound.volume + 0.05 , sound.defaultVolume)
          });
          await sleep(100);
          interval += 1;
        }
        activeSounds.forEach((sound) => {
          sound.volume = sound.defaultVolume;
        });
        callback && callback();
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
