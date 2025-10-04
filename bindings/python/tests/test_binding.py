from unittest import TestCase

import tree_sitter
import tree_sitter_fix


class TestLanguage(TestCase):
    def test_can_load_grammar(self):
        try:
            tree_sitter.Language(tree_sitter_fix.language())
        except Exception:
            self.fail("Error loading Financial Information eXchange (FIX®) protocol grammar for tree-sitter grammar")
