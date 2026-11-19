---
title: AI Can Read, Write and Decide — But When Is Information Good Enough?
description: Epistemology, pragmatism and decision theory as foundations for purpose-dependent evaluation in AI systems.
---

# AI can read, write and decide. When is information good enough?

*Research position · November 2026*

Modern AI makes it possible to read large collections, write many forms of explanation, and recommend actions at extraordinary speed. That abundance changes the economic problem. We can produce more information than a person can verify line by line.

**Not all information must be certain to be useful. But every use needs an appropriate account of its limitations.**

I want to explore a computational approach to that problem: **purpose-dependent epistemic governance**. The idea is to distinguish what a source says, what a system inferred, how the claim was checked, and which uses or actions are justified under particular consequences and permissions.

This phrase is a working research label, not a claim to have founded a new philosophical theory.

## Different claims need different standards

Imagine an AI that encounters the sentence “A witness reported seeing an unidentified aircraft.”

It may be able to verify that the sentence accurately summarizes a particular transcript. That **doesn't** verify the underlying object's nature. For a historical case study, an attributed statement may be useful. For an operational airspace warning, independent measurement and additional review may be required.

The system's duties are not to declare itself omniscient. They are to preserve attribution, assess available evidence, explain uncertainty, and avoid silently extending a narrow claim into a broader conclusion.

I would separate **five dimensions**:

| Dimension | Question |
| --- | --- |
| Content fidelity | Did we reproduce or summarize what the original source actually says? |
| Source and process reliability | How was the information produced, and what do we know about the method's error modes? |
| Claim support | Does available evidence justify the *specific* proposition, including dependence and contradictions? |
| Fitness for purpose | Is this level of justification sufficient for this task and its consequences? |
| Authority | Who or what has permission to publish, promote, recommend, or act? |

Accuracy and authority are not interchangeable. A source can be well preserved but contain inaccurate testimony. A high-confidence model cannot grant itself permission.

## Philosophical foundations

**John Dewey — inquiry and warranted assertion.** Dewey's philosophy treats inquiry as an active process of moving from an uncertain situation toward a judgment that can guide further inquiry. That connects to versioned claims that remain open to revision, and to education as practicing inquiry. See the [Stanford Encyclopedia of Philosophy: John Dewey](https://plato.stanford.edu/entries/dewey/).

**Charles Sanders Peirce — abduction and fallibilism.** Abduction generates plausible hypotheses for investigation. It does not establish that those hypotheses are true. In software, models could generate explanations while a separate system tests predictions and evidence. See [Peirce on Abduction](https://plato.stanford.edu/entries/abduction/peirce.html).

**Alvin Goldman — process reliabilism.** The credibility of an outcome depends partly on how it was produced. Sensor calibration, deterministic tests, extraction versions and independent checks are therefore part of the epistemic account, not just performance engineering. See [Reliabilist Epistemology](https://plato.stanford.edu/entries/reliabilism/).

**Helen Longino — critical scrutiny and community standards.** Robust knowledge practices make meaningful disagreement, alternative hypotheses and correction possible. A human review step must support actual challenge, not a perfunctory Approve button. See [Scientific Objectivity](https://plato.stanford.edu/entries/scientific-objectivity/).

**Miranda Fricker — testimonial injustice.** A person's identity or social standing should not determine a universal credibility score. Assess the specific claim and available evidence, and examine whether credibility judgments reproduce unfair bias. See [Epistemic Injustice](https://plato.stanford.edu/entries/epistemic-injustice/).

These philosophers disagree on significant issues. They are **interpretive foundations**, not five endorsements of one computational model.

## An epistemic use contract

For each consequential assertion or decision, an inspectable record could contain:

- the exact claim, speaker and original source span;
- source lineage, extraction and revision history;
- corroborating and contradicting evidence;
- source identity and disambiguation state;
- what was actually tested versus merely inferred;
- permitted presentation or action contexts;
- next evidence worth acquiring and the reviewer/authorization policy.

The contract should support multiple meaningful states—*attributed*, *independently corroborated*, *disputed*, *insufficient evidence*, *not evaluated*—rather than collapsing everything into one confidence number.

## Verification is a resource-allocation problem

When the consequence of an error is small, a transparent uncertainty label may be sufficient. When an action is consequential, additional retrieval, a deterministic check, another model, or an authorized human reviewer may be justified.

This is related to **value of information**, selective prediction, learning to defer, and cost-sensitive decision theory. It must be tested against those established methods. The goal is not to eliminate uncertainty, but to use verification resources in proportion to their expected value while respecting hard authority boundaries.

A model saying “I'm 95% certain” is neither a measured calibration result nor a permission decision.

## Returning to the learner

The same infrastructure could make educational artifacts investigable. A student receiving an explanation could follow a claim to the original passage, compare competing accounts, explore the graph and ask what would change the assessment. Different learners can receive different presentations without silently changing the underlying evidence.

That educational benefit is a **hypothesis**, not an established outcome. We would test transfer of evidence evaluation, source attribution and cognitive load against ordinary AI-generated lessons.

## What the dissertation should contribute

My proposed contribution is not the philosophical observation that knowledge is uncertain or that practical stakes matter. It is a **specified, evaluated mechanism** that decides when information is sufficiently justified *for a use*, selects additional checks or review, and leaves a reproducible evidence trail.

If this produces no improvement over established baselines, the theory and implementation must change.

[Origin of the research](./research-origins) · [Dissertation proposal](./dissertation-proposal) · [Literature map](./literature-and-faculty)
