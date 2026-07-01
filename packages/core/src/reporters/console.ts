import type { AnalysisResult, Diagnostic } from "../types"
import { calculateScore } from "../scoring/score";
import { calculateFileScores } from "../scoring/file-score";
import { printInsights } from "./insights";
import path from "path";

export interface ConsoleReporterOptions {
  verbose?: boolean
}

export function reportConsole(result: AnalysisResult, options: ConsoleReporterOptions = {}): void {
  const { diagnostics, filesAnalyzed, rulesRun, durationMs } = result
  const score = calculateScore(result);
  const fileScores = calculateFileScores(result);

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
    console.log("✔ No issues detected\n")
    return
  }

  printSummary(diagnostics);
  console.log("Worst Files");
  console.log("──────────");

  for (const file of fileScores.slice(0, 5)) {
    console.log(
      `${file.score.toString().padStart(3)}/100   ${path.relative(
        process.cwd(),
        file.file
      )}`
    );
  }

console.log();
  const grouped = groupByFile(diagnostics)

  for (const [file, issues] of Object.entries(grouped)) {
    const fileHealth = fileScores.find(f => f.file === file)!;

    console.log();
    console.log(
      `📄 ${path.relative(process.cwd(), file)} (${fileHealth.score}/100)`
    );
    for (const d of issues) {
      const icon = d.severity === "error" ? "✖" : d.severity === "warning" ? "⚠" : "ℹ"
      console.log(
        `  ${icon} ${d.rule.padEnd(28)} ${d.message}`
      );
      
      console.log(
        `      ${d.line}:${d.column}`
      );
      if (options.verbose) {
        console.log(`    → ${d.recommendation}`)
      }
    }
    console.log()
  }

  const errors = diagnostics.filter(d => d.severity === "error").length
  const warnings = diagnostics.filter(d => d.severity === "warning").length
  console.log(`Summary: ${errors} error(s), ${warnings} warning(s), ${diagnostics.length - errors - warnings} info\n`)
  printInsights(diagnostics);
}

function groupByFile(diagnostics: Diagnostic[]): Record<string, Diagnostic[]> {
  const grouped: Record<string, Diagnostic[]> = {}
  for (const d of diagnostics) {
    if (!grouped[d.file]) grouped[d.file] = []
    grouped[d.file].push(d)
  }
  return grouped
}

function printSummary(diagnostics: Diagnostic[]) {
  const counts = new Map<string, number>();

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
