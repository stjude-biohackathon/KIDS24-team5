<template>
  <div>
    <h1>Outline</h1>
    <pre>{{ hierarchy }}</pre>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useManuscriptStore } from '@/stores/manuscript'

const manuscriptStore = useManuscriptStore()
const hierarchy = computed(() => manuscriptStore.hierarchy)
</script>
