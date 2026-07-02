"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excessiveUseEffectRule = void 0;
const core_1 = require("@prism-guard/core");
const traverse_1 = __importDefault(require("@babel/traverse"));
exports.excessiveUseEffectRule = {
    id: "excessive-useeffect",
    name: "Excessive useEffect",
    category: "react",
    severity: "warning",
    run(context) {
        const maxEffects = context.config.react?.maxUseEffects ?? 3;
        const diagnostics = [];
        const componentEffects = new Map();
        (0, traverse_1.default)(context.ast, {
            CallExpression(path) {
                if (!isUseEffectCall(path.node))
                    return;
                const componentName = findEnclosingComponent(path);
                const key = componentName ?? context.file;
                const existing = componentEffects.get(key);
                if (existing) {
                    existing.count += 1;
                }
                else {
                    componentEffects.set(key, { count: 1, node: path.node });
                }
            }
        });
        for (const [component, { count, node }] of componentEffects) {
            if (count > maxEffects) {
                diagnostics.push((0, core_1.createDiagnostic)(exports.excessiveUseEffectRule, context.file, node, `Component "${component}" has ${count} useEffect calls (max ${maxEffects})`, "Consolidate effects, derive state, or extract custom hooks"));
            }
        }
        return diagnostics;
    }
};
function isUseEffectCall(node) {
    return (node.callee.type === "Identifier" && node.callee.name === "useEffect");
}
function findEnclosingComponent(path) {
    let current = path.parentPath;
    while (current) {
        if (current.isFunctionDeclaration() && current.node.id?.name) {
            return current.node.id.name;
        }
        if (current.isVariableDeclarator() && current.node.id.type === "Identifier") {
            return current.node.id.name;
        }
        current = current.parentPath;
    }
    return null;
}
