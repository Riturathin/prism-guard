import type { PrismConfig, Rule, Severity } from "./types"

const SEVERITY_RANK: Record<Severity, number> = {
  info: 0,
  warning: 1,
  error: 2
}

export class RuleRegistry {
  private rules = new Map<string, Rule>()

  register(rule: Rule): void {
    this.rules.set(rule.id, rule)
  }

  registerAll(rules: Rule[]): void {
    for (const rule of rules) {
      this.register(rule)
    }
  }

  getRule(id: string): Rule | undefined {
    return this.rules.get(id)
  }

  getAllRules(): Rule[] {
    return Array.from(this.rules.values())
  }

  getEnabledRules(config: PrismConfig): Rule[] {
    return this.getAllRules()
      .map(rule => this.applyConfigSeverity(rule, config))
      .filter(rule => rule.severity !== ("off" as Severity))
  }

  private applyConfigSeverity(rule: Rule, config: PrismConfig): Rule {
    const setting = config.rules?.[rule.id]
    if (setting === false || setting === "off") {
      return { ...rule, severity: "off" as Severity }
    }
    if (setting === "warn") {
      return { ...rule, severity: "warning" }
    }
    if (setting === "error") {
      return { ...rule, severity: "error" }
    }
    if (setting === true) {
      return rule
    }
    return rule
  }
}

export function shouldFail(config: PrismConfig, diagnostics: { severity: Severity }[]): boolean {
  const threshold = config.severity?.failOn ?? "error"
  if (threshold === "high") {
    return diagnostics.some(d => d.severity === "error")
  }
  const minRank = SEVERITY_RANK[threshold as Severity] ?? SEVERITY_RANK.error
  return diagnostics.some(d => SEVERITY_RANK[d.severity] >= minRank)
}
