import fs from "fs"
import path from "path"
import traverse from "@babel/traverse"
import { parseSource, isSourceFile } from "./utils/ast"

const RESOLVE_EXTENSIONS = [".tsx", ".ts", ".jsx", ".js", "/index.tsx", "/index.ts", "/index.jsx", "/index.js"]

export function buildImportGraph(files: string[], root: string): Map<string, string[]> {
  const graph = new Map<string, string[]>()
  const fileSet = new Set(files.map(f => path.resolve(f)))

  for (const file of files) {
    if (!isSourceFile(file)) continue
    const imports = extractImports(file, root, fileSet)
    graph.set(path.resolve(file), imports)
  }

  return graph
}

function extractImports(file: string, root: string, fileSet: Set<string>): string[] {
  const code = fs.readFileSync(file, "utf-8")
  let ast
  try {
    ast = parseSource(code, file)
  } catch {
    return []
  }

  const resolved: string[] = []

  traverse(ast, {
    ImportDeclaration(nodePath) {
      const source = nodePath.node.source.value
      if (!source.startsWith(".")) return
      const resolvedPath = resolveRelativeImport(file, source, root, fileSet)
      if (resolvedPath) resolved.push(resolvedPath)
    }
  })

  return resolved
}

function resolveRelativeImport(from: string, source: string, root: string, fileSet: Set<string>): string | null {
  const dir = path.dirname(from)
  const base = path.resolve(dir, source)

  for (const ext of RESOLVE_EXTENSIONS) {
    const candidate = ext.startsWith("/") ? base + ext : base + ext
    if (fileSet.has(candidate)) return candidate
  }

  if (fileSet.has(base)) return base
  return null
}

export function findCycles(graph: Map<string, string[]>): string[][] {
  const cycles: string[][] = []
  const visited = new Set<string>()
  const stack = new Set<string>()
  const pathStack: string[] = []

  function dfs(node: string): void {
    if (stack.has(node)) {
      const cycleStart = pathStack.indexOf(node)
      if (cycleStart >= 0) {
        cycles.push([...pathStack.slice(cycleStart), node])
      }
      return
    }
    if (visited.has(node)) return

    visited.add(node)
    stack.add(node)
    pathStack.push(node)

    for (const neighbor of graph.get(node) ?? []) {
      dfs(neighbor)
    }

    pathStack.pop()
    stack.delete(node)
  }

  for (const node of graph.keys()) {
    dfs(node)
  }

  return cycles
}
