---
title: "Human Attention as an Engineering Constraint"
description: "A practical way to evaluate AI review queues by expert time, error costs, and how much reliable work reaches the people who need it."
teaser: "An agent can produce another ten drafts while a reviewer reads the first one. How can a team tell whether it is getting more useful work done?"
articleGenre: "Research and economics essay"
---

# Human Attention as an Engineering Constraint

Suppose an AI system finishes a thousand records overnight. By morning, a specialist has a hundred flagged items and an hour before the first briefing. Generating faster will give that specialist a longer list. The engineering question is which decisions are worth the hour.

I would measure **review minutes per claim accepted at a stated level of reliability**. Count the work the team can stand behind, then look at the errors that slipped through. A queue can look wonderfully efficient when nobody checks what leaves it.

## Kanban as flow control

Kanban limits how much work can be in progress. For review, I would track two flows. One contains incoming sources and all the observations extracted from them. The other contains decisions someone can actually make, such as whether two records refer to the same person or whether a change in evidence warrants a correction.

Keep the full history in the underlying system. Give reviewers a board of cases, batches, and blocked decisions. When it fills, slow the incoming work, group related cases, or have a tool gather a missing passage. A full queue leaves the authorization rules in force.

## Value of additional review

**Total expected cost = computation + expert review + consequences of errors + recovery.**

Take the ambiguous name. A reviewer can resolve the individual case. If hundreds of similar cases keep arriving, that reviewer might spend the same time evaluating a narrowly defined matching rule. The second option becomes attractive only after the rule works on held-out records and someone with authority approves its use. Sample its automatic decisions afterward to find errors the rule itself misses.

The least expensive next step might be a database lookup, a local model, a more capable model, or a person. The price of a model call is only one term in that equation.

## What to measure

| Measure | What it can tell a team |
| --- | --- |
| Expert minutes per accepted claim | How much review the output consumes |
| Consequential errors and missed escalations | What the queue lets through |
| Time waiting, time reviewing, and rework | Where the work actually stalls |
| Citation completeness and retrieved contradictions | Whether the result can still be checked |
| Compute, storage, and recovery costs | Whether cheaper generation shifts cost elsewhere |
| Decision accuracy and interruptions | What the review design asks of a person |

## Scientific questions

I would compare first-in-first-out review, uncertainty-first review, and a policy that also considers consequence, under the same workload and reviewer capacity. Does the latter save expert time at a comparable error rate? Do reviewers make better decisions with a short account of why an interruption matters? Those outcomes remain to be measured.

This question has a history. Horvitz and colleagues studied attention-sensitive alerts. Grandhi and Jones studied how context helps people judge interruptions. Sylla and Wen combined multiple criteria in technology investment decisions. GRACE explicitly considers the return on expert attention in knowledge-graph expansion. Those approaches give a new review policy something concrete to beat. [Horvitz et al.](https://www.microsoft.com/en-us/research/people/horvitz/publications/) · [Grandhi and Jones](https://digitalcommons.njit.edu/fac_pubs/6913/) · [Sylla and Wen](https://digitalcommons.njit.edu/fac_pubs/14771/) · [GRACE](https://aclanthology.org/2026.akbc-1.16/)

[Research series](./) · [Dissertation proposal](./dissertation-proposal)
