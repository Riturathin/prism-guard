import type { Rule, RuleContext, Diagnostic } from "@prism-guard/core"
import { createDiagnostic } from "@prism-guard/core"
import traverse from "@babel/traverse"
import type { NodePath } from "@babel/traverse"
import type { FunctionDeclaration, ArrowFunctionExpression, FunctionExpression } from "@babel/types"

type ComponentFn = FunctionDeclaration | ArrowFunctionExpression | FunctionExpression

export const componentComplexityRule: Rule = {
  id: "component-complexity",
  name: "Component Complexity",
  category: "maintainability",
  severity: "warning",
  run(context: RuleContext): Diagnostic[] {
    const maxHooks = context.config.react?.maxHooks ?? 5
    const diagnostics: Diagnostic[] = []

    traverse(context.ast, {
      FunctionDeclaration(path: NodePath<FunctionDeclaration>) {
        if (!path.node.id || !/^[A-Z]/.test(path.node.id.name)) return
        checkComponent(path.node.id.name, path.node.body, path.node, maxHooks, context, diagnostics)
      },
      VariableDeclarator(path) {
        if (
          path.node.id.type === "Identifier" &&
          /^[A-Z]/.test(path.node.id.name) &&
          path.node.init &&
          (path.node.init.type === "ArrowFunctionExpression" || path.node.init.type === "FunctionExpression")
        ) {
          checkComponent(
            path.node.id.name,
            path.node.init.body,
            path.node.init,
            maxHooks,
            context,
            diagnostics
          )
        }
      }
    })

    return diagnostics
  }
}

function checkComponent(
  name: string,
  body: ComponentFn["body"],
  node: ComponentFn,
  maxHooks: number,
  context: RuleContext,
  diagnostics: Diagnostic[]
): void {
  const json = JSON.stringify(body)
  const hookCount = (json.match(/"name":"use[A-Z]/g) ?? []).length
  const jsxDepth = estimateJsxDepth(body)
  const maxDepth = context.config.react?.maxJSXDepth ?? 4

  if (hookCount > maxHooks) {
    diagnostics.push(
      createDiagnostic(
        componentComplexityRule,
        context.file,
        node,
        `Component "${name}" uses ${hookCount} hooks (max ${maxHooks})`,
        "Extract logic into custom hooks or split the component"
      )
    )
  }

  if (jsxDepth > maxDepth) {
    diagnostics.push(
      createDiagnostic(
        componentComplexityRule,
        context.file,
        node,
        `Component "${name}" has JSX nesting depth ${jsxDepth} (max ${maxDepth})`,
        "Extract nested JSX into sub-components"
      )
    )
  }
}

function estimateJsxDepth(body: ComponentFn["body"]): number {
  let max = 0
  let current = 0

  function walk(obj: unknown): void {
    if (!obj || typeof obj !== "object") return
    const node = obj as { type?: string; children?: unknown[]; openingElement?: unknown; body?: unknown[] }

    if (node.type === "JSXElement") {
      current += 1
      max = Math.max(max, current)
    }

    if (Array.isArray(node.children)) node.children.forEach(walk)
    if (node.openingElement) walk(node)
    if (Array.isArray(node.body)) node.body.forEach(walk)

    if (node.type === "JSXElement") current -= 1
  }

  walk(body)
  return max
}
