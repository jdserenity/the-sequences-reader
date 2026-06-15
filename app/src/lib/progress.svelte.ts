/** Reactive epoch bumped whenever read state changes. */
export const readState = $state({ epoch: 0 });

export function bumpReadEpoch(): void { readState.epoch++; }
