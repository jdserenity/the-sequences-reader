import re

def path_to_slug(href: str) -> str:
  s = href.strip()
  if 'readthesequences.com' in s: s = s.split('readthesequences.com', 1)[-1]
  if s.startswith('/'): s = s[1:]
  return s.split('?')[0].rstrip('/')

def path_to_id(href: str) -> str:
  slug = path_to_slug(href)
  parts = []
  for segment in slug.split('-'):
    s = re.sub(r'([a-z0-9])([A-Z])', r'\1-\2', segment)
    parts.append(s.lower())
  return '-'.join(parts)
