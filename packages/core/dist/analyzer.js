"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyze = analyze;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const files_1 = require("./files");
const ast_1 = require("./utils/ast");
const import_graph_1 = require("./import-graph");
function analyze(options) {
    const start = Date.now();
    const root = path_1.default.resolve(options.root ?? process.cwd());
    console.log("Analyzer root:", root);
    const config = { ...options.config, root };
    const allFiles = (0, files_1.discoverFiles)(root, config);
    console.log("Files discovered:", allFiles.length);
    console.log(allFiles.slice(0, 5));
    const sourceFiles = allFiles.filter(ast_1.isSourceFile);
    const importGraph = (0, import_graph_1.buildImportGraph)(sourceFiles, root);
    const project = {
        files: sourceFiles,
        importGraph
    };
    const rules = options.registry.getEnabledRules(config);
    const diagnostics = runRules(rules, sourceFiles, config, project);
    return {
        diagnostics,
        filesAnalyzed: sourceFiles.length,
        rulesRun: rules.length,
        durationMs: Date.now() - start
    };
}
function runRules(rules, files, config, project) {
    const results = [];
    for (const file of files) {
        const code = fs_1.default.readFileSync(file, "utf-8");
        let ast;
        try {
            ast = (0, ast_1.parseSource)(code, file);
        }
        catch {
            continue;
        }
        const context = { file, code, ast, config, project };
        for (const rule of rules) {
            try {
                results.push(...rule.run(context));
            }
            catch {
                // Skip rules that fail on a single file
            }
        }
    }
    return results;
}
