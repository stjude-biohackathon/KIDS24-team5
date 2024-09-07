<template>
  <div class="container mt-4">
    <h1 class="text-center">Introduction <br /></h1>
    <h4 class="text-center">
      <template v-if="currentSlide >= introParagraphs.length">
        Overall review
      </template>
      <template v-else>
        (paragraph {{ currentSlide + 1 }} out of {{ introParagraphs.length }})
      </template>
    </h4>
    <div
      id="introCarousel"
      class="carousel carousel-dark slide"
      data-bs-interval="false"
      @slide.bs.carousel="updateCurrentSlide"
    >
      <div class="carousel-inner">
        <div
          v-for="(paragraph, index) in introParagraphs"
          :key="index"
          :class="['carousel-item', { active: index === 0 }]"
        >
          <div class="d-flex justify-content-center">
            <div class="card w-70 p-3 py-1">
              <div class="card-body pb-0">
                <p class="card-text">
                  {{ paragraph }}
                </p>
                <div class="mt-3">
                  <div class="mt-2 shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                    <div class="d-flex align-items-center mb-2">
                      <i class="bi bi-person-circle me-2" style="font-size: 1.5rem"></i>
                      <span>Reviewer #3</span>
                    </div>
                    <span v-for="n in 5" :key="n" class="me-1">
                      <i
                        :class="[
                          'bi',
                          n <= paragraphSuggestions[index]?.score
                            ? 'bi-star-fill text-warning'
                            : 'bi-star text-muted'
                        ]"
                      ></i>
                    </span>
                    {{ paragraphSuggestions[index]?.comment }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          :key="9"
          :class="['carousel-item']"
          v-if="loaded"
        >
          <div class="d-flex justify-content-center">
            <div class="card w-70 p-3 py-1">
              <div class="card-body pb-0">
                <p class="card-text">
                  <div v-html="fullIntroParagraphHighlighted">
                  </div>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#introCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#introCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div class="pagination-buttons mt-4">
      <RouterLink to="/submit-ms/2-outline" class="btn pagination-button previous">
        Previous
      </RouterLink>
      <RouterLink to="/submit-ms/4-discussion" class="btn pagination-button next">
        Next
      </RouterLink>
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

const introduction = computed(() => hierarchy.value.find((section) => section.heading === 'Introduction'))
const introParagraphs = computed(() => introduction.value.paragraphs)
const paragraphSuggestions = computed(() => introduction.value.paragraph_suggestions || [])
const scorePrompts = computed(() => prompts.filter((prompt) => prompt.tag === 'score'))

const fullIntroParagraph = computed(() => introParagraphs.value.join(' '))


// Ensure paragraph_suggestions is initialized as an array
if (!introduction.value.paragraph_suggestions) {
  introduction.value.paragraph_suggestions = []
}

for (let index = 0; index < introParagraphs.value.length; index++) {
  const prompt = scorePrompts.value[index]
  const paragraph = introParagraphs.value[index]
  let system_prompt = prompt.system_prompt
  let user_prompt = prompt.prompt + '```' + paragraph + '```'
  submitChat(user_prompt, system_prompt, fullIntroParagraph.value).then((response) => {
        // Ensure the array is still defined before setting the value
    if (!introduction.value.paragraph_suggestions) {
      introduction.value.paragraph_suggestions = []
    }

    introduction.value.paragraph_suggestions[index] = JSON.parse(response)
    manuscriptStore.updateParagraphSuggestions('Introduction', introduction.value.paragraph_suggestions)
  })
}

const currentSlide = ref(0)

const updateCurrentSlide = (event) => {
  currentSlide.value = event.to
}

onMounted(async () => {
  const myCarousel = document.getElementById('introCarousel')
  myCarousel.addEventListener('slide.bs.carousel', (event) => {
    updateCurrentSlide(event)
  })

  await fillFullIntroSuggestions()
})

const loaded = ref(false)

const fullIntroParagraphHighlighted = computed(() => {
  let suggestions = introduction.value.suggestions
  let highlighted = fullIntroParagraph.value
  suggestions.forEach((suggestion) => {
    highlighted = highlighted.replace(
      suggestion.sentence,
      `<div class="mark_yellow" data-bs-toggle="tooltip" title="${suggestion.suggestion}">${suggestion.sentence}</div>`
    )
  })
  return highlighted
})

async function fillFullIntroSuggestions() {
  let introductionPrompt = `The given context contains the introduction section of manuscript. Critically review each sentence. Now output a JSON array that contains any sentence that you think is a low rating and include your suggestion in the output.

Output your answer in a JSON format that contains an array of the low rated sentences that follow the schema: [{"sentence": string, "suggestion": string}]. Limit your output to 3 sentences.

Respond only with valid JSON. Do not write an introduction or summary. Do not use markdown or any other formatting.`

  await submitChat(introductionPrompt, '', fullIntroParagraph.value).then((response) => {
    manuscriptStore.updateSectionSuggestions('Introduction', JSON.parse(response))
    loaded.value = true
  })
}
</script>

<style>
.card {
  width: 70%;
}
.pagination-buttons {
  display: flex;
  justify-content: space-between;
}
.pagination-button {
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 1rem;
  text-align: center;
  display: inline-flex;
  align-items: center;
  transition: background-color 0.3s, transform 0.3s;
}

.pagination-button:hover {
  background-color: #5a6268;
  transform: scale(1.05);
}

.pagination-button i {
  margin-left: 8px;
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
  display: inline;
}
</style>