import type { Rule, RuleContext, Diagnostic } from "@riturathinsharma/prism-guard-core"
import { createDiagnostic } from "@riturathinsharma/prism-guard-core"
import traverse from "@babel/traverse"
import type { NodePath } from "@babel/traverse"
import type { JSXAttribute } from "@babel/types"

export const noInlineCallbackRule: Rule = {
  id: "no-inline-callback",
  name: "No Inline Callback",
  category: "react",
  severity: "warning",
  run(context: RuleContext): Diagnostic[] {
    const diagnostics: Diagnostic[] = []

    traverse(context.ast, {
      JSXAttribute(path: NodePath<JSXAttribute>) {
        const value = path.node.value
        if (!value || value.type !== "JSXExpressionContainer") return

        const expr = value.expression
        if (
          expr.type === "ArrowFunctionExpression" ||
          expr.type === "FunctionExpression"
        ) {
          diagnostics.push(
            createDiagnostic(
              noInlineCallbackRule,
              context.file,
              expr,
              "Inline callback in JSX attribute causes unnecessary re-renders",
              "Extract the callback to useCallback or a named handler outside JSX"
            )
          )
        }
      }
    })

    return diagnostics
  }
}
