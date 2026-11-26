---
title: "Six Articles, One Witness"
description: "See how a proposed graph and vector search system would follow a claim back to its origin, distinguish repeated testimony, and retain competing accounts."
teaser: "A search returns six accounts of an event. If all six quote the same interview, how many independent witnesses should a briefing report?"
articleGenre: "Research proposal and corpus case study"
dateLabel: "November 2026"
---

# Six Articles, One Witness {#from-messy-multimodal-sources-to-qualified-knowledge}

A search interface returns six articles, each with a citation. Follow the links and every account leads to the same interview. The search did its job. The briefing writer still has to decide how much independent support the claim has.

This is the problem I want a knowledge graph to help solve. When a sentence moves from an archive to a summary and then into a report, the reader should still be able to tell who said it, on what basis, and whether anyone else observed it independently.

## Separate four things

| Record | What to keep |
| --- | --- |
| Source | Original file, access rights, content hash, and exact passage or time interval |
| Observation | What a parser, sensor, or model extracted, its version, and the limits of the reading |
| Candidate claim | The proposition, who made it, whose identity is uncertain, and the evidence for and against it |
| Qualified claim | What an authorized reviewer or policy accepted, for which use, and why |

“Include this statement in the testimony index” and “publish this assertion as established” grant different permissions. The record needs enough detail to tell which decision a reviewer actually made.

## Why a hybrid graph and vector system

A vector search can find descriptions with similar meanings even when people use different words. Exact search can recover a case number or a particular spelling. A graph can connect six articles to the interview they share and preserve a seventh source that offers a different account.

I would retrieve the small set of relevant relationships, then return to the source passages. Compression makes an archive navigable. It can also remove a qualifier. A worthwhile evaluation should ask reviewers to find whichever caveat a summary left out.

## UAP corpus as a difficult case

On November 12, 2026, my private UAP research catalog held **38 metadata records and leads**. They include government archives, hearings, books, scientific papers, and first- or secondhand accounts. The original files had yet to be acquired. The proposed claim network is a design.

For a pilot, I would start with a small rights-cleared selection such as a government report and a hearing transcript. Label the event date separately from the dates of testimony and publication. Ask annotators which statements quote a witness, which restate another publication, and which supply independent observations. These labels let us score attribution and source copying even when the cause of an event is unknown.

## Sensors and the Pit Stop

One checker might flag a missing passage. Another might propose that two names refer to the same person. A third might discover that several articles repeat one interview. Each reports what it found. A separate policy determines whether a person needs to review the case, particularly for a sensitive allegation, a restricted source, or a proposed identity merge.

Also check a sample of cases that *didn’t* trigger review. A system that catches errors only when its own detector raises a flag can remain unaware of a systematic mistake.

## Literature and open questions

Provenance standards already describe how one record derives from another. GraphRAG shows how to summarize collections using graphs. GRACE considers the return on expert attention in a graph of grounded claims. I want to test whether additional source checks and review rules preserve contradictions and improve attribution within a fixed review budget. [W3C PROV-O](https://www.w3.org/TR/prov-o/) · [GraphRAG](https://www.microsoft.com/en-us/research/publication/from-local-to-global-a-graph-rag-approach-to-query-focused-summarization/) · [GRACE](https://aclanthology.org/2026.akbc-1.16/)

[Research series](./) · [Dissertation proposal](./dissertation-proposal)
