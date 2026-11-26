<script setup lang="ts">
import { data as stories } from '../articles.data'
import { deskOrder } from '../../editorial'
import EditorialImage from './EditorialImage.vue'
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
            <EditorialImage :image="story.image" placement="card" alt="" />
            <h3>{{ story.title }}</h3>
          </a>
          <p>{{ story.teaser }}</p>
        </article>
      </div>
    </section>
  </div>
</template>
