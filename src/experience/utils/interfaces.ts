import { TerritoryType } from './enums';
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
    name: string;
    center: Point;
    type: TerritoryType;
    radius?: number;
    width?: number;
    height?: number;
    altitude?: number;
    children?: Territory[];
}