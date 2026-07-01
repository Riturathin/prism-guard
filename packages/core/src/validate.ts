export function validateConfig(config: unknown): string[] {
  const warnings: string[] = []
  const c = config as { react?: { maxProps?: number; maxComponentLines?: number } }
  const react = c.react

  if (react?.maxProps && react.maxProps > 12) {
    warnings.push("react.maxProps is set unusually high (recommended ≤ 7)")
  }

  if (react?.maxComponentLines && react.maxComponentLines > 400) {
    warnings.push("react.maxComponentLines may hide oversized components")
  }

  return warnings
}
