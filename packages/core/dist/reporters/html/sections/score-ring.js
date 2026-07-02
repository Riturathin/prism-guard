"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoreRing = scoreRing;
function scoreRing(model) {
    const score = model.score.overall;
    const degrees = score * 3.6;
    const color = ringColor(score);
    return `
<div class="score-wrapper">

    <div
        class="score-ring"
        style="background:conic-gradient(
            ${color} 0deg,
            ${color} ${degrees}deg,
            #334155 ${degrees}deg,
            #334155 360deg
        )"
    >

        <div class="score-value">

            ${score}

            <span>/100</span>

        </div>

    </div>

    <h2>${health(score)}</h2>

    <p class="score-meta">

    🔴 ${errors(model)} Errors

    &nbsp;&nbsp;•&nbsp;&nbsp;

    🟠 ${warnings(model)} Warnings

    &nbsp;&nbsp;•&nbsp;&nbsp;

    🔵 ${info(model)} Info

    </p>

    </div>
`;
}
function health(score) {
    if (score >= 90)
        return "Excellent";
    if (score >= 75)
        return "Good";
    if (score >= 60)
        return "Needs Attention";
    if (score >= 40)
        return "Poor";
    return "Critical";
}
function ringColor(score) {
    if (score >= 90)
        return "#22c55e"; // Green
    if (score >= 75)
        return "#84cc16"; // Lime
    if (score >= 60)
        return "#f59e0b"; // Amber
    if (score >= 40)
        return "#f97316"; // Orange
    return "#ef4444"; // Red
}
function errors(model) {
    return model.result.diagnostics.filter(d => d.severity === "error").length;
}
function warnings(model) {
    return model.result.diagnostics.filter(d => d.severity === "warning").length;
}
function info(model) {
    return model.result.diagnostics.filter(d => d.severity === "info").length;
}
