import type { Rule } from "@riturathinsharma/prism-guard-core"
import { blockingImportRule } from "./blocking-import"
import { dynamicImportRule } from "./dynamic-import"
import { bundleBudgetRule } from "./bundle-budget"
import { lazyImageRule } from "./lazy-image"
import { expensiveRenderRule } from "./expensive-render"

export const performanceRules: Rule[] = [
  blockingImportRule,
  dynamicImportRule,
  bundleBudgetRule,
  lazyImageRule,
  expensiveRenderRule
]

export {
  blockingImportRule,
  dynamicImportRule,
  bundleBudgetRule,
  lazyImageRule,
  expensiveRenderRule
}
