import path from "path"
import type { Rule, RuleContext, Diagnostic } from "@riturathinsharma/prism-guard-core"
import { createDiagnostic } from "@riturathinsharma/prism-guard-core"

const ALLOWED_ROOTS = ["src", "app", "components", "features", "pages", "lib", "hooks", "utils"]

export const folderBoundaryRule: Rule = {
  id: "folder-boundary",
  name: "Folder Boundary",
  category: "architecture",
  severity: "info",
  run(context: RuleContext): Diagnostic[] {
    const diagnostics: Diagnostic[] = []
    const projectRoot = (context.config.root ?? process.cwd()).replace(/\\/g, "/")
    const normalized = context.file.replace(/\\/g, "/")
    const relative = normalized.startsWith(projectRoot + "/")
      ? normalized.slice(projectRoot.length + 1)
      : path.basename(normalized)

    const inAllowedRoot = ALLOWED_ROOTS.some(root =>
      relative.startsWith(`${root}/`) || relative.split("/")[0] === root
    )

    if (!inAllowedRoot && (relative.endsWith(".tsx") || relative.endsWith(".jsx"))) {
      diagnostics.push(
        createDiagnostic(
          folderBoundaryRule,
          context.file,
          null,
          "React component outside standard folder structure",
          `Place components under one of: ${ALLOWED_ROOTS.join(", ")}`
        )
      )
    }

    const depth = relative.split("/").length
    if (depth > 6) {
      diagnostics.push(
        createDiagnostic(
          folderBoundaryRule,
          context.file,
          null,
          `Deeply nested file path (depth ${depth})`,
          "Flatten folder structure to improve discoverability"
        )
      )
    }

    return diagnostics
  }
}
