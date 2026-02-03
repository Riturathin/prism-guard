"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = validateConfig;
function validateConfig(config) {
    const warnings = [];
    const react = config.react;
    if (react?.maxProps > 12) {
        warnings.push("react.maxProps is set unusually high (recommended ≤ 7)");
    }
    if (react?.maxComponentLines > 400) {
        warnings.push("react.maxComponentLines may hide oversized components");
    }
    return warnings;
}
