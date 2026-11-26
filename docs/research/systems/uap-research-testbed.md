---
title: "What Can an AI System Actually Verify About a UAP Report?"
description: "Historical UAP records offer a way to test AI source attribution, copied accounts, and changing assessments alongside an independently labeled benchmark."
teaser: "Three newspapers can quote one witness. An archive can preserve all three. The question an AI researcher can score is whether a system knows the difference."
articleGenre: "Research methods essay"
---

# What Can an AI System Actually Verify About a UAP Report? {#why-uap-records-are-an-unusually-demanding-research-testbed}

A hearing transcript can settle a narrow question very well. Did the witness say those words? The same transcript may leave the event itself unexplained. That combination makes historical records of unidentified anomalous phenomena, or UAP, a useful test for software that writes from sources.

I want to see whether a system can preserve testimony, trace a copied account, and leave an uncertainty intact. Those tasks can be evaluated without choosing an explanation for the underlying event.

## Why this domain is useful

| What an archive contains | What I would ask the system to show |
| --- | --- |
| A scan, transcript, audio clip, or video | The original page, region, or timecode for a claim |
| An account written years later | Both the event date and the publication date |
| Several names or aliases | The evidence for joining two records, plus unresolved alternatives |
| Later articles quoting one witness | A visible route back to the shared source |
| Conflicting accounts or missing measurements | The disagreement and the specific evidence gap |
| A transcription, translation, or generated summary | The original and the transformations that produced the derivative |
| A revised release, redaction, or access restriction | Which version the reader can inspect and what it permits |

NASA’s independent study identified missing calibration data and metadata as limitations for many observations. A system should tell a reader what those gaps prevent them from inferring. [NASA’s independent study](https://www.nasa.gov/wp-content/uploads/2023/09/uap-independent-study-team-final-report-0.pdf)

## An official, evolving records source

The U.S. National Archives maintains Record Group 615 for UAP material received from federal agencies under the National Defense Authorization Act provision establishing the UAP Records Collection. The Archives says it updates the collection as records arrive. An accession tells a researcher something important about custody. The statements inside still need attribution, and reuse requires checking the rights associated with the source. [National Archives collection](https://www.archives.gov/research/topics/uaps/rg-615)

## What the system is responsible for

Ask it to identify the original record, distinguish a contemporaneous observation from a later recollection, and point to the exact words behind each sentence. If a later release changes an assessment, ask which passage changed and who made the new judgment. A “why” investigation should trace the basis for the system’s assessment and leave room for competing explanations.

## The existing corpus is not yet acquired

The reviewed planning catalog contains **38 metadata items and four collection entry points**. The source media, OCR or speech-transcription derivatives, and annotated claim labels still need to be acquired or produced.

I would begin with a small rights-cleared group comprising a government report, a hearing transcript, a historical investigation, and an independently authored account. Preserve acquisition dates, content hashes, rights decisions, page spans, and media timestamps. Then ask annotators to mark attributable statements, source copying, uncertainty, and contradictions.

## Why an additional benchmark is mandatory

A historical archive can show whether a tool cites accurately. It rarely gives researchers a known answer for a disputed event. Pair it with an independently labeled benchmark for identities and attributions, plus a controlled corpus with known copying and deliberate name collisions. In the controlled cases we can count false matches and missed links. In the archive we can see whether the same approach helps readers navigate real records.

Keep derivatives of a source with their parent when separating training and evaluation material. Putting an original in one group and its synthetic retelling in the other would exaggerate independent performance.

## How the interface should communicate it

For the three-newspaper example, a reader should be able to open the briefing, inspect the earliest cited passage, and see which later articles repeat it. A navigation graph can connect the pages. An evidence graph can show who quotes whom. Wikipedia and Wikidata may help identify people and topics, with named source revisions available to the reader.

## Broader application and research funding relevance

A journalist tracing a quotation, a scientist following a disputed result, and an analyst reviewing conflicting internal reports face a related problem. Sourcing, alternative explanations, and reasons for changed judgments are useful criteria across these settings. They also appear in published intelligence analytic standards. [ICD 203](https://www.intelligence.gov/mission/our-values/objectivity)

The value of this testbed depends on what it reveals about information processing. Funding opportunities would require a separate check of sponsor goals, eligibility, and timing. The proposal makes no claim of committed funding.

[Research hub](./) · [Interface architecture](./vision-and-interface) · [Advisor proposal](./dissertation-proposal)
