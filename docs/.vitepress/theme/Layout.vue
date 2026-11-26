<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { site } from '../site'
import { navItems, projects, researchQuestions, zambiaExperience } from './content'
import HeroAudio from './components/HeroAudio.vue'
import SiteIcon from './components/SiteIcon.vue'

const { frontmatter, page } = useData()
const isHome = computed(() => frontmatter.value.layout === 'home')
const section = computed(() => page.value.relativePath.split('/')[0].replace(/\.md$/, ''))
const breadcrumb = computed(() => {
  if (section.value === 'teaching' && page.value.relativePath.includes('/')) return { href: '/teaching', title: 'Teaching' }
  if (section.value === 'research' && page.value.relativePath.includes('/')) return { href: '/research', title: 'Research' }
  return null
})

const shareUrl = computed(() => {
  if (!breadcrumb.value || page.value.relativePath.endsWith('/index.md')) return ''
  const path = page.value.relativePath.replace(/\.md$/, '')
  return 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(site.url + '/' + path)
})

const menuOpen = ref(false)
const header = ref<HTMLElement>()
const menuButton = ref<HTMLButtonElement>()
let desktopQuery: MediaQueryList | undefined
const currentAnchor = ref('')
let observer: IntersectionObserver | undefined

function closeMenu() { menuOpen.value = false }
function dismissMenu(event: KeyboardEvent) {
  if (event.key === 'Escape' && menuOpen.value) {
    closeMenu()
    menuButton.value?.focus()
  }
}
function handleOutsideClick(event: MouseEvent) {
  if (menuOpen.value && !header.value?.contains(event.target as Node)) closeMenu()
}
function observeSections() {
  observer?.disconnect()
  currentAnchor.value = ''
  if (!isHome.value || !('IntersectionObserver' in window)) return
  const items = Array.from(document.querySelectorAll('#projects'))
  const visible = new Set<string>()
  observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) visible.add(entry.target.id)
      else visible.delete(entry.target.id)
    }
    currentAnchor.value = items.find(item => visible.has(item.id))?.id || ''
  }, { rootMargin: '-8% 0px -45% 0px' })
  items.forEach(item => observer?.observe(item))
}
function currentItem(item: { id: string, href: string }) {
  if (isHome.value && item.href.startsWith('/#') && item.id === currentAnchor.value) return 'location'
  if (!isHome.value && section.value === item.id) return 'page'
}
watch(() => page.value.relativePath, async () => {
  closeMenu()
  await nextTick()
  observeSections()
})
onMounted(() => {
  observeSections()
  document.addEventListener('keydown', dismissMenu)
  document.addEventListener('click', handleOutsideClick)
  desktopQuery = window.matchMedia('(min-width: 801px)')
  desktopQuery.addEventListener('change', closeMenu)
})
onUnmounted(() => {
  observer?.disconnect()
  document.removeEventListener('keydown', dismissMenu)
  document.removeEventListener('click', handleOutsideClick)
  desktopQuery?.removeEventListener('change', closeMenu)
})
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <header ref="header" class="site-header">
    <div class="masthead wrap">
      <a class="wordmark" href="/" aria-label="Keith Williams home">Keith Williams<span aria-hidden="true">.</span></a>
      <p class="masthead-subtitle">A journal of <em>AI, education<br> &amp; engineering.</em></p>
      <button ref="menuButton" type="button" class="menu-toggle" :aria-expanded="menuOpen" aria-controls="site-nav"
        @click="menuOpen = !menuOpen">{{ menuOpen ? 'Close' : 'Menu' }}
        <span aria-hidden="true">{{ menuOpen ? '−' : '+' }}</span>
      </button>
    </div>
    <div class="nav-band">
      <nav id="site-nav" class="wrap" :class="{ open: menuOpen }" aria-label="Main navigation">
        <a href="/" :aria-current="isHome && !currentAnchor ? 'page' : undefined" @click="closeMenu">Home</a>
        <a v-for="item in navItems" :key="item.id" :href="item.href" :aria-current="currentItem(item)" @click="closeMenu">{{ item.label }}</a>
        <a href="/knowledge-lab/" @click="closeMenu">Knowledge Lab</a>
        <a class="nav-contact" href="/#conversation" @click="closeMenu">Get in touch <SiteIcon name="arrow-up-right" class="link-arrow" /></a>
      </nav>
    </div>
  </header>

  <main v-if="isHome" id="main" tabindex="-1" class="home-page">
    <section class="cover wrap" aria-labelledby="cover-title">
      <div class="cover-copy">
        <p class="eyebrow section-label"><span aria-hidden="true"></span> The teaching issue</p>
        <h1 id="cover-title"><a href="/teaching/when-ai-helps-write-the-code">The Tests Passed.<br><em>Who Won the Game?</em></a></h1>
        <p class="cover-deck">A rock-paper-scissors game raises a question a green test can’t answer on its own. What should students be able to predict, explain, and check when AI helps them build?</p>
        <p class="cover-byline">By Keith Williams <span aria-hidden="true">/</span> <time datetime="2026-11-25">November 25, 2026</time></p>
        <a class="read-link" href="/teaching/when-ai-helps-write-the-code">Read the feature <span aria-hidden="true">→</span></a>
      </div>
      <figure class="cover-image">
        <img src="/images/teaching/studio-rock-paper-tests.jpg" alt="A red sheet of paper covers a dark stone beside a strip of green test checks" width="1280" height="853" fetchpriority="high" decoding="async">
        <figcaption>Paper covers rock. <span>AI-generated illustration</span></figcaption>
      </figure>
    </section>

    <section id="missions" class="dispatches wrap" aria-labelledby="dispatches-title">
      <div class="section-rule"><h2 id="dispatches-title">From the journal</h2> <a href="/writing">All writing <span aria-hidden="true">↗</span></a></div>
      <div class="dispatch-grid">
        <article class="dispatch-card">
          <figure class="dispatch-image">
            <img src="/images/teaching/studio-coach-pause.jpg" alt="An open hand gestures toward a worked example while a learner holds a pencil over a blank card" width="1080" height="720" loading="lazy" decoding="async">
            <figcaption>AI-generated illustration</figcaption>
          </figure>
          <p class="eyebrow">Classroom practice</p>
          <h3><a href="/teaching/studio-field-notes">When should an AI coach step back?</a></h3>
          <p>Classroom accounts and research behind a Studio starter that leaves room for students to choose.</p>
          <a class="inline-link" href="/teaching/studio-field-notes">Read the field notes <span aria-hidden="true">↗</span></a>
        </article>
        <article class="dispatch-card">
          <figure class="dispatch-image">
            <img src="/images/editorial/evidence-desk.jpg" alt="A magnifier rests on blue tracing paper" width="1000" height="666" loading="lazy" decoding="async">
            <figcaption>AI-generated illustration</figcaption>
          </figure>
          <p class="eyebrow">Systems research</p>
          <h3><a href="/research/systems/provenance-knowledge-graphs">Where did that claim come from?</a></h3>
          <p>A research proposal for tracing AI answers back to documents, including the ones that disagree.</p>
          <a class="inline-link" href="/research/systems/provenance-knowledge-graphs">Follow the evidence <span aria-hidden="true">↗</span></a>
        </article>
        <article class="briefing-card">
          <p class="eyebrow">Career field guide</p>
          <h3><a href="/ai-careers">What are employers actually asking for?</a></h3>
          <p>A closer look at 50 AI job and internship descriptions, the skills they name, and the experience they expect.</p>
          <a class="inline-link" href="/ai-careers">Explore AI careers <span aria-hidden="true">↗</span></a>
        </article>
      </div>
    </section>

    <section id="projects" class="project-section" aria-labelledby="projects-title">
      <div class="wrap project-layout">
        <div class="section-intro">
          <p class="eyebrow section-label"><span aria-hidden="true"></span> Selected work</p>
          <h2 id="projects-title">Inside the workshop.</h2>
          <p>Teaching materials, working software, and research plans. Open a project to see what you can try today.</p>
        </div>
        <div class="project-list">
          <article v-for="project in projects" :id="project.id" :key="project.id" class="project-case" :aria-labelledby="`${project.id}-title`">
            <details>
              <summary><h3 :id="`${project.id}-title`"><span class="project-category">{{ project.category }}</span>
                {{ project.title }}<span class="disclose-mark" aria-hidden="true"></span>
              </h3></summary>
              <div class="project-content">
                <p class="project-summary">{{ project.summary }}</p>
                <p class="project-status">{{ project.status }}</p>
                <dl><div v-for="detail in project.details" :key="detail.label"><dt>{{ detail.label }}</dt><dd>{{ detail.text }}</dd></div></dl>
                <p>{{ project.note }}</p>
                <div class="project-links"><a v-for="link in project.links" :key="link.href" class="inline-link" :href="link.href" :aria-label="`${link.label}: ${project.title}`">{{ link.label }} <span aria-hidden="true">↗</span></a></div>
              </div>
            </details>
          </article>
        </div>
      </div>
    </section>

    <section id="research" class="research-section wrap" aria-labelledby="research-title">
      <div class="section-rule"><h2 id="research-title">Questions I’m working on</h2><a href="/research">Research agenda <span aria-hidden="true">↗</span></a></div>
      <div class="research-grid">
        <article v-for="question in researchQuestions" :key="question.number" class="research-item"><h3>{{ question.title }}</h3><p>{{ question.text }}</p></article>
      </div>
      <a class="inline-link" href="/research/systems/">Systems research and case studies <span aria-hidden="true">↗</span></a>
    </section>

    <section id="about" class="profile-section wrap" aria-labelledby="about-title">
      <figure class="profile-image">
        <img src="/images/keith-portrait-20261111-960.webp" srcset="/images/keith-portrait-20261111-480.webp 480w, /images/keith-portrait-20261111-960.webp 960w, /images/keith-portrait-20261111-1440.webp 1440w" sizes="(max-width: 720px) 100vw, (max-width: 1100px) 42vw, 445px" alt="Keith Williams in a classroom" width="2316" height="3088" loading="lazy" decoding="async">
      </figure>
      <div class="profile-copy">
        <p class="eyebrow section-label"><span aria-hidden="true"></span> About the author</p>
        <h2 id="about-title">I’m Keith Williams.</h2>
        <p id="approach">I’m a Senior University Lecturer at the New Jersey Institute of Technology and Director of the B.S. Enterprise AI program. I teach students to build software, test it with other people, and explain the choices behind it.</p>
        <div class="profile-links"><a class="inline-link" href="/about">Read my story <span aria-hidden="true">↗</span></a><a class="inline-link" href="/teaching">My teaching approach <span aria-hidden="true">↗</span></a></div>
        <HeroAudio />
      </div>
    </section>

    <section id="zambia" class="archive-section wrap" aria-labelledby="archive-title">
      <div class="section-rule"><h2 id="archive-title">From the archive</h2></div>
      <div class="archive-grid">
        <article v-for="experience in zambiaExperience" :key="experience.year" class="experience-entry">
          <p class="eyebrow">Zambia · {{ experience.year }}</p><h3><a :href="experience.href">{{ experience.title }}</a></h3>
          <p>{{ experience.text }}</p><a class="inline-link" :href="experience.href">{{ experience.linkLabel }} <span aria-hidden="true">↗</span></a>
        </article>
        <article><p class="eyebrow">NJIT News</p><h3><a href="https://news.njit.edu/njit-faculty-artificial-intelligence-learning-opportunity">Artificial intelligence as a learning opportunity</a></h3>
          <p>A conversation with NJIT faculty about the questions AI brings into the classroom.</p>
          <a class="inline-link" href="https://news.njit.edu/njit-faculty-artificial-intelligence-learning-opportunity">Read the interview <span aria-hidden="true">↗</span></a>
        </article>
      </div>
    </section>
    <section id="conversation" class="contact-section wrap" aria-labelledby="contact-title">
      <div><p class="eyebrow section-label"><span aria-hidden="true"></span> Contact</p><h2 id="contact-title">Get in touch.</h2></div>
      <div class="contact-actions">
        <p>For a private inquiry, find my contact information on my NJIT faculty profile. For a public question about a project, start a conversation on GitHub.</p>
        <div class="project-links"><a class="inline-link" :href="site.faculty">NJIT faculty profile <span aria-hidden="true">↗</span></a><a class="inline-link" :href="site.conversation" aria-describedby="conversation-privacy">Start a conversation <span aria-hidden="true">↗</span></a></div>
        <p id="conversation-privacy" class="fine-print">Public on GitHub · Sign-in required. Please keep student records, contact information, and credentials private.</p>
      </div>
    </section>
  </main>
  <main v-else id="main" tabindex="-1" class="document-page wrap">
    <nav v-if="breadcrumb" class="breadcrumb" aria-label="Breadcrumb"><a :href="breadcrumb.href">{{ breadcrumb.title }}</a><span aria-hidden="true">/</span><span>Article</span></nav>
    <Content />
    <p v-if="shareUrl" class="article-share"><a class="inline-link" :href="shareUrl">Share on LinkedIn <span aria-hidden="true">↗</span></a></p>
  </main>
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-row">
        <div><a class="footer-name" href="/">Keith Williams<span aria-hidden="true">.</span></a><p>AI, education &amp; engineering</p></div>
        <nav class="footer-links" aria-label="Footer navigation"><a :href="site.linkedin">LinkedIn</a><a :href="site.github">GitHub</a><a :href="site.faculty">NJIT profile</a><a href="#main">Back to top ↑</a></nav>
      </div>
      <p class="footer-fine">© {{ new Date().getFullYear() }} Keith Williams <span>Personal website. Views are my own.</span></p>
    </div>
  </footer>
</template>
