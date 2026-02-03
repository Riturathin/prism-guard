import fs from "fs"
import path from "path"

const IGNORE_DIRS = new Set([
  "node_modules",
  "dist",
  "build",
  ".git"
])

export function discoverFiles(
  root: string,
  results: string[] = []
): string[] {
  const entries = fs.readdirSync(root, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(root, entry.name)

    if (entry.isDirectory()) {
      if (!IGNORE_DIRS.has(entry.name)) {
        discoverFiles(fullPath, results)
      }
    } else {
      results.push(fullPath)
    }
  }

  return results
}
