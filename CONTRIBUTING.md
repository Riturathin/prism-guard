# Contributing to Prism Guard

Thank you for your interest in contributing!

## Getting Started

Clone the repository.

```bash
git clone https://github.com/Riturathin/prism-guard.git
cd prism-guard
npm install
```

Build the project.

```bash
npm run build
```

Run the analyzer.

```bash
npm run analyze
```

## Development Workflow

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/your-feature-name
```

3. Implement your changes.
4. Ensure the project builds successfully.

```bash
npm install
npm run build
```

5. Commit your changes.

```bash
git commit -m "Add new React rule"
```

6. Push your branch.

```bash
git push origin feature/your-feature-name
```

7. Open a Pull Request into **master**.

> Direct commits to `master` are not accepted. All changes must go through a Pull Request and pass the CI checks before merging.

1. Create a feature branch.
2. Implement your change.
3. Add tests if applicable.
4. Ensure the project builds successfully.
5. Submit a Pull Request.

## Coding Standards

- TypeScript
- Small focused commits
- Prefer readability over cleverness
- Document new rules

## Pull Requests

Please include:

- Problem being solved
- Screenshots (if UI changes)
- Example output
- Breaking changes (if any)

Thank you for helping improve Prism Guard!