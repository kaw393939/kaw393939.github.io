---
title: Human Attention as an Engineering Constraint
description: Kanban, review queueing, cost of errors, and dynamic human–AI resource allocation.
---

# Human Attention as an Engineering Constraint

*Research and economic hypothesis · November 2026*

As AI agents make generation inexpensive, **the scarcest resource may be the attention of people qualified to verify and authorize their output**.

Optimizing for more AI-produced code, claims, or multimedia can worsen the real bottleneck: an ever-growing queue of decisions humans must inspect.

I want to evaluate systems by accepted, reliable value per human-review minute—not by generated tokens per second.

## Kanban as flow control

Kanban's work-in-progress limits, explicit policies, and pull-based flow provide a useful model. Yet the architecture needs two different flows:

- **Knowledge flow:** source ingestion, sensor observations, candidate claims, verification, graph promotion, and artifact generation.
- **Decision flow:** ambiguous cases, policy changes, consequential actions, and reviewer approvals.

Billions of emails should not become billions of visible board cards. The operational board represents batches, blocked jobs, reviewer cases, decisions, and capacity; the detailed event and provenance records remain in the underlying system.

When Pit Stops exceed review capacity, the scheduler should apply backpressure, group repetitive decisions, gather cheaper additional evidence, and prioritize cases by risk and expected value. It must never bypass a mandatory authority gate merely to clear the queue.

## Value of additional review

A useful starting model is:

**Total expected cost = compute + expert review + error consequences + recovery.**

The optimal pathway may be deterministic code; a small local model; a frontier model; an authorized delegate; or a human. A cheap inference that produces substantial rework may be economically worse than an expensive evaluation that prevents a serious error.

Case-by-case approvals can also create higher-value policy proposals. An operator might spend two minutes correcting one ambiguous name, or the same time authorizing a tested, narrow entity-resolution rule that applies to thousands of future observations.

The policy must still be monitored on held-out examples and sampled automatic decisions.

## What to measure

- **Review minutes per qualified claim or accepted artifact**
- **Consequence-weighted false promotions and escaped errors**
- **Queue time, flow time, throughput, and rework**
- **Provenance completeness and contradiction-retrieval success**
- **Inference, storage, and recovery costs**
- **Reviewer cognitive load and quality of decisions under interruption**

Throughput alone is a poor outcome measure: if the system promotes incorrect knowledge faster, it has not improved.

## Scientific questions

Does value-aware scheduling outperform FIFO or fixed-confidence review when reviewer capacity is limited? Can progressive commissioning reduce the number of low-value human interruptions without increasing errors? Can progressive-disclosure review interfaces help experts understand and resolve cases more accurately?

Earlier work matters here. [Horvitz et al. (1999)](https://www.microsoft.com/en-us/research/people/horvitz/publications/) studied attention-sensitive alerting. [Jones and coauthors](https://digitalcommons.njit.edu/fac_pubs/9959/) investigated the role of interruption context. [Sylla and Wen (2002)](https://digitalcommons.njit.edu/fac_pubs/14771/) combined decision criteria and goal programming for technology evaluation. [GRACE (2026)](https://aclanthology.org/2026.akbc-1.16/) expressly optimizes return on expert attention.

The research claim must therefore involve a **specific new mechanism and measured benefit**, not simply recognizing that review time is scarce.

[Research series](./) · [Dissertation proposal](./dissertation-proposal)
