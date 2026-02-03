"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runReactRules = runReactRules;
const fs_1 = __importDefault(require("fs"));
const rules_react_1 = require("@prism-guard/rules-react");
function runReactRules(files) {
    const results = [];
    for (const file of files) {
        if (!file.endsWith(".tsx") && !file.endsWith(".jsx"))
            continue;
        const code = fs_1.default.readFileSync(file, "utf-8");
        const issues = (0, rules_react_1.findInlineJSXCallbacks)(code, file);
        results.push(...issues);
    }
    return results;
}
