"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excessivePropsRule = void 0;
const prism_guard_core_1 = require("@riturathinsharma/prism-guard-core");
const traverse_1 = __importDefault(require("@babel/traverse"));
exports.excessivePropsRule = {
    id: "excessive-props",
    name: "Excessive Props",
    category: "maintainability",
    severity: "warning",
    run(context) {
        const maxProps = context.config.react?.maxProps ?? 7;
        const diagnostics = [];
        (0, traverse_1.default)(context.ast, {
            FunctionDeclaration(path) {
                checkProps(path.node.params, path.node, maxProps, context, diagnostics);
            },
            ArrowFunctionExpression(path) {
                checkProps(path.node.params, path.node, maxProps, context, diagnostics);
            }
        });
        return diagnostics;
    }
};
function checkProps(params, node, maxProps, context, diagnostics) {
    const first = params[0];
    if (!first || first.type !== "ObjectPattern")
        return;
    const propCount = countProps(first);
    if (propCount > maxProps) {
        diagnostics.push((0, prism_guard_core_1.createDiagnostic)(exports.excessivePropsRule, context.file, node, `Component accepts ${propCount} props (max ${maxProps})`, "Group related props into objects or split the component"));
    }
}
function countProps(pattern) {
    return pattern.properties.filter(p => p.type === "ObjectProperty" || p.type === "RestElement").length;
}
