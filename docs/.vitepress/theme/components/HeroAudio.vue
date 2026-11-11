<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const player = ref<HTMLAudioElement | null>(null)
const playing = ref(false)
const failed = ref(false)

async function toggleAudio() {
  if (!player.value) return
  if (!player.value.paused) {
    player.value.pause()
    return
  }
  failed.value = false
  try {
    await player.value.play()
  } catch {
    failed.value = true
  }
}

onUnmounted(() => player.value?.pause())
</script>

<template>
  <div class="hero-audio" aria-label="Audio introduction">
    <div class="hero-audio-row">
      <button class="hero-audio-toggle" type="button"
        :aria-label="playing ? 'Pause audio introduction' : 'Play audio introduction'"
        :aria-pressed="playing"
        aria-controls="hero-audio-player" @click="toggleAudio">
        <span class="hero-audio-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" focusable="false">
            <path v-if="playing" d="M7 5h3v14H7zm7 0h3v14h-3z" fill="currentColor" />
            <path v-else d="M8 4.5 19 12 8 19.5z" fill="currentColor" />
          </svg>
        </span>
        <span>{{ playing ? 'Pause introduction' : 'Listen to introduction' }}</span>
      </button>
      <span class="hero-audio-meta">16 sec · AI-narrated</span>
    </div>
    <details class="hero-audio-transcript">
      <summary>Read transcript</summary>
      <p>Hi, I'm Keith Williams. I teach AI, build practical tools, and explore how education changes when people and intelligent systems work together. I believe the best technology expands our curiosity and capabilities, while keeping human judgment at the center.</p>
    </details>
    <p v-if="failed" class="hero-audio-error" role="alert">Audio unavailable. You can read the transcript above.</p>
    <audio id="hero-audio-player" ref="player" src="/audio/portfolio-intro.mp3"
      preload="none" hidden
      @play="playing = true" @pause="playing = false"
      @ended="playing = false" @error="failed = true"></audio>
  </div>
</template>
