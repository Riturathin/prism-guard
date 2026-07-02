import type { HtmlReportModel } from "../model";

export function stats(model: HtmlReportModel): string {
  return `

    <section class="stats">

    <div class="card">
    <h3>Files</h3>
    <p>${model.result.filesAnalyzed}</p>
    </div>

    <div class="card">
    <h3>Rules</h3>
    <p>${model.result.rulesRun}</p>
    </div>

    <div class="card">
    <h3>Errors</h3>
    <p>${model.score.errors}</p>
    </div>

    <div class="card">
    <h3>Warnings</h3>
    <p>${model.score.warnings}</p>
    </div>

    <div class="card">
    <h3>Info</h3>
    <p>${model.score.info}</p>
    </div>

    <div class="card">
    <h3>Duration</h3>
    <p>${model.result.durationMs} ms</p>
    </div>

    </section>

`;
}