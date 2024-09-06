<template>
  <div class="container mt-4">
    <h1>Introduction</h1>
    <div class="pagination-buttons mt-4">
      <RouterLink to="/submit-ms/" class="btn btn-primary previous"> Previous</RouterLink>
      <RouterLink to="/submit-ms/3-intro" class="btn btn-primary next"> Next</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useManuscriptStore } from '@/stores/manuscript'
import { prompts } from '@/lib/prompts'
import submitChat from '@/lib/ollama-client'

const manuscriptStore = useManuscriptStore()
const hierarchy = computed(() => manuscriptStore.hierarchy)

let introduction = hierarchy.value.find((section) => section.heading === 'Introduction')
console.log('found intro', introduction)

let intro_paragraphs = introduction.paragraphs

let score_prompts = prompts.filter((prompt) => prompt.tag === 'score')

// combine all paragraphs into one intro paragraph
let intro_paragraph = intro_paragraphs.join(' ')

for (let index = 0; index < intro_paragraphs.length; index++) {
  const prompt = score_prompts[index]
  const paragraph = intro_paragraphs[index]
  let system_prompt = prompt.system_prompt
  let user_prompt = prompt.prompt + '```' + paragraph + '```'
  submitChat(user_prompt, system_prompt, intro_paragraph).then((response) => {
    console.log('question: ', prompt.prompt)
    console.log(response)

    // Update the paragraph_suggestions in the store
    introduction.paragraph_suggestions[index] = response
    manuscriptStore.updateParagraphSuggestions('Introduction', introduction.paragraph_suggestions)
  })
}
</script>

<style>
/* Add any additional styling here */
</style>
