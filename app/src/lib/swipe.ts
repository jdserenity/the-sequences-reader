export type Point = { x: number; y: number };

export function isSwipeLeft(start: Point, end: Point, minDistance = 50): boolean {
  const dx = end.x - start.x; const dy = end.y - start.y;
  return dx < -minDistance && Math.abs(dx) > Math.abs(dy);
}

export function isSwipeRight(start: Point, end: Point, minDistance = 50): boolean {
  const dx = end.x - start.x; const dy = end.y - start.y;
  return dx > minDistance && Math.abs(dx) > Math.abs(dy);
}
