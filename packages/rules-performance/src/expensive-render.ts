import type { Rule, RuleContext, Diagnostic } from "@riturathinsharma/prism-guard-core"
import { createDiagnostic } from "@riturathinsharma/prism-guard-core"
import traverse from "@babel/traverse"
import type { NodePath } from "@babel/traverse"
import type { CallExpression } from "@babel/types"

export const expensiveRenderRule: Rule = {
  id: "expensive-render",
  name: "Expensive Render",
  category: "performance",
  severity: "warning",
  run(context: RuleContext): Diagnostic[] {
    const diagnostics: Diagnostic[] = []

    traverse(context.ast, {
      CallExpression(path: NodePath<CallExpression>) {
        if (!isArrayMapCall(path.node)) return

        const parent = path.parentPath
        if (!parent?.isJSXExpressionContainer()) return

        const inListContext = path.findParent(p => p.isCallExpression() && isArrayMapCall(p.node))
        if (inListContext) return

        diagnostics.push(
          createDiagnostic(
            expensiveRenderRule,
            context.file,
            path.node,
            ".map() used directly in JSX without memoization",
            "Extract list rendering to a memoized child component or use useMemo"
          )
        )
      }
    })

    return diagnostics
  }
}

function isArrayMapCall(node: CallExpression): boolean {
  return (
    node.callee.type === "MemberExpression" &&
    node.callee.property.type === "Identifier" &&
    node.callee.property.name === "map"
  )
}
