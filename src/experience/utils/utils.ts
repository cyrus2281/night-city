import { ALTITUDE_DISPLACEMENT_THRESHOLD } from "./constants";
import { TerritoryType } from "./enums";
import { Point, Circle2D, Rectangle2D, Territory, Point3D } from "./interfaces";

export const getLocalTime = (): string => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes}`;
};

export const isInsideCircle = (point: Point, circle: Circle2D): boolean => {
  const distance = Math.sqrt(
    (point.x - circle.center.x) ** 2 + (point.y - circle.center.y) ** 2
  );
  return distance < circle.radius;
};

export const isInsideRectangle = (
  point: Point,
  rectangle: Rectangle2D
): boolean => {
  const x = point.x - rectangle.center.x;
  const y = point.y - rectangle.center.y;
  return (
    Math.abs(x) <= rectangle.width / 2 && Math.abs(y) <= rectangle.height / 2
  );
};

export const isInAltitudeRange = (
  point: Point3D,
  altitude: number = 0,
  range: number = 1
): boolean => {
  return Math.abs(point.y - altitude) <= range;
};

export const isInsideTerritory = (
  point: Point3D,
  territory: Territory
): boolean => {
  const point2D = { x: point.x, y: point.z };
  switch (territory.type) {
    case TerritoryType.CIRCULAR:
      return isInsideCircle(point2D, {
        center: territory.center,
        radius: territory.radius ?? 1,
      });
    case TerritoryType.CIRCULAR_ALTITUDE:
      return (
        isInsideCircle(point2D, {
          center: territory.center,
          radius: territory.radius ?? 1,
        }) &&
        isInAltitudeRange(
          point,
          territory.altitude,
          ALTITUDE_DISPLACEMENT_THRESHOLD
        )
      );
    case TerritoryType.RECTANGULAR:
      return isInsideRectangle(point2D, {
        center: territory.center,
        width: territory.width ?? 1,
        height: territory.height ?? 1,
      });
    case TerritoryType.RECTANGULAR_ALTITUDE:
      return (
        isInsideRectangle(point2D, {
          center: territory.center,
          width: territory.width ?? 1,
          height: territory.height ?? 1,
        }) &&
        isInAltitudeRange(
          point,
          territory.altitude,
          ALTITUDE_DISPLACEMENT_THRESHOLD
        )
      );
    default:
      return false;
  }
};

export const checkTerritories = (
  position: Point3D,
  territories: Territory[]
): string => {
  for (const territory of territories) {
    if (isInsideTerritory(position, territory)) {
      let childTerritory = "";
      if (territory.children) {
        childTerritory = checkTerritories(position, territory.children);
      }
      return childTerritory || territory.name;
    }
  }
  return "";
};
