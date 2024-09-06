<template>
  <div class="container mt-4">
    <h1 class="text-center">Discussion <br /></h1>
    <div class="card w-70 p-3 py-1">
      <div class="card-body pb-0">
        <p class="card-text">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita,
          consectetur quo optio quaerat ratione minus, deleniti laborum beatae
          doloremque eos animi repudiandae officiis adipisci natus impedit nihil
          dicta sed corrupti!  

          <p class="mark_yellow">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum corporis distinctio qui hic unde quibusdam ad, accusamus laudantium iure cum, omnis iste voluptatibus non aperiam facere quo veniam magni voluptatem?
          </p>
        </p>
      </div>
    </div>
    <div class="pagination-buttons mt-4">
      <RouterLink to="/submit-ms/2-outline" class="btn btn-primary previous"> Previous</RouterLink>
      <RouterLink to="/submit-ms/4-discussion" class="btn btn-primary next"> Next</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useManuscriptStore } from '@/stores/manuscript'
import { prompts } from '@/lib/prompts'
import submitChat from '@/lib/ollama-client'

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
  const prompt = score_prompts[index]
  const paragraph = intro_paragraphs[index]
  let system_prompt = prompt.system_prompt
  let user_prompt = prompt.prompt + '```' + paragraph + '```'
  submitChat(user_prompt, system_prompt, full_intro_paragraph).then((response) => {
    // Update the paragraph_suggestions in the store
    introduction.paragraph_suggestions[index] = JSON.parse(response)
    manuscriptStore.updateParagraphSuggestions('Introduction', introduction.paragraph_suggestions)
  })
}

// Track the current slide index
const currentSlide = ref(0)

// Update the current slide index when the carousel slides
const updateCurrentSlide = (event) => {
  currentSlide.value = event.to
}

// add onMounted
onMounted(() => {
  const myCarousel = document.getElementById('introCarousel')
  myCarousel.addEventListener('slide.bs.carousel', (event) => {
    updateCurrentSlide(event)
  })
})
</script>

<style>
.card {
  width: 70%;
}

.mark_yellow {
  margin: 0 -0.4em;
  padding: 0.1em 0.4em;
  border-radius: 0.8em 0.3em;
  background: transparent;
  background-image: linear-gradient(
    to right,
    rgba(255, 225, 0, 0.1),
    rgba(255, 225, 0, 0.7) 4%,
    rgba(255, 225, 0, 0.3)
  );
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}
</style>
