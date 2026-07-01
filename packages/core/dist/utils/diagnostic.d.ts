import type { Diagnostic, Rule, Severity } from "../types";
import type { Node } from "@babel/types";
export declare function createDiagnostic(rule: Rule, file: string, node: Node | null | undefined, message: string, recommendation: string, severity?: Severity): Diagnostic;
//# sourceMappingURL=diagnostic.d.ts.map