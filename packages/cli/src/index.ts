#!/usr/bin/env node

import path from "path"
import {
  loadConfig,
  validateConfig,
  discoverFiles,
  detectReact,
  runReactRules
} from "@prism-guard/core"


async function main(): Promise<void> {
  console.log("✔ Prism Guard initialized")

  const config = loadConfig()
  console.log("✔ Config loaded (prism.config.json)")

  const warnings = validateConfig(config)
  if (warnings.length > 0) {
    console.warn(`⚠️ ${warnings.length} configuration warning(s):`)
    warnings.forEach(w => console.warn(`- ${w}`))
  }

  const cwd = process.cwd()
  const files = discoverFiles(cwd)

  console.log(`✔ ${files.length} files discovered`)

  if (detectReact(files)) {
  console.log("✔ React project detected")

  const issues = runReactRules(files)

  if (issues.length > 0) {
    console.warn(`⚠️ ${issues.length} React issue(s) detected`)
    issues.forEach(issue => {
      console.warn(
        `- Inline JSX callback in ${issue.file}:${issue.line}`
      )
    })
  } else {
    console.log("✔ No React issues detected")
  }
} else {
  console.log("ℹ️ No React files detected")
}


  console.log("\nReady for analysis.")
}

main().catch((err: unknown) => {
  console.error("✖ Prism Guard failed")
  console.error(err)
  process.exit(1)
})
