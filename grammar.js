/**
 * @file Financial Information eXchange (FIX®) protocol grammar for tree-sitter
 * @author Sergey Lukashevich <sergey.lukashevi4@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: 'fix',

  extras: $ => [/[ \t]+/],

  // A separator inside a value is text unless a field or the end of the line follows it.
  externals: $ => [$.value],

  rules: {
    // a single `line` token spans any run of blank (or whitespace-only) lines
    source_file: $ => seq(
      optional($.line),
      repeat(seq($._entry, $.line)),
      optional($._entry)
    ),

    _entry: $ => choice($.comment, $.message),

    message: $ => seq($.field, repeat(seq($.delimiter, $.field)), optional($.delimiter)),

    field: $ => seq($.tag, $.equals, $.value),

    tag: _ => /[0-9]+/,
    equals: _ => "=",

    delimiter: _ => token(choice("\u0001", "|", "^")),
    line: _ => token(/(?:\r?\n[ \t]*)+/),

    comment: _ => token(seq("#", /[^\r\n]*/)),
  },
});

