"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.featureBoundaryRule = void 0;
const path_1 = __importDefault(require("path"));
const prism_guard_core_1 = require("@riturathinsharma/prism-guard-core");
const traverse_1 = __importDefault(require("@babel/traverse"));
exports.featureBoundaryRule = {
    id: "feature-boundary",
    name: "Feature Boundary",
    category: "architecture",
    severity: "warning",
    run(context) {
        const featureDirs = context.config.architecture?.featureDirs ?? ["features"];
        const diagnostics = [];
        const fileFeature = getFeatureName(context.file, featureDirs);
        if (!fileFeature)
            return diagnostics;
        (0, traverse_1.default)(context.ast, {
            ImportDeclaration(path) {
                const source = path.node.source.value;
                if (!source.startsWith("."))
                    return;
                const resolved = path_1.default.resolve(path_1.default.dirname(context.file), source);
                const importFeature = getFeatureName(resolved, featureDirs);
                if (importFeature && importFeature !== fileFeature) {
                    diagnostics.push((0, prism_guard_core_1.createDiagnostic)(exports.featureBoundaryRule, context.file, path.node, `Cross-feature import from "${importFeature}" into "${fileFeature}"`, "Use shared modules or public feature APIs instead of direct cross-feature imports"));
                }
            }
        });
        return diagnostics;
    }
};
function getFeatureName(filePath, featureDirs) {
    const normalized = filePath.replace(/\\/g, "/");
    for (const dir of featureDirs) {
        const marker = `/${dir}/`;
        const idx = normalized.indexOf(marker);
        if (idx >= 0) {
            const rest = normalized.slice(idx + marker.length);
            return rest.split("/")[0] ?? null;
        }
    }
    return null;
}
