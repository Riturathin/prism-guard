import type { HtmlReportModel } from "../model";

export function worstFiles(model: HtmlReportModel): string {
  const files = model.files.slice(0, 5);

  return `
<section>

<h2>Worst Files</h2>

<div class="worst-files">

${files
  .map(file => {
    const width = Math.max(file.score, 5);

    return `

<div class="worst-file">

    <div class="wf-header">

        <span class="wf-name">${shortName(file.file)}</span>

        <span class="wf-score">${file.score}/100</span>

    </div>

    <div class="wf-bar">

        <div
            class="wf-fill"
            style="
                width:${width}%;
                background:${color(file.score)}
            ">
        </div>

    </div>

    <div class="wf-footer">

        ${file.diagnostics.length} issue(s)

    </div>

</div>

`;
  })
  .join("")}

</div>

</section>
`;
}

function shortName(path: string) {
  return path.split("/").slice(-2).join("/");
}

function color(score: number) {
  if (score >= 90) return "#22c55e";
  if (score >= 75) return "#84cc16";
  if (score >= 60) return "#f59e0b";
  if (score >= 40) return "#f97316";
  return "#ef4444";
}