import type { AnalysisResult } from "../../types";
import { calculateScore } from "../../scoring/score";
import { calculateFileScores } from "../../scoring/file-score";

import type { HtmlReportModel } from "./model";

import { hero } from "./sections/hero";
import { stats } from "./sections/stats";
import { worstFiles } from "./sections/worst-files";

import { template } from "./template";

export function reportHtml(result: AnalysisResult): string {
  const model: HtmlReportModel = {
    result,
    score: calculateScore(result),
    files: calculateFileScores(result)
  };

  const body = [
    hero(model),
    stats(model),
    worstFiles(model)
  ].join("\n");

  return template(body);
}