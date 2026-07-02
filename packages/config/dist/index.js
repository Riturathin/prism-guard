"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CONFIG = void 0;
exports.defineConfig = defineConfig;
const prism_guard_core_1 = require("@riturathinsharma/prism-guard-core");
Object.defineProperty(exports, "DEFAULT_CONFIG", { enumerable: true, get: function () { return prism_guard_core_1.DEFAULT_CONFIG; } });
function defineConfig(config) {
    return {
        ...prism_guard_core_1.DEFAULT_CONFIG,
        ...config,
        react: { ...prism_guard_core_1.DEFAULT_CONFIG.react, ...config.react },
        performance: { ...prism_guard_core_1.DEFAULT_CONFIG.performance, ...config.performance },
        architecture: { ...prism_guard_core_1.DEFAULT_CONFIG.architecture, ...config.architecture },
        severity: { ...prism_guard_core_1.DEFAULT_CONFIG.severity, ...config.severity },
        rules: { ...prism_guard_core_1.DEFAULT_CONFIG.rules, ...config.rules }
    };
}
