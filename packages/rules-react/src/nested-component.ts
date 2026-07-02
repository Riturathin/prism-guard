import type { Rule, RuleContext, Diagnostic } from "@prism-guard/core"
import { createDiagnostic } from "@prism-guard/core"
import traverse from "@babel/traverse"
import type { NodePath } from "@babel/traverse"
import type { FunctionDeclaration } from "@babel/types"

export const nestedComponentRule: Rule = {
  id: "nested-component",
  name: "Nested Component",
  category: "react",
  severity: "warning",
  run(context: RuleContext): Diagnostic[] {
    const diagnostics: Diagnostic[] = []

    traverse(context.ast, {
      FunctionDeclaration(outerPath: NodePath<FunctionDeclaration>) {
        if (!outerPath.node.id || !/^[A-Z]/.test(outerPath.node.id.name)) return

        outerPath.traverse({
          FunctionDeclaration(innerPath: NodePath<FunctionDeclaration>) {
            if (innerPath === outerPath) return
            if (innerPath.node.id && /^[A-Z]/.test(innerPath.node.id.name)) {
              diagnostics.push(
                createDiagnostic(
                  nestedComponentRule,
                  context.file,
                  innerPath.node,
                  `Component "${innerPath.node.id.name}" defined inside "${outerPath.node.id?.name ?? "component"}"`,
                  "Move nested components outside to prevent remounting on every parent render"
                )
              )
            }
          },
          VariableDeclarator(innerPath) {
            const init = innerPath.node.init
            if (
              init &&
              (init.type === "ArrowFunctionExpression" || init.type === "FunctionExpression") &&
              innerPath.node.id.type === "Identifier" &&
              /^[A-Z]/.test(innerPath.node.id.name) &&
              hasJSXInBody(init.body)
            ) {
              diagnostics.push(
                createDiagnostic(
                  nestedComponentRule,
                  context.file,
                  init,
                  `Component "${innerPath.node.id.name}" defined inside "${outerPath.node.id?.name ?? "component"}"`,
                  "Move nested components outside to prevent remounting on every parent render"
                )
              )
            }
          }
        })
      }
    })

    return diagnostics
  }
}

function hasJSXInBody(body: unknown): boolean {
  if (!body || typeof body !== "object") return false
  const b = body as { type?: string }
  if (b.type === "JSXElement" || b.type === "JSXFragment") return true
  return JSON.stringify(body).includes('"JSXElement"')
}
