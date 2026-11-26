---
title: "Can One Set of Evidence Support a Lesson, a Briefing, and a Podcast?"
description: "Follow the engineering work from document chunking to media review and a proposal for producing personalized material people can trace to its sources."
teaser: "A commuter might want the two-minute audio version. A teacher might want a diagram. What happens to the one uncertainty both audiences need to hear?"
articleGenre: "Research essay"
---

# Can One Set of Evidence Support a Lesson, a Briefing, and a Podcast? {#from-personalized-knowledge-artifacts-to-governed-ai-systems}

Imagine a technical report describing a faster export. One run got the expected file to the editor sooner. That finding is hypothetical. Here is how I would put it in two people’s hands.

- **For a learner:** “A shorter export means the same clip finishes sooner. We saw it once. <u>The team could not repeat the result.</u> What would you keep the same on the next run?”
- **For a manager:** “One export finished sooner. <u>The team could not repeat the result.</u> Keep the current delivery estimate until repeated runs support a change.”

I would return a briefing that simply said “The new export is faster.” A reader could reasonably use that sentence to promise a shorter turnaround. Would the person reading the lesson and the person making that promise understand the same limit?

That question brought me from personalized educational content to the engineering of evidence. Tailoring the presentation is valuable. Paying an expert to recheck every sentence in every version can consume the time the system was supposed to save.

## The engineering problem behind the product

I would give each important claim a record of its own. Keep the original passage or media interval, identify the speaker, and record whether the passage describes an observation, a quotation, or an interpretation. Preserve unresolved identities and contrary accounts. If an editor clears a claim for a particular use, record who decided, which evidence they saw, and how far that approval extends.

A graph can map those relationships. Text and vector search can retrieve the material a writer needs. The original passage remains available when a reader has a reason to challenge the short version.

## How my projects explored this

- **Document processing.** Chunky Monkey splits documents into manageable pieces and preserves metadata, hashes, and verification records. Before asking a model to explain a passage, I need to be able to find that same passage again. [Chunky Monkey](https://github.com/kaw393939/chunky-monkey-text-chunker)
- **Media evaluation.** MetaVis combines native Swift and Metal media processing with sensor measurements, reference tests, and optional Gemini review. An editor can describe a desired change in words while code limits what the change can do. [MetaVis](https://github.com/kaw393939/metavis-demo-projects)
- **Workflow design.** Ordo and a private Ordo Executor prototype moved the inquiry toward source manifests, proposed claims, and explicit decisions to admit them to a shared record. The public Ordo repository documents a broader design whose Elixir runtime remains planned. [Ordo](https://github.com/kaw393939/ordo)
- **Corpus planning.** My private UAP catalog identifies sources for later acquisition. Conflicting accounts and repeated testimony make it a useful candidate for future evaluation. The entries are metadata and leads.

Each repository shows which part of the research question I explored. The linked work lets a reader inspect the evidence behind that progression.

## What I mean by reliability

An editor who approves a particular phrase for a classroom handout has decided something quite specific. If a future summary upgrades “reported” to “confirmed,” that wording deserves another look. The potential consequence, the strength of the evidence, and the person authorized to decide should determine how much review the change receives.

## What needs testing

Give two systems the same sources and ask each for several formats. Have independent reviewers locate the passages, look for omitted caveats or contradictory evidence, and record correction time and compute cost. The important number is the **cost of producing the next acceptable format**, including the expert time it takes to verify it. Counting generated words misses that expense.

### Connections to prior research

GraphRAG offers a comparison for graph-based summaries. W3C PROV-O describes relationships among sources, transformations, and people. Design science provides a way to test what the assembled system contributes. [GraphRAG](https://www.microsoft.com/en-us/research/publication/from-local-to-global-a-graph-rag-approach-to-query-focused-summarization/) · [W3C PROV-O](https://www.w3.org/TR/prov-o/) · [Hevner and colleagues](https://aisel.aisnet.org/misq/vol28/iss1/6/)

[Research series](./) · [Dissertation proposal](./dissertation-proposal)
