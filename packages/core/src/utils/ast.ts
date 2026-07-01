import { parse } from "@babel/parser"
import type { File, Node } from "@babel/types"

export function parseSource(code: string, filename: string): File {
  return parse(code, {
    sourceType: "module",
    plugins: ["typescript", "jsx"],
    sourceFilename: filename
  })
}

export function loc(node: Node | null | undefined): { line: number; column: number } {
  return {
    line: node?.loc?.start.line ?? 1,
    column: node?.loc?.start.column ?? 0
  }
}

export function isReactFile(file: string): boolean {
  return file.endsWith(".tsx") || file.endsWith(".jsx")
}

export function isSourceFile(file: string): boolean {
  return /\.(tsx?|jsx?)$/.test(file)
}
