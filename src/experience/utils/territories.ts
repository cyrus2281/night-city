import {
  MAIN_TERRITORIES_NAMES,
  OTHER_TERRITORIES_NAMES,
  TerritoryType,
} from "./enums";
import { Territory } from "./interfaces";

const TERRITORIES: Territory[] = [
  {
    name: MAIN_TERRITORIES_NAMES.BAR,
    center: { x: -4, y: 2.5 },
    type: TerritoryType.RECTANGULAR_ALTITUDE,
    altitude: 0,
    width: 7.5,
    height: 11,
  },
  {
    name: MAIN_TERRITORIES_NAMES.PARK,
    center: { x: -12.5, y: 19.5 },
    type: TerritoryType.RECTANGULAR,
    width: 19,
    height: 10.5,
    mustInclude: true,
    children: [
      {
        name: OTHER_TERRITORIES_NAMES.PARK_FOUNTAIN,
        center: { x: -6, y: 19 },
        type: TerritoryType.CIRCULAR,
        radius: 3,
      },
      {
        name: OTHER_TERRITORIES_NAMES.PARK_NAME,
        center: { x: -16.4, y: 18 },
        type: TerritoryType.RECTANGULAR,
        width: 4.8,
        height: 0.5,
      },
    ],
  },
  {
    name: OTHER_TERRITORIES_NAMES.PIPES,
    center: { x: 11, y: 14 },
    type: TerritoryType.RECTANGULAR_ALTITUDE,
    altitude: 10.5,
    width: 6,
    height: 1,
  },
  {
    name: MAIN_TERRITORIES_NAMES.TV_BRIDGE,
    center: { x: 5.5, y: 10.5 },
    type: TerritoryType.RECTANGULAR_ALTITUDE,
    altitude: 7.5,
    width: 2,
    height: 6,
  },
  {
    name: MAIN_TERRITORIES_NAMES.DEAD_END_ALLEY,
    center: { x: 13.5, y: 16 },
    type: TerritoryType.RECTANGULAR,
    width: 4.5,
    height: 9,
  },
  {
    name: MAIN_TERRITORIES_NAMES.BLOCKED_ROAD,
    center: { x: 10, y: -23 },
    type: TerritoryType.RECTANGULAR,
    width: 5.5,
    height: 3,
  },
  {
    name: MAIN_TERRITORIES_NAMES.UNFINISHED_ROAD,
    center: { x: 22, y: 5 },
    type: TerritoryType.RECTANGULAR,
    width: 5,
    height: 12,
  },
  {
    name: MAIN_TERRITORIES_NAMES.LIBRARY,
    center: { x: -1.5, y: -18.5 },
    type: TerritoryType.RECTANGULAR,
    width: 8,
    height: 6,
  },
  {
    name: MAIN_TERRITORIES_NAMES.POST_OFFICE,
    center: { x: -15, y: -2 },
    type: TerritoryType.RECTANGULAR_ALTITUDE,
    altitude: 0,
    width: 6,
    height: 13,
  },
  {
    name: MAIN_TERRITORIES_NAMES.POST_OFFICE_ROOF,
    center: { x: -15.5, y: 2 },
    type: TerritoryType.RECTANGULAR_ALTITUDE,
    altitude: 4,
    width: 5.5,
    height: 9,
  },
  {
    name: MAIN_TERRITORIES_NAMES.TECH_CENTER,
    center: { x: 4, y: -1 },
    type: TerritoryType.RECTANGULAR_ALTITUDE,
    altitude: 0,
    width: 6,
    height: 12.5,
  },
];

export default TERRITORIES;
