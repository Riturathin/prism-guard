import type { Rule, RuleContext, Diagnostic } from "@riturathinsharma/prism-guard-core"
import { createDiagnostic } from "@riturathinsharma/prism-guard-core"
import traverse from "@babel/traverse"
import type { NodePath } from "@babel/traverse"
import type { FunctionDeclaration, ArrowFunctionExpression, FunctionExpression } from "@babel/types"

type ComponentFn = FunctionDeclaration | ArrowFunctionExpression | FunctionExpression

export const noLargeComponentRule: Rule = {
  id: "no-large-component",
  name: "No Large Component",
  category: "react",
  severity: "warning",
  run(context: RuleContext): Diagnostic[] {
    const maxLines = context.config.react?.maxComponentLines ?? 250
    const diagnostics: Diagnostic[] = []

    traverse(context.ast, {
      FunctionDeclaration(path: NodePath<FunctionDeclaration>) {
        if (isLikelyComponent(path.node.id?.name, path.node)) {
          checkSize(path.node, path.node, maxLines, context, diagnostics)
        }
      },
      ArrowFunctionExpression(path: NodePath<ArrowFunctionExpression>) {
        const parent = path.parent
        if (
          parent.type === "VariableDeclarator" &&
          parent.id.type === "Identifier" &&
          isLikelyComponent(parent.id.name, path.node)
        ) {
          checkSize(path.node, path.node, maxLines, context, diagnostics)
        }
      }
    })

    return diagnostics
  }
}

function isLikelyComponent(name: string | undefined, node: ComponentFn): boolean {
  if (name && /^[A-Z]/.test(name)) return true
  return hasJSXInBody(node.body)
}

function hasJSXInBody(body: ComponentFn["body"]): boolean {
  if (!body) return false
  if (body.type === "JSXElement" || body.type === "JSXFragment") return true
  if (body.type !== "BlockStatement") return false
  return JSON.stringify(body).includes('"JSXElement"')
}

function checkSize(
  node: ComponentFn,
  reportNode: ComponentFn,
  maxLines: number,
  context: RuleContext,
  diagnostics: Diagnostic[]
): void {
  const start = node.loc?.start.line ?? 0
  const end = node.loc?.end.line ?? 0
  const lineCount = end - start + 1

  if (lineCount > maxLines) {
    diagnostics.push(
      createDiagnostic(
        noLargeComponentRule,
        context.file,
        reportNode,
        `Component spans ${lineCount} lines (max ${maxLines})`,
        "Split into smaller focused components or extract hooks and utilities"
      )
    )
  }
}
