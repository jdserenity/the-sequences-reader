import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import { getEssay, getEssayBody, getNeighbors } from '$lib/corpus';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const essay = getEssay(params.id);
  const body = getEssayBody(params.id);
  if (!essay || body === undefined) error(404, 'Essay not found');
  const { prev, next } = getNeighbors(params.id);
  return {
    essay,
    html: marked.parse(body) as string,
    prev,
    next,
  };
};
