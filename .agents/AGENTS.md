# Skill Brain — Master Engineering Protocol

This is the master rule file. It loads automatically in every session. Read it before anything else.

---

## Philosophy

We build real engineering products. Not AI-generated slop. Not template defaults. Not the average of everything the model has seen.

Every decision here is a deliberate, mathematically grounded choice made for this project and this project only.

---

## Dollar Commands & Trigger Keywords ($)

You can trigger specific categories, dedicated planners, and capabilities instantly using dollar commands (`$` prefix) or shorthand keywords:

| Command | Keyword Trigger | Target Orchestrator / Skill | Action |
|---|---|---|---|
| `$orchestrate` | `brain:` | `supreme-orchestrator` | Evaluates multi-domain requests, selects category routing, gates execution. |
| `$plan-frontend`| `plan-ui:` | `frontend-planner` | Formulates complete UI design & dual-viewport responsive blueprint before coding. |
| `$frontend` | `ui:`, `fe:` | `frontend-master` | Activates frontend suite with Taste Kill + Anti-SOP + Dynamic Sizing baselines. |
| `$plan-backend` | `plan-api:` | `backend-planner` | Formulates domain models, responsive API contracts, and TDD plan before coding. |
| `$backend` | `api:`, `be:` | `backend-master` | Activates backend suite with Karpathy simplicity + TDD + Responsive contracts. |
| `$plan-debug` | `plan-fix:` | `debug-planner` | Mandatory diagnostic plan first: symptom, hypothesis, evidence roadmap. |
| `$debug` | `fix:` | `debug-master` | Executes diagnostic plan, isolates root cause, requires evidence before fixes. |
| `$plan-anti-slop`| `audit-plan:` | `anti-slop-planner` | Scans for AI tells, outputs itemized remediation plan across 6 dimensions. |
| `$anti-slop` | `gate:`, `audit:` | `anti-ai-sop-agent` | Generates 6-category quality gate scorecard (PASS / WARN / FAIL) with `--fix`. |
| `$architect` | `arch:`, `isolate:` | `architecture-master` | Isolates workspace via worktree, maps decision tickets, or dispatches sub-agents. |
| `$plan` | `plan:` | Domain Planner (`frontend-planner`, `backend-planner`, `debug-planner`, `implementation-planner`) | Formulates in-chat blueprint for task with zero disk writes. |
| `$memory` | `memory:` | `memory-master` | Creates master plan & phase files, renders Live Chat Dashboard, user-controlled. |
| `$taste` | `kill-slop:` | `design-taste-frontend` | Runs the 247-site study art direction: palette from subject, no template defaults. |
| `$typography` | `type:` | `typography-master` | Selects domain font archetype (Swiss, Editorial, Mono, Humanist), clamp scale. |
| `$icon` | `svg:` | `svg-icon-craftsman` | Crafts clean 24×24 grid-snapped vector geometry with 1.5px/2.0px stroke. |
| `$test`, `$verify` | `test:`, `evidence:` | `test-verifier` | Runs tests and verification ONLY when explicitly asked by the user ($test). |
| `$git` | `git:` | `git-master` | Apex Git orchestrator: branch lifecycle, atomic commit splitting, phase gates. |
| `$commit` | `commit:` | `git-atomic-committer` | Analyzes diffs, splits into 2+ atomic commits across domains, Conventional format. |
| `$branch` | `branch:` | `git-branch-manager` | Kebab branch taxonomy (`feat/`, `fix/`, `phase/`), clean tree, rebase workflow. |
| `$phase-commit` | `phase-commit:` | `git-phase-committer` | Automatic memory phase commit hook with embedded verification proof. |

---

## The Master Skill Protocol

**Rule 1 — Supreme Orchestration & Ask Before Acting:**
The top orchestrator is `supreme-orchestrator`.
Skill Brain reads `.agents/brain/config.json` for the confirmation policy (`"confirm": "always" | "multi-skill" | "never"`, default `"always"`):
- `"always"`: Always present proposed skills and ask confirmation before executing:
  > *"I propose using `[skill-a]` + `[skill-b]` via `.agents/brain/decisions/[category].md`. Shall I proceed?"*
- `"multi-skill"`: Ask confirmation only when coordinating 2 or more skills; single-skill tasks proceed directly.
- `"never"`: Autonomous execution without interactive confirmation prompts.

**Rule 2 — Categorical Dispatch & Planning Fast-Paths:**
When the user explicitly invokes a planning command (e.g. `$plan-frontend`, `$plan-backend`, `$plan-debug`, `$plan-anti-slop`):
Formulate the architecture plan, present it to the user, and request confirmation before touching code.

**Rule 3 — Mandatory Frontend Baseline Bundle:**
For all frontend tasks:
- `frontend-baseline` (≤ 4 KB) is the mandatory active baseline bundle, condensing Taste Kill v2 (`design-taste-frontend`), Anti-AI SOP (`ui-tells-eliminator`), and Dynamic Responsive Sizing (`phone-layout-master` + `desktop-ui-architect`).
- Individual full skills remain accessible on demand from references.

**Rule 4 — Mandatory Backend Responsive Contracts:**
When designing or reviewing backend APIs and data structures:
- `responsive-contract-enforcer` is active.
- Forbids fixed pixel dimensions in API payloads; mandates explicit aspect ratios and responsive srcsets.

**Rule 5 — Debugging Planning Gate:**
When the user says *"debug"* or triggers `$debug`, **NEVER** edit code immediately.
1. Formulate a diagnostic plan using `debug-planner` and `.agents/brain/decisions/debugging.md`.
2. Present the plan (symptom, reproduction, hypotheses, investigation steps) to the user.
3. Ask the user: *"Here is my diagnostic plan. Shall I proceed with the investigation?"*

**Rule 6 — User-Controlled Virtual Memory & $plan Routing:**
The user has 100% control over memory.
- **DO NOT** write casual tasks or single-turn edits into disk memory.
- `$plan` produces an in-chat plan with **zero disk writes** (routing to `frontend-planner`, `backend-planner`, `debug-planner`, or `implementation-planner`).
- Activate `.agents/memory/plans/` and `.agents/memory/phases/` **ONLY** when the user explicitly commands `$memory` or *"add to memory"*.
- When active, render the Live Phase Status Dashboard in the chat.
- Clean and archive to `.agents/memory/archive/` once all phases pass verification.

**Rule 7 — Token Efficiency (Max 3 Task Skills + Baseline Bundle):**
Never load more than 3 task skills + the baseline bundle (`frontend-baseline`) at the same time. Never attempt a monolithic pass.

**Rule 8 — Mandatory Atomic Git Commits & Branch Hygiene:**
When committing changes or managing branches:
- **Inspect Before Staging:** Run `git status --porcelain` and `git diff --stat`. Never blind-stage with `git add .`.
- **Multi-Commit Splitting:** When changes cross domain boundaries (e.g. backend core logic, UI, tests, memory phases), split them into 2 or more sequential atomic commits.
- **Conventional Commits Standard:** `<type>(<scope>): <imperative summary>` (<= 72 chars), body explaining *what* and *why*, and footer with verification proof (`Verified: <test output>`).
- **Phase Memory Hook:** When a virtual memory phase reaches `FINISHED` in `.agents/memory/phases/`, automatically trigger `git-phase-committer` (`$phase-commit`) before advancing to the next phase.
- **Branch Hygiene:** Never work directly on `main` for multi-step features. Branch with `feat/`, `fix/`, or `phase/`, rebase against `main`, and clean up merged branches.

**Rule 9 — Test-On-Demand Protocol (Never Test Unless Explicitly Asked):**
DO NOT write tests, run test suites, or execute logic test scripts unless the user explicitly requests it or invokes `$test` / `$verify`. Never block, delay, or clutter implementation with unsolicited test loops or speculative test suites unless explicitly commanded.

---

## The Skill Map

### Apex Orchestrator
| Skill | Command | Purpose |
|---|---|---|
| `supreme-orchestrator` | `$orchestrate` | Top-level router for any user request, category routing & confirmation gate |

### Category Orchestrators & Dedicated Planners
| Orchestrator / Planner | Command | Decision File | Purpose |
|---|---|---|---|
| `frontend-master` | `$frontend` | `.agents/brain/decisions/frontend.md` | All UI, design, typography, icons, animation |
| `frontend-planner` | `$plan-frontend` | `.agents/brain/decisions/frontend.md` | Pre-build UI design & dual-viewport responsive blueprint |
| `backend-master` | `$backend` | `.agents/brain/decisions/backend.md` | API, data, logic, TDD, Swift, Karpathy simplicity |
| `backend-planner` | `$plan-backend` | `.agents/brain/decisions/backend.md` | Domain schema, responsive API contract, and TDD plan |
| `debug-master` | `$debug` | `.agents/brain/decisions/debugging.md` | Diagnostic planning, root-cause isolation, verification |
| `debug-planner` | `$plan-debug` | `.agents/brain/decisions/debugging.md` | Diagnostic symptom, reproduction, and hypothesis roadmap |
| `anti-slop-planner`| `$plan-anti-slop`| `.agents/brain/decisions/anti-ai-sop.md` | 6-dimension code scanner & itemized remediation plan |
| `architecture-master` | `$architect` | `.agents/brain/decisions/architecture.md` | Worktree isolation, sub-agents, multi-session mapping |
| `memory-master` | `$memory` | `.agents/brain/decisions/memory.md` | User-controlled virtual memory plans & phases |
| `git-master` | `$git` | `.agents/brain/decisions/git.md` | Apex Git orchestrator: branch management, atomic commits, phase sync |
| `git-atomic-committer` | `$commit` | `.agents/brain/decisions/git.md` | Multi-commit splitting (2+ commits), Conventional Commits crafting |

### Frontend Skills
- `frontend-baseline` (`$frontend-baseline`) — Mandatory unified frontend bundle: Taste Kill + Anti-AI SOP + Dynamic Sizing
- `frontend-planner` (`$plan-frontend`) — Pre-build UI design & dual-viewport blueprint
- `phone-layout-master` — Mobile phone perfection (320px–480px, 100svh, 44px targets, bottom sheets)
- `desktop-ui-architect` — Desktop application UI (768px–2560px, container queries, max bounds)
- `dynamic-ui-engine` — Master dynamic responsive sizing engine (fluid clamp math, zero CLS)
- `design-taste-frontend` (`$taste`) — Full Taste Kill v2 engine (247 award sites study, no-slop house style)
- `ui-taste-enforcer` — Anti-slop art direction: no generic defaults, subject-matter inventory
- `ui-design-principles` — 2-pass design: plan → review against brief → build → critique
- `typography-master` (`$typography`) — Domain-tailored font archetypes, fluid clamp scales, tracking math
- `svg-icon-craftsman` (`$icon`) — 24×24 grid, 1.5px/2.0px uniform stroke, zero-slop clean vectors
- `animation-builder` — Build purposeful web animations from scratch with proper easing
- `animation-reviewer` — Review existing motion against craft standards
- `animation-auditor` — Full codebase animation audit + improvement roadmap
- `animation-performance` — Fix janky animations; GPU composite layer tuning (16.6ms budget)
- `animation-opportunities` — Find what should animate but doesn't
- `apple-feel` — Apple-style spring physics, gesture UI, fluid momentum motion
- `mobile-native-feel` — Make web apps feel native on mobile: 100svh, tap lag fixes, safe areas
- `ui-stress-tester` — Feed worst-case data, find layout breaks and truncation failures
- `ui-library-picker` — Opinionated library selection: Radix, Sonner, cmdk, TanStack Table
- `ui-prototyper` — Build 3 genuinely different UI variants behind a live visual picker
- `design-engineering` — Emil Kowalski's invisible polish: 9 states, micro-interactions
- `canvas-art` — Static art, posters, PNG/PDF design output
- `theme-system` — Apply or generate visual themes (Obsidian, Paper, Blueprint)
- `web-artifact-builder` — Multi-component React/Tailwind/shadcn applications
- `webapp-tester` — Playwright browser automation testing for web UIs

### Backend Skills
- `backend-planner` (`$plan-backend`) — Pre-implementation domain, contract, and TDD blueprint
- `responsive-contract-enforcer` — Mandatory backend responsive contract (no pixel widths, explicit aspect ratios)
- `karpathy-coder` — Surgical code implementation: minimal blast radius, YAGNI, think first
- `tdd-implementer` — Test-driven development: red → green → refactor loop
- `implementation-planner` — Detailed implementation plan before touching code
- `spec-writer` — Synthesize conversation into a formal technical specification
- `ticket-breaker` — Break spec into tracer-bullet tickets with dependency graph
- `spec-implementer` — Implement from a spec or tickets with incremental commits
- `domain-modeler` — Build and sharpen domain model and GLOSSARY.md
- `codebase-designer` — Deep module design, interface deepening, seam placement
- `architecture-improver` — Scan codebase for architectural debt and circular dependencies
- `swift-writer` — Modern Swift 6, strict concurrency, @MainActor, Swift Testing
- `pr-writer` — Write clear, complete pull request descriptions with test steps
- `mcp-builder` — Build MCP servers to connect LLMs with external APIs

### Debugging Skills
- `debug-planner` (`$plan-debug`) — Mandatory diagnostic symptom, reproduction, and hypothesis plan
- `root-cause-debugger` (`$debug`) — Find root cause FIRST before attempting any fix
- `bug-diagnoser` — Systematic diagnosis loop for hard bugs, bisecting, regressions
- `test-verifier` (`$verify`) — Evidence before claims: run verification commands before saying "done"
- `code-reviewer` — Review against repo standards + spec in parallel
- `issue-triager` — Move issues through triage, verify reproduction, write agent briefs

### Architecture Skills
- `subagent-executor` — Dispatch fresh sub-agents per task with isolated context
- `git-isolator` — Create isolated workspace via git worktrees before feature work
- `large-task-mapper` — Map project-level work as decision tickets across sessions
- `research-agent` — Investigate questions against primary sources with citations
- `setup-wizard` — Interactive bash wizard for human-only configuration steps
- `skill-creator` — Create, benchmark, and evaluate new skills

### Memory Skills (User-Controlled)
- `phase-planner` — Master plan (`plans/`) + phase files (`phases/`) + live chat board + cleanup
- `session-continuity` — Recover state from memory files across sessions
- `context-handoff` — Compact session state into a cold-start handoff document

### Anti-AI SOP Skills & Standalone Agent
- `anti-slop-planner` (`$plan-anti-slop`) — Pre-remediation 6-dimension code scanner & plan
- `anti-slop-enforcer` — Master kill-list for synthetic text filler and generic UI defaults
- `text-tone-enforcer` — Calibrate prose to direct, authoritative senior-engineer standard
- `ui-tells-eliminator` — Code-level scanner for pill badges, eyebrows, blob gradients
- `anti-ai-sop-agent` (`$anti-slop`) — Standalone quality-gate agent: 6-category scorecard (PASS / WARN / FAIL)

### Git Skills
- `git-atomic-committer` (`$commit`) — Multi-domain commit splitting engine (2+ commits based on blast radius & type)
- `git-branch-manager` (`$branch`) — Strict branch lifecycle, kebab taxonomy, rebase sync, merge readiness
- `git-phase-committer` (`$phase-commit`) — Automatic phase completion commits with embedded verification proof
