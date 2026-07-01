"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.layerViolationRule = exports.dependencyDirectionRule = void 0;
const path_1 = __importDefault(require("path"));
const core_1 = require("@prism-guard/core");
const traverse_1 = __importDefault(require("@babel/traverse"));
const LAYER_ORDER = ["ui", "features", "shared", "data"];
exports.dependencyDirectionRule = {
    id: "dependency-direction",
    name: "Dependency Direction",
    category: "architecture",
    severity: "warning",
    run(context) {
        const layers = context.config.architecture?.layers ?? LAYER_ORDER;
        const fileLayer = getLayer(context.file, layers);
        if (fileLayer === null)
            return [];
        const fileRank = layers.indexOf(fileLayer);
        const diagnostics = [];
        (0, traverse_1.default)(context.ast, {
            ImportDeclaration(path) {
                const source = path.node.source.value;
                if (!source.startsWith("."))
                    return;
                const resolved = path_1.default.resolve(path_1.default.dirname(context.file), source);
                const importLayer = getLayer(resolved, layers);
                if (importLayer === null)
                    return;
                const importRank = layers.indexOf(importLayer);
                if (importRank < fileRank) {
                    diagnostics.push((0, core_1.createDiagnostic)(exports.dependencyDirectionRule, context.file, path.node, `Layer violation: "${fileLayer}" imports from upper layer "${importLayer}"`, "Dependencies should flow downward (ui → features → shared → data)"));
                }
            }
        });
        return diagnostics;
    }
};
function getLayer(filePath, layers) {
    const normalized = filePath.replace(/\\/g, "/");
    for (const layer of layers) {
        if (normalized.includes(`/${layer}/`))
            return layer;
    }
    return null;
}
exports.layerViolationRule = {
    id: "layer-violation",
    name: "Layer Violation",
    category: "architecture",
    severity: "error",
    run: exports.dependencyDirectionRule.run
};
