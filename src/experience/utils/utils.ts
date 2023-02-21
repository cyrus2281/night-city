import { Point, Circle2D, Rectangle2D } from './interfaces';

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
}

export const isInsideRectangle = (point: Point, rectangle: Rectangle2D): boolean => {
  const x = point.x - rectangle.center.x;
  const y = point.y - rectangle.center.y;
  return (
    Math.abs(x) <= rectangle.width / 2 && Math.abs(y) <= rectangle.height / 2
  );
}