export function essayScrollFraction(scrollTop: number, scrollHeight: number, clientHeight: number): number {
  const max = scrollHeight - clientHeight;
  if (max <= 0) return 1;
  return Math.min(1, Math.max(0, scrollTop / max));
}
