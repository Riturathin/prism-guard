"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cognitiveComplexityRule = void 0;
const prism_guard_core_1 = require("@riturathinsharma/prism-guard-core");
const traverse_1 = __importDefault(require("@babel/traverse"));
const COMPLEXITY_THRESHOLD = 15;
exports.cognitiveComplexityRule = {
    id: "cognitive-complexity",
    name: "Cognitive Complexity",
    category: "maintainability",
    severity: "warning",
    run(context) {
        const diagnostics = [];
        (0, traverse_1.default)(context.ast, {
            FunctionDeclaration(path) {
                const complexity = measureComplexity(path.node.body);
                if (complexity > COMPLEXITY_THRESHOLD) {
                    diagnostics.push((0, prism_guard_core_1.createDiagnostic)(exports.cognitiveComplexityRule, context.file, path.node, `Function "${path.node.id?.name ?? "anonymous"}" has cognitive complexity ${complexity}`, "Reduce branching, extract helpers, or split into smaller functions"));
                }
            },
            ArrowFunctionExpression(path) {
                const complexity = measureComplexity(path.node.body);
                if (complexity > COMPLEXITY_THRESHOLD) {
                    diagnostics.push((0, prism_guard_core_1.createDiagnostic)(exports.cognitiveComplexityRule, context.file, path.node, `Arrow function has cognitive complexity ${complexity}`, "Reduce branching, extract helpers, or split into smaller functions"));
                }
            }
        });
        return diagnostics;
    }
};
function measureComplexity(body) {
    let score = 0;
    const json = JSON.stringify(body);
    const patterns = [
        /"IfStatement"/g,
        /"ConditionalExpression"/g,
        /"SwitchCase"/g,
        /"ForStatement"/g,
        /"ForInStatement"/g,
        /"ForOfStatement"/g,
        /"WhileStatement"/g,
        /"CatchClause"/g,
        /"LogicalExpression"/g
    ];
    for (const pattern of patterns) {
        const matches = json.match(pattern);
        if (matches)
            score += matches.length;
    }
    return score;
}
