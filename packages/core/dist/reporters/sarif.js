"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportSarif = reportSarif;
function reportSarif(result) {
    const sarif = {
        $schema: "https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json",
        version: "2.1.0",
        runs: [
            {
                tool: {
                    driver: {
                        name: "Prism Guard",
                        version: "0.1.0",
                        informationUri: "https://github.com/prism-guard/prism-guard",
                        rules: buildRules(result.diagnostics)
                    }
                },
                results: result.diagnostics.map(toSarifResult)
            }
        ]
    };
    return JSON.stringify(sarif, null, 2);
}
function buildRules(diagnostics) {
    const seen = new Map();
    for (const d of diagnostics) {
        if (!seen.has(d.rule))
            seen.set(d.rule, d);
    }
    return Array.from(seen.values()).map(d => ({
        id: d.rule,
        name: d.rule,
        shortDescription: { text: d.message },
        fullDescription: { text: d.recommendation },
        defaultConfiguration: {
            level: d.severity === "error" ? "error" : d.severity === "warning" ? "warning" : "note"
        }
    }));
}
function toSarifResult(d) {
    return {
        ruleId: d.rule,
        level: d.severity === "error" ? "error" : d.severity === "warning" ? "warning" : "note",
        message: { text: d.message },
        locations: [
            {
                physicalLocation: {
                    artifactLocation: { uri: d.file },
                    region: {
                        startLine: d.line,
                        startColumn: d.column + 1
                    }
                }
            }
        ]
    };
}
