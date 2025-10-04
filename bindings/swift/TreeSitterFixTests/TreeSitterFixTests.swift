import XCTest
import SwiftTreeSitter
import TreeSitterFix

final class TreeSitterFixTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_fix())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Financial Information eXchange (FIX®) protocol grammar for tree-sitter grammar")
    }
}
