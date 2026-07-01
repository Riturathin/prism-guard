import fs from "fs"
import path from "path"
import type { AnalysisResult, PrismConfig, ProjectContext, Rule } from "./types"
import { RuleRegistry } from "./registry"
import { discoverFiles } from "./files"
import { parseSource, isSourceFile } from "./utils/ast"
import { buildImportGraph } from "./import-graph"

export interface AnalyzeOptions {
  root?: string
  config: PrismConfig
  registry: RuleRegistry
}

export function analyze(options: AnalyzeOptions): AnalysisResult {
  const start = Date.now()
  const root = path.resolve(options.root ?? process.cwd())
  console.log("Analyzer root:", root)
  const config = { ...options.config, root }

  const allFiles = discoverFiles(root, config)
  console.log("Files discovered:", allFiles.length)
  console.log(allFiles.slice(0, 5))
  const sourceFiles = allFiles.filter(isSourceFile)
  const importGraph = buildImportGraph(sourceFiles, root)

  const project: ProjectContext = {
    files: sourceFiles,
    importGraph
  }

  const rules = options.registry.getEnabledRules(config)
  const diagnostics = runRules(rules, sourceFiles, config, project)

  return {
    diagnostics,
    filesAnalyzed: sourceFiles.length,
    rulesRun: rules.length,
    durationMs: Date.now() - start
  }
}

function runRules(
  rules: Rule[],
  files: string[],
  config: PrismConfig,
  project: ProjectContext
) {
  const results = []

  for (const file of files) {
    const code = fs.readFileSync(file, "utf-8")
    let ast
    try {
      ast = parseSource(code, file)
    } catch {
      continue
    }

    const context = { file, code, ast, config, project }

    for (const rule of rules) {
      try {
        results.push(...rule.run(context))
      } catch {
        // Skip rules that fail on a single file
      }
    }
  }

  return results
}
