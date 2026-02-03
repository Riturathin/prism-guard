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
    react: {
        maxProps: 7,
        maxComponentLines: 250,
        maxHooks: 5,
        maxJSXDepth: 4,
        requireMemoInLists: true
    },
    severity: {
        failOn: "high"
    }
};
function loadConfig() {
    const configPath = path_1.default.resolve(process.cwd(), "prism.config.json");
    if (!fs_1.default.existsSync(configPath)) {
        return exports.DEFAULT_CONFIG;
    }
    const userConfig = JSON.parse(fs_1.default.readFileSync(configPath, "utf-8"));
    return {
        ...exports.DEFAULT_CONFIG,
        ...userConfig,
        react: {
            ...exports.DEFAULT_CONFIG.react,
            ...userConfig.react
        }
    };
}
