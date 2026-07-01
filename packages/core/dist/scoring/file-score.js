"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateFileScores = calculateFileScores;
function calculateFileScores(result) {
    const grouped = new Map();
    for (const diagnostic of result.diagnostics) {
        const list = grouped.get(diagnostic.file) ?? [];
        list.push(diagnostic);
        grouped.set(diagnostic.file, list);
    }
    const scores = [];
    for (const [file, diagnostics] of grouped.entries()) {
        const errors = diagnostics.filter(d => d.severity === "error").length;
        const warnings = diagnostics.filter(d => d.severity === "warning").length;
        const info = diagnostics.filter(d => d.severity === "info").length;
        let score = 100;
        score -= errors * 10;
        score -= warnings * 4;
        score -= info;
        score = Math.max(score, 0);
        scores.push({
            file,
            score,
            errors,
            warnings,
            info,
            diagnostics
        });
    }
    return scores.sort((a, b) => a.score - b.score);
}
