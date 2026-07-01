import type { Diagnostic } from "../types";

export function printInsights(diagnostics: Diagnostic[]) {
  const counts = new Map<string, number>();

  for (const d of diagnostics) {
    counts.set(d.rule, (counts.get(d.rule) ?? 0) + 1);
  }

  const top = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  console.log();
  console.log("Recommendations");
  console.log("───────────────");

  for (const [rule, count] of top) {
    console.log(`• ${recommendation(rule, count)}`);
  }

  console.log();
}

function recommendation(rule: string, count: number): string {
  switch (rule) {
    case "duplicate-hooks":
      return `${count} duplicate hook issues. Consolidate repeated hooks into reusable logic.`;

    case "expensive-render":
      return `${count} expensive render paths detected. Memoize derived JSX and computations.`;

    case "circular-import":
      return `${count} circular dependencies found. Break the dependency graph between modules.`;

    case "feature-boundary":
      return `Feature boundaries are being violated. Keep imports within feature modules.`;

    case "lazy-image":
      return `Images should use loading="lazy" unless required above the fold.`;

    default:
      return `${count} occurrence(s) of "${rule}". Review and address this rule.`;
  }
}