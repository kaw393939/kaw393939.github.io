---
title: The Race Track and the Pit Stop
description: A configurable human–AI governance pattern for consequence-aware review, commissioning, and recoverable decisions.
---

# The Race Track and the Pit Stop

*Working architectural proposal · November 2026*

A system that asks a person to approve everything does not scale. A system that decides everything itself may be fast and catastrophically wrong. I use **Race Track / Pit Stop** as a plain-language model for the space between these extremes.

The [Ordo pattern](https://github.com/kaw393939/ordo/blob/main/agentic-appliance/patterns/race-track-pit-stop.md) describes a Race Track for bounded routine work and a Pit Stop for consequential, disputed, or insufficiently supported work. The idea is not just a visual workflow. It is a proposal for governing decision authority at runtime.

## What changes with self-describing sensors

A sensor should be an independent, discoverable component. It might read email metadata, recognize faces in a film, detect contradictory claims, inspect a contract, or report GPU memory use. It should describe *what it can observe*, input/output contracts, limitations, resource costs, configurable parameters, and version.

The orchestration system should not need to know every future sensor capability in advance. Sensors produce typed **observations**; a separate analysis layer constructs interpretations; a recommendation layer proposes next actions. An independent policy layer determines authority.

That distinction makes the architecture extensible without confusing *observation*, *belief*, *authorization*, and *execution*.

## Consequences drive routing

Consider three statements extracted from correspondence:

1. A person sent a message on Tuesday. The header can be checked automatically.
2. A person said the board approved a transaction. The statement is attributable, but does not itself prove approval.
3. The company is authorized to transfer funds. This has significant consequences and requires stronger evidence and potentially an authorized human decision.

The same model may be equally confident about all three strings. They do not deserve the same routing policy.

Risk estimation needs expected error, severity, uncertainty in measurement, reversibility, and propagation to dependent decisions. Authorization is a separate hard constraint: high confidence does not give an agent permission to send money or publish confidential information.

## Commissioning through examples

Initially, operators may review many proposed classifications. Every accepted correction becomes a **case decision**, never an implicit permanent authorization. The system can then propose a scoped **policy decision** (for example, automatically accept a category of unambiguous source-header relationships) and test it against prior decisions.

A policy should record who authorized it, its applicable domain, evidence requirements, effective version, rollback procedure, and independent evaluations. Approval history should be reproducible rather than reconstructed by a model after the fact.

A human or authorized AI delegate can review a case within its role. Delegating evaluation does not necessarily delegate approval authority.

## Progressive disclosure

An operator's default view should show:

**What needs deciding? Why now? What could go wrong? What is recommended?**

A second level reveals alternatives, summary statistics, disagreements, and relevant prior decisions. An optional evidence view reveals raw source passages, full sensor readings, model outputs, and traces.

The aim is to make review comprehensible without hiding evidence from people who need it.

## Evaluation

Test three routing policies on held-out labeled cases: (a) review everything, (b) fixed confidence threshold, and (c) consequence-aware, progressively commissioned routing. Measure review minutes, consequential errors that escape review, missed escalations, decision latency, and policy drift. Evaluate explicitly under changes in source quality and reviewer workload.

### Research precedents

This is not a claim to have invented intelligent interruptions. [Horvitz et al. (1999)](https://www.microsoft.com/en-us/research/people/horvitz/publications/) studied attention-sensitive alerting. [Grandhi and Jones (2010)](https://digitalcommons.njit.edu/fac_pubs/6327/) analyzed interruption value and relational context. [Grandhi, Raban and Jones (2017)](https://digitalcommons.njit.edu/fac_pubs/9959/) found that information about an interruption changes how people judge whether it is worth responding.

The proposed contribution would be an evaluated mechanism for **commissioning and revising risk-aware human–AI decision policies with provenance**, not the idea of an interruption gate itself.

[Research series](./) · [Dissertation proposal](./dissertation-proposal)
