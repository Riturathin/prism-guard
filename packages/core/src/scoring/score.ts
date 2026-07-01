import type { AnalysisResult } from "../types";

export interface ProjectScore {
  overall: number;
  errors: number;
  warnings: number;
  info: number;
}

const ERROR_WEIGHT = 10;
const WARNING_WEIGHT = 4;
const INFO_WEIGHT = 1;

export function calculateScore(result: AnalysisResult): ProjectScore {
  const errors = result.diagnostics.filter(
    d => d.severity === "error"
  ).length;

  const warnings = result.diagnostics.filter(
    d => d.severity === "warning"
  ).length;

  const info = result.diagnostics.filter(
    d => d.severity === "info"
  ).length;

  let overall = 100;

  overall -= errors * ERROR_WEIGHT;
  overall -= warnings * WARNING_WEIGHT;
  overall -= info * INFO_WEIGHT;

  overall = Math.max(0, overall);

  return {
    overall,
    errors,
    warnings,
    info
  };
}