"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSource = parseSource;
exports.loc = loc;
exports.isReactFile = isReactFile;
exports.isSourceFile = isSourceFile;
const parser_1 = require("@babel/parser");
function parseSource(code, filename) {
    return (0, parser_1.parse)(code, {
        sourceType: "module",
        plugins: ["typescript", "jsx"],
        sourceFilename: filename
    });
}
function loc(node) {
    return {
        line: node?.loc?.start.line ?? 1,
        column: node?.loc?.start.column ?? 0
    };
}
function isReactFile(file) {
    return file.endsWith(".tsx") || file.endsWith(".jsx");
}
function isSourceFile(file) {
    return /\.(tsx?|jsx?)$/.test(file);
}
