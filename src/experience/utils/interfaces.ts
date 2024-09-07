import { Texture } from "three";
import { TERRITORIES_NAMES, TerritoryType } from "./enums";

declare global {
  interface Window {
    map: Texture;
    worldPath: string;
    jump: () => void;
    joystick: any;
    joystickPositioning: {
      sprint: boolean;
      right: boolean;
      left: boolean;
      forward: boolean;
      backward: boolean;
    } | null;
  }
}

export interface Point {
  x: number;
  y: number;
}

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface Circle2D {
  center: Point;
  radius: number;
}

export interface Rectangle2D {
  center: Point;
  width: number;
  height: number;
}

export interface Territory {
  name: TERRITORIES_NAMES;
  center: Point;
  type: TerritoryType;
  /**
   * Territory will be in the result even if there is a child match
   */
  mustInclude?: boolean;
  radius?: number;
  width?: number;
  height?: number;
  altitude?: number;
  children?: Territory[];
}

export interface AudioConfig {
  path: string;
  volume?: number;
  subtitle?: string;
  duration?: number;
  onEnded?: () => void;
  tryingAgain?: boolean;
}

export interface Subtitle {
  message: string;
  duration: number;
  id: string;
  remove: () => void;
}

export interface LLM_MESSAGE {
  role: "user"|"assistant"
  content: string
}