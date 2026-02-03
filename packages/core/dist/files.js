"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.discoverFiles = discoverFiles;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const IGNORE_DIRS = new Set([
    "node_modules",
    "dist",
    "build",
    ".git"
]);
function discoverFiles(root, results = []) {
    const entries = fs_1.default.readdirSync(root, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path_1.default.join(root, entry.name);
        if (entry.isDirectory()) {
            if (!IGNORE_DIRS.has(entry.name)) {
                discoverFiles(fullPath, results);
            }
        }
        else {
            results.push(fullPath);
        }
    }
    return results;
}
