/**
 * @file Financial Information eXchange (FIX®) protocol grammar for tree-sitter
 * @author Sergey Lukashevich <sergey.lukashevi4@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "fix",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
