import type { Diagnostic, Rule, Severity } from "../types"
import type { Node } from "@babel/types"
import { loc } from "./ast"

export function createDiagnostic(
  rule: Rule,
  file: string,
  node: Node | null | undefined,
  message: string,
  recommendation: string,
  severity?: Severity
): Diagnostic {
  const { line, column } = loc(node)
  return {
    rule: rule.id,
    severity: severity ?? rule.severity,
    category: rule.category,
    file,
    line,
    column,
    message,
    recommendation
  }
}
