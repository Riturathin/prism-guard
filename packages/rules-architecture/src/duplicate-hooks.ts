import type { Rule, RuleContext, Diagnostic } from "@riturathinsharma/prism-guard-core"
import { createDiagnostic } from "@riturathinsharma/prism-guard-core"
import traverse from "@babel/traverse"
import type { NodePath } from "@babel/traverse"
import type { CallExpression } from "@babel/types"

export const duplicateHooksRule: Rule = {
  id: "duplicate-hooks",
  name: "Duplicate Hooks",
  category: "maintainability",
  severity: "warning",
  run(context: RuleContext): Diagnostic[] {
    const diagnostics: Diagnostic[] = []
    const hookCounts = new Map<string, { count: number; node: CallExpression }>()

    traverse(context.ast, {
      CallExpression(path: NodePath<CallExpression>) {
        const hookName = getHookName(path.node)
        if (!hookName) return

        const existing = hookCounts.get(hookName)
        if (existing) {
          existing.count += 1
        } else {
          hookCounts.set(hookName, { count: 1, node: path.node })
        }
      }
    })

    for (const [hook, { count, node }] of hookCounts) {
      if (count > 1) {
        diagnostics.push(
          createDiagnostic(
            duplicateHooksRule,
            context.file,
            node,
            `Hook "${hook}" called ${count} times in the same component`,
            "Extract shared hook logic into a custom hook"
          )
        )
      }
    }

    return diagnostics
  }
}

function getHookName(node: CallExpression): string | null {
  if (node.callee.type === "Identifier" && node.callee.name.startsWith("use")) {
    return node.callee.name
  }
  return null
}
