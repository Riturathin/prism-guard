import type { HtmlReportModel } from "../model";

export function issues(model: HtmlReportModel): string {

  const diagnostics = model.result.diagnostics;

  const rows = diagnostics.map(d => `

<tr>

<td>

<span class="severity ${d.severity}">

${icon(d.severity)}

${d.severity.toUpperCase()}

</span>

</td>

<td>${d.rule}</td>

<td>${shortFile(d.file)}</td>

<td>${d.line}:${d.column}</td>

<td>${d.message}</td>

<td>${d.recommendation}</td>

</tr>

`).join("");

  return `

<details class="accordion">

<summary>

Issues

<span class="accordion-badge">

${diagnostics.length}

</span>

</summary>

<div class="accordion-content">

<div class="pg-table">

<div class="table-toolbar">

<input
class="table-search"
type="text"
placeholder="Search issues..."
>
Entries per page
<select class="rows-select">

<option value="10" selected>10</option>

<option value="20">20</option>

<option value="50">50</option>

<option value="all">All</option>

</select>

</div>

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

<div class="table-footer">

<div class="page-info"></div>

<div class="pagination"></div>

</div>

</div>

</div>

</details>

`;
}

function shortFile(file: string): string {

    const parts = file.replace(/\\/g, "/").split("/");
  
    const srcIndex = parts.lastIndexOf("src");
    if (srcIndex !== -1) {
      return parts.slice(srcIndex).join("/");
    }
  
    const featuresIndex = parts.lastIndexOf("features");
    if (featuresIndex !== -1) {
      return parts.slice(featuresIndex).join("/");
    }
  
    return parts.slice(-3).join("/");
  
  }

function icon(level: string): string {
  switch (level) {
    case "error":
      return "🔴";
    case "warning":
      return "🟠";
    default:
      return "🔵";
  }
}