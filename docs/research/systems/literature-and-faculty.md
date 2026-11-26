---
title: Literature Review and NJIT Faculty Connections
description: A selective guide to research on source attribution, expert review and AI evaluation, with specific connections to work by five NJIT faculty members.
teaser: A repeated witness, a missing measurement and an interruption that could wait. Three everyday errors point to different research traditions for building AI people can check.
dateLabel: November 19, 2026
datePublished: "2026-11-19"
articleGenre: Research reading map
---

# Literature Review and NJIT Faculty Connections

When an AI system gets a claim wrong, where should an engineer look first? The collector might have dropped a reading. Three documents might repeat the same witness. A reviewer might have seen so many low-priority alerts that the consequential one passed unnoticed. Each failure calls for a different experiment.

I put this reading map together to design those experiments. It connects five researchers’ work at NJIT with scholarship on provenance, graph retrieval, human attention and AI evaluation. The selections and proposed connections are mine. Faculty participation or endorsement would require a separate conversation. The bibliography is preliminary and selective.

## The academic problem

The unit I want to study is a **decision to use a claim**. A sensor reports what it observed and what guarantee it achieved. Someone or something interprets the observation. A policy determines what evidence and authority a particular use requires. When a case needs review, it competes for a person’s time.

Provenance, graph retrieval, selective review and AI quality assessment each have substantial bodies of work. The open question for this proposal is whether commissioning policies gradually and routing cases by their consequences lets that combined workflow produce reliable results with less expert attention. The sources below supply candidate baselines, measures and failure cases.

## NJIT faculty connections

I read the five groups of work below as different ways to sharpen the design. They ask what the instrument actually measured, how people solved the task, how to weigh competing objectives, what the work costs and whether an interruption was worth it.

### Jamie Payton — adaptive sensing, query fidelity, evidence-based computing education

Jamie Payton was appointed dean of NJIT’s Ying Wu College of Computing in July 2024. Her work on mobile and pervasive systems suggests a precise question for a proposed sensor interface. If conditions changed halfway through a query, can the result tell the next system exactly what level of consistency it achieved?

- Payton, Julien, Roman and Rajamani studied how to report achieved consistency under changing network conditions in [Semantic Self-Assessment of Query Results in Dynamic Environments](https://doi.org/10.1145/1734229.1734231) (ACM TOSEM, 2010). This offers a concrete precedent for recording a guarantee alongside a result. Establishing the truth of an extracted claim or permission to publish it is a separate problem.
- Payton, Souvenir and Liu examined how a system could learn to select query strategies as conditions change in [An Architecture to Support Learning-Based Adaptation of Persistent Queries in Mobile Environments](https://researchwith.njit.edu/en/publications/an-architecture-to-support-learning-based-adaptation-of-persisten/) (2009). Human authorization of a new AI policy would still require its own evaluation.
- The [BRIDGES research summary](https://computing.njit.edu/computing-education-research-0) describes real-world data and visualization in data structures assignments, including work from 2016. The institutional page also describes inquiry into generating challenges from demonstrated proficiency. This connects the engineering question to my original teaching goal of adapting material to a learner.

Payton’s research also spans smart health and well-being, inclusive computing and evidence-based education. The narrow connection I draw here concerns what a sensor can report about its acquisition of data. Graph provenance, authority and expert deferral each need additional foundations. [Publications and research](https://cis.temple.edu/~payton/index.php?id=publications) · [NJIT Dean’s Message](https://computing.njit.edu/dean)

### Fadi P. Deek — process, cognition, tools and evidence-based evaluation

An AI-assisted software project can change both the tools people use and the method they follow. If the result improves, which change deserves credit? These works offer ways to separate them.

- Deek, Turoff and McHugh describe formalizing, planning, designing, translating, testing and delivering a solution in [A Common Model for Problem Solving and Program Development](https://digitalcommons.njit.edu/fac_pubs/16112/) (IEEE Transactions on Education, 1999). These stages give an observer places to look for decisions in a natural-language-directed project.
- Deek and colleagues evaluated the SOLVEIT workbench in [On the Evaluation of a Problem Solving and Program Development Environment](https://digitalcommons.njit.edu/fac_pubs/16646/) (1997). A working instrument lets researchers observe how people use a method.
- DeFranco-Tommarello and Deek compared combinations of tools and collaborative processes in [A Study of Collaborative Software Development Using Groupware Tools](https://digitalcommons.njit.edu/fac_pubs/19489/) (2005). The proposal could similarly vary the interface while keeping the case and review policy fixed.
- Burns, Klashner and Deek examined methodology tailoring in [An Empirical Evaluation of a Methodology-Tailoring Information System Development Model](https://digitalcommons.njit.edu/fac_pubs/12709/) (2008). It raises a question for agent-assisted tasks: which steps help, for which projects, under which conditions?

### Cheickna Sylla — multi-criteria decision support and constrained optimization

A reviewer has ten minutes left. One case is cheap to check. Another could expose a person to harm if an identity match is wrong. A confidence score alone leaves much of that decision out.

Sylla and Wen combine goal programming and analytic hierarchy methods in [A Conceptual Framework for Evaluation of Information Technology Investments](https://digitalcommons.njit.edu/fac_pubs/14771/) (International Journal of Technology Management, 2002). Their GAHP proposal accounts for tangible and intangible benefits and risk. That offers a way to frame inference cost, quality and expected loss together. The dissertation would have to specify hard limits, including reviewer capacity, rights, privacy and authority, before comparing permissible routes. Whether the resulting policy makes better decisions remains an empirical question.

### Michael A. Ehrlich — economic risk, innovation and commercialization

A persuasive demonstration can leave an expensive question unanswered. How many reports can an organization actually afford once it pays for the people who check them?

Parhankangas and Ehrlich studied how entrepreneurs present themselves to investors in [How Entrepreneurs Seduce Business Angels: An Impression Management Approach](https://doi.org/10.1016/j.jbusvent.2013.08.001) (Journal of Business Venturing, 2014). For my proposal, the link is the gap between a compelling claim of value and evidence sufficient to evaluate it. Ehrlich’s finance, entrepreneurship and innovation work motivates a deployment-cost model that includes specialist attention, computing expense, the consequences of error and the value of the artifact to its user.

### Quentin Jones — interruption management, context, HCI and progressive disclosure

What would a reviewer need to see before deciding an alert deserves attention? Grandhi and Jones found that more contextual information helped people judge the value of an interruption in [Knock, Knock! Who’s There? Putting the User in Control of Managing Interruptions](https://digitalcommons.njit.edu/fac_pubs/6913/) (International Journal of Human-Computer Studies, 2015).

I would turn that finding into an interface comparison. Give one reviewer raw model scores. Give another a short case explaining what changed and who could be affected, with the sources one click away. Measure whether they catch a consequential error, how long it takes and which evidence they inspect. Their study motivates that test. The AI review outcome still has to be measured.

## Broader foundational work

- **[W3C PROV-O](https://www.w3.org/TR/prov-o/)** (2013): entities, activities, agents and derivations. Use as a conceptual backbone for evidence and decisions.
- Edge et al., **[From Local to Global: A Graph RAG Approach to Query-Focused Summarization](https://arxiv.org/abs/2404.16130)** (2024): large-corpus graph summaries; a major baseline for graph-guided retrieval.
- Hevner et al., **[Design Science in Information Systems Research](https://aisel.aisnet.org/misq/vol28/iss1/6/)** (MIS Quarterly, 2004): evaluated design artifacts as a research method.
- Mozannar and Sontag, **[Consistent Estimators for Learning to Defer to an Expert](https://proceedings.mlr.press/v119/mozannar20b.html)** (ICML, 2020): expert-deferral learning; a baseline for routing, not a claim of novelty.
- Yi, Minot, and Lee, **[GRACE: Graph-Grounded Reflective Agent Copilot Engine for Expert-in-the-Loop Knowledge Expansion](https://aclanthology.org/2026.akbc-1.16/)** (2026): return-on-attention and verified knowledge expansion; an especially important contemporary comparator.
- Liu et al., **[G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment](https://aclanthology.org/2023.emnlp-main.153/)** (2023): model-based qualitative evaluation.
- Zheng et al., **[Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena](https://arxiv.org/abs/2306.05685)** (2023): useful and fallible model-based evaluation.
- David J. Anderson, *Kanban* (2010), and queueing/constraint theory: conceptual foundations for constrained work flow, throughput, and review queues.

## Recent epistemic and interface research (important prior art)

A graph can record that a witness asserted something, the source that quoted it and the period it concerns. Several recent papers examine those distinctions directly. They narrow the contribution a new project can plausibly claim.

- Vitali and Pasqual, [*Provenance-Enhanced Statements in Knowledge Graphs*](https://arxiv.org/abs/2606.15246) (June 2026 **preprint**): attributed propositions, competing epistemic stances and explicit limits on what can be treated as factual. This is especially close to our proposed difference between reported testimony and established observation.
- Kakatkar and Khatib, [*Epistemic Knowledge Graphs: An Approach for Grounding and Explaining AI Claims*](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7525242) (2026 **working paper**, not established here as peer reviewed): epistemic status, temporal validity, provenance, and explanation trees. Treat its conceptual overlap seriously before asserting novelty.
- [*Ontology-guided neuro-symbolic GraphRAG for grounded query answering*](https://link.springer.com/article/10.1007/s00521-026-12495-0) (2026): a cybersecurity evaluation of grounded graph materialization, source-traceable edges and citation precision. It provides concrete baselines for the planned knowledge layer.
- [*Entity Linking with Wikidata: A Systematic Literature Review*](https://doi.org/10.1145/3795134) (2026): an established research basis for entity matching and disambiguation, including challenges around temporal and qualified relations.
- [Wikidata's data model](https://www.wikidata.org/wiki/Wikidata:Data_model): identifiers, typed properties, statement qualifiers and references. External identifiers should enrich local entities; Wikipedia links should remain **navigation/context evidence**, not independently verified semantic relationships.
- [Intelligence Community Directive 203](https://www.intelligence.gov/mission/our-values/objectivity): source-quality assessment, uncertainty, alternative interpretations, change explanations and effective visual communication. The proposed briefing should be evaluated against explicit analytic tradecraft rather than military styling.

These papers move the research question toward how an organization authorizes policies, directs scarce reviewer time to consequential cases and checks the guarantees its sensors achieved. A systematic search must still establish what others have evaluated in combination. Experiments must then show whether that combination changes a decision or its cost.

## Preliminary novelty matrix

| Component | State of prior art | Research question left open |
| --- | --- | --- |
| Hybrid graph/vector RAG | Established | Do provenance and contradiction-preserving summaries reduce context without losing evidence? |
| Human-in-the-loop graph validation | Established, including GRACE | Can case decisions be transformed into scoped, evaluated automation policies that generalize safely? |
| Adaptive sensors/query fidelity | Established in pervasive computing | Can heterogeneous sensors express limitations and achieved guarantees in a shared contract that supports adaptive review? |
| Qualitative model QA plus deterministic checks | Established techniques | Does targeted evidence selection and bounded repair reduce review costs without raising escape rates? |
| Kanban/WIP/backpressure | Established | Does reviewer-capacity-aware routing improve total verified value under cost-of-error constraints? |
| Personalized artifacts | Active research and industry work | Can one qualified knowledge base produce varied outputs with verifiable citations and lower marginal review cost? |

## Required next phase

The next review should publish search terms and date ranges for ACM, IEEE Xplore, Scopus and Web of Science, along with screening decisions, inclusion and exclusion criteria, bibliography exports, a concept-by-study matrix and a reproducible quality appraisal. The first priority is 2024–2026 work on active expert deferral, agent policy learning, provenance-aware graphs and cost-aware generation.

For each candidate comparator I would record its evidence unit, who can authorize a change, what it asks a human to do, which baseline it beats and where it fails. An earlier system that already tests the same combination would change the dissertation question.

[Research hub](./) · [Preliminary proposal](./dissertation-proposal)
