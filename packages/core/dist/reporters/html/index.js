"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportHtml = reportHtml;
const score_1 = require("../../scoring/score");
const file_score_1 = require("../../scoring/file-score");
const recommendations_1 = require("./sections/recommendations");
const hero_1 = require("./sections/hero");
const stats_1 = require("./sections/stats");
const issues_1 = require("./sections/issues");
const template_1 = require("./template");
const footer_1 = require("./sections/footer");
const dashboard_1 = require("./sections/dashboard");
function reportHtml(result) {
    const model = {
        result,
        score: (0, score_1.calculateScore)(result),
        files: (0, file_score_1.calculateFileScores)(result)
    };
    const body = [
        (0, hero_1.hero)(model),
        (0, stats_1.stats)(model),
        (0, dashboard_1.dashboard)(model),
        (0, recommendations_1.recommendations)(model),
        (0, issues_1.issues)(model),
        (0, footer_1.footer)(model)
    ].join("\n");
    return (0, template_1.template)(body);
}
