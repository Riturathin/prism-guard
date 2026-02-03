export function validateConfig(config: unknown): string[] {
  const warnings: string[] = []
  const react = (config as any).react

  if (react?.maxProps > 12) {
    warnings.push("react.maxProps is set unusually high (recommended ≤ 7)")
  }

  if (react?.maxComponentLines > 400) {
    warnings.push("react.maxComponentLines may hide oversized components")
  }

  return warnings
}
