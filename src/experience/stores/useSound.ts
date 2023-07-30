import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { AudioConfig, Subtitle } from "../utils/interfaces";
import { DEFAULT_MUSIC_VOLUME } from "../utils/constants";

interface SoundState {
  isMute: boolean;
  setMute: (isMute: boolean) => void;
  toggleMute: () => void;
  playSound: (audioConfig: AudioConfig) => void;
  subtitleQueue: Subtitle[];
  showSubtitle: (subtitle: string, duration: number) => void;
  removeSubtitle: (id: string) => void;
}

interface AudioElement extends HTMLAudioElement {
  defaultVolume: number;
}

const activeSounds: AudioElement[] = [];

export default create(
  subscribeWithSelector<SoundState>((set, get) => {
    return {
      isMute: false,
      setMute: (isMute: boolean) => {
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
        const isMute = get().isMute;
        const audio = new Audio(audioConfig.path) as AudioElement;
        audio.loop = audioConfig.duration === 0;
        audio.defaultVolume = audioConfig.volume || DEFAULT_MUSIC_VOLUME;
        audio.volume = isMute ? 0 : audio.defaultVolume;
        audio.play();
        activeSounds.push(audio);
        audio.onended = () => {
          activeSounds.splice(activeSounds.indexOf(audio), 1);
          audioConfig.onEnded && audioConfig.onEnded();
        };
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
