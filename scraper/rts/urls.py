BASE = 'https://www.readthesequences.com'

def absolute(path: str) -> str:
  if path.startswith('http'): return path.split('?')[0]
  slug = path if path.startswith('/') else f'/{path}'
  return f'{BASE}{slug}'

def markdown_url(path: str) -> str:
  return f'{absolute(path)}?action=markdown'

def is_book_slug(slug: str) -> bool: return slug.startswith('Book-')
def is_sequence_slug(slug: str) -> bool: return slug.endswith('-Sequence')
