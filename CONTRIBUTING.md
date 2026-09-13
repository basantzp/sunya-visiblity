# Contributing to Sunya Visibility

Welcome! Sunya Visibility is built with extreme precision and high-standard engineering principles.

## Development Workflow

1. **Clone and Install**:

   ```bash
   pnpm install
   ```

2. **Branching Strategy**:
   - `main`: Production-ready branch.
   - Feature branches: `feat/feature-name`, `fix/bug-name`, `refactor/scope`.

3. **Code Quality Requirements**:
   Before submitting any pull request or commit, ensure all checks pass:

   ```bash
   make check
   # or
   pnpm check
   ```

   This automatically runs:
   - TypeScript compilation (`pnpm typecheck`)
   - ESLint validation (`pnpm lint`)
   - Prettier code style check (`pnpm format:check`)
   - Automated unit tests (`pnpm test`)

4. **Commit Hygiene**:
   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat(scope): add new feature`
   - `fix(scope): resolve issue`
   - `test(scope): add test coverage`
   - `docs(scope): update documentation`
   - `chore(scope): build or tool updates`
