"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportConsole = reportConsole;
function reportConsole(result, options = {}) {
    const { diagnostics, filesAnalyzed, rulesRun, durationMs } = result;
    console.log(`\nPrism Guard Analysis Report`);
    console.log(`────────────────────────────`);
    console.log(`Files analyzed: ${filesAnalyzed}`);
    console.log(`Rules run:      ${rulesRun}`);
    console.log(`Duration:       ${durationMs}ms`);
    console.log(`Issues found:   ${diagnostics.length}\n`);
    if (diagnostics.length === 0) {
        console.log("✔ No issues detected\n");
        return;
    }
    const grouped = groupByFile(diagnostics);
    for (const [file, issues] of Object.entries(grouped)) {
        console.log(file);
        for (const d of issues) {
            const icon = d.severity === "error" ? "✖" : d.severity === "warning" ? "⚠" : "ℹ";
            console.log(`  ${icon} [${d.rule}] ${d.message} (${d.line}:${d.column})`);
            if (options.verbose) {
                console.log(`    → ${d.recommendation}`);
            }
        }
        console.log();
    }
    const errors = diagnostics.filter(d => d.severity === "error").length;
    const warnings = diagnostics.filter(d => d.severity === "warning").length;
    console.log(`Summary: ${errors} error(s), ${warnings} warning(s), ${diagnostics.length - errors - warnings} info\n`);
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
