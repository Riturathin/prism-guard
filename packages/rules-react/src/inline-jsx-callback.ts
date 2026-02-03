import { parse } from "@babel/parser"
import traverse, { NodePath } from "@babel/traverse"
import { JSXAttribute } from "@babel/types"



export interface InlineCallbackIssue {
  file: string
  line: number
}

export function findInlineJSXCallbacks(
  code: string,
  file: string
): InlineCallbackIssue[] {
  const issues: InlineCallbackIssue[] = []

  const ast = parse(code, {
    sourceType: "module",
    plugins: ["typescript", "jsx"]
  })

traverse(ast, {
  JSXAttribute(path: NodePath<JSXAttribute>) {
    const value = path.node.value
    if (!value || value.type !== "JSXExpressionContainer") return

    const expr = value.expression
    if (
      expr.type === "ArrowFunctionExpression" ||
      expr.type === "FunctionExpression"
    ) {
      const line = expr.loc?.start.line ?? 0
      issues.push({ file, line })
    }
  }
})


  return issues
}
