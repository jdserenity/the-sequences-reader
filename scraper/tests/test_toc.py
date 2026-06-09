from pathlib import Path
from rts.toc import parse_contents_html

FIXTURES = Path(__file__).resolve().parent.parent / 'fixtures'

def test_parse_contents_snippet():
  html = (FIXTURES / 'contents_snippet.html').read_text(encoding='utf-8')
  toc = parse_contents_html(html)
  assert len(toc['standalone']) == 1
  assert toc['standalone'][0]['slug'] == 'Biases-An-Introduction'
  assert len(toc['books']) == 1
  book = toc['books'][0]
  assert book['slug'] == 'Book-I-Map-And-Territory'
  assert len(book['sequences']) == 1
  seq = book['sequences'][0]
  assert seq['slug'] == 'Fake-Beliefs-Sequence'
  assert len(seq['essays']) == 2
  assert seq['essays'][0]['slug'] == 'What-Do-I-Mean-By-Rationality'
  assert seq['essays'][1]['slug'] == 'FocusYourUncertainty'
