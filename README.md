# Prism Guard

<p align="center">

**Frontend Architecture Intelligence Platform for React & TypeScript**

Analyze architectural quality, React anti-patterns, performance bottlenecks and code health with a single command.

</p>

---

## Features

- 🏗️ Frontend Architecture Analysis
- ⚛️ React Best Practices
- ⚡ Performance Anti-pattern Detection
- 📊 Architecture Quality Score (0–100)
- 📄 Interactive HTML Dashboard
- 📦 JSON Reporter
- 🛡️ SARIF Export
- 💻 Rich CLI Output
- 🚀 Zero Configuration

---

## Installation

```bash
npm install -D @riturathinsharma/prism-guard
```

or

```bash
npx @riturathinsharma/prism-guard analyze
```

---

# Quick Start

Analyze your project

```bash
npx prism-guard analyze
```

Generate an interactive HTML report

```bash
npx prism-guard analyze --html
```

Generate JSON

```bash
npx prism-guard analyze --json
```

Generate SARIF

```bash
npx prism-guard analyze --sarif
```

---

# Sample Output

```
═══════════════════════════════════════
              Prism Guard
═══════════════════════════════════════

Score          : 88/100
Files          : 245
Rules          : 21
Errors         : 2
Warnings       : 14
Info           : 7

═══════════════════════════════════════

Top Rules

• no-inline-callback
• expensive-render
• circular-import

Worst Files

78/100  Dashboard.tsx
84/100  UserList.tsx

Recommendations

✔ Memoize expensive renders
✔ Break circular imports
✔ Replace array index keys
```

---

# Interactive HTML Report

Generate a beautiful interactive dashboard.

```bash
npx prism-guard analyze --html
```

Includes

- Architecture Score
- Rule Distribution
- Worst Files
- Searchable Issues
- Pagination
- Recommendations
- File Scores
- Dashboard Cards

---

# Rules

## React

- No Inline Callback
- No Array Index Key
- Nested Components
- Excessive useEffect
- Large Components
- Anonymous Components
- Unstable Context

---

## Performance

- Blocking Imports
- Dynamic Import Suggestions
- Lazy Images
- Bundle Budget
- Expensive Render Detection

---

## Architecture

- Circular Imports
- Feature Boundaries
- Folder Boundaries
- Dependency Direction
- Component Complexity
- Excessive Props
- Duplicate Hooks
- Cognitive Complexity

---

# CLI

```
prism-guard analyze

Options

--html
--json
--sarif
--config
--output
--cwd
--verbose
```

---

# Example

```
npx prism-guard analyze --html
```

Creates

```
prism-report.html
```

---

# Roadmap

- [x] React Rules
- [x] Performance Rules
- [x] Architecture Rules
- [x] HTML Dashboard
- [x] JSON Reporter
- [x] SARIF Reporter
- [x] Scoring Engine
- [ ] Auto Fixes
- [ ] VS Code Extension
- [ ] GitHub Action
- [ ] AI-Powered Fix Suggestions
- [ ] Custom Rule SDK

---

# Why Prism Guard?

Traditional linters answer:

> "Is this code syntactically correct?"

Prism Guard answers:

- Is this component becoming too complex?
- Are React best practices being followed?
- Are architectural boundaries respected?
- Which files are hurting maintainability?
- Where are performance bottlenecks?
- What should the team fix first?

---

# License

MIT

---

# Author

**Ritumoni Sarma**

GitHub

https://github.com/Riturathin

---

⭐ If Prism Guard helps improve your codebase, consider starring the repository.