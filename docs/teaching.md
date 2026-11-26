---
title: Teaching AI
description: Keith Williams shares his Studio method at NJIT, a guide for faculty and engineering mentors designing AI-assisted assignments people can test and explain.
teaser: In my NJIT Studios, I decide what the AI coach can handle and which decision a learner needs to own. The distinction matters to anyone who mentors engineers.
---

# Teaching AI

I teach web development, web applications, and content management at NJIT, and I direct the undergraduate Enterprise AI program. Across those settings, I design assignments around a handoff. A classmate tries to buy a T-shirt. A reviewer asks what an automated check actually checked. Watching the person who built the work respond tells me something a finished screen cannot.

This page is for faculty designing AI-assisted assignments and engineers mentoring someone new. Each example has a decision to practice, an artifact to inspect, and a way to tell whether the decision changed the outcome.

## The Tests Passed. Who Won the Game?

My web applications starter passed twelve automated checks and still couldn’t settle a round of rock-paper-scissors. That was deliberate. The part I wanted the student to explain was what happens when the computer picks paper and the player picks rock. The feature follows that question through three courses. [Read the classroom story](/teaching/when-ai-helps-write-the-code)

![A learner holds a pencil over a blank card beside a worked example.](/images/teaching/studio-coach-pause.jpg)

## Build something you can explain

I call these activities *Studios*. Students try a starter, choose one change, build it with help, and check what actually happened. A plain-text file called `AGENTS.md` tells the AI assistant when to help, what to ask, and when to wait.

| Studio | A decision the student makes |
| --- | --- |
| [Brand Studio · Intro to Website Development](https://github.com/kaw393939/is117-brand-studio) | Choose the audience for a plain white T-shirt. Point to one design or wording choice that fits that buyer. |
| [Rock, Paper, Scissors · Building Web Applications](https://github.com/kaw393939/is218-rps-starter) | Predict the outcome of a round from the player’s point of view. Check a test, then play it yourself. |
| [Server Studio · Content Management Systems](https://github.com/kaw393939/373_hosting) | Predict how a request will reach a calculator running on your server. Open the public address and see what happens. |

For a project that works with documents, try the <a href="/knowledge-lab/">Knowledge Lab</a>. Give the system a question it can answer and ask for the passage that supports its answer. Then ask for a detail the collection leaves out.

## Try a Studio in your course

Pick an assignment you already teach and a decision you want students to make. Rehearse the assignment once, playing a student who is stuck. Does the coach give a helpful hint, or does it make the decision for you?

The download includes a worked example, a student handout, and the coach’s instructions. **The teacher copy contains answers. Share only `LESSON.md` and `AGENTS.md` with students.** [Download the teacher Studio starter](/downloads/AI-Studio-Starter.zip) · [Read the research behind the starter](/teaching/studio-field-notes)

## Learning beyond one assignment

The follow-up I care about is what happens on a fresh task, after the coach stops prompting. I describe the comparison I’d like to study in my [research agenda](/research). The [AI career field guide](/ai-careers) connects classroom practice to responsibilities employers assign to engineers.

If you want to try the Studio in another discipline or a team onboarding exercise, send me the task, the decision you want someone to own, and what you could observe afterward. [Contact me through NJIT](https://people.njit.edu/profile/kwilliam)

I also publish two tools for colleagues building their own materials. The Educational Design System provides reusable layouts for course sites. Everyday AI CLI is an alpha command-line toolkit for repeatable AI tasks. [Explore the Educational Design System](https://kaw393939.github.io/educational-design-system/) · [See Everyday AI CLI](https://github.com/kaw393939/everyday-ai-cli)
