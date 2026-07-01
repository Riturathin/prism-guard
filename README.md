# Prism Guard

**Prism Guard** is an AST-powered static analysis platform for React applications. It focuses on architecture, performance, maintainability, and engineering best practices — complementing (not replacing) ESLint and Prettier.

## Architecture

```
CLI → Analyzer Engine → Framework Detector → Rule Registry → AST Traversal → Diagnostics → Reporters
```

## Quick Start

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Analyze the sample fixture project
npm run analyze:fixture

# Analyze current directory
npm run analyze

# Output formats
npm run analyze:json
npm run analyze:html
node packages/cli/dist/index.js analyze --sarif --cwd fixtures/sample-react
```

## CLI Usage

```bash
prism-guard analyze
prism-guard analyze --json
prism-guard analyze --html
prism-guard analyze --sarif
prism-guard analyze --config prism.config.json
prism-guard analyze --cwd ./my-react-app --verbose
```

## Package Structure

```
packages/
  cli/                  Command-line interface
  core/                 Analyzer engine, registry, reporters, types
  config/               Config helpers (defineConfig)
  rules-react/          React-specific rules
  rules-performance/    Performance rules
  rules-architecture/   Architecture & maintainability rules
fixtures/
  sample-react/         Example project with intentional violations
```

## Configuration

Create `prism.config.json` in your project root:

```json
{
  "react": {
    "maxProps": 7,
    "maxComponentLines": 250,
    "maxHooks": 5,
    "maxUseEffects": 3
  },
  "performance": {
    "bundleBudgetKb": 500,
    "heavyImports": ["lodash", "moment"]
  },
  "rules": {
    "no-inline-callback": "warn",
    "circular-import": "error"
  }
}
```

Or use TypeScript config via `prism.config.ts` with `@prism-guard/config`:

```ts
import { defineConfig } from "@prism-guard/config"

export default defineConfig({
  rules: { "no-array-index-key": "error" }
})
```

## Rules

| Category | Rule | Description |
|----------|------|-------------|
| React | no-inline-callback | Inline functions in JSX attributes |
| React | no-array-index-key | Array index used as React key |
| React | no-anonymous-component | Unnamed components |
| React | no-large-component | Components exceeding line limit |
| React | excessive-useeffect | Too many useEffect calls |
| React | nested-component | Components defined inside components |
| React | unstable-context | Inline context provider values |
| Performance | blocking-import | Heavy synchronous imports |
| Performance | dynamic-import | Suggest lazy loading |
| Performance | bundle-budget | File size exceeds budget |
| Performance | lazy-image | img without loading="lazy" |
| Performance | expensive-render | .map() in JSX without memoization |
| Architecture | circular-import | Circular dependency detection |
| Architecture | feature-boundary | Cross-feature imports |
| Architecture | dependency-direction | Layer dependency violations |
| Architecture | folder-boundary | Non-standard folder placement |
| Maintainability | excessive-props | Too many component props |
| Maintainability | duplicate-hooks | Repeated hook calls |
| Maintainability | cognitive-complexity | High branching complexity |
| Maintainability | component-complexity | Hook/JSX depth limits |

## Plugin Architecture

Rules implement the `Rule` interface from `@prism-guard/core`:

```ts
interface Rule {
  id: string
  name: string
  category: string
  severity: Severity
  run(context: RuleContext): Diagnostic[]
}
```

Register custom rules via `RuleRegistry`:

```ts
import { RuleRegistry } from "@prism-guard/core"

const registry = new RuleRegistry()
registry.register(myCustomRule)
```

## License

MIT
