"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildImportGraph = buildImportGraph;
exports.findCycles = findCycles;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const traverse_1 = __importDefault(require("@babel/traverse"));
const ast_1 = require("./utils/ast");
const RESOLVE_EXTENSIONS = [".tsx", ".ts", ".jsx", ".js", "/index.tsx", "/index.ts", "/index.jsx", "/index.js"];
function buildImportGraph(files, root) {
    const graph = new Map();
    const fileSet = new Set(files.map(f => path_1.default.resolve(f)));
    for (const file of files) {
        if (!(0, ast_1.isSourceFile)(file))
            continue;
        const imports = extractImports(file, root, fileSet);
        graph.set(path_1.default.resolve(file), imports);
    }
    return graph;
}
function extractImports(file, root, fileSet) {
    const code = fs_1.default.readFileSync(file, "utf-8");
    let ast;
    try {
        ast = (0, ast_1.parseSource)(code, file);
    }
    catch {
        return [];
    }
    const resolved = [];
    (0, traverse_1.default)(ast, {
        ImportDeclaration(nodePath) {
            const source = nodePath.node.source.value;
            if (!source.startsWith("."))
                return;
            const resolvedPath = resolveRelativeImport(file, source, root, fileSet);
            if (resolvedPath)
                resolved.push(resolvedPath);
        }
    });
    return resolved;
}
function resolveRelativeImport(from, source, root, fileSet) {
    const dir = path_1.default.dirname(from);
    const base = path_1.default.resolve(dir, source);
    for (const ext of RESOLVE_EXTENSIONS) {
        const candidate = ext.startsWith("/") ? base + ext : base + ext;
        if (fileSet.has(candidate))
            return candidate;
    }
    if (fileSet.has(base))
        return base;
    return null;
}
function findCycles(graph) {
    const cycles = [];
    const visited = new Set();
    const stack = new Set();
    const pathStack = [];
    function dfs(node) {
        if (stack.has(node)) {
            const cycleStart = pathStack.indexOf(node);
            if (cycleStart >= 0) {
                cycles.push([...pathStack.slice(cycleStart), node]);
            }
            return;
        }
        if (visited.has(node))
            return;
        visited.add(node);
        stack.add(node);
        pathStack.push(node);
        for (const neighbor of graph.get(node) ?? []) {
            dfs(neighbor);
        }
        pathStack.pop();
        stack.delete(node);
    }
    for (const node of graph.keys()) {
        dfs(node);
    }
    return cycles;
}
