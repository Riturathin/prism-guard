import type { HtmlReportModel } from "../model";

export function issues(model: HtmlReportModel): string {
  const rows = model.result.diagnostics
    .map(
      d => `
<tr>

<td>
<span class="severity ${d.severity}">
${icon(d.severity)} ${d.severity.toUpperCase()}
</span>
</td>

<td>
${d.rule}
</td>

<td>
${shortFile(d.file)}
</td>

<td>
${d.line}:${d.column}
</td>

<td>
${d.message}
</td>

<td>
${d.recommendation}
</td>

</tr>
`
    )
    .join("");

  return `
<section>

<h2>Issues</h2>

<table class="issues-table">

<thead>

<tr>

<th>Severity</th>

<th>Rule</th>

<th>File</th>

<th>Line</th>

<th>Description</th>

<th>Recommendation</th>

</tr>

</thead>

<tbody>

${rows}

</tbody>

</table>

</section>
`;
}

function shortFile(file: string) {
  return file.split("/").slice(-2).join("/");
}

function icon(level: string) {
  switch (level) {
    case "error":
      return "🔴";

    case "warning":
      return "🟠";

    default:
      return "🔵";
  }
}