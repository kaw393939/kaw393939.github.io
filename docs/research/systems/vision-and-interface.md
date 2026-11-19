---
title: From Claims to Navigable Knowledge
description: A design thesis for provenance-backed claims, two distinct graphs, contextual search, generated dossiers, and a decision-oriented briefing interface.
---

# From Claims to Navigable Knowledge

*Architecture and interface thesis · November 2026 · Proposed, not a deployed system*

I want people to move naturally between an intelligence briefing, a readable topic page, a network of related information, and the original evidence. The user should not have to learn the structure of a graph database or the internals of an LLM.

The long-term goal is **personalized knowledge artifacts**: an evidence-linked explanation, a visual investigation, a technical report, an audio overview, or a decision brief generated from the same governed foundation.

## The central design decision: claims come first

The canonical unit is an **attributed, evidence-backed claim**, not an unquestioned graph edge.

An archive can establish that an agency published a report; it does not automatically establish the truth of every statement in the report. Multiple websites repeating a source do not create independent corroboration. A generated summary does not become a second source confirming the first.

Each consequential assessment should answer:

1. **What do we know?** The exact reported observations and the available sources.
2. **Why do we believe it?** Citations, interpretation, source dependence, alternatives, and qualifications.
3. **What would change our assessment?** Missing or contrary evidence, measurement limitations, or unresolved identities.

This is accountable analysis, **not** a claim that software can determine the ultimate truth of disputed history.

## Two different graphs

A page-link graph and an evidence graph should be connected, but never conflated.

| Navigation graph | Evidence and assertion graph |
| --- | --- |
| **Nodes:** generated or published topic pages | **Nodes:** sources, passages, people, events, claims, assessments |
| **Edges:** hyperlinks between pages | **Edges:** explicitly typed, evidence-cited relationships |
| Optimized for exploration, orientation and reading | Optimized for provenance, qualification and investigation |
| A link says “this page leads to that page” | A claim says “this source reports this proposition” |

The navigation graph lets the user move through knowledge like a networked book. The evidence graph lets the user inspect why pages contain a statement. One hyperlink is not proof of a relationship.

## Wikipedia and Wikidata are external sources, not UI templates

Wikipedia is useful for topic discovery: linked pages, anchor text, article sections, references and surrounding context can reveal candidate entities and relation types. [Wikidata](https://www.wikidata.org/wiki/Wikidata:Data_model) supplies reusable identifiers, aliases, typed properties, qualifiers and references. <https://www.wikidata.org/wiki/Help:Data_access>

The system should save a local entity identity, candidate Wikidata identifiers, source revisions and the evidence behind disambiguation. Wikipedia's linked context may *suggest* a relationship; it cannot silently certify one.

The UI remains independent of Wikipedia. It identifies Wikipedia as **one named external source** when used and prefers original material where the question demands it. A page cannot cite its own generated summary as fresh corroboration.

## The intended interface

The user arrives at an **intelligence briefing**, not a database administration dashboard.

**Briefing** — the most relevant changes, conclusions, unresolved questions, risks and recommended next decisions. Each claim can open a transparent evidence trail.

**Dynamic dossier** — a readable, versioned page about an entity or event, with an overview, chronology, cited claims, competing interpretations, and linked subtopics. It is generated from qualified information, not treated as a primary source.

**Graph explorer** — a focused neighborhood of connected pages, entities or claims; selecting a node opens an appropriate dossier or evidence view. Showing a billion nodes at once is not useful.

**Semantic and exact search** — retrieves concepts, source spans, names and identifiers; search can progressively expand into graph relationships and provenance.

**Evidence and Five Whys explorer** — exposes what was said, the original span or timecode, intermediate transformations, conflicts, and the reasons an assessment was made. A Five Whys trace is an *investigation prompt*, not an automatically correct causal explanation.

A contextual assistant should follow the selected claim, entity, and page rather than becoming a disconnected chatbot. A reader can ask “Why is this relationship here?”, “Who is the original source?”, “What changed?”, and “Show the other interpretation.” 

## How Ordo informs this interface

The earlier [Ordo Product & UX Model](https://github.com/kaw393939/ordo/blob/main/development-docs/PRODUCT-UX.md) already specifies daily briefings, persistent artifacts, contextual conversation, progressive disclosure, and explicit approval actions.

Its [Briefing UI Runtime](https://github.com/kaw393939/ordo/blob/main/agentic-appliance/architecture/briefing-ui-runtime.md) states the key design principle: *the page is the artifact; the AI is the operator; chat is the control surface*. The [Artifact Spec Renderer](https://github.com/kaw393939/ordo/blob/main/agentic-appliance/patterns/artifact-spec-renderer.md) proposes a typed artifact rendered into multiple formats.

These are documented designs, **not evidence of a shipped native Swift graph application**. The proposed runtime should keep evidence stores, rendering schemas, and UI clients separate; a native Swift UI and a web client could render the same versioned knowledge artifacts.

## Briefing as a quality standard, not military styling

The intelligence briefing metaphor is useful because the user needs concise, consequential analysis with drill-down. [ICD 203](https://www.intelligence.gov/mission/our-values/objectivity) describes relevant analytic tradecraft: qualify sources, explain uncertainty, distinguish information from judgments, consider alternatives, identify changes and provide useful visual aids.

The system should help an operator understand decisions without hiding evidence or overclaiming authority. Source credibility, claim support, transcription confidence, and reviewer authorization must remain distinguishable.

## What needs empirical evaluation

The interface is a hypothesis. Research should compare a briefing + optional evidence path with a raw-document list and an ordinary chat interface. Outcomes include finding and correcting a false source link, identifying a copied claim, reconstructing why an assessment changed, decision accuracy, time, and cognitive load.

The system should also test whether its **navigation graph** genuinely improves exploration or merely adds visual complexity. The correct design is the one that helps users accomplish tasks.

## Related 2026 research

- [Vitali and Pasqual, *Provenance-Enhanced Statements in Knowledge Graphs* (2026 preprint)](https://arxiv.org/abs/2606.15246) addresses attributed claims and competing epistemic stances.
- [Kakatkar and Khatib, *Epistemic Knowledge Graphs* (2026 working paper)](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7525242) formalizes epistemic status, provenance and claim-level explanations.
- [*Entity Linking with Wikidata: A Systematic Literature Review* (2026)](https://doi.org/10.1145/3795134) documents prior work on entity disambiguation and areas such as temporal and qualified relations.

These publications are **prior art**, not evidence of an original invention here. The research contribution would have to be tested against this scholarship.

[Research hub](./) · [Why UAP is the testbed](./uap-research-testbed) · [Advisor proposal](./dissertation-proposal)
