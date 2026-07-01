import type { AnalysisResult } from "../types"

export function reportJson(result: AnalysisResult): string {
  return JSON.stringify(
    {
      version: "1.0.0",
      summary: {
        filesAnalyzed: result.filesAnalyzed,
        rulesRun: result.rulesRun,
        durationMs: result.durationMs,
        issueCount: result.diagnostics.length,
        errors: result.diagnostics.filter(d => d.severity === "error").length,
        warnings: result.diagnostics.filter(d => d.severity === "warning").length,
        info: result.diagnostics.filter(d => d.severity === "info").length
      },
      diagnostics: result.diagnostics
    },
    null,
    2
  )
}
