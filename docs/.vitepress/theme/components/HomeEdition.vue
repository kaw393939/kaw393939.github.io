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
