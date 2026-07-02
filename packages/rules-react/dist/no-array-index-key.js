"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noArrayIndexKeyRule = void 0;
const prism_guard_core_1 = require("@riturathinsharma/prism-guard-core");
const traverse_1 = __importDefault(require("@babel/traverse"));
const INDEX_NAMES = new Set(["index", "i", "idx", "key"]);
exports.noArrayIndexKeyRule = {
    id: "no-array-index-key",
    name: "No Array Index Key",
    category: "react",
    severity: "warning",
    run(context) {
        const diagnostics = [];
        (0, traverse_1.default)(context.ast, {
            JSXAttribute(path) {
                if (path.node.name.type !== "JSXIdentifier" || path.node.name.name !== "key")
                    return;
                const value = path.node.value;
                if (!value || value.type !== "JSXExpressionContainer")
                    return;
                const expr = value.expression;
                if (expr.type === "Identifier" && INDEX_NAMES.has(expr.name)) {
                    diagnostics.push((0, prism_guard_core_1.createDiagnostic)(exports.noArrayIndexKeyRule, context.file, expr, `Array index "${expr.name}" used as React key`, "Use a stable unique identifier from your data instead of array index"));
                }
                if (expr.type === "MemberExpression" && expr.property.type === "Identifier") {
                    if (INDEX_NAMES.has(expr.property.name)) {
                        diagnostics.push((0, prism_guard_core_1.createDiagnostic)(exports.noArrayIndexKeyRule, context.file, expr, "Array index used as React key", "Use a stable unique identifier from your data instead of array index"));
                    }
                }
            }
        });
        return diagnostics;
    }
};
