import { ALTITUDE_DISPLACEMENT_THRESHOLD, NIGHT_CITY_FONT } from "./constants";
import { TERRITORIES_NAMES, TerritoryType } from "./enums";
import { Point, Circle2D, Rectangle2D, Territory, Point3D } from "./interfaces";
const FORMSPREE_URL = import.meta.env.VITE_FORMSPREE_URL;

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
): TERRITORIES_NAMES[] => {
  for (const territory of territories) {
    let insideTerritories: TERRITORIES_NAMES[] = [];
    if (isInsideTerritory(position, territory)) {
      if (territory.children) {
        insideTerritories.push(
          ...checkTerritories(position, territory.children)
        );
      }
      if (!territory.children?.length || territory.mustInclude) {
        insideTerritories.push(territory.name);
      }
      return insideTerritories;
    }
  }
  return [];
};

export const sendEmail = async (options: {
  [name: string]: string;
}): Promise<Response> => {
  const formData = new FormData();
  Object.keys(options).forEach((key) => formData.append(key, options[key]));
  const url: string = FORMSPREE_URL;
  if (!url) {
    throw new Error("No formspree url found");
  }
  return await fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  });
};

export const openUrl = (url: string, newTab = true): void => {
  window.open(url, newTab ? "_blank" : "_self");
};


export const getCameraFOV = () => {
  const windowWidth = window.innerWidth;
  let fov = 45
  if (windowWidth < 600) {
    fov = 65
  } else if (windowWidth < 800) {
    fov = 55
  }
  return fov;
}

export const printNightCityInfo = () => {
  // console.clear();
  setTimeout(() =>
    console.log(NIGHT_CITY_FONT.replaceAll("{worldPath}", window.worldPath))
  );  
};


export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}