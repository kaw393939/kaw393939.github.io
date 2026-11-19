---
title: Literature Review and NJIT Faculty Connections
description: Selective research foundations for provenance-governed knowledge artifacts, adaptive sensors, and human-attention-aware orchestration.
---

# Literature Review and NJIT Faculty Connections

*Research reading map · November 19, 2026 · Preliminary, not systematic*

This bibliography links the developing research proposal to work on software engineering, sensing, decision models, HCI, business innovation, knowledge graphs, and human–AI evaluation. It does **not** imply these faculty members have agreed to supervise or endorse the proposed research. Research alignments are my interpretations, not claims about their preferences.

## The academic problem

The thesis is not that provenance, graph retrieval, selective review, or AI quality assessment were individually invented here. The proposed contribution is to evaluate an integrated **progressively commissioned, risk-sensitive knowledge production system** in which sensors expose observations and achieved guarantees, policies govern knowledge promotion, and a capacity-aware scheduler allocates human and machine review.

## NJIT faculty connections

### Jamie Payton — adaptive sensing, query fidelity, evidence-based computing education

**Dean, Ying Wu College of Computing** (appointed July 2024). Relevant research areas include mobile/pervasive systems, adaptive data acquisition, formal query fidelity, and computing education.

- Payton, Julien, Roman, and Rajamani, **[Semantic Self-Assessment of Query Results in Dynamic Environments](https://doi.org/10.1145/1734229.1734231)** (ACM TOSEM, 2010). The system assesses achievable query consistency under changing conditions and reports attained guarantees. *Narrower connection:* a system can report the **query consistency guarantee actually achieved**, rather than promising a guarantee it could not attain. This is about distributed-network query semantics, not the truth of an AI-extracted claim or authorization to promote it.
- Payton, Souvenir, and Liu, **[An Architecture to Support Learning-Based Adaptation of Persistent Queries in Mobile Environments](https://researchwith.njit.edu/en/publications/an-architecture-to-support-learning-based-adaptation-of-persisten/)** (2009). *Narrower connection:* learning-based choice among query strategies as conditions change. This is not evidence of human-supervised AI policy commissioning.
- Payton et al., **[BRIDGES: real-world data and visualization in data structures assignments](https://computing.njit.edu/computing-education-research-0)** (institutional research summary; original work 2016). The institutional page also describes current inquiry into AI-generated personalized challenge problems based on demonstrated proficiency. *Connection:* personalized knowledge artifacts and assessment-guided education.
- Payton, **[Publications and research](https://cis.temple.edu/~payton/index.php?id=publications)** and **[NJIT Dean's Message](https://computing.njit.edu/dean)**.

**Relevance boundary:** these are supporting precedents for adaptive acquisition and explicit achieved guarantees, not direct foundations for graph provenance, consequence-aware human deferral, or decision authority. Payton's stated contemporary research also emphasizes pervasive computing, smart health/well-being, inclusive computing, and evidence-based education. These publications may inform a sensor-result contract, but should not be presented as direct validation of the proposed human–AI governance system.

### Fadi P. Deek — process, cognition, tools and evidence-based evaluation

- Deek, Turoff, and McHugh, **[A Common Model for Problem Solving and Program Development](https://digitalcommons.njit.edu/fac_pubs/16112/)** (IEEE Transactions on Education, 1999): formalize, plan, design, translate, test, deliver. *Connection:* natural-language-directed development must still preserve process and verifiable stages.
- Deek et al., **[On the Evaluation of a Problem Solving and Program Development Environment](https://digitalcommons.njit.edu/fac_pubs/16646/)** (1997), describing SOLVEIT and an evaluated integrated workbench. *Connection:* test engineering methods by building software instruments, not only proposing them.
- DeFranco-Tommarello and Deek, **[A Study of Collaborative Software Development Using Groupware Tools](https://digitalcommons.njit.edu/fac_pubs/19489/)** (2005). The study compares technology and collaborative process combinations. *Connection:* separate the effects of methods, tools, and interaction in experiments.
- Burns, Klashner, and Deek, **[An Empirical Evaluation of a Methodology-Tailoring Information System Development Model](https://digitalcommons.njit.edu/fac_pubs/12709/)** (2008). *Connection:* not every traditional Agile process fits every agentic task. Method tailoring should be experimentally evaluated.

### Cheickna Sylla — multi-criteria decision support and constrained optimization

- Sylla and Wen, **[A Conceptual Framework for Evaluation of Information Technology Investments](https://digitalcommons.njit.edu/fac_pubs/14771/)** (International Journal of Technology Management, 2002). Their GAHP proposal combines goal programming and analytic hierarchy methods, taking tangible/intangible benefits and risk into account. *Connection:* review routing must optimize more than one objective (quality, expected loss, reviewer capacity, inference cost, rights and privacy). Review capacity and authority are hard constraints, not mere weights.

This is a foundation for defining the decision model, not a claim that our routing mechanism is already validated.

### Michael A. Ehrlich — economic risk, innovation and commercialization

- Parhankangas and Ehrlich, **[How Entrepreneurs Seduce Business Angels: An Impression Management Approach](https://doi.org/10.1016/j.jbusvent.2013.08.001)** (Journal of Business Venturing, 2014). *Connection:* claims of value should be substantiated, and founder narratives should not substitute for experimental evidence.
- Ehrlich's finance, entrepreneurship and innovation work offers an economic framing: how many qualified artifacts can be produced for a given combination of specialist attention, compute expense, and expected error consequences?

The study should include a real user-value and deployment-cost model, not rely on speculative market-size arguments.

### Quentin Jones — interruption management, context, HCI and progressive disclosure

- Grandhi and Jones, **[Knock, Knock! Who's There? Putting the User in Control of Managing Interruptions](https://digitalcommons.njit.edu/fac_pubs/6913/)** (International Journal of Human-Computer Studies, 2015). The research finds that additional contextual information helps people judge interruption value. *Connection:* Pit Stops need concise decision context, not full sensor logs.
- Research on interruptibility provides a basis for studying review burden, notification timing, and progressively disclosed evidence. A reviewer might perform better with a short decision recommendation plus optional details than with raw model confidence scores alone.

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

A substantial 2026 body of work already examines **claims as attributed propositions rather than uniform facts**. It changes what this dissertation should claim as novel.

- Vitali and Pasqual, [*Provenance-Enhanced Statements in Knowledge Graphs*](https://arxiv.org/abs/2606.15246) (June 2026 **preprint**): attributed propositions, competing epistemic stances and explicit limits on what can be treated as factual. This is especially close to our proposed difference between reported testimony and established observation.
- Kakatkar and Khatib, [*Epistemic Knowledge Graphs: An Approach for Grounding and Explaining AI Claims*](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7525242) (2026 **working paper**, not established here as peer reviewed): epistemic status, temporal validity, provenance, and explanation trees. Treat its conceptual overlap seriously before asserting novelty.
- [*Ontology-guided neuro-symbolic GraphRAG for grounded query answering*](https://link.springer.com/article/10.1007/s00521-026-12495-0) (2026): a cybersecurity evaluation of grounded graph materialization, source-traceable edges and citation precision. It provides concrete baselines for the planned knowledge layer.
- [*Entity Linking with Wikidata: A Systematic Literature Review*](https://doi.org/10.1145/3795134) (2026): an established research basis for entity matching and disambiguation, including challenges around temporal and qualified relations.
- [Wikidata's data model](https://www.wikidata.org/wiki/Wikidata:Data_model): identifiers, typed properties, statement qualifiers and references. External identifiers should enrich local entities; Wikipedia links should remain **navigation/context evidence**, not independently verified semantic relationships.
- [Intelligence Community Directive 203](https://www.intelligence.gov/mission/our-values/objectivity): source-quality assessment, uncertainty, alternative interpretations, change explanations and effective visual communication. The proposed briefing should be evaluated against explicit analytic tradecraft rather than military styling.

This literature suggests narrowing the claimed research contribution toward **progressive policy commissioning, consequence-sensitive review, sensor evidence contracts and allocation of scarce operator attention**. Even this combination requires a systematic prior-art search and comparative experiments.

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

This reading map is **selective**. A formal literature review should specify search databases (ACM, IEEE Xplore, Scopus, Web of Science), query strings, inclusion/exclusion dates, screening, a concept-by-study matrix, bibliography exports, and reproducible quality appraisal. It should especially look for 2024–2026 work on active expert deferral, agent policy learning, provenance-aware graphs, and cost-aware generation before claiming research novelty.

[Research hub](./) · [Preliminary proposal](./dissertation-proposal)
