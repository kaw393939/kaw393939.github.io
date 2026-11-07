<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()
const isHome = computed(() => frontmatter.value.layout === 'home')
const menuOpen = ref(false)
const conversationUrl = 'https://github.com/kaw393939/kaw393939.github.io/issues/new?template=contact.yml'
const activeSection = ref('')
let observer: IntersectionObserver | undefined
onMounted(() => {
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) activeSection.value = entry.target.id })
  }, { rootMargin: '-20% 0px -60% 0px' })
  document.querySelectorAll('main section[id]').forEach(section => observer?.observe(section))
})
onUnmounted(() => observer?.disconnect())
const closeMenu = () => { menuOpen.value = false }
const navItems = [{ id: 'focus', label: 'Focus' }, { id: 'approach', label: 'Approach' }, { id: 'about', label: 'About' }]
const focusAreas = [
  { number: '01', title: 'AI education', text: 'Helping people move from experimenting with AI to understanding how to use it thoughtfully. Learning through building, questioning, and evaluating.', tag: 'Learning by doing' },
  { number: '02', title: 'Spec-driven development', text: 'Making intent explicit before asking AI to build. Clear requirements, acceptance criteria, and feedback turn a promising idea into work that can be evaluated.', tag: 'Clarity before code' },
  { number: '03', title: 'Human judgment', text: 'Keeping people responsible for the questions, the evidence, and the decisions. Useful AI starts with knowing what matters and recognizing what is missing.', tag: 'People at the center' }
]
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="header-inner">
      <a class="wordmark" href="/" aria-label="Keith Williams home">
        <svg class="compass-mark" viewBox="0 0 48 48" aria-hidden="true"><path d="M24 3 28 20 45 24 28 28 24 45 20 28 3 24 20 20Z" fill="currentColor"/><circle cx="24" cy="24" r="4" fill="var(--paper)"/></svg>
        <span>Keith Williams<span class="wordmark-sub">AI EDUCATOR & EXPLORER</span></span>
      </a>
      <button class="menu-toggle" :aria-expanded="menuOpen" aria-controls="site-nav" @click="menuOpen = !menuOpen">{{ menuOpen ? 'Close' : 'Menu' }} <span aria-hidden="true">{{ menuOpen ? '−' : '+' }}</span></button>
      <nav id="site-nav" :class="{ open: menuOpen }" aria-label="Main navigation">
        <a v-for="item in navItems" :key="item.id" :href="`/#${item.id}`" :aria-current="activeSection === item.id ? 'location' : undefined" @click="closeMenu">{{ item.label }}</a>
        <a class="nav-contact" href="/#conversation" @click="closeMenu">Let's talk <span aria-hidden="true">↘</span></a>
      </nav>
    </div>
  </header>

  <main v-if="isHome" id="main">
    <section class="hero wrap" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow"><span class="status-dot"></span> AT THE INTERSECTION OF AI & HUMAN POTENTIAL</p>
        <h1 id="hero-title">Exploring AI.<br>Building<br><em>understanding.</em></h1>
        <p class="hero-intro">I'm Keith Williams, an educator and builder exploring how AI can help us learn, create, and solve meaningful problems.</p>
        <a class="button button-dark" href="#focus">Explore my work <span aria-hidden="true">↘</span></a>
        <div class="hero-footnote"><span class="small-cross" aria-hidden="true">+</span> Curiosity leads. Judgment gives it direction.</div>
      </div>
      <figure class="hero-art">
        <img src="/images/explorer-horizon.webp" alt="An imagined mountain horizon with fine contour lines and a vermilion sun" width="1254" height="1254" fetchpriority="high">
        <div class="art-marker" aria-hidden="true"><span>FIELD OF INQUIRY</span><span>HUMAN × MACHINE</span></div>
        <figcaption><span>01 / THE EXPLORER</span><span>New terrain. Better questions.</span></figcaption>
      </figure>
    </section>

    <div class="credentials wrap" aria-label="Professional roles">
      <span class="credential-institution">NJIT<span>New Jersey Institute<br>of Technology</span></span>
      <span>Senior University Lecturer<span>Informatics</span></span>
      <span>Director<span>B.S. Enterprise AI</span></span>
      <span class="credential-location"><span class="small-cross" aria-hidden="true">+</span> Grounded in education.<br>Looking toward what's next.</span>
    </div>

    <section id="focus" class="focus-section wrap" aria-labelledby="focus-title">
      <div class="section-heading">
        <p class="eyebrow">01 / AREAS OF FOCUS</p>
        <div><h2 id="focus-title">Turning possibility<br>into <em>practice.</em></h2><p>My work connects emerging technology with the skills and thinking people need to use it well.</p></div>
      </div>
      <div class="focus-grid">
        <article v-for="area in focusAreas" :key="area.number" class="focus-item">
          <div class="focus-number"><span>{{ area.number }}</span><svg v-if="area.number === '01'" viewBox="0 0 64 64" aria-hidden="true"><path d="M8 14c9-3 16-1 24 5 8-6 15-8 24-5v35c-9-3-16-1-24 5-8-6-15-8-24-5Zm24 5v35"/></svg><svg v-else-if="area.number === '02'" viewBox="0 0 64 64" aria-hidden="true"><path d="M17 9h30v46H17zM24 21h16M24 31h16M24 41h9"/><path d="m8 25-5 7 5 7m48-14 5 7-5 7"/></svg><svg v-else viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="23"/><path d="m39 25-4 10-10 4 4-10ZM32 3v8M32 53v8M3 32h8M53 32h8"/></svg></div>
          <h3>{{ area.title }}</h3>
          <p>{{ area.text }}</p>
          <span class="focus-tag">{{ area.tag }}</span>
        </article>
      </div>
    </section>

    <section id="approach" class="approach-section" aria-labelledby="approach-title">
      <div class="wrap approach-inner">
        <div class="approach-heading"><p class="eyebrow">02 / A WAY OF WORKING</p><h2 id="approach-title">An explorer's curiosity.<br>A sage's <em>discernment.</em></h2><p>Explore what's possible. Understand what works. Share what helps.</p><a class="text-link light-link" href="https://github.com/kaw393939">Follow the work on GitHub <span aria-hidden="true">↗</span></a></div>
        <ol class="approach-steps">
          <li><span>01</span><div><h3>Ask a better question.</h3><p>Start with the people, the problem, and the context. Give curiosity a useful direction.</p></div></li>
          <li><span>02</span><div><h3>Make the intent clear.</h3><p>Write down the goal, the constraints, and what a good result should look like.</p></div></li>
          <li><span>03</span><div><h3>Build. Test. Learn.</h3><p>Turn ideas into something tangible. Evaluate the result, examine the gaps, and improve it.</p></div></li>
          <li><span>04</span><div><h3>Keep judgment human.</h3><p>Use AI to extend capability while staying accountable for the decisions that matter.</p></div></li>
        </ol>
      </div>
      <div class="approach-bottom wrap"><span>THE COMPASS</span><span>Curiosity · Clarity · Craft · Responsibility</span><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 3 28 20 45 24 28 28 24 45 20 28 3 24 20 20Z" fill="currentColor"/></svg></div>
    </section>

    <section id="about" class="about-section wrap" aria-labelledby="about-title">
      <figure class="study-art"><img src="/images/sage-study.webp" alt="An imagined sunlit study with a blank notebook, bronze compass, and stone sphere" width="1672" height="941" loading="lazy"><figcaption><span>02 / THE SAGE</span><span>Space to think. Room to discover.</span></figcaption></figure>
      <div class="about-copy"><p class="eyebrow">03 / A LITTLE BACKGROUND</p><h2 id="about-title">An educator.<br>A builder.<br><em>Always a learner.</em></h2><p>I've spent more than two decades teaching at NJIT, connecting software development with practical learning. Today, my focus is on AI education and the B.S. Enterprise AI program.</p><p>I care about helping people develop the confidence to build and the judgment to know whether what they've built is useful. The tools will keep changing. That foundation matters.</p><a class="text-link" href="https://people.njit.edu/profile/kwilliam">My NJIT faculty profile <span aria-hidden="true">↗</span></a></div>
    </section>

    <section class="perspective-section wrap" aria-labelledby="perspective-title">
      <div class="section-heading compact"><p class="eyebrow">04 / IN THE CONVERSATION</p><h2 id="perspective-title">Learning in the open.</h2></div>
      <a class="article-link" href="https://news.njit.edu/njit-faculty-artificial-intelligence-learning-opportunity"><div><span class="eyebrow">NJIT NEWS · AI & EDUCATION</span><h3>Artificial intelligence is a learning opportunity.</h3><p>A conversation about how AI changes the way we teach, learn, and build software.</p></div><span class="article-arrow" aria-hidden="true">↗</span></a>
    </section>

    <section id="conversation" class="contact-section wrap" aria-labelledby="contact-title">
      <p class="eyebrow">THE NEXT GOOD QUESTION STARTS A CONVERSATION.</p>
      <div>
        <h2 id="contact-title">Let's explore<br><em>what's next.</em></h2>
        <div class="contact-actions">
          <p class="contact-intro">A question about AI education, a collaboration idea, or feedback on this site? Start a conversation on GitHub.</p>
          <a class="button button-dark" :href="conversationUrl" aria-describedby="conversation-privacy">Start a conversation <span aria-hidden="true">↗</span></a>
          <p class="contact-platform">Public on GitHub · GitHub sign-in required</p>
          <p id="conversation-privacy" class="contact-privacy">Your message and replies will be visible to everyone. Please don't include email addresses, phone numbers, student records, credentials, or other private information.</p>
        </div>
      </div>
    </section>
  </main>
  <main v-else id="main" class="document-page wrap"><Content /></main>

  <footer class="site-footer wrap"><div><a class="footer-name" href="/">Keith Williams</a><p>Curiosity with a compass.</p></div><div class="footer-links"><a href="https://github.com/kaw393939">GitHub ↗</a><a href="https://people.njit.edu/profile/kwilliam">NJIT ↗</a><a href="#main">Back to top ↑</a></div><div class="footer-fine"><span>© {{ new Date().getFullYear() }} Keith Williams</span><span>Built with VitePress · Original AI-generated artwork</span><span>Personal website. Views are my own.</span></div></footer>
</template>
