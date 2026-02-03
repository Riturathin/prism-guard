# Prism Guard

**Prism Guard** is a CI-native tool that enforces frontend performance
and maintainability guardrails at pull request time.

It analyzes React (and later Vue) code using AST-based rules and
fails or warns on patterns that cause long-term performance and
architectural issues.

## Why Prism Guard?

Most CI pipelines verify correctness.
Prism Guard verifies *long-term frontend health*.

It helps teams catch:
- Excessive component complexity
- Re-render risks
- Bundle size regressions
- Deprecated or risky dependencies

…before code is merged.

## Features (v1)

- React-aware AST analysis
- Configurable guardrails with safe defaults
- CI-friendly CLI
- Deterministic, rule-based signals (no AI dependency)

## Usage

```bash
npx prism-guard analyze
