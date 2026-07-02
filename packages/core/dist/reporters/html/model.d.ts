import type { AnalysisResult } from "../../types";
import type { FileScore } from "../../scoring/file-score";
import type { ProjectScore } from "../../scoring/score";
export interface HtmlReportModel {
    result: AnalysisResult;
    score: ProjectScore;
    files: FileScore[];
}
//# sourceMappingURL=model.d.ts.map