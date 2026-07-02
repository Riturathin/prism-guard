"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.folderBoundaryRule = void 0;
const path_1 = __importDefault(require("path"));
const prism_guard_core_1 = require("@riturathinsharma/prism-guard-core");
const ALLOWED_ROOTS = ["src", "app", "components", "features", "pages", "lib", "hooks", "utils"];
exports.folderBoundaryRule = {
    id: "folder-boundary",
    name: "Folder Boundary",
    category: "architecture",
    severity: "info",
    run(context) {
        const diagnostics = [];
        const projectRoot = (context.config.root ?? process.cwd()).replace(/\\/g, "/");
        const normalized = context.file.replace(/\\/g, "/");
        const relative = normalized.startsWith(projectRoot + "/")
            ? normalized.slice(projectRoot.length + 1)
            : path_1.default.basename(normalized);
        const inAllowedRoot = ALLOWED_ROOTS.some(root => relative.startsWith(`${root}/`) || relative.split("/")[0] === root);
        if (!inAllowedRoot && (relative.endsWith(".tsx") || relative.endsWith(".jsx"))) {
            diagnostics.push((0, prism_guard_core_1.createDiagnostic)(exports.folderBoundaryRule, context.file, null, "React component outside standard folder structure", `Place components under one of: ${ALLOWED_ROOTS.join(", ")}`));
        }
        const depth = relative.split("/").length;
        if (depth > 6) {
            diagnostics.push((0, prism_guard_core_1.createDiagnostic)(exports.folderBoundaryRule, context.file, null, `Deeply nested file path (depth ${depth})`, "Flatten folder structure to improve discoverability"));
        }
        return diagnostics;
    }
};
