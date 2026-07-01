import fs from "fs"
import path from "path"
import type { PrismConfig } from "./types"

export const DEFAULT_CONFIG: PrismConfig = {
  include: ["**/*.{tsx,ts,jsx,js}"],
  exclude: ["**/node_modules/**", "**/dist/**", "**/build/**"],
  rules: {},
  react: {
    maxProps: 7,
    maxComponentLines: 250,
    maxHooks: 5,
    maxJSXDepth: 4,
    maxUseEffects: 3,
    requireMemoInLists: true
  },
  performance: {
    bundleBudgetKb: 500,
    heavyImports: ["lodash", "moment", "@mui/material", "antd"]
  },
  architecture: {
    layers: ["ui", "features", "shared", "data"],
    featureDirs: ["features"]
  },
  severity: {
    failOn: "error"
  }
}

export function loadConfig(configPath?: string): PrismConfig {
  const cwd = process.cwd()

  if (configPath) {
    return loadConfigFile(path.resolve(cwd, configPath))
  }

  const jsonPath = path.resolve(cwd, "prism.config.json")
  if (fs.existsSync(jsonPath)) {
    return loadConfigFile(jsonPath)
  }

  const tsPath = path.resolve(cwd, "prism.config.ts")
  if (fs.existsSync(tsPath)) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const userConfig = require(tsPath).default ?? require(tsPath)
    return mergeConfig(userConfig)
  }

  return { ...DEFAULT_CONFIG }
}

function loadConfigFile(filePath: string): PrismConfig {
  if (filePath.endsWith(".json")) {
    const userConfig = JSON.parse(fs.readFileSync(filePath, "utf-8"))
    return mergeConfig(userConfig)
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const userConfig = require(filePath).default ?? require(filePath)
  return mergeConfig(userConfig)
}

function mergeConfig(userConfig: Partial<PrismConfig>): PrismConfig {
  return {
    ...DEFAULT_CONFIG,
    ...userConfig,
    react: { ...DEFAULT_CONFIG.react, ...userConfig.react },
    performance: { ...DEFAULT_CONFIG.performance, ...userConfig.performance },
    architecture: { ...DEFAULT_CONFIG.architecture, ...userConfig.architecture },
    severity: { ...DEFAULT_CONFIG.severity, ...userConfig.severity },
    rules: { ...DEFAULT_CONFIG.rules, ...userConfig.rules }
  }
}
