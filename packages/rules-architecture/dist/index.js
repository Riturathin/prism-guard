"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentComplexityRule = exports.cognitiveComplexityRule = exports.duplicateHooksRule = exports.excessivePropsRule = exports.folderBoundaryRule = exports.layerViolationRule = exports.dependencyDirectionRule = exports.featureBoundaryRule = exports.circularImportRule = exports.architectureRules = void 0;
const circular_import_1 = require("./circular-import");
Object.defineProperty(exports, "circularImportRule", { enumerable: true, get: function () { return circular_import_1.circularImportRule; } });
const feature_boundary_1 = require("./feature-boundary");
Object.defineProperty(exports, "featureBoundaryRule", { enumerable: true, get: function () { return feature_boundary_1.featureBoundaryRule; } });
const dependency_direction_1 = require("./dependency-direction");
Object.defineProperty(exports, "dependencyDirectionRule", { enumerable: true, get: function () { return dependency_direction_1.dependencyDirectionRule; } });
Object.defineProperty(exports, "layerViolationRule", { enumerable: true, get: function () { return dependency_direction_1.layerViolationRule; } });
const folder_boundary_1 = require("./folder-boundary");
Object.defineProperty(exports, "folderBoundaryRule", { enumerable: true, get: function () { return folder_boundary_1.folderBoundaryRule; } });
const excessive_props_1 = require("./excessive-props");
Object.defineProperty(exports, "excessivePropsRule", { enumerable: true, get: function () { return excessive_props_1.excessivePropsRule; } });
const duplicate_hooks_1 = require("./duplicate-hooks");
Object.defineProperty(exports, "duplicateHooksRule", { enumerable: true, get: function () { return duplicate_hooks_1.duplicateHooksRule; } });
const cognitive_complexity_1 = require("./cognitive-complexity");
Object.defineProperty(exports, "cognitiveComplexityRule", { enumerable: true, get: function () { return cognitive_complexity_1.cognitiveComplexityRule; } });
const component_complexity_1 = require("./component-complexity");
Object.defineProperty(exports, "componentComplexityRule", { enumerable: true, get: function () { return component_complexity_1.componentComplexityRule; } });
exports.architectureRules = [
    circular_import_1.circularImportRule,
    feature_boundary_1.featureBoundaryRule,
    dependency_direction_1.dependencyDirectionRule,
    dependency_direction_1.layerViolationRule,
    folder_boundary_1.folderBoundaryRule,
    excessive_props_1.excessivePropsRule,
    duplicate_hooks_1.duplicateHooksRule,
    cognitive_complexity_1.cognitiveComplexityRule,
    component_complexity_1.componentComplexityRule
];
