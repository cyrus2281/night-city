export enum TerritoryType {
  CIRCULAR = "circular",
  RECTANGULAR = "rectangular",
  CIRCULAR_ALTITUDE = "circular-altitude",
  RECTANGULAR_ALTITUDE = "rectangular-altitude",
}

export enum MAIN_TERRITORIES_NAMES {
  BAR = "Space Bar",
  PARK = "Park",
  PARK_FOUNTAIN = "Park Fountain",
  TV_BRIDGE = "TV Bridge",
  DEAD_END_ALLEY = "Dead End Alley",
  BLOCKED_ROAD = "Blocked Road",
  STORE = "Convenience Store",
  TECH_CENTER = "Tech Center",
  POST_OFFICE = "Post Office",
}

export enum OTHER_TERRITORIES_NAMES {
  PIPES = "Duct Pipes",
}

export type TERRITORIES_NAMES = MAIN_TERRITORIES_NAMES | OTHER_TERRITORIES_NAMES;

export enum MODEL_ANIMATIONS {
    IDLE = "Survey",
    WALK = "Walk",
    RUN = "Run",
    JUMP = "Jump",
}