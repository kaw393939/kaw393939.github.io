---
title: From Messy Multimodal Sources to Qualified Knowledge
description: Claims, provenance, contradictions, graph/vector retrieval, and a UAP corpus pilot for governed knowledge construction.
---

# From Messy Multimodal Sources to Qualified Knowledge

*Research proposal and corpus case study · November 2026*

A knowledge graph should help explain what happened across a large collection, without pretending that every statement in the collection is true.

Consider millions of emails or decades of UFO/UAP material. Some documents copy the same statement. Others contradict it. Dates, names, agencies, witnesses, publishers, and interpretations change. A retrieval system can summarize these materials fluently while inadvertently losing the distinction between *someone reported X* and *X occurred*.

I want to build systems where those distinctions survive extraction, compression, and reuse.

## Separate four things

- **Source:** original file, identity, representation, access rights, content hash, and passage or time interval.
- **Observation:** what a parser, sensor, or model extracted from that source, along with tool version and confidence or limitations.
- **Candidate claim:** a proposition connected to speakers, events, and supporting or conflicting evidence.
- **Qualified knowledge:** a claim approved for a particular use under a recorded rule or authorized decision—not an unconditional declaration of truth.

A human's review should record *what was approved and why*, including scope. Approval to index a claim as reported testimony is different from approval to present the claim as established fact.

## Why a hybrid graph and vector system

Vectors help find semantically related passages; full-text and exact indexes find specific names and identifiers. The graph organizes claims, identities, evidence lineages, time, agreement, and contradiction.

A small retrieved subgraph could answer *which actors, claims, and sources matter to this question?* The system would then retrieve exact passages before making consequential conclusions.

This is **structured compression with recoverable evidence**, not lossless compression. Every summary is an interpretation that can omit something important. Evaluation must test whether crucial qualifiers and competing accounts remain available.

## UAP corpus as a difficult case

My private UAP Corpus (private research catalog) contains a curated metadata-only catalog of **38 source records/leads as of November 12, 2026**, including government archives, hearings, scientific papers, books, historical investigations, and firsthand or secondhand accounts.

The repository is explicit: no original corpus files have yet been acquired; its claim network is still a plan. Its unpublished network-design notes distinguish firsthand observation, reporting, reprinting, correction, and contradiction.

A rigorous pilot could start with a small rights-cleared selection, perhaps a government report and relevant congressional testimony. We would preserve source and publication dates separately from event dates, distinguish official positions from independent evidence, and represent uncertainty without forcing a binary conclusion.

The success criterion would **not** be proving extraterrestrial claims. It would be accurate attribution, shared-source detection, evidence retrieval, contradiction preservation, and transparent qualification.

## Sensors and the Pit Stop

A citation sensor might detect a missing passage; an identity sensor could find ambiguous names; a source-lineage sensor could find that six articles repeat the same interview. Their outputs would be analyzed independently of permission policies.

The Race Track can automatically register traceable, low-consequence observations. Potentially damaging allegations, ambiguous identity merges, restricted source rights, and changes to canonical conclusions may require more evidence or an authorized Pit Stop.

Automatic processing must still undergo sampled independent audit. A sensor that systematically misses errors cannot be made safe simply by routing only its own flagged cases for review.

## Literature and open questions

[W3C PROV-O (2013)](https://www.w3.org/TR/prov-o/) defines reusable provenance relationships. [GraphRAG (Edge et al., 2024)](https://www.microsoft.com/en-us/research/publication/from-local-to-global-a-graph-rag-approach-to-query-focused-summarization/) demonstrates hierarchical graph summaries. [GRACE (Yi, Minot, and Lee, 2026)](https://aclanthology.org/2026.akbc-1.16/) explicitly uses a graph of grounded claims and a return-on-attention criterion to select expert review.

The open research question is whether **heterogeneous, commissioned sensors and consequence-sensitive decision policies** can improve graph integrity and evidence efficiency over these established systems under realistic review constraints.

[Research series](./) · [Dissertation proposal](./dissertation-proposal)
