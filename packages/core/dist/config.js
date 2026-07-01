"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CONFIG = void 0;
exports.loadConfig = loadConfig;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.DEFAULT_CONFIG = {
    include: ["**/*.{tsx,ts,jsx,js}"],
    exclude: ["**/node_modules/**", "**/dist/**", "**/build/**"],
    rules: {},
    react: {
        maxProps: 7,
        maxComponentLines: 250,
        maxHooks: 5,
        maxJSXDepth: 4,
        maxUseEffects: 3,
        requireMemoInLists: true
    },
    performance: {
        bundleBudgetKb: 500,
        heavyImports: ["lodash", "moment", "@mui/material", "antd"]
    },
    architecture: {
        layers: ["ui", "features", "shared", "data"],
        featureDirs: ["features"]
    },
    severity: {
        failOn: "error"
    }
};
function loadConfig(configPath) {
    const cwd = process.cwd();
    if (configPath) {
        return loadConfigFile(path_1.default.resolve(cwd, configPath));
    }
    const jsonPath = path_1.default.resolve(cwd, "prism.config.json");
    if (fs_1.default.existsSync(jsonPath)) {
        return loadConfigFile(jsonPath);
    }
    const tsPath = path_1.default.resolve(cwd, "prism.config.ts");
    if (fs_1.default.existsSync(tsPath)) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const userConfig = require(tsPath).default ?? require(tsPath);
        return mergeConfig(userConfig);
    }
    return { ...exports.DEFAULT_CONFIG };
}
function loadConfigFile(filePath) {
    if (filePath.endsWith(".json")) {
        const userConfig = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
        return mergeConfig(userConfig);
    }
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const userConfig = require(filePath).default ?? require(filePath);
    return mergeConfig(userConfig);
}
function mergeConfig(userConfig) {
    return {
        ...exports.DEFAULT_CONFIG,
        ...userConfig,
        react: { ...exports.DEFAULT_CONFIG.react, ...userConfig.react },
        performance: { ...exports.DEFAULT_CONFIG.performance, ...userConfig.performance },
        architecture: { ...exports.DEFAULT_CONFIG.architecture, ...userConfig.architecture },
        severity: { ...exports.DEFAULT_CONFIG.severity, ...userConfig.severity },
        rules: { ...exports.DEFAULT_CONFIG.rules, ...userConfig.rules }
    };
}
