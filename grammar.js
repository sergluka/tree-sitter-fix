/**
 * @file Financial Information eXchange (FIX®) protocol grammar for tree-sitter
 * @author Sergey Lukashevich <sergey.lukashevi4@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: 'fix',

  extras: $ => [/\r?\n/],

  rules: {
    source_file: $ => repeat1($.message),

    message: $ => prec.right(
      seq(
        $.field,
        repeat(seq($.delimiter, $.field)),
        optional($.delimiter)
      )
    ),

    field: $ => seq($.tag, $.equals, $.value),

    equals: _ => "=",
    tag: _ => /[0-9]+/,
    value: _ => token.immediate(/[^\u0001|]*/),

    delimiter: _ => token(choice("\u0001", "|")),
  },
});
