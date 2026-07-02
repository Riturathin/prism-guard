import type { Rule, RuleContext, Diagnostic } from "@prism-guard/core"
import { createDiagnostic } from "@prism-guard/core"
import traverse from "@babel/traverse"
import type { NodePath } from "@babel/traverse"
import type { FunctionDeclaration, ArrowFunctionExpression } from "@babel/types"

const COMPLEXITY_THRESHOLD = 15

export const cognitiveComplexityRule: Rule = {
  id: "cognitive-complexity",
  name: "Cognitive Complexity",
  category: "maintainability",
  severity: "warning",
  run(context: RuleContext): Diagnostic[] {
    const diagnostics: Diagnostic[] = []

    traverse(context.ast, {
      FunctionDeclaration(path: NodePath<FunctionDeclaration>) {
        const complexity = measureComplexity(path.node.body)
        if (complexity > COMPLEXITY_THRESHOLD) {
          diagnostics.push(
            createDiagnostic(
              cognitiveComplexityRule,
              context.file,
              path.node,
              `Function "${path.node.id?.name ?? "anonymous"}" has cognitive complexity ${complexity}`,
              "Reduce branching, extract helpers, or split into smaller functions"
            )
          )
        }
      },
      ArrowFunctionExpression(path: NodePath<ArrowFunctionExpression>) {
        const complexity = measureComplexity(path.node.body)
        if (complexity > COMPLEXITY_THRESHOLD) {
          diagnostics.push(
            createDiagnostic(
              cognitiveComplexityRule,
              context.file,
              path.node,
              `Arrow function has cognitive complexity ${complexity}`,
              "Reduce branching, extract helpers, or split into smaller functions"
            )
          )
        }
      }
    })

    return diagnostics
  }
}

function measureComplexity(body: FunctionDeclaration["body"] | ArrowFunctionExpression["body"]): number {
  let score = 0
  const json = JSON.stringify(body)
  const patterns = [
    /"IfStatement"/g,
    /"ConditionalExpression"/g,
    /"SwitchCase"/g,
    /"ForStatement"/g,
    /"ForInStatement"/g,
    /"ForOfStatement"/g,
    /"WhileStatement"/g,
    /"CatchClause"/g,
    /"LogicalExpression"/g
  ]

  for (const pattern of patterns) {
    const matches = json.match(pattern)
    if (matches) score += matches.length
  }

  return score
}
