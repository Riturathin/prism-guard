import type { Rule, RuleContext, Diagnostic } from "@prism-guard/core"
import { createDiagnostic } from "@prism-guard/core"
import traverse from "@babel/traverse"
import type { NodePath } from "@babel/traverse"
import type { ImportDeclaration } from "@babel/types"

export const blockingImportRule: Rule = {
  id: "blocking-import",
  name: "Blocking Import",
  category: "performance",
  severity: "warning",
  run(context: RuleContext): Diagnostic[] {
    const heavyImports = context.config.performance?.heavyImports ?? ["lodash", "moment"]
    const diagnostics: Diagnostic[] = []

    traverse(context.ast, {
      ImportDeclaration(path: NodePath<ImportDeclaration>) {
        const source = path.node.source.value
        const matched = heavyImports.find(lib => source === lib || source.startsWith(`${lib}/`))
        if (matched) {
          diagnostics.push(
            createDiagnostic(
              blockingImportRule,
              context.file,
              path.node,
              `Heavy library "${matched}" imported synchronously`,
              "Use dynamic import() or import specific submodules to reduce bundle size"
            )
          )
        }
      }
    })

    return diagnostics
  }
}
