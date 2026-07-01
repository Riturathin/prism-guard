import type { PrismConfig, Rule, Severity } from "./types";
export declare class RuleRegistry {
    private rules;
    register(rule: Rule): void;
    registerAll(rules: Rule[]): void;
    getRule(id: string): Rule | undefined;
    getAllRules(): Rule[];
    getEnabledRules(config: PrismConfig): Rule[];
    private applyConfigSeverity;
}
export declare function shouldFail(config: PrismConfig, diagnostics: {
    severity: Severity;
}[]): boolean;
//# sourceMappingURL=registry.d.ts.map