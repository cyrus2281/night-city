import { TERRITORIES_NAMES, TerritoryType } from "./enums";
import { Territory } from "./interfaces";

const TERRITORIES: Territory[] = [
  {
    name: TERRITORIES_NAMES.BAR,
    center: { x: 15, y: 15 },
    type: TerritoryType.CIRCULAR,
    radius: 15,
  },
  {
    name: TERRITORIES_NAMES.TECH_CENTER,
    center: { x: -20, y: -20 },
    type: TerritoryType.RECTANGULAR,
    width: 15,
    height: 15,
    children: [
      {
        name: TERRITORIES_NAMES.POST_OFFICE,
        center: { x: -15, y: -15 },
        type: TerritoryType.RECTANGULAR_ALTITUDE,
        width: 5,
        height: 5,
        altitude: 1,
      },
    ],
  },
];

export default TERRITORIES;
