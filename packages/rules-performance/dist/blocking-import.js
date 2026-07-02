"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockingImportRule = void 0;
const prism_guard_core_1 = require("@riturathinsharma/prism-guard-core");
const traverse_1 = __importDefault(require("@babel/traverse"));
exports.blockingImportRule = {
    id: "blocking-import",
    name: "Blocking Import",
    category: "performance",
    severity: "warning",
    run(context) {
        const heavyImports = context.config.performance?.heavyImports ?? ["lodash", "moment"];
        const diagnostics = [];
        (0, traverse_1.default)(context.ast, {
            ImportDeclaration(path) {
                const source = path.node.source.value;
                const matched = heavyImports.find(lib => source === lib || source.startsWith(`${lib}/`));
                if (matched) {
                    diagnostics.push((0, prism_guard_core_1.createDiagnostic)(exports.blockingImportRule, context.file, path.node, `Heavy library "${matched}" imported synchronously`, "Use dynamic import() or import specific submodules to reduce bundle size"));
                }
            }
        });
        return diagnostics;
    }
};
