import type { Rule, RuleContext, Diagnostic } from "@prism-guard/core"
import { createDiagnostic } from "@prism-guard/core"
import traverse from "@babel/traverse"
import type { NodePath } from "@babel/traverse"
import type { ImportDeclaration } from "@babel/types"

const LAZY_CANDIDATES = ["Chart", "Editor", "Modal", "Dashboard", "Map", "Calendar"]

export const dynamicImportRule: Rule = {
  id: "dynamic-import",
  name: "Dynamic Import Suggestion",
  category: "performance",
  severity: "info",
  run(context: RuleContext): Diagnostic[] {
    const diagnostics: Diagnostic[] = []

    traverse(context.ast, {
      ImportDeclaration(path: NodePath<ImportDeclaration>) {
        const source = path.node.source.value
        if (!source.startsWith(".") && !source.startsWith("@/")) return

        const hasLazyCandidate = path.node.specifiers.some(spec => {
          if (spec.type !== "ImportDefaultSpecifier" && spec.type !== "ImportSpecifier") return false
          const name =
            spec.type === "ImportDefaultSpecifier"
              ? spec.local.name
              : spec.local.name
          return LAZY_CANDIDATES.some(c => name.includes(c))
        })

        if (hasLazyCandidate) {
          diagnostics.push(
            createDiagnostic(
              dynamicImportRule,
              context.file,
              path.node,
              "Large component imported statically — consider lazy loading",
              "Use React.lazy() with dynamic import() for code splitting"
            )
          )
        }
      }
    })

    return diagnostics
  }
}
