import type { HtmlReportModel } from "../model";
import { scoreRing } from "./score-ring";

export function hero(model: HtmlReportModel): string {
  return `

<section class="hero">

<h1>

Prism Guard

</h1>

<p>

Frontend Architecture Intelligence Platform

</p>

${scoreRing(model)}

</section>

`;
}