---
title: From Personalized Knowledge Artifacts to Governed AI Systems
description: Why generating personalized educational, business, and media artifacts led me to research provenance, multimodal evidence, and human attention.
---

# From Personalized Knowledge Artifacts to Governed AI Systems

*Research essay · November 2026*

I began with an application question: **could AI make an individually useful knowledge artifact as practical to produce as a mass-market document?**

An artifact might be a lesson for one learner, an audio explanation for a commuter, a business brief tailored to an operator, a research video, or a structured packet for another agent. Personalization would change the presentation and level of detail. It should not change what the underlying evidence supports.

The challenge quickly moved beyond generation. A compelling artifact can still be wrong. A technically correct artifact can fail a human need. And checking every sentence or frame with a specialist destroys the economics of producing artifacts individually.

## The engineering problem behind the product

To generate repeatedly from mixed sources, a system needs to know:

- Where a statement came from and when the evidence was obtained.
- Whether it is a first-hand observation, quotation, inference, allegation, or independently supported claim.
- Which identity or event a passage refers to, including unresolved alternatives.
- Which transformations produced a summary or generated asset.
- What a human or authorized agent approved, and **the scope** of that approval.
- When new evidence should trigger reconsideration.

This led me toward a shared knowledge foundation: retain originals and exact spans; derive claims and graph relations; index for lexical and semantic retrieval; qualify information for particular uses; and generate many forms of artifacts from the same governed sources.

The graph would act as a compressed map of the information, not a replacement for the original evidence. A user or agent could request the source passage whenever a consequential decision demanded it.

## How my projects explored this

**December 2024 — [Chunky Monkey](https://github.com/kaw393939/chunky-monkey-text-chunker).** The repository records work on token-aware chunking, document metadata, content hashes, verification modes, and repeatable ingestion. This was one necessary infrastructure problem: keeping large information collections manageable and inspectable.

**December 2025 — [MetaVis](https://github.com/kaw393939/metavis-demo-projects).** I explored native Swift and Metal media processing, sensor observations, deterministic reference tests, and Gemini-based qualitative reviews. The architecture separated ambiguous interpretation from typed, reversible execution. The code and sprint records provide a richer account than a feature list.

**2026 — [Ordo](https://github.com/kaw393939/ordo) and [Ordo Executor](https://github.com/kaw393939/ordo_executor).** The focus moved toward model-agnostic tools, source manifests, evidence-bearing artifacts, graph candidates, explicit promotion, and risk-based human review. The main Ordo repository contains extensive specifications; its documented Elixir runtime is still planned.

**November 2026 — [UAP Corpus](https://github.com/kaw393939/uap-corpus).** This is a deliberately difficult collection for testing shared-source repetition, contradictory accounts, provenance, and unknowns. The repository contains metadata and acquisition planning, not a completed downloaded corpus.

These dated repository milestones establish a progression of experimentation, not priority over all prior academic work. Commit dates can also postdate the first idea.

## What I mean by reliability

Not every artifact needs the same degree of review. Formatting a non-sensitive summary and approving a financial obligation have different consequences. A useful system should choose how much evidence and attention to spend, explain the decision, and retain the ability to recover from mistakes.

I therefore see the long-term system as *evidence-governed artifact production*: cheap operations where reliable, qualified AI review where appropriate, and accountable humans where authority or risk demands it.

## What needs testing

The central hypothesis is that reusing qualified knowledge can reduce the **marginal cost of producing an additional trustworthy personalized artifact**, while maintaining citation fidelity and a defensible record of decisions.

A valid experiment needs independent reference labels, multiple datasets, measured human review minutes, computational cost, quality, contradiction preservation, and failure recovery. Building the platform alone would not prove that claim.

### Connections to prior research

[GraphRAG (Edge et al., 2024)](https://www.microsoft.com/en-us/research/publication/from-local-to-global-a-graph-rag-approach-to-query-focused-summarization/) already demonstrates graph-based corpus summarization. [W3C PROV-O (2013)](https://www.w3.org/TR/prov-o/) gives a reusable model for provenance. [Hevner et al. (2004)](https://aisel.aisnet.org/misq/vol28/iss1/6/) provides the design-science framework for learning through evaluated artifacts.

The research opportunity is in an evaluated combination, not in claiming that each component is new.

[Research series](./) · [Dissertation proposal](./dissertation-proposal)
