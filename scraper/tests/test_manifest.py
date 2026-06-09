from rts.manifest import build_manifest

def test_build_manifest_flat_essay_list():
  toc = {
    'standalone': [{'id': 'biases-an-introduction', 'title': 'Biases', 'slug': 'Biases-An-Introduction', 'path': '/Biases-An-Introduction'}],
    'books': [{
      'id': 'book-i', 'title': 'Book I', 'slug': 'Book-I', 'path': '/Book-I',
      'sequences': [{
        'id': 'fake-beliefs', 'title': 'Fake Beliefs', 'slug': 'Fake-Beliefs-Sequence', 'path': '/Fake-Beliefs-Sequence',
        'essays': [{'id': 'essay-one', 'title': 'Essay One', 'slug': 'Essay-One', 'path': '/Essay-One'}],
      }],
    }],
  }
  m = build_manifest(toc, scraped_at='2026-05-30T00:00:00+00:00')
  assert len(m['essays']) == 2
  assert m['essays'][0]['slug'] == 'Biases-An-Introduction'
  assert m['essays'][1]['book_id'] == 'book-i'
  assert m['essays'][1]['sequence_id'] == 'fake-beliefs'
