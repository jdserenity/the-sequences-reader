export type TextRange = { start: number; end: number; text: string };
export type SelectionAnchor = { top: number; left: number };

export function getOffsetInRoot(root: HTMLElement, node: Node, offset: number): number {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let pos = 0;
  let current: Node | null;
  while ((current = walker.nextNode())) {
    if (current === node) return pos + offset;
    pos += (current.textContent ?? '').length;
  }
  return pos;
}

export function getRangeFromSelection(root: HTMLElement): TextRange | null {
  const sel = typeof window === 'undefined' ? null : window.getSelection();
  if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return null;
  const range = sel.getRangeAt(0);
  if (!root.contains(range.commonAncestorContainer)) return null;
  const start = getOffsetInRoot(root, range.startContainer, range.startOffset);
  const end = getOffsetInRoot(root, range.endContainer, range.endOffset);
  if (start >= end) return null;
  const text = range.toString();
  if (!text.trim()) return null;
  return { start, end, text };
}

export function getSelectionAnchor(root: HTMLElement): SelectionAnchor | null {
  const sel = typeof window === 'undefined' ? null : window.getSelection();
  if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return null;
  const range = sel.getRangeAt(0);
  if (!root.contains(range.commonAncestorContainer)) return null;
  const rect = range.getBoundingClientRect();
  if (!rect.width && !rect.height) return null;
  return { top: rect.top, left: rect.left + rect.width / 2 };
}

export function wrapTextOffset(root: HTMLElement, start: number, end: number): void {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let pos = 0;
  const segments: { node: Text; start: number; end: number }[] = [];
  let n: Text | null;
  while ((n = walker.nextNode() as Text | null)) {
    const len = n.length;
    const nodeStart = pos;
    const nodeEnd = pos + len;
    if (nodeEnd > start && nodeStart < end) {
      segments.push({ node: n, start: Math.max(0, start - nodeStart), end: Math.min(len, end - nodeStart) });
    }
    pos = nodeEnd;
  }
  for (const seg of [...segments].reverse()) {
    const { node, start: s, end: e } = seg;
    if (s === 0 && e === node.length) {
      const mark = document.createElement('mark');
      mark.className = 'highlight';
      node.parentNode?.replaceChild(mark, node);
      mark.appendChild(node);
    } else {
      const after = node.splitText(e);
      const middle = s === 0 ? node : node.splitText(s);
      const mark = document.createElement('mark');
      mark.className = 'highlight';
      middle.parentNode?.replaceChild(mark, middle);
      mark.appendChild(middle);
      void after;
    }
  }
}

export function applyHighlightMarks(root: HTMLElement, ranges: { start: number; end: number }[]): void {
  const sorted = [...ranges].sort((a, b) => b.start - a.start);
  for (const range of sorted) wrapTextOffset(root, range.start, range.end);
}
