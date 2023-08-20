import { TERRITORIES_NAMES, TerritoryType } from "./enums";
import { Territory } from "./interfaces";

const TERRITORIES: Territory[] = [
  {
    name: TERRITORIES_NAMES.BAR,
    center: { x: -4.5, y: 2.5 },
    type: TerritoryType.RECTANGULAR,
    width: 10,
    height: 16,
  },
  {
    name: TERRITORIES_NAMES.PARK,
    center: { x: -12.5, y: 19.5 },
    type: TerritoryType.RECTANGULAR,
    width: 19,
    height: 10.5,
    mustInclude: true,
    children: [
      {
        name: TERRITORIES_NAMES.PARK_FOUNTAIN,
        center: { x: -8, y: 21 },
        type: TerritoryType.CIRCULAR,
        altitude: 8.5,
        radius: 3,
      },
    ],
  },
  {
    name: TERRITORIES_NAMES.TV_BRIDGE,
    center: { x: 5.5, y: 10.5 },
    type: TerritoryType.RECTANGULAR_ALTITUDE,
    altitude: 8.5,
    width: 2,
    height: 6,
  },
  {
    name: TERRITORIES_NAMES.DEAD_END_ALLEY,
    center: { x: 13.5, y: 16 },
    type: TerritoryType.RECTANGULAR,
    width: 4.5,
    height: 9,
  },
  {
    name: TERRITORIES_NAMES.BLOCKED_ROAD,
    center: { x: 10, y: -23 },
    type: TerritoryType.RECTANGULAR,
    width: 5.5,
    height: 3,
  },
  {
    name: TERRITORIES_NAMES.STORE,
    center: { x: -1.5, y: -18.5 },
    type: TerritoryType.RECTANGULAR,
    width: 8,
    height: 6,
  },
  {
    name: TERRITORIES_NAMES.POST_OFFICE,
    center: { x: -15, y: -2 },
    type: TerritoryType.RECTANGULAR,
    width: 6,
    height: 13,
  },
  {
    name: TERRITORIES_NAMES.TECH_CENTER,
    center: { x: 4, y: -1 },
    type: TerritoryType.RECTANGULAR,
    width: 6,
    height: 12.5,
  },
];

export default TERRITORIES;
