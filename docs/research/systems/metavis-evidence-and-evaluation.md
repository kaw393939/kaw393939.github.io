---
title: MetaVis — Engineering AI Through Evidence and Evaluation
description: A source-linked case study of Swift, Metal, deterministic media tests, Gemini qualitative QA, and bounded AI feedback.
---

# MetaVis: Engineering AI Through Evidence and Evaluation

*Technical case study · December 2025 experiments, reviewed November 2026*

**MetaVis was an exploration of how AI can direct sophisticated software while tests and specialized hardware establish measurable constraints.** It was not only a video editor prototype; the tests themselves were experimental instruments.

## Architecture

The [SwiftPM workspace](https://github.com/kaw393939/metavis-demo-projects/blob/main/Package.swift) separates timeline models, a compiler, Metal rendering, native media ingestion, perception, export, session orchestration, and quality control. The design expresses high-level editing intent as a typed timeline and compiles it into a precise render graph. AI can propose editing actions; deterministic code performs them.

The [vibe-editing design](https://github.com/kaw393939/metavis-demo-projects/blob/main/Docs/CONCEPT_VIBE_EDITING.md) calls for grounded context, typed intents, deterministic commands, reversibility, and test-locked semantics. The architecture also records where abstraction can become costly: the [system critique](https://github.com/kaw393939/metavis-demo-projects/blob/main/Docs/SYSTEM_CRITIQUE.md) warns against using stateful-device interfaces for every operation in a real-time rendering loop.

## Tests as instruments, not decoration

The [TDD strategy](https://github.com/kaw393939/metavis-demo-projects/blob/main/Docs/TDD_STRATEGY.md) calls for protocols, dependency injection, golden fixtures, and layered tests.

Examples in the source:

- [Golden frame hashes](https://github.com/kaw393939/metavis-demo-projects/blob/main/Tests/MetaVisSimulationTests/Golden/GoldenFrameHashTests.swift): render procedural test patterns and check stable downsampled hashes.
- [CPU/GPU twin comparison](https://github.com/kaw393939/metavis-demo-projects/blob/main/Tests/MetaVisSimulationTests/TwinVerificationTests.swift): compare a Metal path to a reference buffer.
- [Sensor determinism](https://github.com/kaw393939/metavis-demo-projects/blob/main/Tests/MetaVisPerceptionTests/MasterSensorsDeterminismTests.swift): ingest the same media twice and assert identical structured sensor results.
- [Allocation invariants](https://github.com/kaw393939/metavis-demo-projects/blob/main/Tests/MetaVisSimulationTests/Perf/RenderAllocationTests.swift): after warm-up, repeated frames should not allocate new Metal textures.
- [Export contracts](https://github.com/kaw393939/metavis-demo-projects/blob/main/Tests/MetaVisExportTests/DeliverableE2ETests.swift): verify media, manifests, sidecars, quality reports, and absence of normal-path CPU readback.

These tests encode not only functionality but resource constraints. A video can look correct while missing an audio track, rendering the wrong content for seconds, or performing costly texture allocations.

## Deterministic measures and qualitative Gemini review

The [VideoQC](https://github.com/kaw393939/metavis-demo-projects/blob/main/Sources/MetaVisQC/VideoQC.swift) and [VideoContentQC](https://github.com/kaw393939/metavis-demo-projects/blob/main/Sources/MetaVisQC/VideoContentQC.swift) modules measure frame counts, codec-related properties, silence, temporal variety, and image statistics.

The optional [GeminiQC](https://github.com/kaw393939/metavis-demo-projects/blob/main/Sources/MetaVisQC/GeminiQC.swift) layer adds qualitative judgments. Its [prompt builder](https://github.com/kaw393939/metavis-demo-projects/blob/main/Sources/MetaVisQC/GeminiPromptBuilder.swift) supplies expected narrative and deterministic metrics, limits external media according to privacy policies, and requests structured responses.

More importantly, the [Sprint 16 feedback loop](https://github.com/kaw393939/metavis-demo-projects/blob/main/Sprints/16_Feedback_done/archive/PLAN.md) creates a **budgeted EvidencePack** from selected frames, short audio/video snippets, and sensor summaries. It can ask for targeted additional evidence rather than upload entire deliverables. [AutoColorCorrectQA](https://github.com/kaw393939/metavis-demo-projects/blob/main/Sources/MetaVisLab/AutoColorCorrectQA.swift) provides a numeric exposure heuristic, while permitting a Gemini reviewer to disagree if actual visual evidence justifies it. A [ParameterWhitelist](https://github.com/kaw393939/metavis-demo-projects/blob/main/Sources/MetaVisCore/FeedbackLoopContracts.swift) enforces bounded edits in code.

The AI reviewer supplies judgments and proposed changes; it does **not** replace measured physical constraints.

## Hardware optimization as an engineering boundary

The [hardware maximization design](https://github.com/kaw393939/metavis-demo-projects/blob/main/Docs/CONCEPT_HARDWARE_MAXIMIZATION.md) assigns suitable workloads to Apple media engines, Core ML/Vision, and Metal, while limiting copies and reusing buffers. The [performance findings](https://github.com/kaw393939/metavis-demo-projects/blob/main/Sprints/24i_shader_perf_m3/FINDINGS.md) record measurements on an Apple M3 machine dated December 22–23, 2025. These are engineering observations, not controlled comparative performance claims.

## Gaps and research implications

The repository includes examples of genuine self-critique. A [December 21 AI code audit](https://github.com/kaw393939/metavis-demo-projects/blob/main/Docs/code_review/Master_Executive_Summary.md) identifies mock services and incomplete production AI pathways. Some real-asset fixtures are not tracked publicly, some tests require optional environment gates, and some AI-QA skip paths report acceptance rather than distinguishing *not run* from *passed*. AI judgments also need independent human calibration.

These limitations are particularly instructive. The evaluation harness itself requires governance, data provenance, and auditability.

**Generalizable hypothesis:** a layered evaluation system—deterministic measurement, selected evidence, constrained probabilistic critique, bounded revision, then authorized review—can produce more trustworthy artifacts while spending fewer expensive evaluation resources.

[Research series](./) · [Human attention and Kanban](./human-attention-kanban)
