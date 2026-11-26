---
title: "Can One Set of Evidence Support a Lesson, a Briefing, and a Podcast?"
description: "Follow the engineering work from document chunking to media review and a proposal for producing personalized material people can trace to its sources."
teaser: "A commuter might want the two-minute audio version. A teacher might want a diagram. What happens to the one uncertainty both audiences need to hear?"
articleGenre: "Research essay"
dateLabel: "November 2026"
---

# Can One Set of Evidence Support a Lesson, a Briefing, and a Podcast? {#from-personalized-knowledge-artifacts-to-governed-ai-systems}

Imagine asking an AI to turn a technical report into a lesson for a beginner and a short briefing for a manager. The lesson defines unfamiliar terms. The briefing jumps to the decision. In the original report, one finding depends on a measurement the researchers could not repeat. Will that caveat survive either rewrite?

That question brought me from personalized educational content to the engineering of evidence. Tailoring the presentation is valuable. Paying an expert to recheck every sentence in every version can consume the time the system was supposed to save.

## The engineering problem behind the product

I would give each important claim a record of its own. Keep the original passage or media interval, identify the speaker, and record whether the passage describes an observation, a quotation, or an interpretation. Preserve unresolved identities and contrary accounts. If an editor clears a claim for a particular use, record who decided, which evidence they saw, and how far that approval extends.

A graph can map those relationships. Text and vector search can retrieve the material a writer needs. The original passage remains available when a reader has a reason to challenge the short version.

## How my projects explored this

- **December 2024.** Chunky Monkey splits documents into manageable pieces and preserves metadata, hashes, and verification records. Before asking a model to explain a passage, I need to be able to find that same passage again. [Chunky Monkey](https://github.com/kaw393939/chunky-monkey-text-chunker)
- **December 2025.** MetaVis combines native Swift and Metal media processing with sensor measurements, reference tests, and optional Gemini review. An editor can describe a desired change in words while code limits what the change can do. [MetaVis](https://github.com/kaw393939/metavis-demo-projects)
- **2026.** Ordo and a private Ordo Executor prototype moved the inquiry toward source manifests, proposed claims, and explicit decisions to admit them to a shared record. The public Ordo repository documents a broader design whose Elixir runtime remains planned. [Ordo](https://github.com/kaw393939/ordo)
- **November 2026.** My private UAP catalog identifies sources for later acquisition. Conflicting accounts and repeated testimony make it a useful candidate for future evaluation. The entries are metadata and leads.

These dates refer to repository records. They mark a sequence of engineering questions rather than the first appearance of the ideas in the field.

## What I mean by reliability

An editor who approves a particular phrase for a classroom handout has decided something quite specific. If a future summary upgrades “reported” to “confirmed,” that wording deserves another look. The potential consequence, the strength of the evidence, and the person authorized to decide should determine how much review the change receives.

## What needs testing

Give two systems the same sources and ask each for several formats. Have independent reviewers locate the passages, look for omitted caveats or contradictory evidence, and record correction time and compute cost. The important number is the **cost of producing the next acceptable format**, including the expert time it takes to verify it. Counting generated words misses that expense.

### Connections to prior research

GraphRAG offers a comparison for graph-based summaries. W3C PROV-O describes relationships among sources, transformations, and people. Design science provides a way to test what the assembled system contributes. [GraphRAG](https://www.microsoft.com/en-us/research/publication/from-local-to-global-a-graph-rag-approach-to-query-focused-summarization/) · [W3C PROV-O](https://www.w3.org/TR/prov-o/) · [Hevner and colleagues](https://aisel.aisnet.org/misq/vol28/iss1/6/)

[Research series](./) · [Dissertation proposal](./dissertation-proposal)
