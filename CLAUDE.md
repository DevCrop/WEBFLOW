@AGENTS.md

## Claude Code

- This file intentionally imports `AGENTS.md` so Claude Code and Codex share the same project rules without duplicated policy.
- Keep project-specific shared rules in `AGENTS.md`; use this file only for Claude-specific loading or debugging notes.
- Put personal Claude preferences in `CLAUDE.local.md`, not in committed project guidance.
- If Claude appears to miss these rules, run `/memory` and verify that this `CLAUDE.md` and imported `AGENTS.md` are loaded.
