import type { AnalysisResult } from "../types";
export interface ProjectScore {
    overall: number;
    errors: number;
    warnings: number;
    info: number;
}
export declare function calculateScore(result: AnalysisResult): ProjectScore;
//# sourceMappingURL=score.d.ts.map