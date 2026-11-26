---
title: "The Video Looks Right. What Did the Software Check?"
description: "Inside MetaVis, a Swift and Metal editing prototype where frame hashes, GPU tests, and a bounded Gemini review check different parts of a video export."
teaser: "A polished frame can hide a missing soundtrack or an expensive rendering loop. The tests in my video editor gave each failure a different way to show up."
articleGenre: "Engineering case study"
---

# The Video Looks Right. What Did the Software Check? {#metavis-engineering-ai-through-evidence-and-evaluation}

In MetaVis, my Swift and Metal editing prototype, one test renders a pattern and checks its frame hash. Another inspects the exported media, manifest, and quality reports. An editor needs both answers. The image can have the expected pixels while the delivered clip is silent.

Would you sign off on an export marked `accepted: true`? In one path through the optional Gemini check, that is the recorded verdict even when the reviewer never saw the clip. If the policy disallows sending media, the accompanying text says the check was skipped. I would give each promised check a visible **passed, failed, or untested** state. That change is proposed. Today, a reviewer must read the skip message to interpret the verdict. [Gemini verdict code](https://github.com/kaw393939/metavis-demo-projects/blob/main/Sources/MetaVisQC/GeminiQC.swift) · [Prototype audit](https://github.com/kaw393939/metavis-demo-projects/blob/main/Docs/code_review/Master_Executive_Summary.md)

## Architecture

The system translates editing intent into a typed timeline, then compiles the timeline into a render graph. A model can propose a change. Swift code applies a defined operation. That boundary makes the change easier to reproduce and undo. The code separates media ingestion, rendering, perception, export, and quality control. The design critique also flags an abstraction that can cost too much in a real-time render loop. [Swift packages](https://github.com/kaw393939/metavis-demo-projects/blob/main/Package.swift) · [Editing design](https://github.com/kaw393939/metavis-demo-projects/blob/main/Docs/CONCEPT_VIBE_EDITING.md) · [Architecture critique](https://github.com/kaw393939/metavis-demo-projects/blob/main/Docs/SYSTEM_CRITIQUE.md)

## Tests as instruments, not decoration

| A question a reviewer can ask | The experiment in code |
| --- | --- |
| Did the same input produce the expected pixels? | [Render a reference pattern and compare its frame hash](https://github.com/kaw393939/metavis-demo-projects/blob/main/Tests/MetaVisSimulationTests/Golden/GoldenFrameHashTests.swift) |
| Does the GPU path agree with a reference implementation? | [Compare the Metal output with a reference buffer](https://github.com/kaw393939/metavis-demo-projects/blob/main/Tests/MetaVisSimulationTests/TwinVerificationTests.swift) |
| Can the same clip produce different sensor readings? | [Ingest the media twice and compare the results](https://github.com/kaw393939/metavis-demo-projects/blob/main/Tests/MetaVisPerceptionTests/MasterSensorsDeterminismTests.swift) |
| What happens after the first frame? | [Check allocations after warm-up](https://github.com/kaw393939/metavis-demo-projects/blob/main/Tests/MetaVisSimulationTests/Perf/RenderAllocationTests.swift) |
| What would a recipient actually receive? | [Inspect the exported media, manifest, and quality reports](https://github.com/kaw393939/metavis-demo-projects/blob/main/Tests/MetaVisExportTests/DeliverableE2ETests.swift) |

These are different claims about one deliverable. A project can choose its most consequential claim first and give someone a repeatable check before adding another model to the workflow. [Test strategy](https://github.com/kaw393939/metavis-demo-projects/blob/main/Docs/TDD_STRATEGY.md)

## Deterministic measures and qualitative Gemini review

The quality-control modules measure properties such as frame count, silence, temporal variety, and image statistics. An optional Gemini reviewer then gets the intended narrative, selected media, and the measured results. It can question whether an exposure correction suits the scene. The program still enforces which parameters may change. [Video measurements](https://github.com/kaw393939/metavis-demo-projects/blob/main/Sources/MetaVisQC/VideoQC.swift) · [Content checks](https://github.com/kaw393939/metavis-demo-projects/blob/main/Sources/MetaVisQC/VideoContentQC.swift) · [Gemini review](https://github.com/kaw393939/metavis-demo-projects/blob/main/Sources/MetaVisQC/GeminiQC.swift) · [What the reviewer receives](https://github.com/kaw393939/metavis-demo-projects/blob/main/Sources/MetaVisQC/GeminiPromptBuilder.swift)

The Sprint 16 design budgets how much evidence leaves the system. It selects frames, short audio or video snippets, and sensor summaries. A reviewer can request another sample when those are insufficient. One useful disagreement is a numerical exposure heuristic and a model that sees an intentionally dark scene. I want that disagreement available to inspect before changing the image. [Evidence packet design](https://github.com/kaw393939/metavis-demo-projects/blob/main/Sprints/16_Feedback_done/archive/PLAN.md) · [Exposure heuristic](https://github.com/kaw393939/metavis-demo-projects/blob/main/Sources/MetaVisLab/AutoColorCorrectQA.swift) · [Allowed edits](https://github.com/kaw393939/metavis-demo-projects/blob/main/Sources/MetaVisCore/FeedbackLoopContracts.swift)

## Hardware optimization as an engineering boundary

The design assigns suitable work to Apple media engines, Core ML/Vision, and Metal and reuses buffers to limit copies. The shader-performance sprint notes report measurements on an Apple M3. They document that setup and workload. A claim about comparative performance would need a controlled test on the systems being compared. [Hardware design](https://github.com/kaw393939/metavis-demo-projects/blob/main/Docs/CONCEPT_HARDWARE_MAXIMIZATION.md) · [M3 measurements](https://github.com/kaw393939/metavis-demo-projects/blob/main/Sprints/24i_shader_perf_m3/FINDINGS.md)

## Gaps and research implications

The prototype audit identifies mock services and unfinished AI paths. Some media fixtures sit outside the public repository, and some tests require particular hardware. Anyone reproducing the checks should record which fixtures and hardware they used. [Read the audit](https://github.com/kaw393939/metavis-demo-projects/blob/main/Docs/code_review/Master_Executive_Summary.md)

My research question is whether a few well-chosen measurements, followed by a bounded qualitative review and human acceptance, can catch consequential mistakes with less review effort. The code gives me a place to run that comparison.

[Research series](./) · [Human attention and Kanban](./human-attention-kanban)
