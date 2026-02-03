import fs from "fs"
import { findInlineJSXCallbacks } from "@prism-guard/rules-react"

export function runReactRules(files: string[]) {
  const results = []

  for (const file of files) {
    if (!file.endsWith(".tsx") && !file.endsWith(".jsx")) continue

    const code = fs.readFileSync(file, "utf-8")
    const issues = findInlineJSXCallbacks(code, file)

    results.push(...issues)
  }

  return results
}
