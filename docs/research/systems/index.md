---
title: "Evidence-Governed AI Systems"
description: "Explore Keith Williams’s research on tracing AI claims to evidence, sharing scarce review time, and testing which decisions people should keep."
teaser: "Start with a flawed video export, a repeated witness account, or a queue of decisions. Each exposes a different way an AI system can earn a reader’s trust."
articleGenre: "Research collection"
dateLabel: "November 2026"
---

# Evidence-Governed AI Systems

I want to be able to hand someone a briefing and answer a simple question about any sentence in it. *Where did that come from?* The hard cases are the ones in which a citation exists but points to another summary, two apparent witnesses turn out to be one, or the reviewer who could settle the matter has fifty other decisions waiting.

This collection brings together working software, design papers, and proposed experiments. The essays are personal research notes. The linked repositories let you inspect which parts I have built.

## A connected research vision

A reader who wants examples can start with [a video editor’s tests](./metavis-evidence-and-evaluation). A researcher interested in evidence can follow [one disputed claim through a proposed interface](./vision-and-interface). For a deliberately difficult dataset, see [what UAP archives can actually establish](./uap-research-testbed).

## The research in one view

| If your question is … | Start here |
| --- | --- |
| How do I write a useful task for a coding agent? | [Software requirements an agent can act on](./english-software-engineering) |
| Which decisions deserve an interruption? | [Choosing when an AI workflow stops for review](./race-track-pit-stop) |
| How do I recognize a review bottleneck? | [Measuring the cost of human attention](./human-attention-kanban) |
| How can a reader find the original witness? | [Tracing contradictory accounts to their sources](./provenance-knowledge-graphs) |
| Can one set of evidence support several audiences? | [Personalizing a lesson, report, or briefing](./personalized-knowledge-artifacts) |

## Essays and technical case studies

The [MetaVis engineering case](./metavis-evidence-and-evaluation) contains code, tests, and hardware notes from a working prototype. The [interface paper](./vision-and-interface) shows how a reader might inspect an answer, locate its source, and ask why it changed. The question that connects the two is what a person should be able to verify before accepting an AI-assisted result.

## Academic documents

The [preliminary dissertation proposal](./dissertation-proposal) sets out potential experiments, comparison methods, and measures. The [literature and faculty reading map](./literature-and-faculty) identifies earlier work that informs those choices. Both are discussion documents. The proposal awaits formal academic review.

## Implemented evidence versus proposals

[Chunky Monkey](https://github.com/kaw393939/chunky-monkey-text-chunker) contains document processing and verification code. [MetaVis](https://github.com/kaw393939/metavis-demo-projects) contains a Swift/Metal pipeline and quality checks. A private Ordo Executor prototype implements ingestion and candidate-review contracts.

The [Ordo project](https://github.com/kaw393939/ordo) documents the design for a broader runtime. Its implementation remains planned. In November 2026 the private UAP catalog held 38 metadata records and an acquisition plan. The source collection, labeled benchmark, and evaluation of the combined system are future work. Its reliability, usability, and cost advantages remain open questions.
