<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'

const props = defineProps<{ url: string; title: string }>()
const linkedIn = computed(() => 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(props.url))
const canShare = ref(false)
const enhanced = ref(false)
const status = ref('')
const manual = ref(false)
const field = ref<HTMLInputElement>()

onMounted(() => {
  canShare.value = typeof navigator.share === 'function'
  enhanced.value = true
})

async function selectLink(message: string) {
  status.value = message
  manual.value = true
  await nextTick()
  field.value?.focus()
  field.value?.select()
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(props.url)
    manual.value = false
    status.value = 'Article link copied.'
  } catch {
    await selectLink('Copy the selected link manually.')
  }
}

async function share() {
  try {
    await navigator.share({ url: props.url, title: props.title })
  } catch (error) {
    if (!(error instanceof Error && error.name === 'AbortError')) await selectLink('Sharing is unavailable. Copy the selected link instead.')
  }
}
</script>

<template>
  <div class="story-share" role="group" aria-label="Share this article">
    <a :href="linkedIn" aria-label="Share on LinkedIn (opens LinkedIn to prepare your post)">Share on LinkedIn</a>
    <button v-if="enhanced" type="button" @click="copyLink">Copy link</button>
    <button v-if="canShare" type="button" @click="share">More sharing options</button>
    <span class="share-feedback" role="status" aria-live="polite" aria-atomic="true">{{ status }}</span>
    <label v-if="manual" class="share-manual">Article link
      <input ref="field" :value="url" type="url" readonly @focus="field?.select()">
    </label>
  </div>
</template>
