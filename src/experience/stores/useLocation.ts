import {
  CHARACTER_INITIAL_POSITION,
  POSITION_DISPLACEMENT_THRESHOLD,
} from "./../utils/constants";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { Vector3 } from "three";
import { checkTerritories } from "../utils/utils";
import TERRITORIES from "../utils/territories";

interface LocationState {
  location: Vector3;
  setLocation: (location: Vector3) => void;

  territoryName: string;
  setTerritoryName: (territoryName: string) => void;
}

export default create(
  subscribeWithSelector<LocationState>((set) => {
    return {
      location: CHARACTER_INITIAL_POSITION,
      setLocation: (location: Vector3) =>
        set((state) => {
          // considering the position lerping
          if (
            Math.abs(state.location.x - location.x) >
              POSITION_DISPLACEMENT_THRESHOLD.x ||
            Math.abs(state.location.z - location.z) >
              POSITION_DISPLACEMENT_THRESHOLD.z ||
            Math.abs(state.location.y - location.y) >
              POSITION_DISPLACEMENT_THRESHOLD.y
          ) {
            const territoryName = checkTerritories(location, TERRITORIES);
            return { location, territoryName };
          }
          return {};
        }),

      territoryName: "",
      setTerritoryName: (territoryName: string) => set({ territoryName }),
    };
  })
);
