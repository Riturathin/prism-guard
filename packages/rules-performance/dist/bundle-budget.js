"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bundleBudgetRule = void 0;
const fs_1 = __importDefault(require("fs"));
const core_1 = require("@prism-guard/core");
exports.bundleBudgetRule = {
    id: "bundle-budget",
    name: "Bundle Budget",
    category: "performance",
    severity: "warning",
    run(context) {
        const budgetKb = context.config.performance?.bundleBudgetKb ?? 500;
        const diagnostics = [];
        try {
            const stats = fs_1.default.statSync(context.file);
            const sizeKb = stats.size / 1024;
            if (sizeKb > budgetKb) {
                diagnostics.push((0, core_1.createDiagnostic)(exports.bundleBudgetRule, context.file, null, `File size ${sizeKb.toFixed(1)}KB exceeds budget of ${budgetKb}KB`, "Split the module or lazy-load heavy dependencies"));
            }
        }
        catch {
            // skip
        }
        return diagnostics;
    }
};
