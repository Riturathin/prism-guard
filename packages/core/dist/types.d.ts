import type { File } from "@babel/types";
export type Severity = "error" | "warning" | "info";
export interface Diagnostic {
    rule: string;
    severity: Severity;
    category: string;
    file: string;
    line: number;
    column: number;
    message: string;
    recommendation: string;
}
export interface Rule {
    id: string;
    name: string;
    category: string;
    severity: Severity;
    run(context: RuleContext): Diagnostic[];
}
export interface PrismConfig {
    root?: string;
    include?: string[];
    exclude?: string[];
    rules?: Record<string, "off" | "warn" | "error" | boolean>;
    react?: {
        maxProps?: number;
        maxComponentLines?: number;
        maxHooks?: number;
        maxJSXDepth?: number;
        maxUseEffects?: number;
        requireMemoInLists?: boolean;
    };
    performance?: {
        bundleBudgetKb?: number;
        heavyImports?: string[];
    };
    architecture?: {
        layers?: string[];
        featureDirs?: string[];
    };
    severity?: {
        failOn?: "error" | "warning" | "info" | "high";
    };
}
export interface ProjectContext {
    files: string[];
    importGraph: Map<string, string[]>;
}
export interface RuleContext {
    file: string;
    code: string;
    ast: File;
    config: PrismConfig;
    project?: ProjectContext;
}
export interface AnalysisResult {
    diagnostics: Diagnostic[];
    filesAnalyzed: number;
    rulesRun: number;
    durationMs: number;
}
export type ReporterFormat = "console" | "json" | "html" | "sarif";
//# sourceMappingURL=types.d.ts.map