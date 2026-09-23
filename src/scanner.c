#include "tree_sitter/parser.h"

#include <stdbool.h>

enum TokenType { VALUE };

void *tree_sitter_fix_external_scanner_create(void) { return NULL; }

void tree_sitter_fix_external_scanner_destroy(void *payload) {}

unsigned tree_sitter_fix_external_scanner_serialize(void *payload, char *buffer) { return 0; }

void tree_sitter_fix_external_scanner_deserialize(void *payload, const char *buffer, unsigned length) {}

static bool is_separator(int32_t c) { return c == 0x01 || c == '|' || c == '^'; }

static void skip_blanks(TSLexer *lexer) {
    while (lexer->lookahead == ' ' || lexer->lookahead == '\t') {
        lexer->advance(lexer, false);
    }
}

static bool is_line_end(TSLexer *lexer) {
    return lexer->eof(lexer) || lexer->lookahead == '\n' || lexer->lookahead == '\r';
}

static bool is_digit(int32_t c) { return c >= '0' && c <= '9'; }

// Logs print SOH as `|`, so a value may contain the separator byte as text.
// A separator ends the value only when `<digits>=` (blanks allowed around the digits) or the end of the line follows it.
bool tree_sitter_fix_external_scanner_scan(void *payload, TSLexer *lexer, const bool *valid_symbols) {
    if (!valid_symbols[VALUE]) {
        return false;
    }
    lexer->result_symbol = VALUE;

    for (;;) {
        if (is_line_end(lexer)) {
            lexer->mark_end(lexer);
            return true;
        }
        if (!is_separator(lexer->lookahead)) {
            lexer->advance(lexer, false);
            continue;
        }

        lexer->mark_end(lexer);
        lexer->advance(lexer, false);
        skip_blanks(lexer);
        if (is_line_end(lexer)) {
            return true;
        }
        if (is_digit(lexer->lookahead)) {
            while (is_digit(lexer->lookahead)) {
                lexer->advance(lexer, false);
            }
            skip_blanks(lexer);
            if (lexer->lookahead == '=') {
                return true;
            }
        }
    }
}
