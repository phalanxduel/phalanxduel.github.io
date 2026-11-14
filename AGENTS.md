---
name: phalanxduel-site-instructions
scope: repository
audience: all coding agents
canonical: true
---

# Agent Instructions

Use Backlog.md MCP for project planning and task management. Read the workflow
overview before creating or executing a task; consult its task creation,
execution, or finalization instructions as needed. Keep task dependencies in
DAG order. The `backlog/` directory is the source of truth.

Project-specific agent guidance:

- Issue tracking: `docs/agents/issue-tracker.md`
- Triage labels: `docs/agents/triage-labels.md`
- Domain documentation: `docs/agents/domain.md`

<!-- groma:start -->
## Groma

This project uses Groma. Before you scan, inspect, or curate architecture, or change files for a Backlog task, run `groma agent-instructions` and read the guide it names for that job. When it reports a first scan, ask the user whether they want you to curate the architecture. Do not edit Groma-owned architecture files directly.
<!-- groma:end -->
