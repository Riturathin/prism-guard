import path from "path"
import type { Rule, RuleContext, Diagnostic } from "@riturathinsharma/prism-guard-core"
import { createDiagnostic, findCycles } from "@riturathinsharma/prism-guard-core"

export const circularImportRule: Rule = {
  id: "circular-import",
  name: "Circular Import",
  category: "architecture",
  severity: "error",
  run(context: RuleContext): Diagnostic[] {
    if (!context.project) return []

    const cycles = findCycles(context.project.importGraph)
    const diagnostics: Diagnostic[] = []
    const seen = new Set<string>()

    for (const cycle of cycles) {
      const key = cycle.sort().join("->")
      if (seen.has(key)) continue
      seen.add(key)

      if (!cycle.includes(path.resolve(context.file))) continue

      diagnostics.push(
        createDiagnostic(
          circularImportRule,
          context.file,
          null,
          `Circular import detected: ${formatCycle(cycle)}`,
          "Refactor shared logic into a separate module to break the cycle"
        )
      )
    }

    return diagnostics
  }
}

function formatCycle(cycle: string[]): string {
  const names = cycle.map(f => path.basename(f))
  return [...new Set(names)].join(" → ") + (names[0] === names[names.length - 1] ? "" : ` → ${names[0]}`)
}
