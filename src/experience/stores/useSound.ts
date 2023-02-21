import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface SoundState {}

export default create(
  subscribeWithSelector<SoundState>((set) => {
    return {};
  })
);
