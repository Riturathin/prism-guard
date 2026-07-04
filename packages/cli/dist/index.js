#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const core_1 = require("@prism-guard/core");
const rules_react_1 = require("@prism-guard/rules-react");
const rules_performance_1 = require("@prism-guard/rules-performance");
const rules_architecture_1 = require("@prism-guard/rules-architecture");
function parseArgs(argv) {
    const args = {};
    let command = null;
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
function createRegistry() {
    const registry = new core_1.RuleRegistry();
    registry.registerAll(rules_react_1.reactRules);
    registry.registerAll(rules_performance_1.performanceRules);
    registry.registerAll(rules_architecture_1.architectureRules);
    return registry;
}
async function runAnalyze(args) {
    const root = path_1.default.resolve(args.cwd ?? process.cwd());
    // Load configuration relative to the project root
    const previousCwd = process.cwd();
    process.chdir(root);
    const config = args.config
        ? (0, core_1.loadConfig)(path_1.default.resolve(args.config))
        : (0, core_1.loadConfig)();
    process.chdir(previousCwd);
    config.root = root;
    const warnings = (0, core_1.validateConfig)(config);
    if (warnings.length && !args.json) {
        console.warn(`⚠ ${warnings.length} configuration warning(s):`);
        for (const warning of warnings) {
            console.warn(`  - ${warning}`);
        }
        console.warn();
    }
    const registry = createRegistry();
    const result = (0, core_1.analyze)({
        root,
        config,
        registry
    });
    if (args.json) {
        const output = (0, core_1.reportJson)(result);
        if (args.output) {
            fs_1.default.writeFileSync(args.output, output, "utf8");
            console.log(`✔ JSON report written to ${args.output}`);
        }
        else {
            console.log(output);
        }
    }
    else if (args.html) {
        const output = (0, core_1.reportHtml)(result);
        const outPath = args.output ?? path_1.default.join(root, "prism-report.html");
        fs_1.default.writeFileSync(outPath, output, "utf8");
        console.log(`✔ HTML report written to ${outPath}`);
    }
    else if (args.sarif) {
        const output = (0, core_1.reportSarif)(result);
        const outPath = args.output ?? path_1.default.join(root, "prism-report.sarif");
        fs_1.default.writeFileSync(outPath, output, "utf8");
        console.log(`✔ SARIF report written to ${outPath}`);
    }
    else {
        (0, core_1.reportConsole)(result, {
            verbose: args.verbose
        });
    }
    return (0, core_1.shouldFail)(config, result.diagnostics) ? 1 : 0;
}
function printHelp() {
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
async function main() {
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
