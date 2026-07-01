import fs from "fs"
import path from "path"
import type { PrismConfig } from "./types"

const DEFAULT_IGNORE = new Set(["node_modules", "dist", "build", ".git", "coverage"])

export function discoverFiles(root: string, config?: PrismConfig, results: string[] = []): string[] {
  if (!fs.existsSync(root)) return results

  const entries = fs.readdirSync(root, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(root, entry.name)
    const relative = path.relative(config?.root ?? process.cwd(), fullPath)

    if (entry.isDirectory()) {
      if (DEFAULT_IGNORE.has(entry.name)) continue
      if (config?.exclude?.some(pattern => matchGlob(relative, pattern))) continue
      discoverFiles(fullPath, config, results)
    } else if (shouldInclude(fullPath, relative, config)) {
      results.push(fullPath)
    }
  }

  return results
}

function shouldInclude(fullPath: string, relative: string, config?: PrismConfig): boolean {
  if (config?.exclude?.some(pattern => matchGlob(relative, pattern))) {
    return false
  }

  const includes = config?.include ?? ["**/*.{tsx,ts,jsx,js}"]
  return includes.some(pattern => matchGlob(relative, pattern) || matchGlob(fullPath, pattern))
}

function matchGlob(text: string, pattern: string): boolean {
  const normalized = text.replace(/\\/g, "/")
  if (pattern.includes("{")) {
    const expanded = expandBraces(pattern)
    return expanded.some(p => matchGlob(normalized, p))
  }

  const regex = new RegExp(
    "^" +
      pattern
        .replace(/\\/g, "/")
        .replace(/\./g, "\\.")
        .replace(/\*\*/g, "§§")
        .replace(/\*/g, "[^/]*")
        .replace(/§§/g, ".*") +
      "$"
  )

  return regex.test(normalized) || normalized.endsWith(pattern.replace(/^\*\*\//, ""))
}

function expandBraces(pattern: string): string[] {
  const match = pattern.match(/^(.*)\{([^}]+)\}(.*)$/)
  if (!match) return [pattern]
  const [, before, options, after] = match
  return options.split(",").map(opt => `${before}${opt}${after}`)
}
