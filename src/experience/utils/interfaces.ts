import { TERRITORIES_NAMES, TerritoryType } from './enums';
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