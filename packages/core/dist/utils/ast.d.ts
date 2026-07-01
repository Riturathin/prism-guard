import type { File, Node } from "@babel/types";
export declare function parseSource(code: string, filename: string): File;
export declare function loc(node: Node | null | undefined): {
    line: number;
    column: number;
};
export declare function isReactFile(file: string): boolean;
export declare function isSourceFile(file: string): boolean;
//# sourceMappingURL=ast.d.ts.map