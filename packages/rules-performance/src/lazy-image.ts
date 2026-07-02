import type { Rule, RuleContext, Diagnostic } from "@prism-guard/core"
import { createDiagnostic } from "@prism-guard/core"
import traverse from "@babel/traverse"
import type { NodePath } from "@babel/traverse"
import type { JSXOpeningElement } from "@babel/types"

export const lazyImageRule: Rule = {
  id: "lazy-image",
  name: "Lazy Image",
  category: "performance",
  severity: "info",
  run(context: RuleContext): Diagnostic[] {
    const diagnostics: Diagnostic[] = []

    traverse(context.ast, {
      JSXOpeningElement(path: NodePath<JSXOpeningElement>) {
        const name = path.node.name
        if (name.type !== "JSXIdentifier" || name.name !== "img") return

        const hasLazy = path.node.attributes.some(
          attr =>
            attr.type === "JSXAttribute" &&
            attr.name.type === "JSXIdentifier" &&
            attr.name.name === "loading" &&
            attr.value?.type === "StringLiteral" &&
            attr.value.value === "lazy"
        )

        if (!hasLazy) {
          diagnostics.push(
            createDiagnostic(
              lazyImageRule,
              context.file,
              path.node,
              "<img> without loading=\"lazy\"",
              "Add loading=\"lazy\" or use a lazy-loading image component"
            )
          )
        }
      }
    })

    return diagnostics
  }
}
