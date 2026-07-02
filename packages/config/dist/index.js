"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CONFIG = void 0;
exports.defineConfig = defineConfig;
const core_1 = require("@prism-guard/core");
Object.defineProperty(exports, "DEFAULT_CONFIG", { enumerable: true, get: function () { return core_1.DEFAULT_CONFIG; } });
function defineConfig(config) {
    return {
        ...core_1.DEFAULT_CONFIG,
        ...config,
        react: { ...core_1.DEFAULT_CONFIG.react, ...config.react },
        performance: { ...core_1.DEFAULT_CONFIG.performance, ...config.performance },
        architecture: { ...core_1.DEFAULT_CONFIG.architecture, ...config.architecture },
        severity: { ...core_1.DEFAULT_CONFIG.severity, ...config.severity },
        rules: { ...core_1.DEFAULT_CONFIG.rules, ...config.rules }
    };
}
