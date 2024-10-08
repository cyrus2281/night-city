export enum TerritoryType {
  CIRCULAR = "circular",
  RECTANGULAR = "rectangular",
  CIRCULAR_ALTITUDE = "circular-altitude",
  RECTANGULAR_ALTITUDE = "rectangular-altitude",
}

export enum MAIN_TERRITORIES_NAMES {
  BAR = "Space Bar",
  PARK = "Park",
  TV_BRIDGE = "TV Bridge",
  DEAD_END_ALLEY = "Dead End Alley",
  BLOCKED_ROAD = "Blocked Road",
  LIBRARY = "Library",
  TECH_CENTER = "Tech Center",
  POST_OFFICE = "Post Office",
  POST_OFFICE_ROOF = "Post Office's Roof",
  UNFINISHED_ROAD = "Unfinished Road",
}

export enum OTHER_TERRITORIES_NAMES {
  PARK_FOUNTAIN = "Park Fountain",
  PARK_NAME = "Developer Name",
  PIPES = "Duct Pipes",
  ROBOT_SPOT = "Robot Spot",
}

export type TERRITORIES_NAMES = MAIN_TERRITORIES_NAMES | OTHER_TERRITORIES_NAMES;

export enum MODEL_ANIMATIONS {
    IDLE = "Survey",
    WALK = "Walk",
    RUN = "Run",
    JUMP = "Jump",
}

export enum ROBOT_ANIMATIONS {
    IDLE = "RobotArmature|Robot_Idle",
    WALK = "RobotArmature|Robot_Walking",
    NO = "RobotArmature|Robot_No",
    YES = "RobotArmature|Robot_Yes",
    THUMBS_UP = "RobotArmature|Robot_ThumbsUp",
    WAVE = "RobotArmature|Robot_Wave",
}