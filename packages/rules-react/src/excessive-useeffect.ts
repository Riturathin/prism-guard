import type { Rule, RuleContext, Diagnostic } from "@riturathinsharma/prism-guard-core"
import { createDiagnostic } from "@riturathinsharma/prism-guard-core"
import traverse from "@babel/traverse"
import type { NodePath } from "@babel/traverse"
import type { CallExpression } from "@babel/types"

export const excessiveUseEffectRule: Rule = {
  id: "excessive-useeffect",
  name: "Excessive useEffect",
  category: "react",
  severity: "warning",
  run(context: RuleContext): Diagnostic[] {
    const maxEffects = context.config.react?.maxUseEffects ?? 3
    const diagnostics: Diagnostic[] = []
    const componentEffects = new Map<string, { count: number; node: CallExpression }>()

    traverse(context.ast, {
      CallExpression(path: NodePath<CallExpression>) {
        if (!isUseEffectCall(path.node)) return

        const componentName = findEnclosingComponent(path)
        const key = componentName ?? context.file
        const existing = componentEffects.get(key)

        if (existing) {
          existing.count += 1
        } else {
          componentEffects.set(key, { count: 1, node: path.node })
        }
      }
    })

    for (const [component, { count, node }] of componentEffects) {
      if (count > maxEffects) {
        diagnostics.push(
          createDiagnostic(
            excessiveUseEffectRule,
            context.file,
            node,
            `Component "${component}" has ${count} useEffect calls (max ${maxEffects})`,
            "Consolidate effects, derive state, or extract custom hooks"
          )
        )
      }
    }

    return diagnostics
  }
}

function isUseEffectCall(node: CallExpression): boolean {
  return (
    node.callee.type === "Identifier" && node.callee.name === "useEffect"
  )
}

function findEnclosingComponent(path: NodePath<CallExpression>): string | null {
  let current: NodePath | null = path.parentPath
  while (current) {
    if (current.isFunctionDeclaration() && current.node.id?.name) {
      return current.node.id.name
    }
    if (current.isVariableDeclarator() && current.node.id.type === "Identifier") {
      return current.node.id.name
    }
    current = current.parentPath
  }
  return null
}
