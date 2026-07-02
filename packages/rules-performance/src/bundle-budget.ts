import fs from "fs"
import type { Rule, RuleContext, Diagnostic } from "@prism-guard/core"
import { createDiagnostic } from "@prism-guard/core"

export const bundleBudgetRule: Rule = {
  id: "bundle-budget",
  name: "Bundle Budget",
  category: "performance",
  severity: "warning",
  run(context: RuleContext): Diagnostic[] {
    const budgetKb = context.config.performance?.bundleBudgetKb ?? 500
    const diagnostics: Diagnostic[] = []

    try {
      const stats = fs.statSync(context.file)
      const sizeKb = stats.size / 1024

      if (sizeKb > budgetKb) {
        diagnostics.push(
          createDiagnostic(
            bundleBudgetRule,
            context.file,
            null,
            `File size ${sizeKb.toFixed(1)}KB exceeds budget of ${budgetKb}KB`,
            "Split the module or lazy-load heavy dependencies"
          )
        )
      }
    } catch {
      // skip
    }

    return diagnostics
  }
}
