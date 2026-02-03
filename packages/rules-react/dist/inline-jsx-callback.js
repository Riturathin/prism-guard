"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findInlineJSXCallbacks = findInlineJSXCallbacks;
const parser_1 = require("@babel/parser");
const traverse_1 = __importDefault(require("@babel/traverse"));
function findInlineJSXCallbacks(code, file) {
    const issues = [];
    const ast = (0, parser_1.parse)(code, {
        sourceType: "module",
        plugins: ["typescript", "jsx"]
    });
    (0, traverse_1.default)(ast, {
        JSXAttribute(path) {
            const value = path.node.value;
            if (!value || value.type !== "JSXExpressionContainer")
                return;
            const expr = value.expression;
            if (expr.type === "ArrowFunctionExpression" ||
                expr.type === "FunctionExpression") {
                const line = expr.loc?.start.line ?? 0;
                issues.push({ file, line });
            }
        }
    });
    return issues;
}
