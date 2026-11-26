<script setup lang="ts">
import { data as stories } from '../articles.data'
import { deskOrder } from '../../editorial'
const desks = [...new Set([...deskOrder, ...stories.map(story => story.desk)])]
const sections = desks.map(name => ({
  name,
  stories: stories.filter(story => story.desk === name)
})).filter(section => section.stories.length)
</script>

<template>
  <div class="journal-index">
    <section v-for="section in sections" :key="section.name" class="journal-desk">
      <h2>{{ section.name }}</h2>
      <div class="journal-cards">
        <article v-for="story in section.stories" :key="story.url" class="journal-card">
          <a :href="story.url" class="journal-card-link">
            <img :src="story.image.path" alt="" :width="story.image.width || undefined" :height="story.image.height || undefined" loading="lazy" decoding="async">
            <h3>{{ story.title }}</h3>
          </a>
          <p>{{ story.teaser }}</p>
        </article>
      </div>
    </section>
  </div>
</template>
