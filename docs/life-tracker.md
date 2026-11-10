---
title: Life Tracker · How I use AI to follow through
description: How Keith Williams uses a private GitHub work queue with an AI assistant, and how to set up a small version of your own.
layout: doc
---

<div class="life-guide">

<p class="eyebrow">A PRACTICAL GUIDE / HUMAN + AI</p>

# Life Tracker

<p class="guide-deck">A place to keep the next step clear.</p>

I use Life Tracker to bring work that is scattered across conversations and documents into one manageable queue. Each task has a next action, someone responsible for it, and a clear way to tell when it is finished.

The foundation is a **private GitHub repository**, with GitHub Issues for the work queue and selected documents organized alongside it. I work with an AI assistant to research, organize, and prepare the next step. I make the decisions and authorize actions that need my approval.

This is a description of my working method, not a public app or a copy of my private records. The example below is fictional.

<nav class="guide-contents" aria-label="On this page">
<strong>In this guide</strong>
<a href="#daily-workflow">How I use it</a>
<a href="#set-up">Set up your own</a>
<a href="#working-with-ai">Work with AI</a>
<a href="#example">See an example</a>
<a href="#keep-it-private">Keep it private</a>
</nav>

## How I use it {#daily-workflow}

### 1. Capture a real next step

I look for something that needs action: a question to answer, a decision to make, or a result to check. I search existing open and closed issues first so the same task does not become several competing records.

### 2. Check what is true now

Before acting, I check the relevant source and its latest replies or updates. An old request may already have been answered. I keep verified facts separate from guesses, proposed actions, and completed work.

### 3. Write a small, useful task

The issue should answer a few questions without becoming an archive of the whole conversation:

- **Current state:** What has actually been checked, and when?
- **Next action and owner:** What happens next, and who does it?
- **Source:** Where can the authorized person verify the facts?
- **Timing:** Is there a confirmed deadline, a proposed follow-up date, or no date needed?
- **Done means:** What result must be checked before closing?

A follow-up target is not the same thing as an official deadline. If a deadline matters, I record its source, date, time, and time zone.

### 4. Act, then check the result

Research, drafting, approval, and execution are different stages. A draft has not been sent. A sent message does not mean the underlying task is finished. After an authorized action, I verify what happened and update the issue to match.

### 5. Review and close the loop

I review time-sensitive work, decisions I need to make, and tasks waiting on someone else. I close a task when its completion criteria are met. If I decide to drop it, I record that choice rather than calling it completed.

The tracker itself does not schedule checks or send messages. Dates and labels help organize a review; reminders or automations need to be set up separately.

## Set up your own {#set-up}

Start with one small area of work and a few ordinary, low-risk tasks. You can do all of this in GitHub's website. A terminal, database, and custom app are not required.

### 1. Create a private repository

In GitHub, choose **New repository**, give it a name, select **Private**, and add a README. Check the repository's visibility before adding information. Keep Issues enabled. Do not publish the repository through GitHub Pages.

Use the README to explain what you track, where the original records live, and how you review the queue. You do not need access to my private repository to build your own version.

### 2. Decide what belongs there

Write down the kinds of information you will allow, what must stay in its original system, and who can have access. Start with brief task summaries and source references. Check workplace, school, and client requirements before copying their information into another service.

### 3. Create a few labels

Under **Issues → Labels**, create labels that describe the next stage. Use exactly one status label on each open issue. This small set is enough to begin:

- **status:needs-research:** Facts still need checking.
- **status:needs-draft:** The facts are ready for a proposed response.
- **status:needs-decision:** A choice or approval is needed.
- **status:in-progress:** An authorized action is underway.
- **status:waiting:** Someone else owns the next step.

Add a label such as **workstream:project** for the area of work. Use **priority:time-sensitive** only when a concrete deadline warrants it. You can split “waiting” into more specific groups later. Close finished issues and remove active status labels.

### 4. Make your first issue

Use a short, action-focused title, assign an owner, and fill in the fields below. You can paste this structure into each issue or turn it into a GitHub issue template once it proves useful.

<div class="guide-template">

**Task starter**

- Workstream:
- Verified current state:
- Last checked, with time zone:
- Source reference:
- Next action:
- Owner and dependencies:
- Confirmed deadline, if any, with source:
- Proposed follow-up target, or why none is needed:
- Completion criteria:

[Download the starter checklist and issue template](/life-tracker-starter.txt)

</div>

### 5. Try one complete cycle

Take one task from research through completion. Check that the next action is clear, do the authorized work, verify the result, and close the issue. Adjust the template before adding more tasks. Set a review habit you can maintain; adding a date to an issue alone will not remind you.

## How I work with AI {#working-with-ai}

I give the assistant a specific outcome and the sources it may use. It can help check the current state, find missing information, organize documents within the allowed scope, draft a response, and update the queue when authorized.

**My role is to set the goal, judge the result, and make consequential decisions.** The assistant should tell me what it verified, what remains uncertain, and what needs my decision. I do not treat a confident answer as evidence that an action happened.

For your own setup:

1. Choose an assistant that can work with the tools you use. Connect only the accounts and repository needed for the task, using the service's supported sign-in flow. Never paste passwords or access tokens into issues.
2. Start with read-only research or a draft. If you want the assistant to create or update issues, give it the appropriate repository access and a clear request. Connecting an account does not grant blanket permission to act.
3. Be explicit about boundaries: “Review this task and draft a reply. Do not send it.” If you later want it sent, authorize the recipient, purpose, and any important commitments.
4. Ask for verification after changes. Review the resulting issue or source record, not just the assistant's summary. If access is missing, provide a safe summary or use an approved connection rather than assuming the assistant can see everything.

<div class="guide-callout">

**A useful starting request**

“Review this task using the sources I have authorized. Tell me what is verified, what is missing, and the next action. Draft any suggested message for my review. Do not send messages or change other systems.”

</div>

You can also use the same workflow without AI. The issue record should remain understandable to a person picking it up later.

## A simple example {#example}

Suppose you are arranging a small workshop. This is an invented example, with no real names, dates, or private records.

1. **Needs research:** Check the room requirements and latest availability.
2. **Needs draft:** Prepare a short booking request with the verified details.
3. **Needs decision:** The organizer reviews the room choice and request.
4. **In progress:** Send the request once authorized, then verify it was sent.
5. **Waiting:** Record that the venue owes the next response and choose a follow-up target.
6. **Closed:** Check the confirmed room, date, and time against the task's completion criteria.

If the room has not been confirmed, sending the request is progress, not completion.

## Keep the work private {#keep-it-private}

A private repository limits visibility, but it is not automatically an approved home for workplace, student, client, or sensitive personal records. Keep only the information you are permitted to store there and limit collaborators and connected-app access.

Original records stay in their proper source systems. If reference copies are allowed, record where each came from, its date, and whether it was redacted. Keep a separate list of missing or unverified material. Do not call a document collection complete until you have checked it.

Use made-up examples when explaining your setup publicly. Check issue titles, comments, filenames, screenshots, and commit history as well as document contents. Never turn a private working repository public just to share the method.

<div class="guide-end">

**Start small. Keep the next action clear. Check the outcome.**

[Back to selected projects](/#projects)

</div>

</div>
