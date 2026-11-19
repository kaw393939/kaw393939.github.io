---
title: English as a Higher Abstraction in Software Engineering
description: Natural-language-directed work, executable contracts, tests, Agile/Kanban, and human oversight.
---

# English as a Higher Abstraction in Software Engineering

*Research essay · November 2026*

Software engineering has repeatedly moved upward in abstraction: machine instructions, assembly, general-purpose languages, libraries, and declarative interfaces. With capable AI agents, natural language now belongs in that history.

But saying **“English is the new computer science”** is a provocation, not a complete engineering theory. Human language is ambiguous, context-dependent, and not directly executable with programming-language guarantees.

The more precise claim is that software engineers can increasingly work at the **level of goals, constraints, observable behavior, and evaluation**, while agents translate those specifications into code and workflows.

## What moves upward

In my educational projects I use personas and journeys for human goals; themes, epics, and user stories for scope; acceptance criteria for observable behavior; GitHub Issues for bounded tasks; and pull requests, commits, and tests for evidence.

The development chain is:

**Human intent → approved specification → bounded agent task → implementation → tests and independent review → accepted outcome.**

An important design choice is keeping the source of truth in concise versioned Markdown and executable contracts, rather than large repeated instructions that gradually disagree.

## Testing is the agent harness

The [MetaVis TDD strategy](https://github.com/kaw393939/metavis-demo-projects/blob/main/Docs/TDD_STRATEGY.md) is a concrete example. It specifies protocol-first design, golden fixtures, deterministic sensor outputs, real hardware tests, and performance budgets. In [MetaVis's GPU test](https://github.com/kaw393939/metavis-demo-projects/blob/main/Tests/MetaVisSimulationTests/Perf/RenderAllocationTests.swift), merely producing an image is insufficient; resource behavior also has to satisfy an invariant.

Tests should be tied to user-story acceptance criteria, and implementing agents should not be free to weaken the tests that determine success. LLM-based QA may help examine qualitative outcomes, but does not replace independent measurement or human acceptance.

## Kanban changes when agents are abundant

When agents can produce code rapidly, human review becomes the constrained resource. The board should not maximize simultaneous agent work. It should pull verified, decision-ready increments to human review at a manageable rate. Review packets should show one runnable outcome, what changed, known limitations, and the specific judgment requested.

This is not a proposal to copy every ceremony from traditional Scrum. Short reversible fixes need lightweight control notes; architecture changes and consequential releases need stronger specifications and decision records.

## What research is needed

Compare vague-prompt development, conventional issue-driven development, and test-governed agent development on matched tasks. Evaluate defects, acceptance coverage, reviewer minutes, rework, recovery, and student comprehension. A passing test suite is not proof that the underlying requirements are complete.

The academic framing connects to [Deek, Turoff and McHugh's integrated problem-solving/programming model (1999)](https://digitalcommons.njit.edu/fac_pubs/16112/) and [DeFranco-Tommarello and Deek's empirical collaboration study (2005)](https://digitalcommons.njit.edu/fac_pubs/19489/). Their research offers a basis for studying process, cognition, and collaboration as well as code artifacts.

**The argument is not that low-level knowledge becomes irrelevant.** Specialized Swift, Metal, graph databases, privacy controls, and deterministic execution still matter. The opportunity is to orchestrate them from a higher-level interface while preserving verification and authority.

[Research series](./) · [MetaVis case study](./metavis-evidence-and-evaluation)
