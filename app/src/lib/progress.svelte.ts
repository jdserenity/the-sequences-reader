/** Reactive epoch bumped whenever read state in localStorage changes. */
export const readState = $state({ epoch: 0 });

export function bumpReadEpoch(): void { readState.epoch++; }
