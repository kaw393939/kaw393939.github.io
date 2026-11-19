---
title: Preliminary Doctoral Dissertation Proposal
description: Advisor discussion draft on evidence-governed personalized knowledge artifacts and human-attention-constrained adaptive AI orchestration.
---

# Preliminary Doctoral Research Proposal

**Working title:** Adaptive Human–AI Orchestration for Provenance-Governed Knowledge Artifacts: Reliability, Commissioning, and Human Attention

**Researcher:** Keith Williams  
**Institution:** New Jersey Institute of Technology  
**Prepared:** November 19, 2026  
**Status:** Exploratory advisor discussion draft. Not an approved dissertation proposal, completed study, or claim of institutional endorsement.

## Abstract

Generative AI systems can transform unstructured text, images, audio, and video into structured representations and personalized knowledge artifacts. Yet their usefulness in consequential settings is limited by uncertain source material, unreliable entity and claim resolution, insufficient provenance, uneven model quality, and the expense of expert oversight. Systems that require human approval for every output cannot scale economically; systems that automate all decisions risk promoting unsupported information.

This research proposes **Adaptive Evidence-Governed Orchestration (AEGO)**, a provisional reference architecture in which independently discoverable sensors report observations, capability descriptions and achieved guarantees. Analysis services propose interpretations; a separate policy layer evaluates evidence, error consequences and authority; and a capacity-aware workflow routes work through an automated **Race Track** or a review **Pit Stop**. During commissioning, humans and explicitly authorized AI delegates evaluate selected cases and can approve reusable, narrowly scoped policies. All observations, model evaluations, approval decisions, and knowledge promotions retain traceable provenance.

The dissertation would design and evaluate a working prototype that ingests heterogeneous material, constructs a qualified hybrid graph/vector knowledge base, and generates personalized artifacts with evidence links. Its central question is whether adaptive, consequence-sensitive review can reduce the human attention required per qualified artifact while meeting specified reliability, provenance, and legal/ethical constraints.

The approach is **design science research**, supplemented by controlled comparisons, quantitative systems evaluation, and human-computer interaction studies. The contribution sought is an experimentally supported method for commissioning and operating trustworthy human–AI knowledge production, not a claim to have invented RAG, provenance, selective review, or Kanban.

## 1. Motivation and origin of the problem

The initial motivation was **personalized knowledge artifacts**: lessons, reports, audio explanations, interactive material, and other presentations tailored to individual users and objectives. Producing such artifacts cheaply is insufficient if they distort facts, obscure uncertain evidence, or require costly manual verification.

The work evolved through several experimental systems:

| Period | Existing repository evidence | Research relevance |
| --- | --- | --- |
| December 2024 | [Chunky Monkey](https://github.com/kaw393939/chunky-monkey-text-chunker): token-aware segmentation, metadata, hashing, verification | Make large information sources inspectable and reusable |
| December 2025 | [MetaVis](https://github.com/kaw393939/metavis-demo-projects): Swift/Metal rendering, sensor evidence, deterministic QC, Gemini qualitative review, bounded QA loops | Explore measured versus probabilistic evaluation of generated media |
| February–May 2026 | [Studio Ordo](https://github.com/kaw393939/ordostudio), Ordo Executor (private prototype): agent evals, modular executors, source/candidate/review/promotion contracts | Convert interpretations into auditable, governed workflows |
| July 2026 | [Ordo](https://github.com/kaw393939/ordo): Race Track/Pit Stop and human review doctrine | Formalize permission and attention constraints; runtime remains proposed |
| November 2026 | UAP Corpus (private research catalog): metadata catalog and provenance-first acquisition design | Stress-test conflicting sources and duplicate testimony |

Dates refer to visible repository records and do not establish the original invention date of every idea. The MetaVis tests are real source code; the full proposed AEGO system has **not** yet been implemented or empirically validated.

## 2. Problem statement

Consider a billion-email organization or a research archive containing contradictory accounts, unattributed quotations, repeated sources, and multilingual multimedia. The desired output is not merely a text summary. It is a structured account of people, events, source claims, uncertainty, and relationships that remains connected to original evidence.

The software faces several distinct problems:

1. Extracted claims cannot be treated as facts merely because they appear in a retrieved document.
2. Several articles citing one witness should not become independent corroboration.
3. Confidence in transcription, identity resolution, and claim support are different properties.
4. Approving a source for indexing does not authorize its contents as true or suitable for public publication.
5. Human review effort is limited; unnecessary interruptions may outweigh the cost of automated computation.
6. New sensors and models should integrate without rewriting core orchestration logic.
7. Personalized outputs must preserve qualifications and evidence from a shared knowledge base.

## 3. Research questions and hypotheses

**RQ1 — Evidence and interoperability.** Can self-describing, heterogeneous sensors produce interoperable observations with explicit achieved guarantees and provenance, allowing downstream analysis without a domain-specific rewrite of the orchestration core?

**RQ2 — Adaptive review.** Can progressively commissioned, consequence-aware routing reduce expert-review minutes per correctly qualified claim compared with review-all and fixed-confidence approaches, without increasing consequential false promotions beyond a predefined bound?

**RQ3 — Attention-aware scheduling.** Under fixed reviewer capacity, can a Kanban-inspired, pull-based scheduler improve the rate and timeliness of verified knowledge promotion compared with FIFO and simple uncertainty ordering?

**RQ4 — Knowledge reuse.** Can graph-guided retrieval from qualified, provenance-linked knowledge reduce model context and the marginal cost of personalized artifacts while maintaining citation fidelity, important contradictions, and usefulness to users?

Proposed falsifiable hypotheses:

- **H1:** An adaptive consequence-sensitive policy yields lower human-review effort than a fixed threshold at matched consequential-error performance.
- **H2:** A concise, progressively disclosed review package improves operator decision accuracy and/or reduces time compared with raw sensor output.
- **H3:** Reviewer-capacity-aware scheduling reduces avoidable queue time or increases accepted value per reviewer hour under realistic workload distributions.
- **H4:** Graph-guided retrieval reduces context tokens per grounded answer relative to standard passage-only RAG without material degradation in citation or contradiction coverage.

A negative or null result remains valuable if the experiments identify when the proposed approach fails.

## 4. Proposed framework

### 4.1 Observation and sensor layer

Every sensor publishes a versioned **capability manifest**, typed input and output contracts, supported environments, expected cost, limitations, declared uncertainty semantics, and optional deeper evidence. The common envelope standardizes communication rather than imposing a universal ontology on all sensory domains.

Examples: email-header extractor, transcription and diarization, entity-resolution candidates, date/identity inconsistency detector, graph-provenance checker, legal-rights validator, local GPU image sensor.

Sensor self-reports are **claims about capability**, not proof of accuracy. Independently measured calibration and regression data remain separate.

### 4.2 Interpretation and qualification

Raw sources, extracted observations, candidate propositions, and qualified knowledge remain distinct. Entity and claim records link to exact document spans, page regions, audio/video intervals, transformations and source hashes.

The framework retains contradictory accounts and shared citation lineages. Knowledge promotion is a recorded, versioned action, with the reviewer or governing policy, rationale, conditions, and appeal or recovery path.

### 4.3 Decision and governance engine

The engine considers anticipated consequence of an error, uncertainty of the relevant sensors, evidence strength, reversibility, authority, and downstream dependencies. It may:

- proceed under an approved automatic rule;
- request targeted extra evidence;
- route to a local or frontier model for further evaluation;
- open a Pit Stop for an authorized human or delegated AI;
- quarantine, defer, or prohibit an action.

**Delegation of analysis is not delegation of authorization.** Hard permission boundaries cannot be optimized away.

### 4.4 Commissioning and policy improvement

In early supervised operation, reviewers resolve selected cases. The system may recommend a scoped future rule, supported by historical examples and a held-out evaluation. A qualified operator must explicitly authorize policy activation. The active policy, training examples, model versions, revisions, expiration/revocation conditions, and observed outcomes are logged.

Policies should **never** be inferred as permission solely from repeated approvals.

### 4.5 Flow and resource control

A queueing/scheduling layer limits work in progress for expensive resource classes and respects human review capacity. Large ingest streams live in durable work queues, not individual visible Kanban cards. The UI presents meaningful batches, exceptions, and decisions with progressive disclosure.

The objective combines computation cost, expert time, delays, expected consequences and recovery, subject to hard reliability and authority constraints.

### 4.6 Personalized artifact engine

Qualified knowledge can support multiple artifact types—text explanations, instructional content, reports, audiovisual media, interactive diagrams or machine-readable agent packets. Each artifact retains derivation links and notes any assumptions introduced during generation.

Generated artifacts are **derivatives**, not new independent evidence supporting their own sources. They cannot be silently fed back to the canonical graph as corroboration.

## 5. Methodology

Use **design science research** following Hevner et al. (2004): identify a practical problem, design an artifact, evaluate it against baseline approaches, revise its theory and implementation, and communicate both positive and negative results.

### Study A — Sensor evidence and knowledge construction

**Dataset:** a small rights-cleared sample from the UAP Corpus (private research catalog) including official and nongovernment records, plus an additional corpus with independently checkable labels (e.g., annotated email/public-event data or an established entity-resolution benchmark).

**Comparators:** a passage/vector-only pipeline, a conventional graph-extraction pipeline, and the proposed observation/candidate/qualification architecture.

**Measures:** entity and attribution accuracy, source-lineage detection, contradiction recall, citation span correctness, provenance completeness, error propagation, acquisition cost, and reproducibility.

Do **not** score extraordinary UAP claims as true or false absent independent ground truth. Score whether the system attributes them faithfully and distinguishes evidence from interpretation.

### Study B — Commissioning, review routing and operator interface

**Design:** randomized or counterbalanced tasks across review-all, fixed-confidence, and progressively calibrated consequence-aware policies. Independently annotated cases and predefined error consequences are required.

**Measures:** human minutes, false promotions, missed mandatory escalation, reviewer error, notification count, time to resolve, calibration curves, policy generalization, and user confidence. Evaluate a simple recommendation-only interface against an optional expanded evidence view.

Human-participant research, educational records, or organizational correspondence would require appropriate institutional/privacy review before collection.

### Study C — Flow, economics and artifact generation

Simulate and, where possible, test realistic backlog arrival rates under fixed reviewer capacity. Compare FIFO, uncertainty-first and consequence/value-aware scheduling. Then generate multiple artifacts from a shared qualified corpus and compare standard RAG with provenance-aware graph-guided retrieval.

**Measures:** accepted claims or artifacts per expert hour, queue time, compute/token cost, marginal artifact cost, citation fidelity, contradiction preservation, and operator satisfaction.

### Analysis plan

Pre-register primary metrics and reliability tolerances. Use matched cases and uncertainty intervals rather than raw anecdotal wins. Isolate contributions with ablations:

- no sensor quality/guarantee metadata;
- no adaptive commissioning;
- no consequence-sensitive policy;
- no reviewer-capacity scheduling;
- no graph-guided evidence selection.

Include error analysis for systematic overconfidence, correlated sources, inaccessible evidence, and source drift.

## 6. Literature positioning and anticipated novelty

Established foundations include:

- [W3C PROV-O](https://www.w3.org/TR/prov-o/) (2013) — provenance;
- [GraphRAG](https://arxiv.org/abs/2404.16130) (2024) — graph-based corpus summarization;
- [Learning to Defer](https://proceedings.mlr.press/v119/mozannar20b.html) (Mozannar and Sontag, 2020) — algorithmic allocation to experts;
- [GRACE](https://aclanthology.org/2026.akbc-1.16/) (Yi, Minot, and Lee, 2026) — expert attention in graph knowledge expansion;
- [G-Eval](https://aclanthology.org/2023.emnlp-main.153/) (2023) — LLM-based qualitative evaluation;
- [Payton et al.](https://doi.org/10.1145/1734229.1734231) (2010) — semantic self-assessment and achieved fidelity of query results;
- [Deek et al.](https://digitalcommons.njit.edu/fac_pubs/16112/) (1999) — structured software problem solving and program development;
- [Sylla and Wen](https://digitalcommons.njit.edu/fac_pubs/14771/) (2002) — multi-objective/multi-criteria decision evaluation;
- [Grandhi and Jones](https://digitalcommons.njit.edu/fac_pubs/6913/) (2015) — interruption decision-making with contextual information;
- [Hevner et al.](https://aisel.aisnet.org/misq/vol28/iss1/6/) (2004) — design science in information systems.

**Novelty is a question, not a claim.** The targeted contribution is a documented algorithm and reference architecture for sensor-declared evidence quality, policy commissioning, consequence-sensitive review, and capacity-aware knowledge promotion, supported by controlled experiments. The prior-art review must establish whether an existing system has already demonstrated this exact integration.

## 7. NJIT research alignment

This is a proposed intellectual alignment, not an indication of commitment by faculty.

- **Jamie Payton, Dean, Ying Wu College of Computing:** dynamic sensor/query fidelity, learning-based adaptation and computing education. Her 2010 work is especially relevant to results that communicate their achieved guarantees.
- **Fadi P. Deek:** problem solving, software development processes, cognitive and collaborative evaluation; useful for the methodology and agent-engineering experiments.
- **Cheickna Sylla:** multi-criteria decision modeling and technology evaluation; relevant to consequence, cost and review-routing policies.
- **Michael A. Ehrlich:** innovation and financial decision-making; relevant to the economics of expert attention and the viability of high-value applications.
- **Quentin Jones:** interruptibility, contextual information and human-centered interfaces; relevant to the Pit Stop decision experience and progressive disclosure.

See [faculty and literature reading map](./literature-and-faculty) for specific works.

## 8. Expected contributions

1. **Artifact:** a modular, documented and reproducible knowledge-production research system with sensor manifests, observed evidence, policy engine, reviewer workflow, qualification ledger, hybrid search, and artifact generation.
2. **Method:** a commissionable review-routing and knowledge-promotion process with explicit testable authority and reliability boundaries.
3. **Evidence:** controlled quantitative and human-centered results showing when the method improves, matches, or underperforms established baselines.
4. **Design principles:** independently supported guidance for integrating deterministic tests, probabilistic judgment, domain authority, and resource constraints.

## 9. Feasibility, constraints and ethics

Scope should be limited to small and medium benchmark corpora initially; billion-message processing is a scalability motivation, not a prerequisite experiment. The existing UAP repository is a **metadata catalog**, not an acquired archive. Acquisition needs verified source rights, stable content hashes, and bounded storage.

Special attention is required for copyright, public and private records, data minimization, model disclosure of content, misidentification, reputational injury, and operator consent. No source may be promoted as factual solely because it appeared in a government archive or was repeated by multiple publishers.

The work must avoid training/evaluation contamination: synthetic records derived from a given source are not independent test evidence. Reviewer decisions need versioned source and policy context. A skipped AI check must never be mislabeled as a passing result.

The prototype can reuse selective design ideas and code from MetaVis and Ordo Executor, but must be independently validated in the proposed experiments.

## 10. Possible work plan for advisor discussion

**Stage 1 — Scholarly framing:** systematic literature search, explicit conceptual model, pre-specified research questions, evaluation dataset and IRB/privacy planning.

**Stage 2 — Research prototype:** smallest functional sensor→evidence→candidate→policy→review→promotion loop with replayable decisions and a narrow user interface.

**Stage 3 — Controlled evaluation:** studies of reviewer allocation and commissioning, plus graph-RAG and artifact-generation ablations.

**Stage 4 — Synthesis:** limitations, comparative evaluation, theory refinement, and publishable engineering artifacts.

## 11. Questions for prospective advisors

1. Is the central contribution best framed as an **Information Systems design-science artifact**, a **Computer Science optimization algorithm**, or a joint program?
2. Which single outcome should anchor the dissertation: consequential error at fixed review budget, or human minutes at fixed reliability?
3. What is the minimum defensible demonstration of progressive commissioning beyond existing learning-to-defer research?
4. What secondary dataset would provide useful ground truth alongside the deliberately disputed UAP material?
5. How should we separate the user's prior engineering experiments from the dissertation's prospective empirical evidence?

---

**Draft prepared for discussion, not submission.** No faculty approval, funded research, empirical superiority, or novelty finding is asserted.

[Research hub](./) · [Literature map](./literature-and-faculty)
