#!/usr/bin/env node

import fs from "fs";
import path from "path";

import {
  analyze,
  loadConfig,
  validateConfig,
  RuleRegistry,
  shouldFail,
  reportConsole,
  reportJson,
  reportHtml,
  reportSarif
} from "@prism-guard/core";

import { reactRules } from "@prism-guard/rules-react";
import { performanceRules } from "@prism-guard/rules-performance";
import { architectureRules } from "@prism-guard/rules-architecture";

interface AnalyzeArgs {
  config?: string;
  json?: boolean;
  html?: boolean;
  sarif?: boolean;
  output?: string;
  verbose?: boolean;
  cwd?: string;
}

function parseArgs(argv: string[]): {
  command: string | null;
  args: AnalyzeArgs;
} {
  const args: AnalyzeArgs = {};
  let command: string | null = null;

  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];

    if (!command && !arg.startsWith("-")) {
      command = arg;
      continue;
    }

    switch (arg) {
      case "--json":
        args.json = true;
        break;

      case "--html":
        args.html = true;
        break;

      case "--sarif":
        args.sarif = true;
        break;

      case "--verbose":
      case "-v":
        args.verbose = true;
        break;

      case "--config":
        args.config = argv[++i];
        break;

      case "--output":
        args.output = argv[++i];
        break;

      case "--cwd":
        args.cwd = argv[++i];
        break;
    }
  }

  return {
    command: command ?? "analyze",
    args
  };
}

function createRegistry(): RuleRegistry {
  const registry = new RuleRegistry();

  registry.registerAll(reactRules);
  registry.registerAll(performanceRules);
  registry.registerAll(architectureRules);

  return registry;
}

async function runAnalyze(args: AnalyzeArgs): Promise<number> {
  const root = path.resolve(args.cwd ?? process.cwd());

  // Load configuration relative to the project root
  const previousCwd = process.cwd();

  process.chdir(root);

  const config = args.config
    ? loadConfig(path.resolve(args.config))
    : loadConfig();

  process.chdir(previousCwd);

  config.root = root;

  const warnings = validateConfig(config);

  if (warnings.length && !args.json) {
    console.warn(`⚠ ${warnings.length} configuration warning(s):`);

    for (const warning of warnings) {
      console.warn(`  - ${warning}`);
    }

    console.warn();
  }

  const registry = createRegistry();

  const result = analyze({
    root,
    config,
    registry
  });

  if (args.json) {
    const output = reportJson(result);

    if (args.output) {
      fs.writeFileSync(args.output, output, "utf8");
      console.log(`✔ JSON report written to ${args.output}`);
    } else {
      console.log(output);
    }

  } else if (args.html) {
    const output = reportHtml(result);

    const outPath =
      args.output ?? path.join(root, "prism-report.html");

    fs.writeFileSync(outPath, output, "utf8");

    console.log(`✔ HTML report written to ${outPath}`);

  } else if (args.sarif) {
    const output = reportSarif(result);

    const outPath =
      args.output ?? path.join(root, "prism-report.sarif");

    fs.writeFileSync(outPath, output, "utf8");

    console.log(`✔ SARIF report written to ${outPath}`);

  } else {
    reportConsole(result, {
      verbose: args.verbose
    });
  }

  return shouldFail(config, result.diagnostics) ? 1 : 0;
}

function printHelp(): void {
  console.log(`
Prism Guard

Frontend Architecture Analysis Platform

Usage

  prism-guard analyze

Options

  --cwd <path>        Project root
  --config <path>     Config file
  --json              JSON output
  --html              HTML report
  --sarif             SARIF report
  --output <path>     Output file
  --verbose           Detailed console output
  -h, --help          Show help
`);
}

async function main(): Promise<void> {
  const { command, args } = parseArgs(process.argv);

  switch (command) {
    case "analyze": {
      const exitCode = await runAnalyze(args);
      process.exitCode = exitCode;
      return;
    }

    case "help":
    case "--help":
    case "-h":
      printHelp();
      return;

    default:
      console.error(`Unknown command "${command}"`);
      printHelp();
      process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error("✖ Prism Guard failed");
  console.error(err);
  process.exitCode = 1;
});