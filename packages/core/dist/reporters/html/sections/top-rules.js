"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topRules = topRules;
function topRules(model) {
    const counts = new Map();
    for (const d of model.result.diagnostics) {
        counts.set(d.rule, (counts.get(d.rule) ?? 0) + 1);
    }
    const rules = [...counts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    const max = Math.max(...rules.map(r => r[1]), 1);
    return `
<section>

<h2>Top Rule Violations</h2>

<div class="rule-bars">

${rules
        .map(([rule, count]) => {
        const width = (count / max) * 100;
        return `
<div class="rule-row">

<div class="rule-header">

<span>${rule}</span>

<span>${count}</span>

</div>

<div class="bar">

<div
class="fill"
style="width:${width}%">
</div>

</div>

</div>
`;
    })
        .join("")}

</div>

</section>
`;
}
