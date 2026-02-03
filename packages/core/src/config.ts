import fs from "fs"
import path from "path"

export const DEFAULT_CONFIG = {
  react: {
    maxProps: 7,
    maxComponentLines: 250,
    maxHooks: 5,
    maxJSXDepth: 4,
    requireMemoInLists: true
  },
  severity: {
    failOn: "high"
  }
}

export function loadConfig() {
  const configPath = path.resolve(process.cwd(), "prism.config.json")

  if (!fs.existsSync(configPath)) {
    return DEFAULT_CONFIG
  }

  const userConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"))
  return {
    ...DEFAULT_CONFIG,
    ...userConfig,
    react: {
      ...DEFAULT_CONFIG.react,
      ...userConfig.react
    }
  }
}
