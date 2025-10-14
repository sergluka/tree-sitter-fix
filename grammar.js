/**
 * @file Financial Information eXchange (FIX®) protocol grammar for tree-sitter
 * @author Sergey Lukashevich <sergey.lukashevi4@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: 'fix',

  extras: $ => [$.ws],

  rules: {
    source_file: $ => seq(
      optional(repeat1($.line)),
      choice($.comment, $.message),
      repeat(seq(repeat1($.line), $.message)),
      optional(repeat1($.line))
    ),
    ws: _ => /[ \t]+/, 

    message: $ => seq($.field, repeat(seq($.delimiter, $.field)), optional($.delimiter)),

    field: $ => seq($.tag, $.equals, $.value),

    tag: _ => /[0-9]+/,
    equals: _ => "=",
    value: _ => token.immediate(/[^\u0001|^\r\n]*/),

    delimiter: _ => token(choice("\u0001", "|", "^")),
    line: _ => token(/[ \t]*(?:\r?\n[ \t]*)+/),

    comment: _ => token(seq("#", /[^\r\n]*/)),
  },
});

