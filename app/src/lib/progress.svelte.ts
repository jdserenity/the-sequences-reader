/** Reactive epoch bumped whenever read state changes. */
export const readState = $state({ epoch: 0 });
/** Reactive epoch bumped whenever highlights change. */
export const highlightState = $state({ epoch: 0 });

export function bumpReadEpoch(): void { readState.epoch++; }
export function bumpHighlightEpoch(): void { highlightState.epoch++; }
