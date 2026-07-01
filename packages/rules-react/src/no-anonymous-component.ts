import type { Rule, RuleContext, Diagnostic } from "@prism-guard/core"
import { createDiagnostic } from "@prism-guard/core"
import traverse from "@babel/traverse"
import type { NodePath } from "@babel/traverse"
import type { JSXExpressionContainer } from "@babel/types"

export const noAnonymousComponentRule: Rule = {
  id: "no-anonymous-component",
  name: "No Anonymous Component",
  category: "react",
  severity: "warning",
  run(context: RuleContext): Diagnostic[] {
    const diagnostics: Diagnostic[] = []

    traverse(context.ast, {
      ExportDefaultDeclaration(path) {
        const decl = path.node.declaration
        if (decl.type === "FunctionExpression" && !decl.id) {
          diagnostics.push(
            createDiagnostic(
              noAnonymousComponentRule,
              context.file,
              decl,
              "Anonymous default-exported component",
              "Name your component for better debugging and DevTools support"
            )
          )
        }
        if (decl.type === "FunctionDeclaration" && !decl.id) {
          diagnostics.push(
            createDiagnostic(
              noAnonymousComponentRule,
              context.file,
              decl,
              "Anonymous default-exported component",
              "Name your component for better debugging and DevTools support"
            )
          )
        }
      },
      JSXExpressionContainer(path: NodePath<JSXExpressionContainer>) {
        const expr = path.node.expression
        if (
          (expr.type === "ArrowFunctionExpression" || expr.type === "FunctionExpression") &&
          (expr.type === "FunctionExpression" ? !expr.id : true) &&
          hasJSXReturn(expr.body)
        ) {
          diagnostics.push(
            createDiagnostic(
              noAnonymousComponentRule,
              context.file,
              expr,
              "Anonymous inline component in JSX",
              "Extract inline components to named functions or separate files"
            )
          )
        }
      }
    })

    return diagnostics
  }
}

function hasJSXReturn(body: unknown): boolean {
  if (!body || typeof body !== "object") return false
  const b = body as { type?: string; body?: unknown[]; argument?: unknown }
  if (b.type === "JSXElement" || b.type === "JSXFragment") return true
  if (b.type === "BlockStatement" && Array.isArray(b.body)) {
    return b.body.some(
      stmt =>
        typeof stmt === "object" &&
        stmt !== null &&
        (stmt as { type?: string }).type === "ReturnStatement" &&
        hasJSXReturn((stmt as { argument?: unknown }).argument)
    )
  }
  return false
}
