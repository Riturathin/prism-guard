"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleRegistry = void 0;
exports.shouldFail = shouldFail;
const SEVERITY_RANK = {
    info: 0,
    warning: 1,
    error: 2
};
class RuleRegistry {
    constructor() {
        this.rules = new Map();
    }
    register(rule) {
        this.rules.set(rule.id, rule);
    }
    registerAll(rules) {
        for (const rule of rules) {
            this.register(rule);
        }
    }
    getRule(id) {
        return this.rules.get(id);
    }
    getAllRules() {
        return Array.from(this.rules.values());
    }
    getEnabledRules(config) {
        return this.getAllRules()
            .map(rule => this.applyConfigSeverity(rule, config))
            .filter(rule => rule.severity !== "off");
    }
    applyConfigSeverity(rule, config) {
        const setting = config.rules?.[rule.id];
        if (setting === false || setting === "off") {
            return { ...rule, severity: "off" };
        }
        if (setting === "warn") {
            return { ...rule, severity: "warning" };
        }
        if (setting === "error") {
            return { ...rule, severity: "error" };
        }
        if (setting === true) {
            return rule;
        }
        return rule;
    }
}
exports.RuleRegistry = RuleRegistry;
function shouldFail(config, diagnostics) {
    const threshold = config.severity?.failOn ?? "error";
    if (threshold === "high") {
        return diagnostics.some(d => d.severity === "error");
    }
    const minRank = SEVERITY_RANK[threshold] ?? SEVERITY_RANK.error;
    return diagnostics.some(d => SEVERITY_RANK[d.severity] >= minRank);
}
