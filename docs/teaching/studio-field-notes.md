---
title: "When Should an AI Coach Step Back?"
description: "Five choices for designing an AI-assisted assignment, drawn from classroom research, GitHub educators, and engineers who review agent-written code."
teaser: "A hint can solve the problem before a learner gets a turn. Five design choices help teachers decide when to offer help, when to wait, and what to ask for afterward."
articleGenre: "Teaching field notes"
imageCaption: "Two cards, one worked example, and a decision left to the learner."
---

# When Should an AI Coach Step Back?

<span id="what-shaped-the-ai-studio-starter"></span>

Before putting an AI coach in front of students, try asking it for the answer. See what happens if you ask again. The reply tells you how much of your assignment the learner still gets to do. I built that rehearsal into my teacher Studio after reading studies of beginners, accounts from other classrooms, and engineers’ descriptions of reviewing AI-assisted work. Here are five decisions those sources changed. [Download the teacher Studio](/downloads/AI-Studio-Starter.zip) · [Read the classroom feature](/teaching/when-ai-helps-write-the-code)

## Could a student recognize a problem after the coach stops pointing at it?

Majeed Kazemitabaar and colleagues paired Python exercises with manual changes in a controlled study of 69 novice programmers aged 10–17. The group with access to code generation completed more authoring tasks. The researchers found no statistically significant overall difference in retention scores a week later. In a separate randomized high-school math study, Hamsa Bastani and colleagues found that students using unrestricted GPT did better during practice and worse than controls on a subsequent unaided exam. Teacher-designed safeguards substantially reduced that downside. Together these studies helped me choose a second task that students could attempt on their own. [Programming study](https://arxiv.org/abs/2302.07427) · [Mathematics study](https://doi.org/10.1073/pnas.2422633122)

**Try it.** Model a question during practice. Give the student a fresh case and a moment to choose what to check. If they ask for a hint, make a note of where it helped.

## What happens when the learner gets the next move?

Robert Atkinson, Alexander Renkl, and Mary Margaret Merrill studied a familiar classroom move years before coding agents were available. Students worked through probability examples with more and more steps left for them to complete. In their experiments, pairing that fading support with a prompt to explain the underlying principle improved performance on new problems. That gave me a reason to build a second case into the Studio and to leave time for the student to initiate a check. Whether it carries across to my courses is an open question. [Worked examples and self-explanation](https://doi.org/10.1037/0022-0663.95.4.774)

Two programming studies measure different things teachers and engineering managers care about. Cui and colleagues combined three workplace experiments involving 4,867 developers. They estimated about 26% more completed tasks among users of a coding assistant. Shen and Tamkin randomly assigned 52 developers to work on two tasks with an unfamiliar Python library, with or without AI. On an immediate 27-point quiz without assistance, the assisted group averaged 4.15 points lower. All 26 assisted developers finished the exercise in time, compared with 22 of 26 in the control group. One measured completed work across companies. The other measured what developers could explain immediately after a new task. A course can look at both. [Workplace study](https://doi.org/10.1287/mnsc.2025.00535) · [Revised learning study](https://arxiv.org/html/2601.20245v3)

**Try it.** Invite students to name who first suggested the check. Give them another chance to start on the next example.

## Does the coach actually leave the decision open?

The CodeAid team deployed a programming assistant in a course of roughly 700 students for 12 weeks. It could explain a concept, suggest pseudocode, or annotate a problem in a student's code. Their analysis of approximately 8,000 uses informed the design of assistance a learner could steer. Harvard’s CS50 team documented the other side of that problem. Their AI tutor sometimes gave extensive code despite instructions intended to limit direct solutions. About 48% of 1.3 million conversations contained a code block. That count includes code examples and cannot tell us how many assignments the tutor solved. [CodeAid](https://arxiv.org/abs/2401.11314) · [Improving AI in CS50](https://cs.harvard.edu/malan/publications/fp0627-liu.pdf)

**Try it.** Play a stuck student. When a hint identifies the exact bug, change one line in the coach’s instructions and ask the same question again.

## Where should a student’s explanation live?

In a GitHub Education discussion, educators described why they valued giving feedback directly on a student’s changes. One had manually recreated missing feedback pull requests. In another thread, an instructor partway through a short course reported uneven access to Copilot. Their accounts pushed me to keep feedback next to the change and to give students a way to participate without a personal AI account. Carnegie Mellon’s Eberly Center offers an example in which students write a prompt, the instructor runs it, and students analyze the returned output. [Feedback discussion](https://github.com/orgs/community/discussions/196615) · [Access discussion](https://github.com/orgs/community/discussions/194848) · [Eberly Center guidance](https://www.cmu.edu/teaching/technology/aitools/index.html)

History instructor Jonathan S. Jones had students annotate an AI-generated essay on Frederick Douglass and discuss an edit they made. In a multilingual writing class, Rachel Toncelli and Ilka Kostka had students start with their own summaries and mark AI suggestions they would accept or reject. The authors obtained permission to share students’ work for their account. These examples give teachers a way to see the student’s intended meaning and what they chose to preserve. [History classroom account](https://www.historians.org/perspectives-article/students-critique-a-chatgpt-essay-a-classroom-experiment-september-2023/) · [Writing classroom account](https://files.eric.ed.gov/fulltext/EJ1488660.pdf)

**Try it.** Ask for one exchange that changed the work, an annotation beside the change, or a short explanation aloud. A student can do that in the regular private hand-in.

## What does a teammate need before taking over?

Software engineer Birgitta Böckeler describes two parts of working with a coding agent: instructions that guide a change and feedback that tests what actually happened. Simon Willison describes what he wants from someone handing over an AI-assisted change: a manageable patch, a review by the person submitting it, and evidence that it works. Ethan Mollick saw experienced executive MBA students draw on domain knowledge to specify and evaluate agent-built prototypes. His students brought years of experience; a beginning undergraduate needs opportunities to practice that judgment. These accounts describe how professionals work. I use them to choose which behaviors to practice with students. [Böckeler on coding agents](https://martinfowler.com/articles/harness-engineering.html) · [Willison on review and handoff](https://simonwillison.net/guides/agentic-engineering-patterns/anti-patterns/) · [Mollick on teaching delegation](https://www.oneusefulthing.org/p/management-as-ai-superpower)

**Try it.** Hand a teammate one result to reproduce or one claim to inspect. Let them choose where to start. Watch for the instruction you thought was obvious.

I’ve rehearsed this template with simulated learners. What I want to hear next is which questions my students raise on a fresh task. If you try it, the teacher ZIP includes the worked answers. Share only `LESSON.md` and `AGENTS.md` with your students. [Get the starter](/downloads/AI-Studio-Starter.zip)
