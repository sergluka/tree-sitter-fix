# tree-sitter-fix

A tree-sitter parser for Financial Information eXchange (FIX®).
Used as the base for an [fix.nvim](https://github.com/sergluka/fix.nvim) for FIX message viewing.

## Features

- Parses FIX messages into key/value pairs
- Supports '|', '^', and '\x001' as field delimiters
- Recognizes '#' as a comment marker
