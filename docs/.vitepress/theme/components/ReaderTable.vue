<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, useId } from 'vue'
defineProps<{ label: string }>()
const viewport = ref<HTMLElement>()
const overflow = ref<boolean | null>(null)
const hintId = useId()
let observer: ResizeObserver | undefined

function measure() {
  const node = viewport.value
  if (node) overflow.value = node.scrollWidth > node.clientWidth + 1
}
onMounted(async () => {
  await nextTick()
  measure()
  if (viewport.value && 'ResizeObserver' in window) {
    observer = new ResizeObserver(measure)
    observer.observe(viewport.value)
    const table = viewport.value.querySelector('table')
    if (table) observer.observe(table)
  }
})
onUnmounted(() => observer?.disconnect())
</script>
<template>
  <div class="reader-table">
    <p v-if="overflow" :id="hintId" class="table-hint">Scroll sideways to see more columns.</p>
    <div ref="viewport" class="table-scroll" :role="overflow !== false ? 'region' : undefined"
      :tabindex="overflow !== false ? 0 : undefined" :aria-label="overflow !== false ? label : undefined"
      :aria-describedby="overflow ? hintId : undefined"><slot /></div>
  </div>
</template>
