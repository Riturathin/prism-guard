import { DEFAULT_CONFIG } from "@prism-guard/core"
import type { PrismConfig } from "@prism-guard/core"

export { DEFAULT_CONFIG }
export type { PrismConfig }

export function defineConfig(config: Partial<PrismConfig>): PrismConfig {
  return {
    ...DEFAULT_CONFIG,
    ...config,
    react: { ...DEFAULT_CONFIG.react, ...config.react },
    performance: { ...DEFAULT_CONFIG.performance, ...config.performance },
    architecture: { ...DEFAULT_CONFIG.architecture, ...config.architecture },
    severity: { ...DEFAULT_CONFIG.severity, ...config.severity },
    rules: { ...DEFAULT_CONFIG.rules, ...config.rules }
  }
}
