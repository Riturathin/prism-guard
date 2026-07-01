"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportHtml = reportHtml;
function reportHtml(result) {
    const rows = result.diagnostics.map(d => diagnosticRow(d)).join("\n");
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prism Guard Report</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; padding: 2rem; }
    h1 { font-size: 1.75rem; margin-bottom: 0.5rem; color: #f8fafc; }
    .meta { color: #94a3b8; margin-bottom: 2rem; font-size: 0.9rem; }
    .stats { display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap; }
    .stat { background: #1e293b; border-radius: 8px; padding: 1rem 1.5rem; min-width: 120px; }
    .stat-value { font-size: 1.5rem; font-weight: 700; }
    .stat-label { font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
    table { width: 100%; border-collapse: collapse; background: #1e293b; border-radius: 8px; overflow: hidden; }
    th { background: #334155; text-align: left; padding: 0.75rem 1rem; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; }
    td { padding: 0.75rem 1rem; border-top: 1px solid #334155; font-size: 0.875rem; vertical-align: top; }
    tr:hover td { background: #263348; }
    .severity-error { color: #f87171; font-weight: 600; }
    .severity-warning { color: #fbbf24; font-weight: 600; }
    .severity-info { color: #60a5fa; font-weight: 600; }
    .rule-id { font-family: monospace; font-size: 0.8rem; color: #a78bfa; }
    .file-path { font-family: monospace; font-size: 0.8rem; color: #94a3b8; word-break: break-all; }
    .recommendation { color: #94a3b8; font-size: 0.8rem; margin-top: 0.25rem; }
    .empty { text-align: center; padding: 3rem; color: #64748b; }
  </style>
</head>
<body>
  <h1>Prism Guard Report</h1>
  <p class="meta">Generated ${new Date().toISOString()}</p>
  <div class="stats">
    <div class="stat"><div class="stat-value">${result.filesAnalyzed}</div><div class="stat-label">Files</div></div>
    <div class="stat"><div class="stat-value">${result.rulesRun}</div><div class="stat-label">Rules</div></div>
    <div class="stat"><div class="stat-value">${result.diagnostics.filter(d => d.severity === "error").length}</div><div class="stat-label">Errors</div></div>
    <div class="stat"><div class="stat-value">${result.diagnostics.filter(d => d.severity === "warning").length}</div><div class="stat-label">Warnings</div></div>
    <div class="stat"><div class="stat-value">${result.durationMs}ms</div><div class="stat-label">Duration</div></div>
  </div>
  ${result.diagnostics.length === 0
        ? '<p class="empty">No issues detected ✔</p>'
        : `<table>
    <thead>
      <tr>
        <th>Severity</th>
        <th>Rule</th>
        <th>Location</th>
        <th>Message</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>`}
</body>
</html>`;
}
function diagnosticRow(d) {
    return `<tr>
    <td class="severity-${d.severity}">${d.severity}</td>
    <td><span class="rule-id">${escapeHtml(d.rule)}</span><br><span style="font-size:0.75rem;color:#64748b">${escapeHtml(d.category)}</span></td>
    <td><span class="file-path">${escapeHtml(d.file)}:${d.line}:${d.column}</span></td>
    <td>${escapeHtml(d.message)}<div class="recommendation">→ ${escapeHtml(d.recommendation)}</div></td>
  </tr>`;
}
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
