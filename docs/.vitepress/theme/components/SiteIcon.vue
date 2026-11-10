<script setup lang="ts">
defineProps<{ name: string }>()
</script>

<template>
  <svg v-if="name === 'compass'" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <path d="M24 3 28 20 45 24 28 28 24 45 20 28 3 24 20 20Z" fill="currentColor" />
    <circle cx="24" cy="24" r="3" fill="var(--paper)" />
  </svg>
  <svg v-else-if="name === 'book'" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <path d="M8 14c9-3 16-1 24 5 8-6 15-8 24-5v35c-9-3-16-1-24 5-8-6-15-8-24-5Zm24 5v35" />
  </svg>
  <svg v-else-if="name === 'specification'" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <path d="M17 9h30v46H17zM24 21h16M24 31h16M24 41h9m-25-16-5 7 5 7m48-14 5 7-5 7" />
  </svg>
  <svg v-else-if="name === 'judgment'" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <circle cx="32" cy="32" r="23" />
    <path d="m39 25-4 10-10 4 4-10ZM32 3v8M32 53v8M3 32h8M53 32h8" />
  </svg>
  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
    <path v-if="name === 'arrow-down-right'" d="m5 5 14 14M5 19h14V5" />
    <path v-else-if="name === 'arrow-up'" d="M12 20V4m-7 7 7-7 7 7" />
    <path v-else d="M5 19 19 5M5 5h14v14" />
  </svg>
</template>
