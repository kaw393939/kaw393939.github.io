---
title: "When Should an AI Workflow Stop for a Person?"
description: "Follow an email from a timestamp to a proposed financial decision to see how evidence, consequences, and authority change who should review an AI output."
teaser: "The same email can tell you when a message was sent, what someone reported, and what another person still needs to authorize. Each calls for a different decision."
articleGenre: "Architecture proposal"
dateLabel: "November 2026"
---

# When Should an AI Workflow Stop for a Person? {#the-race-track-and-the-pit-stop}

An email says the board approved a payment. A tool can check when the email was sent. A reader can verify that its author wrote those words. Before anyone moves money, someone still needs to establish what the board authorized and who can act on it.

I use two names in the Ordo design for what happens next. The **Race Track** carries routine work covered by an approved rule. A **Pit Stop** opens a decision for someone qualified to make it. What matters is being able to explain why a specific case took its route. [Read the Ordo pattern](https://github.com/kaw393939/ordo/blob/main/agentic-appliance/patterns/race-track-pit-stop.md)

## What changes with self-describing sensors

A checker that reads an email header should report which fields it inspected and which it could verify. A tool that proposes an identity match should report its evidence and uncertainty. Both need a version, an input and output format, known limits, and an expected cost.

Those observations can feed a recommendation. A separately maintained policy determines who can authorize the next action. Separating these responsibilities makes it possible to add a new checker without quietly granting it new powers.

## Consequences drive routing

| What the system wants to record or do | What a reviewer can check |
| --- | --- |
| Record the message timestamp | Header fields and the policy for routine indexing |
| Attribute the statement about board approval | Exact wording, named speaker, and the limits of the claim |
| Treat the transaction as authorized | Independent evidence of approval and the authority required to act |

A model could be equally confident about all three. The consequences of a mistake, the cost of undoing it, the quality of the evidence, and downstream dependencies all affect the review choice. Authority sets a hard boundary.

## Commissioning through examples

Suppose reviewers repeatedly accept matches between two unambiguous header fields. Their decisions supply examples for a possible rule. The next step is to write that rule narrowly, test it on held-out examples, and ask the responsible person to approve its scope. Historical agreement alone grants no standing permission.

Record the rule version, supporting evidence, decision maker, and conditions for rollback. A delegated AI reviewer might evaluate a match. Its permission to evaluate and its permission to authorize are separate settings.

## Progressive disclosure

I would put four questions at the top of a review request. **What decision do you need? Why now? What could go wrong? What do you recommend?** A reviewer can then open the alternatives and earlier decisions. The full source passages, measurements, and model outputs should remain a click away.

## Evaluation

Give three policies the same held-out cases. One sends everything to review. One uses a fixed confidence threshold. The third considers consequence and uses rules commissioned from earlier examples. Measure expert minutes, missed required escalations, time to decision, and consequential errors that escape. Repeat the comparison after source quality or available review time changes.

### Research precedents

Earlier research on attention-sensitive alerts and interruption context offers credible comparisons for the reviewer’s experience. My open question is whether a team can commission *and revise* decision rules while keeping their evidence and authority visible. The design needs empirical results before anyone can claim that it saves time or reduces errors. [Horvitz and colleagues](https://www.microsoft.com/en-us/research/people/horvitz/publications/) · [Grandhi and Jones](https://digitalcommons.njit.edu/fac_pubs/6913/)

[Research series](./) · [Dissertation proposal](./dissertation-proposal)
