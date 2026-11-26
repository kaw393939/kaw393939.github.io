<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import type { ImageAsset } from '../../editorial'
import manifest from '../../generated/reader-images.json'

const sizes = {
  lead: '(max-width: 720px) 92vw, min(51vw, 49rem)',
  dispatch: '(max-width: 540px) 92vw, (max-width: 1050px) 45vw, min(33vw, 31rem)',
  card: '(max-width: 550px) 92vw, min(45vw, 28.3rem)',
  article: 'min(92vw, 44rem)',
  index: 'min(92vw, 58rem)'
}
const props = defineProps<{ image: ImageAsset, placement: keyof typeof sizes, alt?: string }>()
const variants: Record<string, { url: string, width: number }[]> = manifest
const srcset = computed(() => variants[props.image.path]?.map(
  ({ url, width }) => withBase(url) + ' ' + width + 'w'
).join(', '))
const priority = computed(() => ['lead', 'article', 'index'].includes(props.placement))
</script>

<template>
  <picture>
    <source v-if="srcset" type="image/webp" :srcset="srcset" :sizes="sizes[placement]">
    <img :src="withBase(image.path)" :alt="alt ?? image.alt" :width="image.width || undefined"
      :height="image.height || undefined" :loading="priority ? undefined : 'lazy'"
      :fetchpriority="priority ? 'high' : undefined" decoding="async">
  </picture>
</template>
