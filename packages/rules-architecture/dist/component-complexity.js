"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentComplexityRule = void 0;
const prism_guard_core_1 = require("@riturathinsharma/prism-guard-core");
const traverse_1 = __importDefault(require("@babel/traverse"));
exports.componentComplexityRule = {
    id: "component-complexity",
    name: "Component Complexity",
    category: "maintainability",
    severity: "warning",
    run(context) {
        const maxHooks = context.config.react?.maxHooks ?? 5;
        const diagnostics = [];
        (0, traverse_1.default)(context.ast, {
            FunctionDeclaration(path) {
                if (!path.node.id || !/^[A-Z]/.test(path.node.id.name))
                    return;
                checkComponent(path.node.id.name, path.node.body, path.node, maxHooks, context, diagnostics);
            },
            VariableDeclarator(path) {
                if (path.node.id.type === "Identifier" &&
                    /^[A-Z]/.test(path.node.id.name) &&
                    path.node.init &&
                    (path.node.init.type === "ArrowFunctionExpression" || path.node.init.type === "FunctionExpression")) {
                    checkComponent(path.node.id.name, path.node.init.body, path.node.init, maxHooks, context, diagnostics);
                }
            }
        });
        return diagnostics;
    }
};
function checkComponent(name, body, node, maxHooks, context, diagnostics) {
    const json = JSON.stringify(body);
    const hookCount = (json.match(/"name":"use[A-Z]/g) ?? []).length;
    const jsxDepth = estimateJsxDepth(body);
    const maxDepth = context.config.react?.maxJSXDepth ?? 4;
    if (hookCount > maxHooks) {
        diagnostics.push((0, prism_guard_core_1.createDiagnostic)(exports.componentComplexityRule, context.file, node, `Component "${name}" uses ${hookCount} hooks (max ${maxHooks})`, "Extract logic into custom hooks or split the component"));
    }
    if (jsxDepth > maxDepth) {
        diagnostics.push((0, prism_guard_core_1.createDiagnostic)(exports.componentComplexityRule, context.file, node, `Component "${name}" has JSX nesting depth ${jsxDepth} (max ${maxDepth})`, "Extract nested JSX into sub-components"));
    }
}
function estimateJsxDepth(body) {
    let max = 0;
    let current = 0;
    function walk(obj) {
        if (!obj || typeof obj !== "object")
            return;
        const node = obj;
        if (node.type === "JSXElement") {
            current += 1;
            max = Math.max(max, current);
        }
        if (Array.isArray(node.children))
            node.children.forEach(walk);
        if (node.openingElement)
            walk(node);
        if (Array.isArray(node.body))
            node.body.forEach(walk);
        if (node.type === "JSXElement")
            current -= 1;
    }
    walk(body);
    return max;
}
