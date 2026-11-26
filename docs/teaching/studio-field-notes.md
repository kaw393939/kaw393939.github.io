---
title: What shaped the AI Studio starter
description: Classroom accounts, studies of novice learners, GitHub Education discussions, and engineering practice behind Keith Williams’s reusable teacher Studio.
---

# What shaped the AI Studio starter

*Keith Williams · November 2026*

I wanted a teacher to be able to bring one assignment, try the AI coach as a student, and leave with something they could use in the next class. These sources changed what I put in the starter. [Download the teacher Studio](/downloads/AI-Studio-Starter.zip) · [Read the classroom article](/teaching/when-ai-helps-write-the-code)

## Could a student recognize a problem after the coach stops pointing at it?

Majeed Kazemitabaar and colleagues paired Python exercises with manual changes in a controlled study of 69 novice programmers aged 10–17. The group with access to code generation completed more authoring tasks. The researchers found no statistically significant overall difference in retention scores a week later. In a separate randomized high-school math study, Hamsa Bastani and colleagues found that students using unrestricted GPT did better during practice and worse than controls on a subsequent unaided exam. Teacher-designed safeguards substantially reduced that downside. The tasks, learners, and tools differed. I took a design question from both studies: what can I ask the learner to do when the help changes? [Programming study](https://arxiv.org/abs/2302.07427) · [Mathematics study](https://doi.org/10.1073/pnas.2422633122)

**In the starter:** the teacher picks a question to model in practice and a fresh case where the student can decide what to check. A student who needs a hint can still get one. The teacher can see when it entered the conversation.

## Does the coach actually leave the decision open?

The CodeAid team deployed a programming assistant in a course of roughly 700 students for 12 weeks. It could explain a concept, suggest pseudocode, or annotate a problem in a student's code. Their analysis of approximately 8,000 uses informed the design of assistance a learner could steer. Harvard’s CS50 team documented the other side of that problem. Their AI tutor sometimes gave extensive code despite instructions intended to limit direct solutions. About 48% of 1.3 million conversations contained a code block. That count includes code examples and cannot tell us how many assignments the tutor solved. [CodeAid](https://arxiv.org/abs/2401.11314) · [Improving AI in CS50](https://cs.harvard.edu/malan/publications/fp0627-liu.pdf)

**In the starter:** the teacher plays a stuck student, inspects the coach’s actual reply, changes one instruction, and can retry the same exchange. A hint that identifies the exact bug can give away the decision just as easily as a complete answer.

## Where should a student’s explanation live?

In a GitHub Education discussion, educators described why they valued giving feedback directly on a student’s changes. One had manually recreated missing feedback pull requests. In another thread, an instructor partway through a short course reported uneven access to Copilot. Those are firsthand accounts of classroom friction. They also suggest two useful choices: keep feedback close to the work, and give students another way to do the same activity when the tool is unavailable. Carnegie Mellon’s Eberly Center offers an example in which students write a prompt, the instructor runs it, and students analyze the returned output. [Feedback discussion](https://github.com/orgs/community/discussions/196615) · [Access discussion](https://github.com/orgs/community/discussions/194848) · [Eberly Center guidance](https://www.cmu.edu/teaching/technology/aitools/index.html)

History instructor Jonathan S. Jones had students annotate an AI-generated essay on Frederick Douglass and discuss an edit they made. In a multilingual writing class, Rachel Toncelli and Ilka Kostka had students start with their own summaries and mark AI suggestions they would accept or reject. The authors obtained permission to share students’ work for their account. These examples give teachers a way to see the student’s intended meaning and what they chose to preserve. [History classroom account](https://www.historians.org/perspectives-article/students-critique-a-chatgpt-essay-a-classroom-experiment-september-2023/) · [Writing classroom account](https://files.eric.ed.gov/fulltext/EJ1488660.pdf)

**In the starter:** students can choose one exchange and show what it changed. They can also annotate the original work or explain the choice aloud. The normal course hand-in is enough. A chat history contains unrelated material and can obscure the one question worth discussing.

## What does a teammate need before taking over?

Software engineer Birgitta Böckeler describes two parts of working with a coding agent: instructions that guide a change and feedback that tests what actually happened. Simon Willison describes what he wants from someone handing over an AI-assisted change: a manageable patch, a review by the person submitting it, and evidence that it works. Ethan Mollick saw experienced executive MBA students draw on domain knowledge to specify and evaluate agent-built prototypes. His students brought years of experience; a beginning undergraduate needs opportunities to practice that judgment. These accounts describe how professionals work. I use them to choose which behaviors to practice with students. [Böckeler on coding agents](https://martinfowler.com/articles/harness-engineering.html) · [Willison on review and handoff](https://simonwillison.net/guides/agentic-engineering-patterns/anti-patterns/) · [Mollick on teaching delegation](https://www.oneusefulthing.org/p/management-as-ai-superpower)

**In the starter:** the next person gets one result they can reproduce or one claim they can inspect. Asking someone else to try it is a useful way to discover what your explanation left out.

I’ve rehearsed the template with simulated learners. The open question for my classes is what students will notice on a fresh task, particularly when the coach waits for them to raise the first question.
