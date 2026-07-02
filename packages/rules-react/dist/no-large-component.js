"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noLargeComponentRule = void 0;
const prism_guard_core_1 = require("@riturathinsharma/prism-guard-core");
const traverse_1 = __importDefault(require("@babel/traverse"));
exports.noLargeComponentRule = {
    id: "no-large-component",
    name: "No Large Component",
    category: "react",
    severity: "warning",
    run(context) {
        const maxLines = context.config.react?.maxComponentLines ?? 250;
        const diagnostics = [];
        (0, traverse_1.default)(context.ast, {
            FunctionDeclaration(path) {
                if (isLikelyComponent(path.node.id?.name, path.node)) {
                    checkSize(path.node, path.node, maxLines, context, diagnostics);
                }
            },
            ArrowFunctionExpression(path) {
                const parent = path.parent;
                if (parent.type === "VariableDeclarator" &&
                    parent.id.type === "Identifier" &&
                    isLikelyComponent(parent.id.name, path.node)) {
                    checkSize(path.node, path.node, maxLines, context, diagnostics);
                }
            }
        });
        return diagnostics;
    }
};
function isLikelyComponent(name, node) {
    if (name && /^[A-Z]/.test(name))
        return true;
    return hasJSXInBody(node.body);
}
function hasJSXInBody(body) {
    if (!body)
        return false;
    if (body.type === "JSXElement" || body.type === "JSXFragment")
        return true;
    if (body.type !== "BlockStatement")
        return false;
    return JSON.stringify(body).includes('"JSXElement"');
}
function checkSize(node, reportNode, maxLines, context, diagnostics) {
    const start = node.loc?.start.line ?? 0;
    const end = node.loc?.end.line ?? 0;
    const lineCount = end - start + 1;
    if (lineCount > maxLines) {
        diagnostics.push((0, prism_guard_core_1.createDiagnostic)(exports.noLargeComponentRule, context.file, reportNode, `Component spans ${lineCount} lines (max ${maxLines})`, "Split into smaller focused components or extract hooks and utilities"));
    }
}
