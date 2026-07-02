import nodePath from "path"
import type { Rule, RuleContext, Diagnostic } from "@riturathinsharma/prism-guard-core"
import { createDiagnostic } from "@riturathinsharma/prism-guard-core"
import traverse from "@babel/traverse"
import type { NodePath } from "@babel/traverse"
import type { ImportDeclaration } from "@babel/types"

const LAYER_ORDER = ["ui", "features", "shared", "data"]

export const dependencyDirectionRule: Rule = {
  id: "dependency-direction",
  name: "Dependency Direction",
  category: "architecture",
  severity: "warning",
  run(context: RuleContext): Diagnostic[] {
    const layers = context.config.architecture?.layers ?? LAYER_ORDER
    const fileLayer = getLayer(context.file, layers)
    if (fileLayer === null) return []

    const fileRank = layers.indexOf(fileLayer)
    const diagnostics: Diagnostic[] = []

    traverse(context.ast, {
      ImportDeclaration(path: NodePath<ImportDeclaration>) {
        const source = path.node.source.value
        if (!source.startsWith(".")) return

        const resolved = nodePath.resolve(nodePath.dirname(context.file), source)
        const importLayer = getLayer(resolved, layers)
        if (importLayer === null) return

        const importRank = layers.indexOf(importLayer)
        if (importRank < fileRank) {
          diagnostics.push(
            createDiagnostic(
              dependencyDirectionRule,
              context.file,
              path.node,
              `Layer violation: "${fileLayer}" imports from upper layer "${importLayer}"`,
              "Dependencies should flow downward (ui → features → shared → data)"
            )
          )
        }
      }
    })

    return diagnostics
  }
}

function getLayer(filePath: string, layers: string[]): string | null {
  const normalized = filePath.replace(/\\/g, "/")
  for (const layer of layers) {
    if (normalized.includes(`/${layer}/`)) return layer
  }
  return null
}

export const layerViolationRule: Rule = {
  id: "layer-violation",
  name: "Layer Violation",
  category: "architecture",
  severity: "error",
  run: dependencyDirectionRule.run
}
