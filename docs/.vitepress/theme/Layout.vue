<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { useData } from 'vitepress'
import { site } from '../site'
import { navItems, focusAreas, approachSteps, projects, zambiaExperience } from './content'
import SiteIcon from './components/SiteIcon.vue'

const { frontmatter } = useData()
const isHome = computed(() => frontmatter.value.layout === 'home')
const menuOpen = ref(false)
const menuButton = ref<HTMLButtonElement>()
const header = ref<HTMLElement>()
const activeSection = ref('')
let observer: IntersectionObserver | undefined
let desktopQuery: MediaQueryList | undefined

const closeMenu = () => { menuOpen.value = false }
const dismissMenu = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && menuOpen.value) {
    closeMenu()
    menuButton.value?.focus()
  }
}
const handleOutsideClick = (event: MouseEvent) => {
  if (menuOpen.value && !header.value?.contains(event.target as Node)) closeMenu()
}
const observeSections = () => {
  observer?.disconnect()
  activeSection.value = ''
  if (!isHome.value || !('IntersectionObserver' in window)) return
  const sections = [...document.querySelectorAll('main section[id]')]
  const visibleSections = new Set<string>()
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) visibleSections.add(entry.target.id)
      else visibleSections.delete(entry.target.id)
    })
    activeSection.value = sections.find(section => visibleSections.has(section.id))?.id ?? ''
  }, { rootMargin: '-20% 0px -60% 0px' })
  sections.forEach(section => observer?.observe(section))
}
watch(isHome, () => { closeMenu(); observeSections() }, { flush: 'post' })
onMounted(() => {
  observeSections()
  document.addEventListener('keydown', dismissMenu)
  document.addEventListener('click', handleOutsideClick)
  desktopQuery = window.matchMedia('(min-width: 641px)')
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
    <div class="header-inner">
      <a class="wordmark" href="/" aria-label="Keith Williams home">
        <SiteIcon name="compass" class="compass-mark" />
        <span>Keith Williams<span class="wordmark-sub">AI EDUCATOR & EXPLORER</span></span>
      </a>
      <button ref="menuButton" type="button" class="menu-toggle" :aria-expanded="menuOpen" aria-controls="site-nav" @click="menuOpen = !menuOpen">{{ menuOpen ? 'Close' : 'Menu' }} <span aria-hidden="true">{{ menuOpen ? '−' : '+' }}</span></button>
      <nav id="site-nav" :class="{ open: menuOpen }" aria-label="Main navigation">
        <a v-for="item in navItems" :key="item.id" :href="`/#${item.id}`" :aria-current="activeSection === item.id ? 'location' : undefined" @click="closeMenu">{{ item.label }}</a>
        <a class="nav-contact" href="/#conversation" @click="closeMenu">Let's talk <SiteIcon name="arrow-down-right" class="link-arrow" /></a>
      </nav>
    </div>
  </header>

  <main v-if="isHome" id="main" tabindex="-1">
    <section class="hero wrap" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow"><span class="status-dot"></span> EDUCATOR · BUILDER · CONSULTANT</p>
        <h1 id="hero-title">Making AI<br>work for<br><em>people.</em></h1>
        <p class="hero-intro">I'm Keith Williams. I help students, educators, and teams make sense of AI and put it to use through teaching, building, and consulting.</p>
        <a class="button button-dark" href="#projects">Explore my work <SiteIcon name="arrow-down-right" class="link-arrow" /></a>
        <div class="hero-footnote"><span class="small-cross" aria-hidden="true">+</span> Try new things. Ask good questions.</div>
      </div>
      <figure class="hero-art">
        <img src="/images/explorer-horizon-960.webp" srcset="/images/explorer-horizon-480.webp 480w, /images/explorer-horizon-960.webp 960w, /images/explorer-horizon-1254.webp 1254w" sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 850px) 45vw, (max-width: 1392px) 43vw, 565px" alt="An imagined mountain horizon with fine contour lines and a vermilion sun" width="1254" height="1254" fetchpriority="high">
        <div class="art-marker" aria-hidden="true"><span>ROOM TO EXPLORE</span><span>LEARNING BY DOING</span></div>
        <figcaption><span>01 / THE EXPLORER</span><span>New terrain. Better questions.</span></figcaption>
      </figure>
    </section>

    <div class="credentials wrap" aria-label="Professional roles">
      <span class="credential-institution">NJIT<span>New Jersey Institute<br>of Technology</span></span>
      <span>Senior University Lecturer<span>Informatics</span></span>
      <span>Director<span>B.S. Enterprise AI</span></span>
      <span class="credential-location"><span class="small-cross" aria-hidden="true">+</span> Grounded in teaching.<br>Open to what's next.</span>
    </div>

    <section id="focus" class="focus-section wrap" aria-labelledby="focus-title">
      <div class="section-heading">
        <p class="eyebrow">01 / HOW I HELP</p>
        <div><h2 id="focus-title">Make sense of it.<br><em>Put it to work.</em></h2><p>For students, educators, and teams who want a practical way into AI.</p></div>
      </div>
      <div class="focus-grid">
        <article v-for="area in focusAreas" :key="area.number" class="focus-item">
          <div class="focus-number"><span>{{ area.number }}</span><SiteIcon :name="area.icon" /></div>
          <h3>{{ area.title }}</h3>
          <p>{{ area.text }}</p>
          <span class="focus-tag">{{ area.tag }}</span>
        </article>
      </div>
    </section>

    <section id="projects" class="projects-section wrap" aria-labelledby="projects-title">
      <div class="section-heading">
        <p class="eyebrow">02 / SELECTED PROJECTS</p>
        <div><h2 id="projects-title">A few things<br><em>I've made.</em></h2><p>Tools and teaching projects that put these ideas into practice.</p></div>
      </div>
      <div class="project-list">
        <article v-for="project in projects" :id="project.id" :key="project.id" class="project-case" :aria-labelledby="`${project.id}-title`">
          <div class="project-identity">
            <p class="eyebrow"><span>{{ project.number }}</span> / {{ project.category }}</p>
            <h3 :id="`${project.id}-title`">{{ project.title }}</h3>
            <p class="project-status">{{ project.status }}</p>
          </div>
          <div class="project-body">
            <p class="project-summary">{{ project.summary }}</p>
            <dl class="project-details">
              <div v-for="detail in project.details" :key="detail.label"><dt>{{ detail.label }}</dt><dd>{{ detail.text }}</dd></div>
            </dl>
            <p class="project-note">{{ project.note }}</p>
            <div class="project-links"><a v-for="link in project.links" :key="link.href" class="text-link" :href="link.href" :aria-label="`${link.label}: ${project.title}`">{{ link.label }} <SiteIcon name="arrow-up-right" class="link-arrow" /></a></div>
          </div>
        </article>
      </div>
    </section>

    <section id="approach" class="approach-section" aria-labelledby="approach-title">
      <div class="wrap approach-inner">
        <div class="approach-heading"><p class="eyebrow">03 / HOW I WORK</p><h2 id="approach-title">Start with people.<br>Stay <em>curious.</em></h2><p>Ask questions. Try things. Look closely at the result. Then decide what is worth keeping.</p><a class="text-link light-link" :href="site.github">Follow the work on GitHub <SiteIcon name="arrow-up-right" class="link-arrow" /></a></div>
        <ol class="approach-steps">
          <li v-for="step in approachSteps" :key="step.number">
            <span>{{ step.number }}</span>
            <div><h3>{{ step.title }}</h3><p>{{ step.text }}</p></div>
          </li>
        </ol>
      </div>
      <div class="approach-bottom wrap"><span>THE COMPASS</span><span>Ask · Try · Learn · Think</span><SiteIcon name="compass" /></div>
    </section>

    <section id="about" class="about-section wrap" aria-labelledby="about-title">
      <figure class="portrait">
        <img src="/images/keith-williams-960.webp" srcset="/images/keith-williams-480.webp 480w, /images/keith-williams-960.webp 960w, /images/keith-williams-1440.webp 1440w" sizes="(max-width: 640px) min(440px, calc(100vw - 40px)), (max-width: 1392px) 46vw, 638px" alt="Keith Williams in a classroom" width="2316" height="3088" loading="lazy" decoding="async">
        <figcaption><span>02 / THE EDUCATOR</span><span>Keith Williams</span></figcaption>
      </figure>
      <div class="about-copy"><p class="eyebrow">04 / A LITTLE BACKGROUND</p><h2 id="about-title">An educator.<br>A builder.<br><em>Always a learner.</em></h2><p>I've taught at NJIT for more than two decades. Today, I'm a Senior University Lecturer and director of the B.S. Enterprise AI program.</p><p>My work brings together the classroom, hands-on projects, and consulting. I help people learn by doing, then take a step back and ask whether what they've made is useful.</p><a class="text-link" :href="site.faculty">My NJIT faculty profile <SiteIcon name="arrow-up-right" class="link-arrow" /></a></div>
    </section>

    <section id="zambia" class="experience-section wrap" aria-labelledby="experience-title">
      <div class="section-heading">
        <p class="eyebrow">05 / BEYOND THE CLASSROOM</p>
        <div><h2 id="experience-title">Learning across<br><em>borders.</em></h2><p>Teaching in Zambia brought me into new classrooms and new kinds of problems to work on.</p></div>
      </div>
      <div class="experience-grid">
        <article v-for="experience in zambiaExperience" :key="experience.year" class="experience-entry" :aria-labelledby="`zambia-${experience.year}-title`">
          <p class="eyebrow">{{ experience.year }} / ZAMBIA</p>
          <h3 :id="`zambia-${experience.year}-title`">{{ experience.title }}</h3>
          <p>{{ experience.text }}</p>
          <a class="text-link" :href="experience.href">{{ experience.linkLabel }} <SiteIcon name="arrow-up-right" class="link-arrow" /></a>
        </article>
      </div>
    </section>

    <section class="perspective-section wrap" aria-labelledby="perspective-title">
      <div class="section-heading compact"><p class="eyebrow">06 / IN THE CONVERSATION</p><h2 id="perspective-title">Learning in the open.</h2></div>
      <a class="article-link" href="https://news.njit.edu/njit-faculty-artificial-intelligence-learning-opportunity"><div><span class="eyebrow">NJIT NEWS · 2023</span><h3>Artificial intelligence is a learning opportunity.</h3><p>How AI is changing the classroom, and what that could mean for teachers and students.</p></div><SiteIcon name="arrow-up-right" class="article-arrow" /></a>
    </section>

    <section id="conversation" class="contact-section wrap" aria-labelledby="contact-title">
      <p class="eyebrow">HAVE SOMETHING IN MIND?</p>
      <div>
        <h2 id="contact-title">Let's explore<br><em>what's next.</em></h2>
        <div class="contact-actions">
          <p class="contact-intro">Want to talk about teaching, AI, or something you'd like to build? Tell me what you have in mind.</p>
          <a class="button button-dark" :href="site.conversation" aria-describedby="conversation-privacy">Start a conversation <SiteIcon name="arrow-up-right" class="link-arrow" /></a>
          <p class="contact-platform">Public on GitHub · GitHub sign-in required</p>
          <p id="conversation-privacy" class="contact-privacy">Your message and replies will be visible to everyone. Please don't include email addresses, phone numbers, student records, credentials, or other private information.</p>
        </div>
      </div>
    </section>
  </main>
  <main v-else id="main" tabindex="-1" class="document-page wrap"><Content /></main>

  <footer class="site-footer wrap"><div><a class="footer-name" href="/">Keith Williams</a><p>Curiosity with a compass.</p></div><div class="footer-links"><a :href="site.github">GitHub <SiteIcon name="arrow-up-right" class="link-arrow" /></a><a :href="site.faculty">NJIT <SiteIcon name="arrow-up-right" class="link-arrow" /></a><a href="#main">Back to top <SiteIcon name="arrow-up" class="link-arrow" /></a></div><div class="footer-fine"><span>© {{ new Date().getFullYear() }} Keith Williams</span><span>Built with VitePress · AI-generated landscape artwork</span><span>Personal website. Views are my own.</span></div></footer>
</template>
