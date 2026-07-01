import type { AnalysisResult, Diagnostic } from "../types";
export interface FileScore {
    file: string;
    score: number;
    errors: number;
    warnings: number;
    info: number;
    diagnostics: Diagnostic[];
}
export declare function calculateFileScores(result: AnalysisResult): FileScore[];
//# sourceMappingURL=file-score.d.ts.map