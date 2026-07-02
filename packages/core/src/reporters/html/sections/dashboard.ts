import type { HtmlReportModel } from "../model";

import { topRules } from "./top-rules";
import { worstFiles } from "./worst-files";

export function dashboard(model: HtmlReportModel): string {
  return `
<section class="dashboard-grid">

<div class="dashboard-card">

${topRules(model)}

</div>

<div class="dashboard-card">

${worstFiles(model)}

</div>

</section>
`;
}