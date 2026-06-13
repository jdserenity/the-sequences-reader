export type Point = { x: number; y: number };
export type TouchGestureLock = 'horizontal' | 'vertical' | null;

export const SWIPE_MIN_DISTANCE = 96;
export const SWIPE_HORIZONTAL_RATIO = 2.25;

export function touchGestureLock(start: Point, current: Point, minDelta = 14): TouchGestureLock {
  const dx = current.x - start.x; const dy = current.y - start.y;
  if (Math.abs(dx) < minDelta && Math.abs(dy) < minDelta) return null;
  return Math.abs(dx) > Math.abs(dy) * 1.35 ? 'horizontal' : 'vertical';
}

export function isSwipeLeft(start: Point, end: Point, minDistance = SWIPE_MIN_DISTANCE): boolean {
  const dx = end.x - start.x; const dy = end.y - start.y;
  return dx < -minDistance && Math.abs(dx) > Math.abs(dy) * SWIPE_HORIZONTAL_RATIO;
}

export function isSwipeRight(start: Point, end: Point, minDistance = SWIPE_MIN_DISTANCE): boolean {
  const dx = end.x - start.x; const dy = end.y - start.y;
  return dx > minDistance && Math.abs(dx) > Math.abs(dy) * SWIPE_HORIZONTAL_RATIO;
}
