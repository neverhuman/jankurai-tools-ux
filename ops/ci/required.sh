#!/usr/bin/env bash
# Required lane: the lightweight gate that must pass on every push.
# Installs the locked dependency graph, builds the package, and runs the suite.
set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/lib.sh"
cd "$REPO_ROOT"

log "required lane: npm ci + build + test"
npm ci
npm --workspace @jankurai/ux-qa run build
npm --workspace @jankurai/ux-qa run test
