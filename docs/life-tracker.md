---
title: Life Tracker · How I follow through with AI
description: Use a private GitHub issue to give an AI-assisted task an owner, a next action, and a clear finish. Includes a worked example and a downloadable template.
teaser: An assistant can draft a booking request in seconds. Knowing whether you have a room takes a different check. Here’s the small system I use to follow through.
layout: doc
---

# Life Tracker

Suppose Maya is organizing a workshop. An assistant has found a room and drafted the request. Maya has an invitation ready to send. Can she put the room number on it? This booking is fictional, but it illustrates a problem I encounter whenever an assistant can draft something faster than I can verify the result.

## A simple example {#example}

| Booking stage | What Maya records in the issue |
| --- | --- |
| Research | The venue lists a room with enough seats. Maya checks the availability and keeps a reference to the listing. |
| Draft and decision | The assistant drafts a request with the room, date, and time. Maya checks the details and approves the request. |
| In progress | Maya sends the approved request. The sent message establishes that the venue has been asked. |
| Waiting | Maya owns the follow-up. She records when she will check for a reply and leaves the issue open. |
| Closed | The venue confirms the room, date, and time. Maya compares the reply with the request, records where to find it, and puts the room on the invitation. |

I call this way of following through *Life Tracker*. A private GitHub issue gives the next person a place to find the owner, the next action, and the evidence needed to close the task. Try the same fields with one piece of your own work.

<div class="guide-template">

**Your first issue**

- Workstream
- Verified current state, source reference, and time checked
- Next action, owner, and dependencies
- Confirmed deadline, with its source and time zone
- Proposed follow-up, if needed
- Completion criteria

</div>

[Download the checklist and issue template](/life-tracker-starter.txt)

<nav class="guide-contents" aria-label="On this page">
  <ul>
    <li><a href="#daily-workflow">How I use it</a></li>
    <li><a href="#set-up">Set up your own</a></li>
    <li><a href="#working-with-ai">How I work with AI</a></li>
    <li><a href="#keep-it-private">Keep the work private</a></li>
  </ul>
</nav>

## How I use it {#daily-workflow}

I open an issue when a conversation produces a question, a decision, or a result to verify. I search open and closed issues first. If someone has already started the work, one update there can spare us a duplicate task.

Before I assign the next action, I check the most recent reply or source record. Then I write down five things.

- **Current state.** What did I verify, and when?
- **Next action.** Who owns it? What can they actually do now?
- **Source.** Where can an authorized person check the facts?
- **Timing.** If there’s a deadline, what source confirms the date, time, and time zone? When should I check back?
- **Completion criteria.** What would someone have to see to call the work done?

A date I choose for checking back goes in its own field. Adding it to an issue doesn’t schedule a reminder, so I set one separately if I need it. At review time, I check what needs a decision, what is due, and what is waiting on someone else. If I drop a task, I record that decision. If I close it as complete, I link or describe the result.

## Set up your own {#set-up}

1. **Choose one small area of work.** For a first try, use an ordinary task you can safely describe. You can run the whole process on GitHub’s website.
2. **Create a private repository.** Choose **New repository**, set visibility to **Private**, add a README, and leave Issues enabled. Check visibility before you add material. Keep GitHub Pages off for this workspace.
3. **Set the scope.** In the README, name the work you track, who can read it, and which records belong in their original systems. A short summary and an authorized source reference are often enough.
4. **Give each open issue one status.** I use `status:needs-research`, `status:needs-draft`, `status:needs-decision`, `status:in-progress`, and `status:waiting`. I add `workstream:project` when I need to group related work, and `priority:time-sensitive` when a concrete deadline warrants it.
5. **Take one task through the full cycle.** Use an action as the title, assign an owner, and fill in the template. Verify the outcome and close the issue. Adjust the fields after you see what was useful.

## How I work with AI {#working-with-ai}

I tell the assistant which outcome I need, which sources it may use, and whether I want research, a draft, or an action. I can give it read-only access for research. If I later want it to change an issue or send a message, I specify what to change or whom to contact and what commitments it may make.

A request I use as a starting point is:

> Review this task using the sources I have authorized. Tell me what you verified, what you still need, and who owns the next step. Draft any suggested message for my review. Do not send messages or change other systems.

After an action, I check the resulting issue, message, or source record. If the assistant cannot see a source, it can identify what is missing. Anyone with authorized access should be able to pick up the task from the issue, including a person working without AI.

## Keep the work private {#keep-it-private}

A private repository is not automatically an approved home for workplace, student, client, or sensitive personal records. Check the rules of the organization that owns the material. Keep original records in the appropriate source system and limit access to the collaborators and apps that need it. Connect accounts through the supported sign-in flow. Never paste passwords or access tokens into an issue.

If reference copies are permitted, record the original source, date, and any redactions. Mark missing material explicitly. To show the method publicly, create a fictional example in a separate workspace. Issue titles, comments, filenames, screenshots, and Git history can all contain information someone never intended to share.

[Download the starter](/life-tracker-starter.txt) · [Explore the other projects](/#projects)
