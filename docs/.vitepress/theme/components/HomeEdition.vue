<script setup lang="ts">
import { data as edition } from '../home.data'
import EditorialImage from './EditorialImage.vue'
import { site } from '../../site'

const { lead, supporting } = edition
const [headline, ...emphasis] = lead.headline.trim().split(/\r?\n/)
</script>

<template>
  <section class="cover wrap" aria-labelledby="cover-title">
    <div class="cover-copy">
      <p class="eyebrow section-label"><span aria-hidden="true"></span> {{ lead.label }}</p>
      <h1 id="cover-title"><a :href="lead.url">{{ headline }}<template v-if="emphasis.length"><br><em>{{ emphasis.join(' ') }}</em></template></a></h1>
      <p class="cover-deck">{{ lead.teaser }}</p>
      <p class="cover-byline">By <a href="/about">{{ site.name }}</a> · NJIT lecturer and software builder</p>
      <a class="read-link" :href="lead.url">{{ lead.linkLabel || 'Read the feature' }} <span aria-hidden="true">→</span></a>
    </div>
    <figure class="cover-image">
      <EditorialImage :image="lead.image" placement="lead" />
      <figcaption>{{ lead.caption }} <span>{{ lead.credit }}</span></figcaption>
    </figure>
  </section>

  <section class="lab-feature wrap" aria-labelledby="home-lab-title">
    <div class="lab-exercise">
      <p class="eyebrow">Ordo Knowledge Lab</p>
      <h2 id="home-lab-title">Who saw the harbor light move?</h2>
      <p>Three fictional reports describe a light near a pier. Count the independent observations, then compare answers with a classmate. Which line supports your count?</p>
      <a class="read-link" href="/knowledge-lab/guide/walkthrough" target="_self">Try the ten-minute source check <span aria-hidden="true">→</span></a>
    </div>
    <ul class="lab-paths" aria-label="More ways to use the lab">
      <li><a class="inline-link" href="/knowledge-lab/students/" target="_self">Build the IS373 student project <span aria-hidden="true">→</span></a></li>
      <li><a class="inline-link" href="/knowledge-lab/kits/three-report-source-check.txt" target="_self">Get the classroom handout (.txt) <span aria-hidden="true">→</span></a></li>
      <li><a class="inline-link" href="/knowledge-lab/design/" target="_self">Read the proposed system design <span aria-hidden="true">→</span></a></li>
    </ul>
  </section>

  <section v-if="supporting.length" id="missions" class="dispatches wrap" aria-labelledby="dispatches-title">
    <div class="section-rule"><h2 id="dispatches-title">From the journal</h2> <a href="/writing">All writing <span aria-hidden="true">↗</span></a></div>
    <div class="dispatch-grid">
      <article v-for="(story, index) in supporting" :key="story.url" :class="index === 2 ? 'briefing-card' : 'dispatch-card'">
        <figure v-if="index !== 2" class="dispatch-image">
          <EditorialImage :image="story.image" placement="dispatch" />
          <figcaption>{{ story.credit }}</figcaption>
        </figure>
        <p class="eyebrow">{{ story.label }}</p>
        <h3><a :href="story.url">{{ story.headline }}</a></h3>
        <p>{{ story.teaser }}</p>
        <a class="inline-link" :href="story.url">{{ story.linkLabel || 'Read the story' }} <span aria-hidden="true">↗</span></a>
      </article>
    </div>
  </section>
</template>
