import {
  CHARACTER_INITIAL_POSITION,
  POSITION_DISPLACEMENT_THRESHOLD,
} from "./../utils/constants";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { Vector3 } from "three";
import { checkTerritories } from "../utils/utils";
import TERRITORIES from "../utils/territories";
import { TERRITORIES_NAMES } from "../utils/enums";

interface LocationState {
  location: Vector3;
  setLocation: (location: Vector3) => void;

  territoriesName: TERRITORIES_NAMES[];
  setTerritoriesName: (territoriesName: TERRITORIES_NAMES[]) => void;
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
            let returnValue: {
              location: Vector3;
              territoriesName?: string[];
            } = { location };
            const territoriesName = checkTerritories(location, TERRITORIES);         
            if (
              JSON.stringify(territoriesName) !==
              JSON.stringify(state.territoriesName)
            ) {
              returnValue.territoriesName = territoriesName;
            }
            return returnValue;
          }
          return {};
        }),

      territoriesName: [],
      setTerritoriesName: (territoriesName: TERRITORIES_NAMES[]) =>
        set({ territoriesName }),
    };
  })
);
