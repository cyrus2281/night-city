import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { AudioConfig, Subtitle } from "../utils/interfaces";
import { DEFAULT_MUSIC_VOLUME, IS_DEV } from "../utils/constants";
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
  failedSounds: AudioConfig[];
  addFailedSound: (audio: AudioConfig) => void;
  removeFailedSound: (audio: AudioConfig) => void;
}

interface AudioElement extends HTMLAudioElement {
  defaultVolume: number;
  name: string;
}
let shouldUnmute = true;
export default create(
  subscribeWithSelector<SoundState>((set, get) => {
    return {
      // Sounds
      activeSounds: [],
      addSound: (audio: AudioElement) => {
        set((state) => ({ activeSounds: [...state.activeSounds, audio] }));
      },
      removeSound: (audio: AudioElement) => {
        set((state) => ({
          activeSounds: state.activeSounds.filter((a) => a !== audio),
        }));
      },
      isMute: IS_DEV,
      setMute: (isMute: boolean) => {
        const { activeSounds } = get();
        activeSounds.forEach((sound) => (sound.muted = isMute));
        !isMute &&
          activeSounds.forEach((sound) => (sound.volume = sound.defaultVolume));
        set({ isMute: isMute });
      },
      toggleMute: () => {
        const { isMute, setMute } = get();
        setMute(!isMute);
      },
      playSound: (audioConfig: AudioConfig) => {
        const { addSound, removeSound, isMute } = get();
        const audio = new Audio(audioConfig.path) as AudioElement;
        audio.name = audioConfig.path;
        audio.loop = audioConfig.duration === 0;
        audio.defaultVolume = audioConfig.volume || DEFAULT_MUSIC_VOLUME;
        audio.volume = audio.defaultVolume;
        audio.autoplay = false;
        audio.muted = isMute;
        audio.oncanplay = () => {
          audio
            .play()
            .then(() => {
              if (audioConfig.subtitle) {
                get().showSubtitle(
                  audioConfig.subtitle,
                  audioConfig.duration || 1000
                );
              }
            })
            .catch((e) => {
              if (audioConfig.tryingAgain || !audioConfig.subtitle) {
                if (audioConfig.subtitle) {
                  get().showSubtitle(
                    audioConfig.subtitle,
                    audioConfig.duration || 1000
                  );
                }
                return;
              }
              const { addFailedSound, showSubtitle, isMute } = get();
              if (isMute) {
                showSubtitle(
                  audioConfig.subtitle,
                  audioConfig.duration || 1000
                );
              } else {
                audioConfig.tryingAgain = true;
                addFailedSound(audioConfig);
              }
            });
        };
        audio.onended = () => {
          removeSound(audio);
          audioConfig.onEnded && audioConfig.onEnded();
        };
        audio.load();
        addSound(audio);
      },
      fadeOutSounds: async (callback) => {
        const { activeSounds, isMute, setMute } = get();
        let interval = 0;
        while (interval < 15) {
          activeSounds.forEach((sound) => {
            sound.volume = sound.volume * 0.75;
          });
          await sleep(100);
          interval += 1;
        }
        shouldUnmute = !isMute;
        setMute(true);
        callback && callback();
      },
      fadeInSounds: async (callback) => {
        const { activeSounds, setMute } = get();
        if (!shouldUnmute) {
          callback && callback();
          return;
        }
        setMute(false);
        let interval = 0;
        while (interval < 10) {
          activeSounds.forEach((sound) => {
            sound.volume = Math.min(sound.volume + 0.05, sound.defaultVolume);
          });
          await sleep(100);
          interval += 1;
        }
        callback && callback();
      },
      // Failed sounds
      failedSounds: [],
      addFailedSound: (audio: AudioConfig) => {
        set((state) => ({ failedSounds: [...state.failedSounds, audio] }));
      },
      removeFailedSound: (audio: AudioConfig) => {
        set((state) => ({
          failedSounds: state.failedSounds.filter((a) => a !== audio),
        }));
      },
      // Subtitles
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
