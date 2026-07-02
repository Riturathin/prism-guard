import type { Rule, RuleContext, Diagnostic } from "@riturathinsharma/prism-guard-core"
import { createDiagnostic } from "@riturathinsharma/prism-guard-core"
import traverse from "@babel/traverse"
import type { NodePath } from "@babel/traverse"
import type { JSXOpeningElement } from "@babel/types"

export const unstableContextRule: Rule = {
  id: "unstable-context",
  name: "Unstable Context Value",
  category: "react",
  severity: "warning",
  run(context: RuleContext): Diagnostic[] {
    const diagnostics: Diagnostic[] = []

    traverse(context.ast, {
      JSXOpeningElement(path: NodePath<JSXOpeningElement>) {
        const name = path.node.name
        if (name.type !== "JSXMemberExpression") return
        if (
          name.property.type !== "JSXIdentifier" ||
          name.property.name !== "Provider"
        ) {
          return
        }

        const valueAttr = path.node.attributes.find(
          attr =>
            attr.type === "JSXAttribute" &&
            attr.name.type === "JSXIdentifier" &&
            attr.name.name === "value"
        )

        if (
          !valueAttr ||
          valueAttr.type !== "JSXAttribute" ||
          !valueAttr.value ||
          valueAttr.value.type !== "JSXExpressionContainer"
        ) {
          return
        }

        const expr = valueAttr.value.expression
        if (expr.type === "ObjectExpression" || expr.type === "ArrayExpression") {
          diagnostics.push(
            createDiagnostic(
              unstableContextRule,
              context.file,
              expr,
              "Inline object/array passed as Context.Provider value",
              "Memoize the context value with useMemo to avoid unnecessary re-renders"
            )
          )
        }
      }
    })

    return diagnostics
  }
}
