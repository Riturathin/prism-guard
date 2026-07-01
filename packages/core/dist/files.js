"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.discoverFiles = discoverFiles;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const DEFAULT_IGNORE = new Set(["node_modules", "dist", "build", ".git", "coverage"]);
function discoverFiles(root, config, results = []) {
    if (!fs_1.default.existsSync(root))
        return results;
    const entries = fs_1.default.readdirSync(root, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path_1.default.join(root, entry.name);
        const relative = path_1.default.relative(config?.root ?? process.cwd(), fullPath);
        if (entry.isDirectory()) {
            if (DEFAULT_IGNORE.has(entry.name))
                continue;
            if (config?.exclude?.some(pattern => matchGlob(relative, pattern)))
                continue;
            discoverFiles(fullPath, config, results);
        }
        else if (shouldInclude(fullPath, relative, config)) {
            results.push(fullPath);
        }
    }
    return results;
}
function shouldInclude(fullPath, relative, config) {
    if (config?.exclude?.some(pattern => matchGlob(relative, pattern))) {
        return false;
    }
    const includes = config?.include ?? ["**/*.{tsx,ts,jsx,js}"];
    return includes.some(pattern => matchGlob(relative, pattern) || matchGlob(fullPath, pattern));
}
function matchGlob(text, pattern) {
    const normalized = text.replace(/\\/g, "/");
    if (pattern.includes("{")) {
        const expanded = expandBraces(pattern);
        return expanded.some(p => matchGlob(normalized, p));
    }
    const regex = new RegExp("^" +
        pattern
            .replace(/\\/g, "/")
            .replace(/\./g, "\\.")
            .replace(/\*\*/g, "§§")
            .replace(/\*/g, "[^/]*")
            .replace(/§§/g, ".*") +
        "$");
    return regex.test(normalized) || normalized.endsWith(pattern.replace(/^\*\*\//, ""));
}
function expandBraces(pattern) {
    const match = pattern.match(/^(.*)\{([^}]+)\}(.*)$/);
    if (!match)
        return [pattern];
    const [, before, options, after] = match;
    return options.split(",").map(opt => `${before}${opt}${after}`);
}
