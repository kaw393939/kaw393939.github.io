export const navItems = [{ id: 'projects', label: 'Projects' }, { id: 'approach', label: 'Approach' }, { id: 'about', label: 'About' }]
export const focusAreas = [
  {
    "number": "01",
    "icon": "book",
    "title": "Learning with AI",
    "text": "I help students and educators get hands-on with AI, ask better questions, and check the results. The goal is confidence and understanding that last beyond any one tool.",
    "tag": "Learn by doing"
  },
  {
    "number": "02",
    "icon": "specification",
    "title": "Building useful things",
    "text": "I turn ideas into tools and learning experiences, starting with a simple question: what does the person using this need?",
    "tag": "Start with a real need"
  },
  {
    "number": "03",
    "icon": "judgment",
    "title": "Thinking it through",
    "text": "I help teams decide where AI can help, what needs a closer look, and when a person should make the call.",
    "tag": "Keep people in the picture"
  }
]

export const approachSteps = [
  {
    "number": "01",
    "title": "Start with a person.",
    "text": "Who will use this? What are they trying to learn or do? A useful project starts there."
  },
  {
    "number": "02",
    "title": "Make the goal clear.",
    "text": "Describe what a good result would look like in words everyone can understand."
  },
  {
    "number": "03",
    "title": "Try something small.",
    "text": "Make a first version, use it, and learn from what works and what does not."
  },
  {
    "number": "04",
    "title": "Keep asking questions.",
    "text": "Check the facts, listen to feedback, and stay responsible for the choices you make."
  }
]

// Case summaries checked against each public repository and linked primary sources.
export const projects = [
  {
    id: 'educational-design-system',
    number: '01',
    title: 'Educational Design System',
    category: 'For teachers',
    status: 'First version published',
    summary: 'Teaching takes enough preparation. This project gives lessons, readings, and assignments a consistent home so students can find their way.',
    details: [
      { label: 'What', text: 'Reusable course pages for explanations, activities, and next steps.' },
      { label: 'Why', text: 'The aim is to spend less time rebuilding pages and more time on what students need to learn.' }
    ],
    note: 'The first version is available now. More tools for creating and reviewing lessons are planned.',
    links: [
      { label: 'Explore the site', href: 'https://kaw393939.github.io/educational-design-system/' },
      { label: 'See the code', href: 'https://github.com/kaw393939/educational-design-system' }
    ]
  },
  {
    id: 'everyday-ai-cli',
    number: '02',
    title: 'Everyday AI CLI',
    category: 'Everyday AI tools',
    status: 'Early release · v0.2.2',
    summary: 'Turn a recording into text, make an image, or have text read aloud. Everyday AI CLI brings those tasks into one tool.',
    details: [
      { label: 'What', text: 'A tool that runs from your computer’s command line and connects to AI services.' },
      { label: 'Why', text: 'A place to try practical AI ideas and combine small tasks into a useful workflow.' }
    ],
    note: 'An early release for people comfortable with a terminal. It needs access to the AI services it uses.',
    links: [
      { label: 'See how it works', href: 'https://github.com/kaw393939/everyday-ai-cli' },
      { label: 'Get the early release', href: 'https://pypi.org/project/everydayai-cli/0.2.2/' }
    ]
  },
  {
    id: 'is117-brand-studio',
    number: '03',
    title: 'IS117 Brand Studio',
    category: 'Learning through design',
    status: 'A classroom starting point',
    summary: 'Students start with the same product: a plain white T-shirt. They build a brand and website around it, using AI as a coach.',
    details: [
      { label: 'What', text: 'A starting website and an exercise in choosing an audience, a voice, and a visual style.' },
      { label: 'Why', text: 'Students explain their choices and try the site themselves. AI helps with the work while they make the decisions.' }
    ],
    note: 'The starting project is public. Its shopping bag is only a demo; it does not take payments or place orders.',
    links: [
      { label: 'Visit the studio', href: 'https://kaw393939.github.io/is117-brand-studio/studio.html' },
      { label: 'See the starting project', href: 'https://github.com/kaw393939/is117-brand-studio' }
    ]
  }
]

export const zambiaExperience = [
  {
    year: '2019',
    title: 'A classroom in Zambia',
    text: 'At ZCAS University, I taught staff and students how to build web apps for phones. They began working on a student-registration app: a way to apply what they were learning to everyday university life.',
    href: 'https://news.njit.edu/inspiring-students-njit-africa',
    linkLabel: 'Read the 2019 NJIT story'
  },
  {
    year: '2020',
    title: 'Working with public-service teams',
    text: 'My work with Zambia’s Ministry of Finance focused on helping teams develop online government services in smaller steps. I brought what I learned back to NJIT, connecting classroom work with the challenges of building for real people.',
    href: 'https://news.njit.edu/njit-lecturer-helps-digitize-government-services-zambia',
    linkLabel: 'Read the 2020 NJIT story'
  }
]
