"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noAnonymousComponentRule = void 0;
const core_1 = require("@prism-guard/core");
const traverse_1 = __importDefault(require("@babel/traverse"));
exports.noAnonymousComponentRule = {
    id: "no-anonymous-component",
    name: "No Anonymous Component",
    category: "react",
    severity: "warning",
    run(context) {
        const diagnostics = [];
        (0, traverse_1.default)(context.ast, {
            ExportDefaultDeclaration(path) {
                const decl = path.node.declaration;
                if (decl.type === "FunctionExpression" && !decl.id) {
                    diagnostics.push((0, core_1.createDiagnostic)(exports.noAnonymousComponentRule, context.file, decl, "Anonymous default-exported component", "Name your component for better debugging and DevTools support"));
                }
                if (decl.type === "FunctionDeclaration" && !decl.id) {
                    diagnostics.push((0, core_1.createDiagnostic)(exports.noAnonymousComponentRule, context.file, decl, "Anonymous default-exported component", "Name your component for better debugging and DevTools support"));
                }
            },
            JSXExpressionContainer(path) {
                const expr = path.node.expression;
                if ((expr.type === "ArrowFunctionExpression" || expr.type === "FunctionExpression") &&
                    (expr.type === "FunctionExpression" ? !expr.id : true) &&
                    hasJSXReturn(expr.body)) {
                    diagnostics.push((0, core_1.createDiagnostic)(exports.noAnonymousComponentRule, context.file, expr, "Anonymous inline component in JSX", "Extract inline components to named functions or separate files"));
                }
            }
        });
        return diagnostics;
    }
};
function hasJSXReturn(body) {
    if (!body || typeof body !== "object")
        return false;
    const b = body;
    if (b.type === "JSXElement" || b.type === "JSXFragment")
        return true;
    if (b.type === "BlockStatement" && Array.isArray(b.body)) {
        return b.body.some(stmt => typeof stmt === "object" &&
            stmt !== null &&
            stmt.type === "ReturnStatement" &&
            hasJSXReturn(stmt.argument));
    }
    return false;
}
