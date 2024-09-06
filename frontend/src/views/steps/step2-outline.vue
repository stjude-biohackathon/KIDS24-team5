<template>
  <div class="container mt-4">
    <h1>Outline</h1>
    <ul class="list-group">
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        v-for="heading in requiredHeadings"
        :key="heading"
      >
        {{ heading }}
        <span>
          <i v-if="isHeadingPresent(heading)" class="bi bi-check-circle-fill text-success"></i>
          <i v-else class="bi bi-x-circle-fill text-danger"></i>
        </span>
      </li>
    </ul>
    <div class="mt-4">
      <h2>Order Check</h2>
      <p v-if="isOrderCorrect" class="text-success">
        <i class="bi bi-check-circle-fill"></i> The order is correct.
      </p>
      <p v-else class="text-danger"><i class="bi bi-x-circle-fill"></i> The order is incorrect.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useManuscriptStore } from '@/stores/manuscript'

const manuscriptStore = useManuscriptStore()
const hierarchy = computed(() => manuscriptStore.hierarchy)

const requiredHeadings = ['Abstract', 'Introduction', 'Results', 'Discussion', 'Data & Methods']

const isHeadingPresent = (heading) => {
  return hierarchy.value.some((section) => section.heading === heading)
}

const isOrderCorrect = computed(() => {
  const headings = hierarchy.value.map((section) => section.heading)
  return JSON.stringify(headings) === JSON.stringify(requiredHeadings)
})
</script>

<style>
/* Add any additional styling here */
</style>
