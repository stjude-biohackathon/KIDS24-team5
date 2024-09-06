<template>
  <div class="container mt-4">
    <h1 class="text-center">Connectivity</h1>
    <div class="card w-70 p-3 py-1">
      <div class="card-body pb-0">
        <div class="card-text">
          <pre>
            {{ introduction.paragraph_connectivity_suggestions }}
          </pre>
        </div>
      </div>
    </div>
    <div class="pagination-buttons mt-4">
      <RouterLink to="/submit-ms/3-intro" class="btn btn-primary previous"> Previous</RouterLink>
      <RouterLink to="/submit-ms/5-connectivity" class="btn btn-primary next"> Next</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useManuscriptStore } from '@/stores/manuscript'
import { prompts } from '@/lib/prompts'
import submitChat from '@/lib/ollama-client'
import getDistances from '@/lib/ollama-embeddings'

const manuscriptStore = useManuscriptStore()

const hierarchy = computed(() => manuscriptStore.hierarchy)

let introduction = hierarchy.value.find((section) => section.heading === 'Introduction')
console.log('found intro', introduction)

let intro_paragraphs = introduction.paragraphs
let paragraph_suggestions = introduction.paragraph_suggestions || []

let score_prompts = prompts.filter((prompt) => prompt.tag === 'score')

// combine all paragraphs into one intro paragraph
let full_intro_paragraph = intro_paragraphs.join(' ')

for (let index = 0; index < intro_paragraphs.length; index++) {
  let paragraph = intro_paragraphs[index]
  let sentences = paragraph.split('. ').filter((sentence) => sentence.length > 30)
  getDistances(sentences).then((response) => {
    introduction.paragraph_connectivity_suggestions[index] = response
  })
}
// let paragraph1 = intro_paragraphs[0]
// // find sentences in paragraph1
// let sentences_paragraph1 = paragraph1.split('. ').filter((sentence) => sentence.length > 30)

//   getDistances(sentences_paragraph1).then((response) => {
//     // console.log('sentence: ', sentences_paragraph1)
//     console.log(response)
//     introduction.connectivity_scores[0] = response
// })
</script>
