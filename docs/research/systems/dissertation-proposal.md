---
title: Preliminary Doctoral Dissertation Proposal
description: Keith Williams proposes three studies to test how an AI system can trace claims to sources and decide which cases deserve an expert’s time.
teaser: Five stories repeat one witness. Is that enough evidence to put a claim in an AI briefing? A proposed study asks who should decide and what that review costs.
articleGenre: Preliminary doctoral research proposal
---

# Preliminary Doctoral Research Proposal

Imagine an analyst tracing a claim that appears in five reports. Four cite the fifth. An AI briefing calls this “five independent accounts.” Catching the error takes a few minutes if the analyst can see the citations. Finding it in a thousand-page archive could take the afternoon. The question behind this proposal is **when a system should spend those few minutes of human attention, and what evidence it should put on the screen**.

This preliminary proposal was prepared at the New Jersey Institute of Technology for advisor discussion. The studies, faculty participation and institutional approval are prospective.

**Working title**  
Adaptive Human–AI Orchestration for Provenance-Governed Knowledge Artifacts: Reliability, Commissioning, and Human Attention

## Abstract

I propose to build and evaluate a system that turns text, images, audio and video into briefings, lessons and source dossiers. Each significant claim would carry a record of where it came from, how it changed and who authorized its use. A reader could trace an account back to the page, image region or recording that supports it. If accounts conflict, the briefing would say so.

The proposed architecture, **Adaptive Evidence-Governed Orchestration (AEGO)**, assigns distinct responsibilities. Software sensors report observations and the guarantees they achieved. Analysis services interpret those observations. A policy decides whether a case can proceed automatically, needs more evidence or warrants an authorized reviewer. In the Ordo design, the automated path is the **Race Track** and a review is a **Pit Stop**. *Commissioning* means observing how a proposed rule performs on examples, testing it on fresh cases and obtaining explicit authorization before using it.

The primary question is whether this approach reduces expert minutes per qualified result at a specified level of reliability, with traceable sources and enforceable permissions. The proposed method combines design science, controlled systems comparisons and human–computer interaction studies. Its scope is faithful extraction, attribution and reasoning. For an event the archive cannot independently verify, the result to evaluate is how accurately the system describes the evidence available.

## 1. Motivation and origin of the problem

I started with a teaching problem. A student might benefit from an audio explanation while a colleague needs a technical report on the same material. Both deserve the same care with sources. If an instructor has to check every sentence of each version, generating more versions quickly creates more work.

These projects supplied parts of the problem and some of the tools I could test.

| Engineering stage | Existing repository evidence | Research relevance |
| --- | --- | --- |
| Document processing | [Chunky Monkey](https://github.com/kaw393939/chunky-monkey-text-chunker): token-aware segmentation, metadata, hashing, verification | Make large information sources inspectable and reusable |
| Media evaluation | [MetaVis](https://github.com/kaw393939/metavis-demo-projects): Swift/Metal rendering, sensor evidence, deterministic QC, Gemini qualitative review, bounded QA loops | Explore measured versus probabilistic evaluation of generated media |
| Review workflows | [Studio Ordo](https://github.com/kaw393939/ordostudio), Ordo Executor (private prototype): agent evals, modular executors, source/candidate/review/promotion contracts | Convert interpretations into auditable, governed workflows |
| Decision authority | [Ordo](https://github.com/kaw393939/ordo): Race Track/Pit Stop and human review doctrine | Formalize permission and attention constraints; runtime remains proposed |
| Corpus design | UAP Corpus (private research catalog): metadata catalog and provenance-first acquisition design | Stress-test conflicting sources and duplicate testimony |

The links document the engineering work behind each stage. MetaVis includes executable tests. The combined AEGO architecture and the claims about its performance still await implementation and evaluation.

## 2. Problem statement

Take an archive that includes a recorded interview, a translated transcript, two news stories quoting it and a correction issued a month later. A search can return five relevant items. A qualified account must also tell the reader whose assertion they share, which wording changed and which version was available at the time of the briefing. The same questions arise in an organization with a billion emails, meeting notes and forwarded attachments.

For this work, **qualifying a claim** means recording the evidence and conditions under which a specific use is justified. That creates seven design requirements.

1. Attribute each extracted claim to a source and preserve the distinction between testimony and independently established observations.
2. Follow citation chains so that repeated reporting counts as one lineage where appropriate.
3. Track separate uncertainties in transcription, identity matching and support for the claim.
4. Distinguish permission to index material from authority to publish or accept its contents.
5. Allocate scarce human review time to decisions where an error would have meaningful consequences.
6. Add sensors and models through common contracts so the orchestration code can be reused across domains.
7. Carry qualifications and disagreements into every personalized output derived from the shared knowledge base.

## 3. Research questions and hypotheses

**RQ1 — Evidence and interoperability.** Can sensors for different media describe observations, achieved guarantees and sources in a shared form that downstream tools can use without rewriting the orchestration core for each domain?

**RQ2 — Adaptive review.** Can commissioning rules case by case lower expert minutes per correctly qualified claim compared with reviewing every case or using a fixed confidence threshold? The system must stay within a predefined bound on consequential false promotions, cases in which it accepts a claim for a use its evidence does not support.

**RQ3 — Attention-aware scheduling.** With a fixed number of reviewers, can a pull-based, Kanban-inspired queue get verified claims to their users sooner or produce more value per reviewer hour than first-in, first-out (FIFO) or uncertainty-first ordering?

**RQ4 — Knowledge reuse.** When a graph steers retrieval toward qualified claims and their sources, can it reduce the model context and marginal cost of each new artifact while preserving citation fidelity, important contradictions and usefulness?

| Hypothesis | Result that would support it |
| --- | --- |
| H1 · Consequence-sensitive routing | Expert review takes fewer minutes than a fixed threshold at matched consequential-error performance. |
| H2 · Review interface | A concise case with optional evidence details improves accuracy, reduces decision time, or both, compared with raw sensor output. |
| H3 · Capacity-aware scheduling | Under realistic workloads, the queue reduces avoidable delay or yields more accepted value per reviewer hour. |
| H4 · Graph-guided retrieval | A grounded answer uses fewer context tokens than passage-only retrieval with no material decline in citation fidelity or coverage of contradictions. |

The comparisons can also establish when a simpler system works equally well. That result would change which parts of the architecture are worth building.

## 4. Proposed framework

### 4.1 Observation and sensor layer

A *sensor* can be software that reads an email header, separates speakers in a recording or flags conflicting dates. Each sensor publishes a versioned capability manifest describing accepted inputs, typed outputs, supported environments, expected cost, limits, the meaning of its uncertainty estimates and any deeper evidence it can supply. The common envelope lets different specialties preserve their own meanings.

Other candidates include an entity matcher, a graph-provenance checker, a rights checker and a local GPU image sensor. For each, the system records what the sensor claims it can do, what it reports achieving on this case, and how it performed in independent calibration and regression tests. Those are three different pieces of evidence.

### 4.2 Interpretation and qualification

Suppose a transcript names “Dr. Lee.” The words in the audio, the transcription and the proposed match to a person are different records. A reviewer could accept the transcription and leave the identity unresolved.

The prototype would retain the original source, the extracted observation, the candidate claim and each decision to qualify it. Records would point to exact text spans, page regions or audio/video intervals, with source hashes and any intervening transformations. Each promotion would record the authorized reviewer or policy, the rationale, conditions, and a route to appeal or reverse the decision. Conflicting accounts and shared citation lineages would remain available after review.

### 4.3 Distinct graphs and an evidence-first interface

The **claim/evidence graph** stores supported assertions, source passages, entity candidates and conflicting interpretations. A separate **navigation graph** connects readable topic pages and dossiers through hyperlinks. A page link does not imply that its endpoints are related in a verified factual sense.

Wikipedia hyperlinks and their surrounding text can help discover candidate topics, while Wikidata provides candidate entity identifiers, properties and qualifiers. These are **attributed external sources**, not the UI template, the authoritative identity database, or proof that a relationship is true. Local stable identifiers retain mappings and revision history.

The proposed interface combines an executive intelligence briefing, generated topic pages, focused graph neighborhoods, semantic/exact search, and an evidence inspector. A claim drill-down follows the Five Ws (who, what, when, where, why and how) and a bounded Five Whys investigation into why the **system made an assessment**. An accessible, contextual companion can answer questions about the selected topic and reveal source evidence on demand.

Ordo's documented [Product & UX Model](https://github.com/kaw393939/ordo/blob/main/development-docs/PRODUCT-UX.md) and [Briefing UI Runtime](https://github.com/kaw393939/ordo/blob/main/agentic-appliance/architecture/briefing-ui-runtime.md) inform the proposed render contract. The native Swift page-node graph discussed during prior experiments has not been verified as source code in the accessible repository and should not be described as a delivered product.

### 4.4 Decision and governance engine

A routing decision weighs the consequence of a mistake, evidence strength, sensor uncertainty, reversibility and downstream dependencies. It also checks who has authority to act. A date used as a search hint can warrant less scrutiny than the same date in a published accusation.

An approved rule may allow the case to proceed. The system can also request a missing source, send a bounded analysis task to a local or frontier model, or open a Pit Stop for an authorized human or AI delegate. Quarantine, deferral and prohibition remain possible outcomes. A model asked to interpret an image acquires no new publication authority by completing that task.

### 4.5 Commissioning and policy improvement

During early operation, reviewers resolve selected cases. After several similar decisions, the system might propose a narrow rule. The proposal must specify the kinds of cases it covers, show historical examples and report performance on cases held out from development. An authorized operator decides whether to activate it.

The audit record includes the policy and model versions, examples, approvals, changes, conditions for expiry or revocation, and observed outcomes. Repeated approval of individual cases provides examples for testing a rule. Activating it requires a separate decision.

### 4.6 Flow and resource control

A million incoming records can live in a durable queue. Giving a reviewer a million cards would bury the decisions they need to make. The scheduling layer limits work in progress for each scarce resource, including reviewer time. The interface shows batches and exceptions, with supporting records available on demand.

The evaluation weighs expert time, compute cost, delay, the consequences of error and the cost of recovery. Mandatory reliability and authorization constraints apply before the scheduler compares those trade-offs.

### 4.7 Personalized artifact engine

A single body of qualified claims might support a five-minute audio explanation, an instructor’s lesson, an analyst’s report, an interactive diagram or a machine-readable packet for another agent. Every output would retain links to the claims it used and flag assumptions added during generation.

The system must recognize its own derivatives. Generating three new briefings from one interview still leaves one original interview. Feeding those briefings back as independent corroboration would recreate the problem the system was built to solve.

## 5. Methodology

The three studies follow the **design science research** approach described by Hevner and colleagues. Each tests part of a working artifact against a simpler approach. The results would guide revisions to the software and to the underlying explanation of when it should work.

### Study A — Sensor evidence and knowledge construction

**Why UAP:** government and historical UAP records form a difficult testbed for source lineage, multimodal attribution, entity disambiguation, conflicting claims, event versus publication dates, uncertainty and changing releases. NASA's [independent study](https://www.nasa.gov/wp-content/uploads/2023/09/uap-independent-study-team-final-report-0.pdf) identified missing sensor metadata/calibration as real limitations. The [National Archives RG 615](https://www.archives.gov/research/topics/uaps/rg-615) provides an official collection updated as records arrive. The goal is **faithfulness to evidence**, not adjudicating extraordinary explanations. A second labeled benchmark is mandatory for quantitative ground truth. See [research testbed rationale](./uap-research-testbed).



**Dataset:** a small rights-cleared sample from the UAP Corpus (private research catalog) including official and nongovernment records, plus an additional corpus with independently checkable labels (e.g., annotated email/public-event data or an established entity-resolution benchmark).

**Comparators:** a passage/vector-only pipeline, a conventional graph-extraction pipeline, and the proposed observation/candidate/qualification architecture.

**Measures:** entity and attribution accuracy, source-lineage detection, contradiction recall, citation span correctness, provenance completeness, error propagation, acquisition cost, and reproducibility.

Do **not** score extraordinary UAP claims as true or false absent independent ground truth. Score whether the system attributes them faithfully and distinguishes evidence from interpretation.

### Study B — Commissioning, review routing and operator interface

**Design:** randomized or counterbalanced tasks across review-all, fixed-confidence, and progressively calibrated consequence-aware policies. Independently annotated cases and predefined error consequences are required.

**Measures:** human minutes, false promotions, missed mandatory escalation, reviewer error, notification count, time to resolve, calibration curves, policy generalization, and user confidence. Evaluate a simple recommendation-only interface against an optional expanded evidence view.

A separate **interface comparison** should ask whether an executive brief plus optional graph/source drill-down helps people recognize dependent sources, identify unsupported claims, and reconstruct changed assessments more accurately than an ordinary chat interface or a raw document list. The graph must earn its screen space through measured usability, not its visual appeal.

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

- [W3C PROV-O](https://www.w3.org/TR/prov-o/) — provenance;
- [GraphRAG](https://arxiv.org/abs/2404.16130) — graph-based corpus summarization;
- [Learning to Defer](https://proceedings.mlr.press/v119/mozannar20b.html) (Mozannar and Sontag) — algorithmic allocation to experts;
- [GRACE](https://aclanthology.org/2026.akbc-1.16/) (Yi, Minot, and Lee) — expert attention in graph knowledge expansion;
- [Provenance-Enhanced Statements](https://arxiv.org/abs/2606.15246) (Vitali and Pasqual, preprint) — attributed claims and competing epistemic stances;
- [Epistemic Knowledge Graphs](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7525242) (Kakatkar and Khatib, working paper) — epistemic status and provenance-aware explanations;
- [Ontology-guided neuro-symbolic GraphRAG](https://link.springer.com/article/10.1007/s00521-026-12495-0) — independent empirical comparison with explicit source-traceability measures;
- [ICD 203](https://www.intelligence.gov/mission/our-values/objectivity) — established analytic tradecraft for source quality, uncertainty and alternatives;
- [G-Eval](https://aclanthology.org/2023.emnlp-main.153/) — LLM-based qualitative evaluation;
- [Payton et al.](https://doi.org/10.1145/1734229.1734231) — semantic self-assessment and achieved fidelity of query results;
- [Deek et al.](https://digitalcommons.njit.edu/fac_pubs/16112/) — structured software problem solving and program development;
- [Sylla and Wen](https://digitalcommons.njit.edu/fac_pubs/14771/) — multi-objective/multi-criteria decision evaluation;
- [Grandhi and Jones](https://digitalcommons.njit.edu/fac_pubs/6913/) — interruption decision-making with contextual information;
- [Hevner et al.](https://aisel.aisnet.org/misq/vol28/iss1/6/) — design science in information systems.

The proposed contribution is a documented algorithm and reference architecture joining sensor-reported evidence quality, policy commissioning, consequence-sensitive review and capacity-aware knowledge promotion. A systematic review must first establish what existing systems already demonstrate. Controlled comparisons would then show whether adding these pieces together buys anything in practice.

## 7. NJIT research alignment

This is a proposed intellectual alignment, not an indication of commitment by faculty.

- **Jamie Payton, Dean, Ying Wu College of Computing:** a **secondary, bounded connection** through adaptive queries and reporting achieved consistency guarantees in dynamic mobile/sensor networks, plus computing education. Her cited work on adaptive queries does **not** directly investigate truthfulness of AI-generated claims, provenance-aware graph promotion, or expert-attention routing. Its applicability must be demonstrated, not assumed.
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
5. What would an independent evaluation need to establish beyond what my existing engineering prototypes demonstrate?

---

The next decision is which outcome and dataset can support a first defensible experiment. This preliminary proposal carries no claim of faculty approval, research funding, demonstrated superiority or established novelty.

[Research hub](./) · [Literature map](./literature-and-faculty)
