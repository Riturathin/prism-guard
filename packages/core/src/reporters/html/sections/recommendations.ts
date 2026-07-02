import type { HtmlReportModel } from "../model";

export function recommendations(model: HtmlReportModel): string {
  const diagnostics = model.result.diagnostics;

  const count = (rule: string) =>
    diagnostics.filter(d => d.rule === rule).length;

  const cards: string[] = [];

  if (count("circular-import")) {
    cards.push(card(
      "🔴 Critical",
      "Circular Dependencies",
      "Break circular imports to improve build stability and maintainability."
    ));
  }

  if (count("duplicate-hooks")) {
    cards.push(card(
      "🟠 High",
      "Duplicate Hooks",
      "Extract repeated hook logic into reusable custom hooks."
    ));
  }

  if (count("expensive-render")) {
    cards.push(card(
      "🟡 Medium",
      "Expensive Renders",
      "Memoize expensive JSX and derived values using useMemo."
    ));
  }

  if (count("lazy-image")) {
    cards.push(card(
      "🔵 Low",
      "Lazy Images",
      "Add loading=\"lazy\" to improve page load performance."
    ));
  }

  if (cards.length === 0) {
    cards.push(card(
      "🟢 Excellent",
      "Architecture Health",
      "No significant recommendations."
    ));
  }

  return `

<details class="accordion">

<summary>

Architecture Recommendations

<span class="accordion-badge">

${cards.length}

</span>

</summary>

<div class="accordion-content">

<div class="recommendation-grid">

${cards.join("")}

</div>

</div>

</details>

`;
}

function card(level: string, title: string, body: string) {
  return `

<div class="recommendation-card">

<h3>${level}</h3>

<h4>${title}</h4>

<p>${body}</p>

</div>

`;
}