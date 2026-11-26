---
title: What I Ask Students to Show When AI Helps Write the Code
description: Lessons from three NJIT courses and a teacher Studio starter you can use to design, rehearse, and check an AI-assisted assignment.
---

# What I Ask Students to Show When AI Helps Write the Code

*Keith Williams · November 25, 2026*

Buy a shirt. Refresh the page. Can you still find your order?

That’s a question another teacher could borrow from my introductory web development course at NJIT. The checkout is simulated. The design problem is real. A student can show me a beautiful confirmation screen, and I’ll still have a question about what happened to the order.

After 23 years of teaching, AI has me taking a closer look at my own assignments. I want students to use the tools they’ll encounter at work. I also want to hear the decisions they made while using them. This fall, revising projects across three courses brought a few lessons into focus for me.

## What I ask the AI coach to do

I call these activities Studios. Students try something, make a decision, build it with help, check what happened, and decide what to keep. A plain-text file called `AGENTS.md` tells the AI how to coach that particular activity. The most important line is often the one that tells it when to wait.

In my Server Studio, the student predicts how a request will reach a calculator on their own server before the agent explains the route. The agent can help deploy the app and run checks. Then the student tries the public calculator and says what they saw. Later, I want to see which question a student raises when the coach leaves that first move to them. [Walk through the Server Studio](https://github.com/kaw393939/373_hosting/blob/main/studio/lesson-01.md)

## Give the demo a second step

In my introductory course, students design a storefront around a plain T-shirt. One way to review it is to hand the keyboard to a classmate. Ask them to buy a shirt and find the order after a refresh. Let them try it without coaching. If they get stuck, where did they expect to click? That observation gives the designer a specific change to make and the classmate something to try again.

In my web applications course, the same idea works one level deeper. A team builds for a simulated customer. Suppose someone submits a service request and sees “Request received.” Restart the app and switch to the coordinator’s view. Can the person responsible find that request and act on it? Now the team has to account for both people in the transaction. Before anyone clicks, I can ask the student running the demo what they expect the coordinator to see and why.

## Give students a reason to say “we don’t know”

In my content management course, students build an AI tool that answers questions using a collection of documents. A useful review takes two questions. Pick one the documents can answer and ask the student to show the passage that supports it. Then ask for a detail the documents leave out.

If the tool supplies that missing detail anyway, we have something worth investigating. Which passage did the search return? What did the model add? A student who can locate the mistake and explain what the system should say has given me a much better look at their judgment. I want the assignment to reward that moment, even when the demo takes an unexpected turn.

## Cut the paperwork that repeats the lesson

I had to apply the same scrutiny to my side of the course. It’s easy to ask for a project plan, a progress update, and a portfolio reflection, then discover I’m reading the same decision three times. Every extra write-up takes time students could spend putting the fix back in someone’s hands.

If a classmate reports a confusing checkout in a GitHub issue, the student can link the change there and ask the classmate to retry it. In the portfolio, one sentence can point back to that exchange and name what the student learned. I’d much rather spend our next minute together asking, “What would make you change your mind about that fix?”

That’s part of how I’m preparing students for forward-deployed engineering, where engineers work directly with the people who need a problem solved. I want my students to feel comfortable handing a customer the keyboard, watching where they get stuck, and deciding together what to fix.

## Try it with an assignment you already teach

[Download the teacher Studio starter](/downloads/AI-Studio-Starter.zip) or [open the teacher coach directly on GitHub](https://github.com/kaw393939/kaw393939.github.io/blob/main/examples/ai-studio-starter/TEACHER-STUDIO.md). Attach or paste `TEACHER-STUDIO.md` and an existing assignment into a fresh AI chat. Type **“Help me turn this into a Studio.”** The coach asks which decision students should own. You can play a stuck student, revise a hint that gives too much away, and take the student handout and coaching instructions back to class.

For a first try, give the coach one question to ask during practice. Change one detail in the next example and let the student decide what to check. They can show one exchange that changed the work, mark the change on a draft, or explain it aloud. Which question would you most like to hear a student ask before the coach does? [Classroom and engineering research behind the starter](/teaching/studio-field-notes)

[Try the T-shirt storefront](https://keithwilliams.org/is117-demo-days/samples/campus-cotton/a.html) · [Meet the simulated customer](https://keithwilliams.org/is218-studio/projects/customer-simulator.html) · [See the two-question AI check](https://github.com/kaw393939/is373-rag/blob/main/docs/students/check.md)
