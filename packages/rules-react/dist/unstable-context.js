"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unstableContextRule = void 0;
const prism_guard_core_1 = require("@riturathinsharma/prism-guard-core");
const traverse_1 = __importDefault(require("@babel/traverse"));
exports.unstableContextRule = {
    id: "unstable-context",
    name: "Unstable Context Value",
    category: "react",
    severity: "warning",
    run(context) {
        const diagnostics = [];
        (0, traverse_1.default)(context.ast, {
            JSXOpeningElement(path) {
                const name = path.node.name;
                if (name.type !== "JSXMemberExpression")
                    return;
                if (name.property.type !== "JSXIdentifier" ||
                    name.property.name !== "Provider") {
                    return;
                }
                const valueAttr = path.node.attributes.find(attr => attr.type === "JSXAttribute" &&
                    attr.name.type === "JSXIdentifier" &&
                    attr.name.name === "value");
                if (!valueAttr ||
                    valueAttr.type !== "JSXAttribute" ||
                    !valueAttr.value ||
                    valueAttr.value.type !== "JSXExpressionContainer") {
                    return;
                }
                const expr = valueAttr.value.expression;
                if (expr.type === "ObjectExpression" || expr.type === "ArrayExpression") {
                    diagnostics.push((0, prism_guard_core_1.createDiagnostic)(exports.unstableContextRule, context.file, expr, "Inline object/array passed as Context.Provider value", "Memoize the context value with useMemo to avoid unnecessary re-renders"));
                }
            }
        });
        return diagnostics;
    }
};
