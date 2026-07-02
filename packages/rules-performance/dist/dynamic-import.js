"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicImportRule = void 0;
const prism_guard_core_1 = require("@riturathinsharma/prism-guard-core");
const traverse_1 = __importDefault(require("@babel/traverse"));
const LAZY_CANDIDATES = ["Chart", "Editor", "Modal", "Dashboard", "Map", "Calendar"];
exports.dynamicImportRule = {
    id: "dynamic-import",
    name: "Dynamic Import Suggestion",
    category: "performance",
    severity: "info",
    run(context) {
        const diagnostics = [];
        (0, traverse_1.default)(context.ast, {
            ImportDeclaration(path) {
                const source = path.node.source.value;
                if (!source.startsWith(".") && !source.startsWith("@/"))
                    return;
                const hasLazyCandidate = path.node.specifiers.some(spec => {
                    if (spec.type !== "ImportDefaultSpecifier" && spec.type !== "ImportSpecifier")
                        return false;
                    const name = spec.type === "ImportDefaultSpecifier"
                        ? spec.local.name
                        : spec.local.name;
                    return LAZY_CANDIDATES.some(c => name.includes(c));
                });
                if (hasLazyCandidate) {
                    diagnostics.push((0, prism_guard_core_1.createDiagnostic)(exports.dynamicImportRule, context.file, path.node, "Large component imported statically — consider lazy loading", "Use React.lazy() with dynamic import() for code splitting"));
                }
            }
        });
        return diagnostics;
    }
};
