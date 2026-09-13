.PHONY: dev build start test test-watch typecheck lint lint-fix format format-check check clean pipeline worker

dev:
	pnpm dev

build:
	pnpm build

start:
	pnpm start

typecheck:
	pnpm typecheck

lint:
	pnpm lint

lint-fix:
	pnpm lint:fix

format:
	pnpm format

format-check:
	pnpm format:check

test:
	pnpm test

test-watch:
	pnpm test:watch

test-cov:
	pnpm test:coverage

check: typecheck lint format-check test
	@echo "All quality checks passed successfully!"

pipeline:
	pnpm pipeline:all

pipeline-discover:
	pnpm pipeline:discover

worker:
	pnpm worker

clean:
	rm -rf .next dist build coverage *.tsbuildinfo
