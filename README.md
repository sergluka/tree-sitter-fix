# tree-sitter-fix

A tree-sitter parser for Financial Information eXchange (FIX®).
Used as the base for an [fix.nvim](https://github.com/sergluka/fix.nvim) for FIX message viewing.

## Features

- Parses FIX messages into key/value pairs
- Supports `|`, `^`, and `\x01` (SOH) as field delimiters
- One message per line, any number of messages per file
- `#` starts a comment that runs to the end of the line
- Comments, blank lines, and whitespace-only lines are allowed anywhere,
  in any amount — including before the first and after the last message
- Leading indentation is ignored

## Development

```sh
npm install
npx tree-sitter generate   # after editing grammar.js
npm test                   # test/corpus + node bindings
```
