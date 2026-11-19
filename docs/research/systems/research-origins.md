---
title: How I Arrived at Evidence-Governed AI
description: The research history connecting personalized education, science-fiction knowledge, MetaVis, UAP archives, Ordo, and epistemology.
---

# How I arrived at evidence-governed AI

*Personal research essay · November 2026*

I did not start with the idea of building a universal knowledge graph. I started by imagining **personalized knowledge artifacts**: lessons, explanations, audio, video and interactive experiences that could be made for one person's circumstances rather than mass-produced for everyone.

AI seemed to make reading, writing, and proposing decisions radically cheaper. But after building and inspecting generated work, I kept returning to a less glamorous question:

**How do we know whether the information is good enough to use?**

The answer depends on what we're trying to do. A creative story can tolerate invented detail. A historical briefing needs clear attribution and preserved uncertainty. A consequential action may demand independent verification and explicit permission.

## Building with familiar fictional worlds

I've used **Star Trek** and **Star Wars** in experiments because I enjoy them and know enough about their characters, events and conflicting continuities to notice many errors. A defined canon can also give us reference answers for testing extraction, timelines, linked entities and generated explanations.

That does not mean all fictional-canon questions are unambiguous, or that my familiarity substitutes for an annotated benchmark. It means I was deliberately building with material I could interrogate rather than trusting plausible output.

## MetaVis made the difference visible

My [MetaVis engineering experiments](./metavis-evidence-and-evaluation) used native Swift and Metal processing, deterministic tests, sensor measurements and optional Gemini qualitative evaluation.

For example, frame counts, memory allocations and repeatable sensor outputs can be checked directly. Whether a particular edit communicates the intended meaning is a different kind of judgment. The system explored selected evidence packs and bounded revisions, but the model-based evaluator still needed independent validation.

That distinction became central to how I think about AI: **deterministic correctness, evidentiary justification, and human usefulness are different dimensions**.

## UAP made the epistemological problem unavoidable

I'm personally interested in UFO/UAP history. But the real research advantage isn't any predetermined explanation of the phenomena. It is a collection of archival records, testimony, repeated stories, conflicting timelines, incomplete sensor data and uncertain identities.

A system can verify that a witness said something in a hearing. It cannot infer from the transcript alone that the described event occurred exactly as reported.

My [UAP pilot proposal](./uap-research-testbed) is designed to measure **faithful attribution, source independence, disambiguation, contradiction preservation and traceable explanation**, using a separate known-answer corpus to evaluate correctness. The underlying 38-item metadata catalog is not yet an acquired multimodal dataset.

## Ordo made verification a governance problem

If every generated statement and action needs a human to approve it, human attention becomes the bottleneck. If we grant an agent unrestricted authority, mistakes and unsupported inferences can propagate without appropriate review.

[Ordo](https://github.com/kaw393939/ordo) documents an alternative: bounded automated work on a **Race Track**, with consequential or ambiguous cases routed to a **Pit Stop**. Repeated human corrections may suggest narrow policies, but activation requires explicit authority and independent testing.

The work isn't just about better answers. It is about making an entire human–AI operating process comprehensible, measurable and recoverable.

## The interface matters

An early native Swift concept explored pages as nodes and hyperlinks as edges: reading a connected book and traversing a graph were two views of the same information. I want to combine that navigational idea with semantic search, source-linked claims and a concise intelligence briefing.

I have not yet verified that historical interface as a working public Swift implementation. The [current design thesis](./vision-and-interface) explains the separation between a **navigation graph** and an **evidence graph**, and why Wikipedia/Wikidata are external discovery sources rather than the UI.

## Why this points back to education

A learner shouldn't merely receive a personalized explanation. They should be able to ask: Who reported this? Where is the original? Why is one account stronger? What would change the assessment?

That is education in the subject *and* practice in evaluating knowledge.

In my work, **the research problem followed the experiments**, not the other way around. I now want to use doctoral methods to identify which mechanisms actually improve review accuracy, decision efficiency and learning—and which appealing ideas do not.

[Professional record](/work) · [Research overview](./) · [Advisor research brief](./advisor-brief)

*This is a first-person account of motivation and experimentation, not a claim of academic priority or completed controlled research.*
