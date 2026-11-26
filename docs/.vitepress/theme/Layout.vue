<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { site } from '../site'
import { navItems, projects, researchQuestions, zambiaExperience } from './content'
import HeroAudio from './components/HeroAudio.vue'
import SiteIcon from './components/SiteIcon.vue'
import './ordo-lab.css'

const profiles = [
  { name: 'GitHub', url: site.github, icon: '/icons/github.svg' },
  { name: 'LinkedIn', url: site.linkedin, icon: '/icons/linkedin-in.svg' }
]

const { frontmatter, page } = useData()
const isHome = computed(() => frontmatter.value.layout === 'home')
const section = computed(() => page.value.relativePath.split('/')[0].replace(/\.md$/, ''))
const breadcrumbs = computed(() => {
  const path = page.value.relativePath
  if (path.startsWith('teaching/')) return [{ href: '/teaching', title: 'Teaching' }]
  if (!path.startsWith('research/')) return []
  const trail: { href?: string, title: string }[] = [{ href: '/research', title: 'Research' }]
  if (path.startsWith('research/systems/')) {
    const collection = path === 'research/systems/index.md'
    trail.push({ href: collection ? undefined : '/research/systems/', title: 'Evidence-Governed AI Systems' })
  }
  return trail
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
function closeMenuOnFocusOut(event: FocusEvent) {
  if (event.relatedTarget instanceof Node && !header.value?.contains(event.relatedTarget)) closeMenu()
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
  <header ref="header" class="site-header" @focusout="closeMenuOnFocusOut">
    <div class="masthead wrap">
      <a class="wordmark" href="/" aria-label="Keith Williams home"><SiteIcon name="compass" class="wordmark-print-mark" />Keith Williams<span aria-hidden="true">.</span></a>
      <p class="masthead-subtitle">A journal of <em>AI, education<br> &amp; engineering.</em></p>
      <nav class="profile-network" aria-label="Keith Williams’s profiles">
        <a v-for="profile in profiles" :key="profile.name" class="profile-link" :href="profile.url" rel="me">
          <img class="profile-logo" :src="profile.icon" alt="" width="18" height="18">{{ profile.name }}
        </a>
      </nav>
      <button ref="menuButton" type="button" class="menu-toggle" :aria-expanded="menuOpen" aria-controls="site-nav"
        @click="menuOpen = !menuOpen">{{ menuOpen ? 'Close' : 'Menu' }}
        <span aria-hidden="true">{{ menuOpen ? '−' : '+' }}</span>
      </button>
    </div>
    <div class="nav-band">
      <nav id="site-nav" class="wrap" :class="{ open: menuOpen }" aria-label="Main navigation">
        <a href="/" :aria-current="isHome && !currentAnchor ? 'page' : undefined" @click="closeMenu">Home</a>
        <a v-for="item in navItems" :key="item.id" :href="item.href" :aria-current="currentItem(item)" @click="closeMenu">{{ item.label }}</a>
        <a class="nav-lab" href="/knowledge-lab/" target="_self" @click="closeMenu">Ordo Knowledge Lab</a>
        <a class="nav-contact" href="/#conversation" @click="closeMenu">Get in touch <SiteIcon name="arrow-up-right" class="link-arrow" /></a>
      </nav>
    </div>
  </header>

  <main v-if="isHome" id="main" tabindex="-1" class="home-page">
    <Content />

    <section id="projects" class="project-section" aria-labelledby="projects-title">
      <div class="wrap project-layout">
        <div class="section-intro">
          <p class="eyebrow section-label"><span aria-hidden="true"></span> Selected work</p>
          <h2 id="projects-title">Inside the workshop.</h2>
          <p>Try a classroom Studio, run a tool, or follow a design decision back to its source. Each project includes its current status and a place to start.</p>
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
        <article v-for="question in researchQuestions" :key="question.number" class="research-item"><h3>{{ question.title }}</h3><p>{{ question.text }}</p><a class="inline-link" :href="question.href">{{ question.linkLabel }} <span aria-hidden="true">↗</span></a></article>
      </div>
      <a class="inline-link" href="/research/systems/">Systems research and case studies <span aria-hidden="true">↗</span></a>
    </section>

    <section id="about" class="profile-section wrap" aria-labelledby="about-title">
      <figure class="profile-image">
        <img src="/images/keith-williams-editorial-960.webp" srcset="/images/keith-williams-editorial-480.webp 480w, /images/keith-williams-editorial-960.webp 960w, /images/keith-williams-editorial-1200.webp 1200w" sizes="(max-width: 520px) 92vw, (max-width: 720px) 480px, (max-width: 1100px) 38vw, 480px" alt="Keith Williams in a navy blazer and an open-collar blue shirt" width="1200" height="1200" loading="lazy" decoding="async">
        <figcaption>AI-assisted portrait from an original photograph.</figcaption>
      </figure>
      <div class="profile-copy">
        <p class="eyebrow section-label"><span aria-hidden="true"></span> About the author</p>
        <h2 id="about-title">I’m Keith Williams.</h2>
        <p id="approach">I teach Informatics at NJIT and direct its B.S. in Enterprise AI. In Zambia I worked with university staff and students on a registration app. I still like to ask the question a user has after clicking Submit. Did it go through, and how can I tell?</p>
        <div class="profile-links"><a class="inline-link" href="/about">Read my story <span aria-hidden="true">↗</span></a><a class="inline-link" href="/teaching">My teaching approach <span aria-hidden="true">↗</span></a></div>
        <HeroAudio />
      </div>
    </section>

    <section id="zambia" class="archive-section wrap" aria-labelledby="archive-title">
      <div class="section-rule"><h2 id="archive-title">Fieldwork and interviews</h2></div>
      <div class="archive-grid">
        <article v-for="experience in zambiaExperience" :key="experience.href" class="experience-entry">
          <p class="eyebrow">Zambia</p><h3><a :href="experience.href">{{ experience.title }}</a></h3>
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
        <p>Trying an exercise with your own students? I’d like to hear what they noticed. <a class="inline-link" :href="site.faculty">Contact me at NJIT</a>.</p>
        <p>For independent consulting, bring one AI-assisted workflow and the result someone still has to check by hand. <a class="inline-link" :href="site.linkedin">Connect with me on LinkedIn</a>.</p>
        <div class="project-links"><a class="inline-link" :href="site.conversation" aria-describedby="conversation-privacy">Report a public project issue <span aria-hidden="true">↗</span></a></div>
        <p id="conversation-privacy" class="fine-print">Public on GitHub · Sign-in required. Please keep student records, contact information, and credentials private.</p>
      </div>
    </section>
  </main>
  <main v-else id="main" tabindex="-1" class="document-page wrap">
    <nav v-if="breadcrumbs.length" class="breadcrumb" aria-label="Breadcrumb">
      <template v-for="(crumb, index) in breadcrumbs" :key="crumb.title">
        <span v-if="index" aria-hidden="true">/</span>
        <a v-if="crumb.href" :href="crumb.href">{{ crumb.title }}</a>
        <span v-else aria-current="page">{{ crumb.title }}</span>
      </template>
    </nav>
    <Content />
  </main>
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-row">
        <div><a class="footer-name" href="/">Keith Williams<span aria-hidden="true">.</span></a><p>AI, education &amp; engineering</p></div>
        <nav class="footer-links" aria-label="Footer navigation"><a href="/site-notes">Site notes</a><a v-for="profile in profiles" :key="profile.name" class="profile-link" :href="profile.url" rel="me">
          <img class="profile-logo" :src="profile.icon" alt="" width="18" height="18">{{ profile.name }}
        </a><a :href="site.faculty">NJIT profile</a><a href="#main">Back to top ↑</a></nav>
      </div>
      <p class="footer-fine">© Keith Williams <span>Personal website. Views are my own.</span></p>
    </div>
  </footer>
</template>
