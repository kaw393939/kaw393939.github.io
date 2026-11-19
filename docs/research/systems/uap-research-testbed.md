---
title: Why UAP Records Are an Unusually Demanding AI Research Testbed
description: A case for using UAP archives to test provenance, entity resolution, correlated sources, changing evidence, and source-aware intelligence briefings.
---

# Why UAP Records Are an Unusually Demanding Research Testbed

*Research-methods position · November 2026*

My proposed UAP corpus is not an attempt to prove any predetermined explanation of unidentified phenomena. It is a way to examine whether AI can **organize uncertain, contradictory and imperfect evidence without erasing the distinction between observation, testimony and interpretation**.

That makes UAP a strong stress test for an evidence-governed knowledge system. It does **not** make it a sufficient scientific benchmark on its own.

## Why this domain is useful

| Difficult property | Research capability being tested |
| --- | --- |
| Scans, text, audio, video, testimony and incomplete sensor records | Multimodal extraction and precise passage/timecode citations |
| Historical accounts and later reinterpretations | Temporal provenance and versioned assessments |
| People and organizations with multiple aliases and roles | Entity linking and source-specific disambiguation |
| Several publications repeating one original witness | Detecting correlated sources rather than false corroboration |
| Conflicting narratives, institutional positions and skeptical alternatives | Maintaining attributed propositions and competing hypotheses |
| Unknown causes or missing primary measurements | Explicit uncertainty and evidence gaps rather than fabricated certainty |
| Original records, transcriptions, OCR, summaries, and generated derivatives | Recording transformations without treating derivatives as independent witnesses |
| New official releases over time | Incremental graph updates and explicit explanations of assessment changes |
| Restricted, redacted or copyrighted material | Rights-aware acquisition, indexing and presentation |
| Many possible questions and audiences | Generating different grounded artifacts from one shared evidence base |

[NASA's 2023 independent UAP study](https://www.nasa.gov/wp-content/uploads/2023/09/uap-independent-study-team-final-report-0.pdf) explicitly highlights missing calibration data and metadata for many observations. The lack of data is itself a subject of the proposed investigation, not a reason to invent definitive answers.

## An official, evolving records source

The [National Archives' Record Group 615](https://www.archives.gov/research/topics/uaps/rg-615) contains UAP records received from federal agencies pursuant to the FY2024 National Defense Authorization Act. The National Archives says it will update the collection as new records arrive.

This establishes official custody and a continuing acquisition pathway. **It does not establish the truth of each statement in the records**, nor does a public download link automatically settle all possible reuse rights.

The evolving collection is valuable for testing whether the system notices new evidence, preserves earlier versions and explains why an assessment changed.

## What the system is responsible for

It should be answerable for: correctly identifying and preserving original source material; attributing each claim; distinguishing contemporaneous records from later recollections; flagging ambiguous people/events; representing evidence dependence; citing specific passages; and accurately recording why a judgment was made.

It **cannot claim certainty about an event with no independently verifiable ground truth**. A statement such as “A testified that B happened” is testable against the transcript. “B really happened” may not be independently testable.

A Five Ws review asks who, what, when, where, why and how. A Five Whys investigation traces the **basis of the system's assessment or failure**, while allowing multiple explanations and stopping at evidence gaps.

## The existing corpus is not yet acquired

The November 2026 UAP corpus planning repository describes a **38-item curated metadata catalog and four collection entry points**, not a completed media archive. Originals, OCR/ASR derivatives and annotated claim labels have not yet been downloaded or evaluated. This is a documented development status, not a research result.

A defensible pilot would select a small rights-cleared group: a government report, hearing transcript, historical investigation, and independently authored account. Store original hashes, acquisition receipts, source spans, media timestamps, exact dates, and rights decisions. Annotators then label attributable statements, source copying, uncertainty and contradictions.

## Why an additional benchmark is mandatory

UAP archives are **not ideal ground truth for extraordinary historical outcomes**. Selection bias, incomplete instrumentation, disputed recollections, and inaccessible source material limit what can be known.

Pair UAP with an independently labeled entity-resolution and claim-attribution benchmark, plus a controlled synthetic corpus where source copying, false identities, and event truth are specified. The controlled corpus lets us calculate false positives and false negatives; the UAP sample evaluates ecological realism, provenance and navigation.

Do not train on synthetic derivatives of the same source and then treat those derivatives as independent evaluation cases.

## How the interface should communicate it

A reader could open an executive brief, select an event, explore two different graphs (a **page navigation graph** and a **claim/evidence graph**), read a dynamically composed dossier, and inspect original passages. Wikipedia and Wikidata may help discover topics and candidate identifiers but are named **external context sources**, not the user interface or final authority.

The interface should answer: “What do we know?”, “Why is that assessment supported?”, “Which sources may depend on one another?”, and “What new evidence would change it?”

## Broader application and research funding relevance

The same methods may apply to scientific literature, journalism, public archives, cybersecurity, fraud investigations, intelligence analysis and enterprise document knowledge. [ODNI analytic standards, ICD 203](https://www.intelligence.gov/mission/our-values/objectivity), give a substantive benchmark for sourcing, uncertainty and competing explanations.

This is a case for researching **trustworthy information processing**, not a claim that the government has committed funding to this project or that a UAP-specific grant exists. Application opportunities are dependent on sponsor goals, eligibility and timing and must be checked separately.

[Research hub](./) · [Interface architecture](./vision-and-interface) · [Advisor proposal](./dissertation-proposal)
