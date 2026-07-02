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

        <span class="wf-name">${shortFile(file.file)}</span>

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

function color(score: number): string {

  if (score >= 90) return "#22c55e";

  if (score >= 75) return "#84cc16";

  if (score >= 60) return "#f59e0b";

  if (score >= 40) return "#f97316";

  return "#ef4444";

}