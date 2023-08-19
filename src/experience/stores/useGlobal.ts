import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface GlobalState {
  hasTouched: boolean;
  setHasTouched: (hasTouched: boolean) => void;

  isLoaded: boolean;
  setIsLoaded: (isLoaded: boolean) => void;

  isDev: boolean;
  setDevMode: (isDev: boolean) => void;

  showLeva: boolean;
  setShowLeva: (showLeva: boolean) => void;

  viewLock: boolean;
  setViewLock: (viewLock: boolean) => void;
  toggleViewLock: () => void;

  isTrueFan: boolean;
  setIsTrueFan: (isTrueFan: boolean) => void;
}

export default create(
  subscribeWithSelector<GlobalState>((set) => {
    return {
      hasTouched: false,
      setHasTouched: (hasTouched: boolean) => set({ hasTouched }),

      isLoaded: false,
      setIsLoaded: (isLoaded: boolean) => set({ isLoaded }),

      isDev: false,
      setDevMode: (isDev: boolean) => set({ isDev }),

      showLeva: location.hash === "#dev",
      setShowLeva: (showLeva: boolean) => set({ showLeva }),

      viewLock: true,
      setViewLock: (viewLock: boolean) => set({ viewLock }),
      toggleViewLock: () => set((state) => ({ viewLock: !state.viewLock })),

      isTrueFan: false,
      setIsTrueFan: (isTrueFan: boolean) => set({ isTrueFan }),
    };
  })
);
