import type { Rule, RuleContext, Diagnostic } from "@prism-guard/core"
import { createDiagnostic } from "@prism-guard/core"
import traverse from "@babel/traverse"
import type { NodePath } from "@babel/traverse"
import type { FunctionDeclaration, ArrowFunctionExpression, ObjectPattern } from "@babel/types"

export const excessivePropsRule: Rule = {
  id: "excessive-props",
  name: "Excessive Props",
  category: "maintainability",
  severity: "warning",
  run(context: RuleContext): Diagnostic[] {
    const maxProps = context.config.react?.maxProps ?? 7
    const diagnostics: Diagnostic[] = []

    traverse(context.ast, {
      FunctionDeclaration(path: NodePath<FunctionDeclaration>) {
        checkProps(path.node.params, path.node, maxProps, context, diagnostics)
      },
      ArrowFunctionExpression(path: NodePath<ArrowFunctionExpression>) {
        checkProps(path.node.params, path.node, maxProps, context, diagnostics)
      }
    })

    return diagnostics
  }
}

function checkProps(
  params: (FunctionDeclaration | ArrowFunctionExpression)["params"],
  node: FunctionDeclaration | ArrowFunctionExpression,
  maxProps: number,
  context: RuleContext,
  diagnostics: Diagnostic[]
): void {
  const first = params[0]
  if (!first || first.type !== "ObjectPattern") return

  const propCount = countProps(first)
  if (propCount > maxProps) {
    diagnostics.push(
      createDiagnostic(
        excessivePropsRule,
        context.file,
        node,
        `Component accepts ${propCount} props (max ${maxProps})`,
        "Group related props into objects or split the component"
      )
    )
  }
}

function countProps(pattern: ObjectPattern): number {
  return pattern.properties.filter(p => p.type === "ObjectProperty" || p.type === "RestElement").length
}
