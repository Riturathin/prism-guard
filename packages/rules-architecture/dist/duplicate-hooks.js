"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.duplicateHooksRule = void 0;
const prism_guard_core_1 = require("@riturathinsharma/prism-guard-core");
const traverse_1 = __importDefault(require("@babel/traverse"));
exports.duplicateHooksRule = {
    id: "duplicate-hooks",
    name: "Duplicate Hooks",
    category: "maintainability",
    severity: "warning",
    run(context) {
        const diagnostics = [];
        const hookCounts = new Map();
        (0, traverse_1.default)(context.ast, {
            CallExpression(path) {
                const hookName = getHookName(path.node);
                if (!hookName)
                    return;
                const existing = hookCounts.get(hookName);
                if (existing) {
                    existing.count += 1;
                }
                else {
                    hookCounts.set(hookName, { count: 1, node: path.node });
                }
            }
        });
        for (const [hook, { count, node }] of hookCounts) {
            if (count > 1) {
                diagnostics.push((0, prism_guard_core_1.createDiagnostic)(exports.duplicateHooksRule, context.file, node, `Hook "${hook}" called ${count} times in the same component`, "Extract shared hook logic into a custom hook"));
            }
        }
        return diagnostics;
    }
};
function getHookName(node) {
    if (node.callee.type === "Identifier" && node.callee.name.startsWith("use")) {
        return node.callee.name;
    }
    return null;
}
