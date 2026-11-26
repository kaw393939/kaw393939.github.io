---
title: "Evidence-Governed AI Systems"
description: "Explore Keith Williams’s research on tracing AI claims to evidence, sharing scarce review time, and testing which decisions people should keep."
teaser: "Start with a flawed video export, a repeated witness account, or a queue of decisions. Each exposes a different way an AI system can earn a reader’s trust."
articleGenre: "Research collection"
---

# Evidence-Governed AI Systems

I want to be able to hand someone a briefing and answer a simple question about any sentence in it. *Where did that come from?* The hard cases are the ones in which a citation exists but points to another summary, two apparent witnesses turn out to be one, or the reviewer who could settle the matter has fifty other decisions waiting.

This collection brings together working software, design papers, and proposed experiments. The essays are personal research notes. The linked repositories let you inspect which parts I have built.

## A connected research vision

For an engineering review, try the reference-frame or export check in [the MetaVis case](./metavis-evidence-and-evaluation). For a research discussion, [the preliminary proposal](./dissertation-proposal) identifies the comparisons I would run and the results that could change the design.

<span id="essays-and-technical-case-studies"></span>

## The research in one view

| What would you like to inspect? | Article | Evidence available |
| --- | --- | --- |
| Does the video export contain what the editor intended? | [MetaVis frame and export checks](./metavis-evidence-and-evaluation) | Swift/Metal prototype with public test code |
| Can someone else reproduce an agent’s change? | [Software requirements an agent can act on](./english-software-engineering) | Worked requirement and a proposed team study |
| Which decisions deserve an interruption? | [Choosing when an AI workflow stops for review](./race-track-pit-stop) | Workflow design and a proposed policy comparison |
| Would another hour of review help? | [Measuring the cost of human attention](./human-attention-kanban) | Illustrative queue and proposed staffing measures |
| Do two reports share a witness? | [Tracing accounts to their sources](./provenance-knowledge-graphs) | Worked example and proposed verification method |
| Can a reader flag a copied passage? | [Following one citation](./vision-and-interface) | Interface sketch and proposed usability study |
| Which archival records could test this? | [Building a UAP research testbed](./uap-research-testbed) | Catalog of 38 metadata records and an acquisition plan |
| Can one finding support a lesson and a briefing? | [Adapting a finding for two readers](./personalized-knowledge-artifacts) | Two hypothetical rewrites and a proposed cost comparison |

## Academic documents

The [preliminary dissertation proposal](./dissertation-proposal) sets out potential experiments, comparison methods, and measures. The [literature and faculty reading map](./literature-and-faculty) identifies earlier work that informs those choices. Both are discussion documents. The proposal awaits formal academic review.

## Implemented evidence versus proposals

[Chunky Monkey](https://github.com/kaw393939/chunky-monkey-text-chunker) contains document processing and verification code. [MetaVis](https://github.com/kaw393939/metavis-demo-projects) contains a Swift/Metal pipeline and quality checks. A private Ordo Executor prototype implements ingestion and candidate-review contracts.

The [Ordo project](https://github.com/kaw393939/ordo) documents the design for a broader runtime. Its implementation remains planned. The catalog snapshot described here contains 38 metadata records and an acquisition plan. The source collection, labeled benchmark, and evaluation of the combined system are future work. Its reliability, usability, and cost advantages remain open questions.
