"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDiagnostic = createDiagnostic;
const ast_1 = require("./ast");
function createDiagnostic(rule, file, node, message, recommendation, severity) {
    const { line, column } = (0, ast_1.loc)(node);
    return {
        rule: rule.id,
        severity: severity ?? rule.severity,
        category: rule.category,
        file,
        line,
        column,
        message,
        recommendation
    };
}
