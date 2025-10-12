/**
 * @file Financial Information eXchange (FIX®) protocol grammar for tree-sitter
 * @author Sergey Lukashevich <sergey.lukashevi4@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: 'fix',

  extras: $ => [],

  rules: {
    source_file: $ =>
      seq(
        $.message,
        repeat(seq($.message_sep, $.message)),
        optional($.message_sep)
      ),

    message: $ =>
      seq(
        $.field,
        repeat(seq($.delimiter, $.field)),
        optional($.delimiter)
      ),

    field: $ => seq($.tag, $.equals, $.value),

    tag: _ => /[0-9]+/,
    equals: _ => "=",
    value: _ => token.immediate(/[^\u0001|^\r\n]*/),

    delimiter: _ => token(choice("\u0001", "|", "^")),
    message_sep: _ => token(/(?:\r?\n)+/),
  },
});

