<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { articleMedia, pageRoute } from '../../editorial'
import { site } from '../../site'
import ArticleShare from './ArticleShare.vue'

const { page, frontmatter } = useData()
const media = computed(() => articleMedia(page.value.relativePath, frontmatter.value).cover)
const url = computed(() => site.url + pageRoute(page.value.relativePath))
</script>

<template>
  <div class="story-intro">
    <p class="article-deck">{{ frontmatter.teaser || page.description }}</p>
    <p class="byline">
      <a href="/about">{{ site.name }}</a><template v-if="frontmatter.articleGenre"> · {{ frontmatter.articleGenre }}</template>
    </p>
    <ArticleShare :key="url" :url="url" :title="page.title" />
    <figure class="story-cover editorial-figure">
      <img :src="media.path" :alt="media.alt" :width="media.width || undefined" :height="media.height || undefined" fetchpriority="high" decoding="async">
      <figcaption><template v-if="frontmatter.imageCaption">{{ frontmatter.imageCaption }} </template>{{ frontmatter.imageCredit || 'AI-generated editorial illustration.' }}</figcaption>
    </figure>
  </div>
</template>
