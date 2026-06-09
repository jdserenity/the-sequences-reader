from rts.slug import path_to_id, path_to_slug

def test_path_to_slug_strips_leading_slash():
  assert path_to_slug('/What-Do-I-Mean-By-Rationality') == 'What-Do-I-Mean-By-Rationality'

def test_path_to_id_lowercases_and_hyphenates():
  assert path_to_id('/FocusYourUncertainty') == 'focus-your-uncertainty'
  assert path_to_id('/Book-I-Map-And-Territory') == 'book-i-map-and-territory'
