export const navItems = [{ id: 'projects', label: 'Projects' }, { id: 'approach', label: 'Approach' }, { id: 'about', label: 'About' }]
export const focusAreas = [
  { number: '01', icon: 'book', title: 'AI education', text: 'Helping people move from experimenting with AI to understanding how to use it thoughtfully. Learning through building, questioning, and evaluating.', tag: 'Learning by doing' },
  { number: '02', icon: 'specification', title: 'Spec-driven development', text: 'Making intent explicit before asking AI to build. Clear requirements, acceptance criteria, and feedback turn a promising idea into work that can be evaluated.', tag: 'Clarity before code' },
  { number: '03', icon: 'judgment', title: 'Human judgment', text: 'Keeping people responsible for the questions, the evidence, and the decisions. Useful AI starts with knowing what matters and recognizing what is missing.', tag: 'People at the center' }
]

export const approachSteps = [
  {
    "number": "01",
    "title": "Ask a better question.",
    "text": "Start with the people, the problem, and the context. Give curiosity a useful direction."
  },
  {
    "number": "02",
    "title": "Make the intent clear.",
    "text": "Write down the goal, the constraints, and what a good result should look like."
  },
  {
    "number": "03",
    "title": "Build. Test. Learn.",
    "text": "Turn ideas into something tangible. Evaluate the result, examine the gaps, and improve it."
  },
  {
    "number": "04",
    "title": "Keep judgment human.",
    "text": "Use AI to extend capability while staying accountable for the decisions that matter."
  }
]


// Case summaries checked against each public repository and linked primary sources.
export const projects = [
  {
    id: 'educational-design-system',
    number: '01',
    title: 'Educational Design System',
    category: 'Learning systems',
    status: 'Published phase-one foundation',
    summary: 'A documentation-first foundation for consistent teaching materials and static educational sites.',
    details: [
      { label: 'Built', text: 'Design tokens, shared layouts, teaching primitives, typed page recipes, and release-selected static builds.' },
      { label: 'Practice', text: 'Explicit specifications, review records, and accessibility checks connect content decisions to a verifiable release.' }
    ],
    note: 'The foundation is published. Later authoring and observability work remains in development; the full publishing roadmap is not complete.',
    links: [
      { label: 'Explore the site', href: 'https://kaw393939.github.io/educational-design-system/' },
      { label: 'View source', href: 'https://github.com/kaw393939/educational-design-system' }
    ]
  },
  {
    id: 'everyday-ai-cli',
    number: '02',
    title: 'Everyday AI CLI',
    category: 'AI tooling · Python',
    status: 'Published alpha · v0.2.2',
    summary: 'A command-line toolkit that brings AI image, audio, and search workflows into repeatable commands.',
    details: [
      { label: 'Built', text: 'Commands for image generation and analysis, transcription, speech, audio translation, and web search.' },
      { label: 'Practice', text: 'A plugin architecture lets additional commands extend the toolkit without replacing its core interface.' }
    ],
    note: 'Published on PyPI as an alpha. AI commands require access to the relevant provider APIs.',
    links: [
      { label: 'View source', href: 'https://github.com/kaw393939/everyday-ai-cli' },
      { label: 'View PyPI release', href: 'https://pypi.org/project/everydayai-cli/0.2.2/' }
    ]
  },
  {
    id: 'is117-brand-studio',
    number: '03',
    title: 'IS117 Brand Studio',
    category: 'AI-assisted education',
    status: 'Public teaching template',
    summary: 'A guided studio where students turn a neutral T-shirt storefront into a brand and a live style guide.',
    details: [
      { label: 'Built', text: 'A working storefront, shared styles, a live identity board, and a structured AI-coaching workflow.' },
      { label: 'Practice', text: 'Students explain their decisions, inspect the result, and review a short learning record alongside browser and accessibility checks.' }
    ],
    note: 'An educational template. The shopping bag is a demonstration and does not process payments or place orders.',
    links: [
      { label: 'Visit the studio', href: 'https://kaw393939.github.io/is117-brand-studio/studio.html' },
      { label: 'View template', href: 'https://github.com/kaw393939/is117-brand-studio' }
    ]
  },
  {
    id: 'life-tracker',
    number: '04',
    title: 'Life Tracker',
    category: 'Human + AI workflow',
    status: 'Private workspace · Public how-to guide',
    summary: 'A practical way to keep the next step clear when work is scattered across conversations and documents.',
    details: [
      { label: 'What', text: 'A private GitHub work queue with clear owners, next actions, and checks for completion.' },
      { label: 'Why', text: 'AI helps research and organize the work. I set the direction, review decisions, and check the outcome.' }
    ],
    note: 'The guide explains the method and how to set up your own version. Private records stay private.',
    links: [
      { label: 'Read the setup guide', href: '/life-tracker' }
    ]
  },
  {
    id: 'ordo-knowledge-lab',
    number: '05',
    title: 'Ordo Knowledge Lab',
    category: 'AI knowledge systems · education',
    status: 'Public textbook and student labs · research application planned',
    summary: 'A research-grounded VitePress learning resource that connects RAG, databases, AI, systems engineering and evidence-driven software.',
    details: [
      { label: 'Available', text: 'IS373 RAG student guides, practical prompts, synthetic examples, design documentation and tested learning labs.' },
      { label: 'Next', text: 'A portable knowledge engine with evidence, identity review, streaming retrieval and optional specialized model workers.' }
    ],
    note: 'The educational website and examples are available. The full research runtime, hosted chat, and native AI workers remain planned.',
    links: [
      { label: 'Explore the textbook', href: '/is373-rag/' },
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
