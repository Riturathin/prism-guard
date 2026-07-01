import nodePath from "path"
import type { Rule, RuleContext, Diagnostic } from "@prism-guard/core"
import { createDiagnostic } from "@prism-guard/core"
import traverse from "@babel/traverse"
import type { NodePath } from "@babel/traverse"
import type { ImportDeclaration } from "@babel/types"

export const featureBoundaryRule: Rule = {
  id: "feature-boundary",
  name: "Feature Boundary",
  category: "architecture",
  severity: "warning",
  run(context: RuleContext): Diagnostic[] {
    const featureDirs = context.config.architecture?.featureDirs ?? ["features"]
    const diagnostics: Diagnostic[] = []

    const fileFeature = getFeatureName(context.file, featureDirs)
    if (!fileFeature) return diagnostics

    traverse(context.ast, {
      ImportDeclaration(path: NodePath<ImportDeclaration>) {
        const source = path.node.source.value
        if (!source.startsWith(".")) return

        const resolved = nodePath.resolve(nodePath.dirname(context.file), source)
        const importFeature = getFeatureName(resolved, featureDirs)

        if (importFeature && importFeature !== fileFeature) {
          diagnostics.push(
            createDiagnostic(
              featureBoundaryRule,
              context.file,
              path.node,
              `Cross-feature import from "${importFeature}" into "${fileFeature}"`,
              "Use shared modules or public feature APIs instead of direct cross-feature imports"
            )
          )
        }
      }
    })

    return diagnostics
  }
}

function getFeatureName(filePath: string, featureDirs: string[]): string | null {
  const normalized = filePath.replace(/\\/g, "/")
  for (const dir of featureDirs) {
    const marker = `/${dir}/`
    const idx = normalized.indexOf(marker)
    if (idx >= 0) {
      const rest = normalized.slice(idx + marker.length)
      return rest.split("/")[0] ?? null
    }
  }
  return null
}
