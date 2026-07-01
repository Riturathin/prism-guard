"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noInlineCallbackRule = void 0;
const core_1 = require("@prism-guard/core");
const traverse_1 = __importDefault(require("@babel/traverse"));
exports.noInlineCallbackRule = {
    id: "no-inline-callback",
    name: "No Inline Callback",
    category: "react",
    severity: "warning",
    run(context) {
        const diagnostics = [];
        (0, traverse_1.default)(context.ast, {
            JSXAttribute(path) {
                const value = path.node.value;
                if (!value || value.type !== "JSXExpressionContainer")
                    return;
                const expr = value.expression;
                if (expr.type === "ArrowFunctionExpression" ||
                    expr.type === "FunctionExpression") {
                    diagnostics.push((0, core_1.createDiagnostic)(exports.noInlineCallbackRule, context.file, expr, "Inline callback in JSX attribute causes unnecessary re-renders", "Extract the callback to useCallback or a named handler outside JSX"));
                }
            }
        });
        return diagnostics;
    }
};
