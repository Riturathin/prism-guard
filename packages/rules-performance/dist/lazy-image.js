"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazyImageRule = void 0;
const core_1 = require("@prism-guard/core");
const traverse_1 = __importDefault(require("@babel/traverse"));
exports.lazyImageRule = {
    id: "lazy-image",
    name: "Lazy Image",
    category: "performance",
    severity: "info",
    run(context) {
        const diagnostics = [];
        (0, traverse_1.default)(context.ast, {
            JSXOpeningElement(path) {
                const name = path.node.name;
                if (name.type !== "JSXIdentifier" || name.name !== "img")
                    return;
                const hasLazy = path.node.attributes.some(attr => attr.type === "JSXAttribute" &&
                    attr.name.type === "JSXIdentifier" &&
                    attr.name.name === "loading" &&
                    attr.value?.type === "StringLiteral" &&
                    attr.value.value === "lazy");
                if (!hasLazy) {
                    diagnostics.push((0, core_1.createDiagnostic)(exports.lazyImageRule, context.file, path.node, "<img> without loading=\"lazy\"", "Add loading=\"lazy\" or use a lazy-loading image component"));
                }
            }
        });
        return diagnostics;
    }
};
