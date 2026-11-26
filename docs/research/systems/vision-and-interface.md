---
title: "What Should Happen When You Click an AI Citation?"
description: "A proposed briefing interface connects each claim to its original passage, keeps competing accounts visible, and explains why an assessment changed."
teaser: "A citation can open a 200-page document and still leave you guessing. A useful briefing should take you to the passage, the interpretation, and the strongest competing account."
articleGenre: "Interface design proposal"
---

# What Should Happen When You Click an AI Citation? {#from-claims-to-navigable-knowledge}

Imagine reading a briefing that says two reports independently describe the same event. You click the sentence. One report quotes the other. The interface has just helped you correct the briefing, provided you can see where each passage came from and flag the relationship for review.

That is the experience I want from an AI-assisted research tool. A teacher, engineer, or analyst should be able to read a short account, investigate one sentence, and return to the account with a clearer idea of what it supports. This essay describes a proposed interface.

## The central design decision: claims come first

The unit I would store is an attributed claim. It names who said what, connects that statement to an original passage or timecode, and records the grounds for the current assessment. A government archive can establish who published a report. Whether the report supports the briefing’s wording is a separate question.

For each consequential sentence I want three answers. What do we know from the available sources? Why does that evidence support these particular words? What new information could change the assessment?

## Two different graphs

| When you are reading | When you are checking |
| --- | --- |
| A link leads from an event page to a person, place, or related topic. | An evidence link identifies what a source said about that person or event. |
| A useful measure is how quickly someone finds the relevant topic. | A useful measure is whether someone can locate the exact supporting or conflicting passage. |

The navigation graph organizes pages. The evidence graph records sources, claims, entities, and the relationships among them. One helps you find a name. The other helps you decide whether it belongs in the sentence.

## Wikipedia and Wikidata are external sources, not UI templates

A Wikipedia link and its surrounding text can suggest a candidate topic. Wikidata offers identifiers, aliases, qualifiers, and references. Preserve a stable local identifier, the external source and revision, and the evidence used to resolve the match. If the match changes later, a reader should still be able to reconstruct the earlier interpretation. [Wikidata’s data model](https://www.wikidata.org/wiki/Wikidata:Data_model) · [Accessing Wikidata](https://www.wikidata.org/wiki/Help:Data_access)

## The intended interface

The briefing opens with what changed and why it matters. Select a claim to open a short, versioned dossier with the chronology, supporting passages, and competing accounts. Exact search should find a name or document number. Semantic search should find related descriptions. A focused graph view can show how a small group of sources depends on one another.

A contextual assistant should follow the selected passage. Ask “Why did the assessment change?” and it should show the new record, the old assessment, and the decision that connects them. A Five Whys investigation can help trace the system’s reasoning. When the evidence ends, the trace should say so.

## How Ordo informs this interface

The Ordo design documents describe daily briefings, stored artifacts, contextual conversation, and explicit approvals. A typed representation could let a web client and a native Swift client present the same versioned material. The documents establish the design. A released native Swift graph application would be a separate engineering milestone. [Product and UX model](https://github.com/kaw393939/ordo/blob/main/development-docs/PRODUCT-UX.md) · [Briefing runtime](https://github.com/kaw393939/ordo/blob/main/agentic-appliance/architecture/briefing-ui-runtime.md) · [Artifact renderer](https://github.com/kaw393939/ordo/blob/main/agentic-appliance/patterns/artifact-spec-renderer.md)

## Briefing as a quality standard, not military styling

A briefing earns its short form by making qualifications easy to inspect. The intelligence community’s published analytic standards offer useful criteria: assess the source, distinguish information from judgment, consider alternatives, and explain changes. A transcription confidence score and a reviewer’s authority to publish answer different questions. Give each a clear label. [ICD 203 analytic standards](https://www.intelligence.gov/mission/our-values/objectivity)

## What needs empirical evaluation

Give participants the same documents in three interfaces: a document list, an ordinary chat, and a briefing with optional evidence views. Ask them to spot a copied claim, correct an incorrect source link, and explain a changed assessment. Measure accuracy, time, and cognitive load. A graph deserves the space it takes only if readers complete these tasks more effectively with it.

## Research on claims and entity linking {#related-2026-research}

Vitali and Pasqual’s preprint treats statements as attributable claims with potentially competing interpretations. Kakatkar and Khatib’s working paper examines how to represent and explain the status of claims. A systematic review of Wikidata entity linking addresses disambiguation, including the complications of time and qualified relationships. These are starting points for a comparison. [Provenance-Enhanced Statements](https://arxiv.org/abs/2606.15246) · [Epistemic Knowledge Graphs](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7525242) · [Entity Linking with Wikidata](https://doi.org/10.1145/3795134)

[Research hub](./) · [Why UAP is the testbed](./uap-research-testbed) · [Advisor proposal](./dissertation-proposal)
