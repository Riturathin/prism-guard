"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommendations = recommendations;
function recommendations(model) {
    const diagnostics = model.result.diagnostics;
    const count = (rule) => diagnostics.filter(d => d.rule === rule).length;
    const cards = [];
    if (count("circular-import")) {
        cards.push(card("🔴 Critical", "Circular Dependencies", "Break circular imports to improve build stability and maintainability."));
    }
    if (count("duplicate-hooks")) {
        cards.push(card("🟠 High", "Duplicate Hooks", "Extract repeated hook logic into reusable custom hooks."));
    }
    if (count("expensive-render")) {
        cards.push(card("🟡 Medium", "Expensive Renders", "Memoize expensive JSX and derived values using useMemo."));
    }
    if (count("lazy-image")) {
        cards.push(card("🔵 Low", "Lazy Images", "Add loading=\"lazy\" to improve page load performance."));
    }
    if (cards.length === 0) {
        cards.push(card("🟢 Excellent", "Architecture Health", "No significant recommendations. Great job!"));
    }
    return `
<section>

<h2>Architecture Recommendations</h2>

<div class="recommendation-grid">

${cards.join("")}

</div>

</section>
`;
}
function card(level, title, body) {
    return `
<div class="recommendation-card">

<h3>${level}</h3>

<h4>${title}</h4>

<p>${body}</p>

</div>
`;
}
