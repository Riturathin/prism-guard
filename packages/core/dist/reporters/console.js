"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportConsole = reportConsole;
const score_1 = require("../scoring/score");
const file_score_1 = require("../scoring/file-score");
const insights_1 = require("./insights");
const path_1 = __importDefault(require("path"));
function reportConsole(result, options = {}) {
    const { diagnostics, filesAnalyzed, rulesRun, durationMs } = result;
    const score = (0, score_1.calculateScore)(result);
    const fileScores = (0, file_score_1.calculateFileScores)(result);
    console.log();
    console.log("════════════════════════════════════════════");
    console.log("              Prism Guard");
    console.log("════════════════════════════════════════════");
    console.log(`Score          : ${score.overall}/100`);
    console.log(`Files          : ${filesAnalyzed}`);
    console.log(`Rules          : ${rulesRun}`);
    console.log(`Errors         : ${score.errors}`);
    console.log(`Warnings       : ${score.warnings}`);
    console.log(`Info           : ${score.info}`);
    console.log(`Duration       : ${durationMs}ms`);
    console.log("════════════════════════════════════════════");
    console.log();
    if (diagnostics.length === 0) {
        console.log("✔ No issues detected\n");
        return;
    }
    printSummary(diagnostics);
    console.log("Worst Files");
    console.log("──────────");
    for (const file of fileScores.slice(0, 5)) {
        console.log(`${file.score.toString().padStart(3)}/100   ${path_1.default.relative(process.cwd(), file.file)}`);
    }
    console.log();
    const grouped = groupByFile(diagnostics);
    for (const [file, issues] of Object.entries(grouped)) {
        const fileHealth = fileScores.find(f => f.file === file);
        console.log();
        console.log(`📄 ${path_1.default.relative(process.cwd(), file)} (${fileHealth.score}/100)`);
        for (const d of issues) {
            const icon = d.severity === "error" ? "✖" : d.severity === "warning" ? "⚠" : "ℹ";
            console.log(`  ${icon} ${d.rule.padEnd(28)} ${d.message}`);
            console.log(`      ${d.line}:${d.column}`);
            if (options.verbose) {
                console.log(`    → ${d.recommendation}`);
            }
        }
        console.log();
    }
    const errors = diagnostics.filter(d => d.severity === "error").length;
    const warnings = diagnostics.filter(d => d.severity === "warning").length;
    console.log(`Summary: ${errors} error(s), ${warnings} warning(s), ${diagnostics.length - errors - warnings} info\n`);
    (0, insights_1.printInsights)(diagnostics);
}
function groupByFile(diagnostics) {
    const grouped = {};
    for (const d of diagnostics) {
        if (!grouped[d.file])
            grouped[d.file] = [];
        grouped[d.file].push(d);
    }
    return grouped;
}
function printSummary(diagnostics) {
    const counts = new Map();
    for (const d of diagnostics) {
        counts.set(d.rule, (counts.get(d.rule) ?? 0) + 1);
    }
    console.log("Top Rules");
    console.log("─────────");
    [...counts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .forEach(([rule, count]) => {
        console.log(`${count.toString().padStart(2)}   ${rule}`);
    });
    console.log();
}
