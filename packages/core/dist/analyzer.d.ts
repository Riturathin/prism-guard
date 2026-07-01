import type { AnalysisResult, PrismConfig } from "./types";
import { RuleRegistry } from "./registry";
export interface AnalyzeOptions {
    root?: string;
    config: PrismConfig;
    registry: RuleRegistry;
}
export declare function analyze(options: AnalyzeOptions): AnalysisResult;
//# sourceMappingURL=analyzer.d.ts.map