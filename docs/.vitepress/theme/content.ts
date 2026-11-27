export const navItems = [
  { id: 'writing', label: 'Writing', href: '/writing' },
  { id: 'teaching', label: 'Teaching', href: '/teaching' },
  { id: 'research', label: 'Research', href: '/research' },
  { id: 'projects', label: 'Projects', href: '/#projects' },
  { id: 'ai-careers', label: 'AI Careers', href: '/ai-careers' },
  { id: 'about', label: 'About', href: '/about' }
]

// Inquiry directions, not statements of completed empirical research.
export const researchQuestions = [
  {
    number: '01', title: 'Learning beyond the generated answer',
    text: 'A coach helps with the first example. What does the student notice when a detail changes in the second?',
    href: '/teaching/studio-field-notes', linkLabel: 'Try a follow-up task'
  },
  {
    number: '02', title: 'Assessment when AI can produce the artifact',
    text: 'What can a student predict, check, or correct that a finished project alone would never show?',
    href: '/teaching/the-question-i-want-students-to-ask', linkLabel: 'See how a Studio records student decisions'
  },
  {
    number: '03', title: 'Working with AI without handing over judgment',
    text: 'Which decisions can an agent make on its own, and which need someone who knows the customer and the consequences?',
    href: '/research/systems/race-track-pit-stop', linkLabel: 'Trace a decision through review'
  },
  {
    number: '04', title: 'Reliable knowledge from messy information',
    text: 'When two sources disagree, can a reader open the original passages and understand why a claim changed?',
    href: '/research/systems/vision-and-interface', linkLabel: 'Open up an AI citation'
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
    summary: 'A shared set of page patterns for teachers who want lessons, examples, and references to feel familiar from week to week.',
    details: [
      { label: 'Built', text: 'Shared colors, typography, layouts, and reusable lesson components, published together in static course sites.' },
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
    summary: 'Students start with the same plain T-shirt. Their choice of buyer changes the words, colors, and storefront they build.',
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
    summary: 'A way to carry one decision from a conversation into a private work queue, with an owner and a way to tell when the work is done.',
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
    summary: 'A textbook and set of runnable labs for tracing an AI answer back to its sources. Start with a small collection and ask one question it cannot answer.',
    details: [
      { label: 'Available', text: 'IS373 RAG student guides, practical prompts, synthetic examples, design documentation and tested learning labs.' },
      { label: 'Next', text: 'A portable knowledge engine with evidence, identity review, streaming retrieval and optional specialized model workers.' }
    ],
    note: 'The educational website and examples are available. The full research runtime, hosted chat, and native AI workers remain planned.',
    links: [
      { label: 'Explore the textbook', href: '/knowledge-lab/' },
      { label: 'View project source', href: 'https://github.com/kaw393939/is373-rag' }
    ]
  }
]

export const zambiaExperience = [
  {
    title: 'Teaching at ZCAS University',
    text: 'I taught an intensive progressive web app workshop for university staff and students in Zambia. Participants began developing a student-registration app, connecting mobile development lessons to a practical university need.',
    href: 'https://news.njit.edu/inspiring-students-njit-africa',
    linkLabel: 'Read the ZCAS workshop story'
  },
  {
    title: 'Supporting digital public services',
    text: 'NJIT reported on my work with Zambia’s Ministry of Finance to help digitize government systems, introduce agile development, and bring lessons from the work back into my NJIT teaching.',
    href: 'https://news.njit.edu/njit-lecturer-helps-digitize-government-services-zambia',
    linkLabel: 'Read the public services story'
  }
]
