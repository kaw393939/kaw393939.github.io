export const navItems = [
  { id: 'work', label: 'Work', href: '/work' },
  { id: 'research', label: 'Research', href: '/research/systems/' },
  { id: 'teaching', label: 'Teaching', href: '/teaching' },
  { id: 'ai-careers', label: 'AI Careers', href: '/ai-careers' },
  { id: 'about', label: 'About', href: '/about' }
]
export const focusAreas = [
  {
    number: '01', icon: 'book', title: 'Teaching through building',
    text: 'I design courses and learning tools where students create something, test it, explain decisions, and develop judgment they can carry into new work.',
    tag: 'Education · curriculum · AI-assisted learning', href: '/teaching', linkLabel: 'Explore my teaching'
  },
  {
    number: '02', icon: 'judgment', title: 'Engineering for evidence',
    text: 'I build systems that make AI-generated work inspectable: source-aware claims, measured tests, adaptive review, and explanations people can challenge.',
    tag: 'Software · epistemology · human–AI systems', href: '/research/systems/', linkLabel: 'Read the research'
  }
]
export const approachSteps = [
  {
    number: '01',
    title: 'Start with the real problem.',
    text: 'Who needs the result, what should it accomplish, and what evidence would make it useful?'
  },
  {
    number: '02',
    title: 'Build something testable.',
    text: 'Turn the intent into specifications, working software, measurable constraints, and source-linked artifacts.'
  },
  {
    number: '03',
    title: 'Question the answer.',
    text: 'Separate measurement, interpretation, and authorization. Follow claims back to original sources.'
  },
  {
    number: '04',
    title: 'Improve with evidence.',
    text: 'Compare alternatives, learn from errors, and adopt new automation policies only when they are evaluated.'
  }
]

// Proposed research questions, not assertions of completed empirical studies.
export const researchQuestions = [
  {
    number: '01', title: 'When is evidence sufficient?',
    text: 'Can AI match the type and cost of verification to a claim’s intended use and the consequences of being wrong?'
  },
  {
    number: '02', title: 'Who should review the output?',
    text: 'How can deterministic checks, models and people share evaluation work without confusing confidence with authority?'
  },
  {
    number: '03', title: 'Can we navigate the reasoning?',
    text: 'Can briefings, page-link graphs and original-source citations help people investigate an assessment?'
  },
  {
    number: '04', title: 'What do students actually learn?',
    text: 'Do personalized evidence-explorable lessons improve independent understanding and source evaluation?'
  }
]

// Case summaries are linked to visible implementations or openly marked design documents.
export const projects = [
  {
    id: 'metavis',
    number: '01',
    title: 'MetaVis',
    category: 'Swift / Metal · Experimental media engineering',
    status: 'Research code and tests · December 2025',
    summary: 'A native media-processing experiment combining deterministic measurements with optional AI qualitative evaluation.',
    details: [
      { label: 'Built', text: 'Swift/Metal rendering, sensor output, media QC, golden tests, optional Gemini QA, and performance measurement.' },
      { label: 'Why', text: 'Explore what can be verified by code, what requires judgment, and how evaluation results can be traced and challenged.' }
    ],
    note: 'Experimental research code; some real-media fixtures and optional QA paths are not independently reproducible from the repository.',
    links: [
      { label: 'Technical case study', href: '/research/systems/metavis-evidence-and-evaluation' },
      { label: 'Inspect source', href: 'https://github.com/kaw393939/metavis-demo-projects' }
    ]
  },
  {
    id: 'educational-design-system',
    number: '02',
    title: 'Educational Design System',
    category: 'Learning systems · publishing',
    status: 'Published phase-one foundation',
    summary: 'Reusable educational interfaces, course materials, typed content recipes, and evidence-linked publishing workflows.',
    details: [
      { label: 'Built', text: 'Design tokens, shared layouts, teaching primitives, page recipes, and version-selected static release builds.' },
      { label: 'Why', text: 'Make personalized teaching materials consistent, reviewable, and easier to maintain.' }
    ],
    note: 'Phase-one baseline is available. The larger authoring and observability roadmap is incomplete.',
    links: [
      { label: 'Explore the site', href: 'https://kaw393939.github.io/educational-design-system/' },
      { label: 'Inspect source', href: 'https://github.com/kaw393939/educational-design-system' }
    ]
  },
  {
    id: 'is117-brand-studio',
    number: '03',
    title: 'IS117 Brand Studio',
    category: 'AI-supported teaching',
    status: 'Public classroom template',
    summary: 'Students turn a plain T-shirt storefront into a brand while explaining decisions and testing their work.',
    details: [
      { label: 'Built', text: 'Neutral storefront, a live style guide, structured AI coaching, and a student learning record.' },
      { label: 'Why', text: 'Make the student’s reasoning visible alongside the artifact an AI helped them build.' }
    ],
    note: 'The shopping bag is a demonstration and does not process payments or place orders.',
    links: [
      { label: 'View teaching template', href: 'https://github.com/kaw393939/is117-brand-studio' },
      { label: 'How I teach', href: '/teaching' }
    ]
  },
  {
    id: 'ordo',
    number: '04',
    title: 'Ordo',
    category: 'Agent governance · systems design',
    status: 'Documented architecture · runtime planned',
    summary: 'A local-first governance harness for AI work: artifacts, permissions, human review, event ledgers, and recovery.',
    details: [
      { label: 'Designed', text: 'Race Track / Pit Stop, artifact specs, evidence drawers, briefing-oriented UI, and explicit approval events.' },
      { label: 'Research', text: 'How to spend human attention where it changes decisions and verify what automated systems are allowed to do.' }
    ],
    note: 'The repository’s documented Elixir/Phoenix application runtime has not started. Architectural specifications are not a shipped appliance.',
    links: [
      { label: 'Read architecture', href: 'https://github.com/kaw393939/ordo' },
      { label: 'Research context', href: '/research/systems/race-track-pit-stop' }
    ]
  },
  {
    id: 'ordo-knowledge-lab',
    number: '05',
    title: 'Ordo Knowledge Lab',
    category: 'AI knowledge systems · education',
    status: 'Published course material · application research planned',
    summary: 'Student guides and examples on retrieval, AI models, databases, embeddings, source evidence, and modern systems engineering.',
    details: [
      { label: 'Available', text: 'Published VitePress student lessons, exercises and tested examples.' },
      { label: 'Next', text: 'A portable evidence-aware knowledge engine with entity review and hybrid retrieval.' }
    ],
    note: 'The educational material exists. The planned research runtime and specialized native workers are not delivered.',
    links: [
      { label: 'Explore Knowledge Lab', href: '/knowledge-lab/' },
      { label: 'View project source', href: 'https://github.com/kaw393939/is373-rag' }
    ]
  }
]

export const zambiaExperience = [
  {
    year: '2019',
    title: 'Teaching at ZCAS University',
    text: 'I taught an intensive progressive web app workshop for university staff and students in Zambia. Participants began developing a student-registration app, connecting mobile development lessons to a practical university need.',
    href: 'https://news.njit.edu/inspiring-students-njit-africa',
    linkLabel: 'Read the 2019 NJIT story'
  },
  {
    year: '2020',
    title: 'Supporting digital public services',
    text: 'NJIT reported on my work with Zambia’s Ministry of Finance to help digitize government systems, introduce agile development, and bring lessons from the work back into my NJIT teaching.',
    href: 'https://news.njit.edu/njit-lecturer-helps-digitize-government-services-zambia',
    linkLabel: 'Read the 2020 NJIT story'
  }
]
