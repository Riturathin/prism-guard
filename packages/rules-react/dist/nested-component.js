"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nestedComponentRule = void 0;
const prism_guard_core_1 = require("@riturathinsharma/prism-guard-core");
const traverse_1 = __importDefault(require("@babel/traverse"));
exports.nestedComponentRule = {
    id: "nested-component",
    name: "Nested Component",
    category: "react",
    severity: "warning",
    run(context) {
        const diagnostics = [];
        (0, traverse_1.default)(context.ast, {
            FunctionDeclaration(outerPath) {
                if (!outerPath.node.id || !/^[A-Z]/.test(outerPath.node.id.name))
                    return;
                outerPath.traverse({
                    FunctionDeclaration(innerPath) {
                        if (innerPath === outerPath)
                            return;
                        if (innerPath.node.id && /^[A-Z]/.test(innerPath.node.id.name)) {
                            diagnostics.push((0, prism_guard_core_1.createDiagnostic)(exports.nestedComponentRule, context.file, innerPath.node, `Component "${innerPath.node.id.name}" defined inside "${outerPath.node.id?.name ?? "component"}"`, "Move nested components outside to prevent remounting on every parent render"));
                        }
                    },
                    VariableDeclarator(innerPath) {
                        const init = innerPath.node.init;
                        if (init &&
                            (init.type === "ArrowFunctionExpression" || init.type === "FunctionExpression") &&
                            innerPath.node.id.type === "Identifier" &&
                            /^[A-Z]/.test(innerPath.node.id.name) &&
                            hasJSXInBody(init.body)) {
                            diagnostics.push((0, prism_guard_core_1.createDiagnostic)(exports.nestedComponentRule, context.file, init, `Component "${innerPath.node.id.name}" defined inside "${outerPath.node.id?.name ?? "component"}"`, "Move nested components outside to prevent remounting on every parent render"));
                        }
                    }
                });
            }
        });
        return diagnostics;
    }
};
function hasJSXInBody(body) {
    if (!body || typeof body !== "object")
        return false;
    const b = body;
    if (b.type === "JSXElement" || b.type === "JSXFragment")
        return true;
    return JSON.stringify(body).includes('"JSXElement"');
}
