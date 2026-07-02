"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expensiveRenderRule = void 0;
const prism_guard_core_1 = require("@riturathinsharma/prism-guard-core");
const traverse_1 = __importDefault(require("@babel/traverse"));
exports.expensiveRenderRule = {
    id: "expensive-render",
    name: "Expensive Render",
    category: "performance",
    severity: "warning",
    run(context) {
        const diagnostics = [];
        (0, traverse_1.default)(context.ast, {
            CallExpression(path) {
                if (!isArrayMapCall(path.node))
                    return;
                const parent = path.parentPath;
                if (!parent?.isJSXExpressionContainer())
                    return;
                const inListContext = path.findParent(p => p.isCallExpression() && isArrayMapCall(p.node));
                if (inListContext)
                    return;
                diagnostics.push((0, prism_guard_core_1.createDiagnostic)(exports.expensiveRenderRule, context.file, path.node, ".map() used directly in JSX without memoization", "Extract list rendering to a memoized child component or use useMemo"));
            }
        });
        return diagnostics;
    }
};
function isArrayMapCall(node) {
    return (node.callee.type === "MemberExpression" &&
        node.callee.property.type === "Identifier" &&
        node.callee.property.name === "map");
}
