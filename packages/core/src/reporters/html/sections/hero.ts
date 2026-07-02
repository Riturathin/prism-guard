import type { HtmlReportModel } from "../model";
import { scoreRing } from "./score-ring";

export function hero(model: HtmlReportModel): string {
  return `

<section class="hero">

<h1>

Prism Guard

</h1>

<p>

Architecture • Performance • Maintainability • React Best Practices

</p>

${scoreRing(model)}

</section>

`;
}