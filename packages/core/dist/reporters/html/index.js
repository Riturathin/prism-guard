"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportHtml = reportHtml;
const score_1 = require("../../scoring/score");
const file_score_1 = require("../../scoring/file-score");
const hero_1 = require("./sections/hero");
const stats_1 = require("./sections/stats");
const worst_files_1 = require("./sections/worst-files");
const template_1 = require("./template");
function reportHtml(result) {
    const model = {
        result,
        score: (0, score_1.calculateScore)(result),
        files: (0, file_score_1.calculateFileScores)(result)
    };
    const body = [
        (0, hero_1.hero)(model),
        (0, stats_1.stats)(model),
        (0, worst_files_1.worstFiles)(model)
    ].join("\n");
    return (0, template_1.template)(body);
}
