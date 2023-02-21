import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface GlobalState {
    isDev: boolean;
    setDevMode: (isDev: boolean) => void;

    showLeva: boolean;
    setShowLeva: (showLeva: boolean) => void;

    viewLock: boolean;
    setViewLock: (viewLock: boolean) => void;
    toggleViewLock: () => void;
}

export default create(
  subscribeWithSelector<GlobalState>((set) => {
    return {
        isDev: true,
        setDevMode: (isDev: boolean) => set({ isDev }),

        showLeva: true,
        setShowLeva: (showLeva: boolean) => set({ showLeva }),

        viewLock: true,
        setViewLock: (viewLock: boolean) => set({ viewLock }),
        toggleViewLock: () => set((state) => ({ viewLock: !state.viewLock })),
    };
  })
);
