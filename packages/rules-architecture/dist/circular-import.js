"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.circularImportRule = void 0;
const path_1 = __importDefault(require("path"));
const core_1 = require("@prism-guard/core");
exports.circularImportRule = {
    id: "circular-import",
    name: "Circular Import",
    category: "architecture",
    severity: "error",
    run(context) {
        if (!context.project)
            return [];
        const cycles = (0, core_1.findCycles)(context.project.importGraph);
        const diagnostics = [];
        const seen = new Set();
        for (const cycle of cycles) {
            const key = cycle.sort().join("->");
            if (seen.has(key))
                continue;
            seen.add(key);
            if (!cycle.includes(path_1.default.resolve(context.file)))
                continue;
            diagnostics.push((0, core_1.createDiagnostic)(exports.circularImportRule, context.file, null, `Circular import detected: ${formatCycle(cycle)}`, "Refactor shared logic into a separate module to break the cycle"));
        }
        return diagnostics;
    }
};
function formatCycle(cycle) {
    const names = cycle.map(f => path_1.default.basename(f));
    return [...new Set(names)].join(" → ") + (names[0] === names[names.length - 1] ? "" : ` → ${names[0]}`);
}
