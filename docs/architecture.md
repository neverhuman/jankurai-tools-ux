# jankurai-tools-ux Architecture

This repository packages the rendered UX QA tooling for the jankurai standard. It
is a single-purpose Node + TypeScript workspace: the `@jankurai/ux-qa` package,
its JSON Schema contracts, and the policy fixtures that drive deterministic UX
proof.

The product standard the wider family defines is:

```text
Rust core + TypeScript/React/Vite product surface + PostgreSQL truth
+ generated contracts + exception-only Python AI/data service
```

This member owns the TypeScript UX QA arm of that standard. New implementation
here is TypeScript-first. There is no Rust crate, no PostgreSQL database, and no
Python AI/data service committed in this repo, so those stack arms are not
applicable here.

## Layout

| Path | Role |
| --- | --- |
| `packages/ux-qa/src` | TypeScript UX QA runtime: CLI, collector, rules, config, visual baselines |
| `packages/ux-qa/tests` | Playwright specs proving geometry, artifacts, config, and visual baselines |
| `schemas/` | JSON Schemas for the UX QA report (`ux-qa.schema.json`) and policy (`ux-qa-policy.schema.json`) |
| `tools/` | `ux-qa-smoke-server.mjs` deterministic fixture server for the test suite |
| `agent/` | machine-readable owner, test, boundary, and proof maps |
| `docs/` | architecture, testing, boundaries, release, and exception docs |
| `ops/` | pinned CI script entrypoints |
| `scripts/` | local CI and fusion helpers |

## Design principles

- Reports stay deterministic: routes, screenshots, ARIA snapshots, accessibility
  results, geometry checks, and artifact paths are machine-readable and
  repo-relative.
- Visual baselines compare file bytes and hashes, not pixels or AI/VLM judgment.
- Deterministic rule violations block; review applies only to owner-approved
  baseline changes or ambiguous product calls.

Agents should prefer `agent/owner-map.json` and `agent/test-map.json` for
changes, then route to the smallest proof lane in `agent/proof-lanes.toml`.
