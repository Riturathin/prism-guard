import type { AnalysisResult } from "../../types";
import { calculateScore } from "../../scoring/score";
import { calculateFileScores } from "../../scoring/file-score";
import { recommendations } from "./sections/recommendations";
import type { HtmlReportModel } from "./model";
import { topRules } from "./sections/top-rules";
import { hero } from "./sections/hero";
import { stats } from "./sections/stats";
import { worstFiles } from "./sections/worst-files";
import { issues } from "./sections/issues";
import { template } from "./template";
import { footer } from "./sections/footer";
import { dashboard } from "./sections/dashboard";

export function reportHtml(result: AnalysisResult): string {
  const model: HtmlReportModel = {
    result,
    score: calculateScore(result),
    files: calculateFileScores(result)
  };

  const body = [
    hero(model),
    stats(model),
    dashboard(model),
    recommendations(model),
    issues(model),
    footer(model)
    ].join("\n");

  return template(body);
}