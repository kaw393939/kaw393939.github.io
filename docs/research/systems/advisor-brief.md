---
title: Doctoral Research — Advisor Discussion Brief
description: A concise, evidence-linked doctoral research briefing for evaluating the problem, proposed contribution, experimental design and scope.
---

# Doctoral research: advisor discussion brief

*Keith Williams · NJIT · November 2026 · Preliminary, not an approved proposal*

## The research problem

Generative AI can read large collections, write varied information artifacts, and recommend decisions faster than people can verify them. Yet the **amount and type of justification needed** depends on how the information will be used.

A correct quotation is not necessarily a true account of an event. Several publications may copy the same original source. A plausible model interpretation is not an authorized decision. High-volume automatic work can flood human experts with low-value reviews.

**My research question:** Can an evidence-governed human–AI system apply *purpose-dependent verification*, choosing additional evidence, automated tests, probabilistic assessment or authorized human review based on the claim, use, and consequences—while reducing expert attention without increasing consequential errors?

## Why I am pursuing this

I am a Senior University Lecturer and director of NJIT's B.S. in Enterprise AI, with **23 years of university teaching**. I created eight IS courses (117, 218, 219, 333, 373, 421, 425, 601), created the B.S. in Web and Information Systems, and co-developed the BSEAI degree with Brook Wu and other colleagues. My typical teaching load of roughly 14 sections and 30 students per section implies about **9,660 course enrollments** over that period—not a unique-student count. These curriculum-attribution and teaching-volume details are my account; the cited NJIT program and faculty pages independently establish the programs and roles. My work connects curriculum, software architecture, digital public services and AI-assisted development. [Professional record](/work) · [NJIT faculty profile](https://people.njit.edu/profile/kwilliam).

The question arose through experiments, not merely a speculative architecture:

- **Personalized education:** a desire to produce individualized lessons and other knowledge artifacts from a shared body of evidence.
- **Fictional knowledge worlds:** Star Trek and Star Wars cases where I could inspect many entity and chronology errors using specified canon.
- **MetaVis (December 2025):** Swift/Metal code, deterministic tests, measured sensors and Gemini qualitative QA showed that technical correctness and human-perceived quality need different oracles. [Source and limitations](./metavis-evidence-and-evaluation).
- **Ordo (2026):** documented human–AI governance, artifact specs, selective review and decision ledgers; the full application runtime remains planned. [Repository](https://github.com/kaw393939/ordo).
- **UAP archival research:** deliberately disputed multimodal sources make provenance, disambiguation, correlated testimony and uncertainty unavoidable. Its first catalog is metadata-only and must not be passed off as an acquired dataset. [Testbed design](./uap-research-testbed).

## Proposed computational contribution

**Purpose-dependent epistemic governance** is a working label for a testable mechanism, not a new philosophical doctrine:

1. Represent **sources, observations, attributed claims, identity candidates, alternative explanations and assessments** as distinct versioned objects with recoverable source spans.
2. Use self-describing sensors and deterministic tests to report what was measured, what is missing, and what the method can actually guarantee.
3. Route additional evidence gathering, a local/frontier AI evaluator, or an authorized expert by *expected decision value, consequence and policy*. Confidence alone is not permission.
4. Propose narrowly scoped automation policies from reviewed cases; require independent held-out testing and authorized commissioning before activation.
5. Expose every resulting assessment through a **briefing, focused graph, linked knowledge page, semantic search and Five Ws/Five Whys evidence trail**, not merely an answer bubble.

The claim is not that the system discovers objective truth in every UAP case. The claim is that it can be held accountable for attribution, source lineage, justified use, recorded uncertainty and correct authority.

## Focused evaluation

**Study 1 — Claim provenance and entity resolution.** Compare vector-only RAG, a conventional graph extraction baseline, and attributed-claim construction on a small acquired UAP sample **plus an independently labeled known-answer corpus**. Measure entity resolution, citation correctness, false corroboration, contradiction recall, and provenance completeness.

**Study 2 — Review and commissioning.** Compare review-all, fixed uncertainty thresholds, and consequence-aware adaptive routing on held-out cases. Primary outcome: human review minutes at a pre-specified upper bound on consequential false promotions. Ablate policy learning, evidence escalation and routing strategy.

**Study 3 — Human investigation and artifact usefulness.** Compare raw documents, conversational answers, and a briefing with source/graph drill-down. Measure identification of misleading corroboration, recovery of original evidence, decision time, epistemic judgments, and learning transfer (if conducted with students under appropriate review).

These are **proposed studies**, not results. The dissertation could focus on Study 2 as the primary contribution and use the other two as experimental context, depending on the program and advisor guidance.

## Prior art and limits

Related work already includes [W3C PROV-O](https://www.w3.org/TR/prov-o/), [GraphRAG](https://arxiv.org/abs/2404.16130), [learning to defer](https://proceedings.mlr.press/v119/mozannar20b.html), [GRACE](https://aclanthology.org/2026.akbc-1.16/), [epistemic knowledge graphs](https://arxiv.org/abs/2606.15246), [ICD 203 analytic standards](https://www.intelligence.gov/mission/our-values/objectivity), and [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework).

The philosophical foundations are not invented here: **Dewey** on inquiry, **Peirce** on abductive hypotheses, **Goldman** on reliable processes, **Longino** on critical scrutiny, and **Fricker** on credibility harms. [Research position](./epistemic-governance).

A systematic review must establish whether the *proposed mechanism and measured improvement* are novel. A coherent framework alone is insufficient.

## NJIT intellectual connections

Potential scholarly connections—not assumptions about supervision or endorsement—include **Fadi Deek** (software problem solving and evaluation), **Cheickna Sylla** (multi-criteria decision models), **Quentin Jones** (interruption value and HCI), **Michael Ehrlich** (risk and economic value), and **Dean Jamie Payton** (a more limited precedent in adaptive query processing and reported guarantees). [Specific literature](./literature-and-faculty).

## Decisions I would like advisors to help make

1. Which **one** contribution should anchor the dissertation—adaptive evidence/review routing or epistemically qualified knowledge construction?
2. Which baseline and independent labels will make the result convincing to skeptical reviewers?
3. Which human-participant study is feasible and appropriately scoped?
4. What would count as a *negative result* that falsifies the primary hypothesis?

[Full proposal](./dissertation-proposal) · [Research history](./research-origins) · [Selected work](/work)

*The purpose of this brief is scholarly discussion. It does not imply admission, an approved topic, advisor commitment, empirical results or institutional endorsement.*
