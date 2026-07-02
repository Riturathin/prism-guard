import type { Rule } from "@riturathinsharma/prism-guard-core"
import { noInlineCallbackRule } from "./no-inline-callback"
import { noArrayIndexKeyRule } from "./no-array-index-key"
import { noAnonymousComponentRule } from "./no-anonymous-component"
import { noLargeComponentRule } from "./no-large-component"
import { excessiveUseEffectRule } from "./excessive-useeffect"
import { nestedComponentRule } from "./nested-component"
import { unstableContextRule } from "./unstable-context"

export const reactRules: Rule[] = [
  noInlineCallbackRule,
  noArrayIndexKeyRule,
  noAnonymousComponentRule,
  noLargeComponentRule,
  excessiveUseEffectRule,
  nestedComponentRule,
  unstableContextRule
]

export {
  noInlineCallbackRule,
  noArrayIndexKeyRule,
  noAnonymousComponentRule,
  noLargeComponentRule,
  excessiveUseEffectRule,
  nestedComponentRule,
  unstableContextRule
}
