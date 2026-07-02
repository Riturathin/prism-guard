"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = dashboard;
const top_rules_1 = require("./top-rules");
const worst_files_1 = require("./worst-files");
function dashboard(model) {
    return `
<section class="dashboard-grid">

<div class="dashboard-card">

${(0, top_rules_1.topRules)(model)}

</div>

<div class="dashboard-card">

${(0, worst_files_1.worstFiles)(model)}

</div>

</section>
`;
}
