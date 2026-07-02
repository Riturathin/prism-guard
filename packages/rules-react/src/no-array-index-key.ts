import type { Rule, RuleContext, Diagnostic } from "@prism-guard/core"
import { createDiagnostic } from "@prism-guard/core"
import traverse from "@babel/traverse"
import type { NodePath } from "@babel/traverse"
import type { JSXAttribute } from "@babel/types"

const INDEX_NAMES = new Set(["index", "i", "idx", "key"])

export const noArrayIndexKeyRule: Rule = {
  id: "no-array-index-key",
  name: "No Array Index Key",
  category: "react",
  severity: "warning",
  run(context: RuleContext): Diagnostic[] {
    const diagnostics: Diagnostic[] = []

    traverse(context.ast, {
      JSXAttribute(path: NodePath<JSXAttribute>) {
        if (path.node.name.type !== "JSXIdentifier" || path.node.name.name !== "key") return

        const value = path.node.value
        if (!value || value.type !== "JSXExpressionContainer") return

        const expr = value.expression
        if (expr.type === "Identifier" && INDEX_NAMES.has(expr.name)) {
          diagnostics.push(
            createDiagnostic(
              noArrayIndexKeyRule,
              context.file,
              expr,
              `Array index "${expr.name}" used as React key`,
              "Use a stable unique identifier from your data instead of array index"
            )
          )
        }

        if (expr.type === "MemberExpression" && expr.property.type === "Identifier") {
          if (INDEX_NAMES.has(expr.property.name)) {
            diagnostics.push(
              createDiagnostic(
                noArrayIndexKeyRule,
                context.file,
                expr,
                "Array index used as React key",
                "Use a stable unique identifier from your data instead of array index"
              )
            )
          }
        }
      }
    })

    return diagnostics
  }
}
