"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stats = stats;
function stats(model) {
    const diagnostics = model.result.diagnostics;
    const errors = diagnostics.filter(d => d.severity === "error").length;
    const warnings = diagnostics.filter(d => d.severity === "warning").length;
    const info = diagnostics.filter(d => d.severity === "info").length;
    const cards = [
        ["📄", "Files", model.result.filesAnalyzed, "#3b82f6"],
        ["⚙️", "Rules", model.result.rulesRun, "#8b5cf6"],
        ["❌", "Errors", errors, "#ef4444"],
        ["⚠️", "Warnings", warnings, "#f59e0b"],
        ["ℹ️", "Info", info, "#06b6d4"],
        ["⚡", "Duration", `${model.result.durationMs} ms`, "#22c55e"]
    ];
    return `
<section class="stats">

${cards.map(([icon, title, value, color]) => `

    <div
    class="card"
    style="--accent:${color};">
    
    <div class="icon">
    
    ${icon}
    
    </div>
    
    <h3>
    
    ${title}
    
    </h3>
    
    <p>
    
    ${value}
    
    </p>
    
    </div>
    
    `).join("")}

</section>
`;
}
