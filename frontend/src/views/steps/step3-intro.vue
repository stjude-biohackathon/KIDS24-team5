<template>
  <div class="container mt-4">
    <h1 class="text-center">Introduction <br /></h1>
    <h4 class="text-center">
      (paragraph {{ currentSlide + 1 }} out of {{ intro_paragraphs.length }})
    </h4>
    <div
      id="introCarousel"
      class="carousel carousel-dark slide"
      data-bs-interval="false"
      @slide.bs.carousel="updateCurrentSlide"
    >
      <div class="carousel-inner">
        <div
          v-for="(paragraph, index) in intro_paragraphs"
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
                          n <= paragraph_suggestions[index]?.score
                            ? 'bi-star-fill text-warning'
                            : 'bi-star text-muted'
                        ]"
                      ></i>
                    </span>
                    {{ paragraph_suggestions[index]?.comment }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          :key="9"
          :class="['carousel-item']"
        >
          <div class="d-flex justify-content-center">
            <div class="card w-70 p-3 py-1">
              <div class="card-body pb-0">
                <p class="card-text">
                  <div v-html="full_intro_paragraph_highlighted">
                  </div>

                  <pre>
                    {{ introduction.suggestions }}
                  </pre>
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
// import getDistances from '@/lib/ollama-embeddings'

const manuscriptStore = useManuscriptStore()
const hierarchy = computed(() => manuscriptStore.hierarchy)

let introduction = hierarchy.value.find((section) => section.heading === 'Introduction')

let intro_paragraphs = introduction.paragraphs
let paragraph_suggestions = introduction.paragraph_suggestions || []

let score_prompts = prompts.filter((prompt) => prompt.tag === 'score')

// combine all paragraphs into one intro paragraph
let full_intro_paragraph = intro_paragraphs.join(' ')

// for (let index = 0; index < intro_paragraphs.length; index++) {
//   let paragraph = intro_paragraphs[index]
//   let sentences = paragraph.split('. ').filter((sentence) => sentence.length > 30)
//   getDistances(sentences).then((response) => {
//     introduction.paragraph_connectivity_suggestions[index] = response
//   })
// }
// let paragraph1 = intro_paragraphs[0]
// // find sentences in paragraph1
// let sentences_paragraph1 = paragraph1.split('. ').filter((sentence) => sentence.length > 30)

//   getDistances(sentences_paragraph1).then((response) => {
//     // console.log('sentence: ', sentences_paragraph1)
//     console.log(response)
//     introduction.connectivity_scores[0] = response
// })

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

// also get the entire intro rating.

// Track the current slide index
const currentSlide = ref(0)

// Update the current slide index when the carousel slides
const updateCurrentSlide = (event) => {
  currentSlide.value = event.to
}

// add onMounted
onMounted(async () => {
  const myCarousel = document.getElementById('introCarousel')
  myCarousel.addEventListener('slide.bs.carousel', (event) => {
    updateCurrentSlide(event)
  })

  // this will get the overall suggestions
  await fillFullIntroSuggestions()
})

const full_intro_paragraph_highlighted = computed(() => {
  let suggestions = introduction.suggestions
  let highlighted = full_intro_paragraph
  suggestions.forEach((suggestion) => {
    highlighted = highlighted.replace(
      suggestion.sentence,
      `<div class="mark_yellow" data-bs-toggle="tooltip" title="${suggestion.suggestion}">${suggestion.sentence}</div>`
    )
  })
  return highlighted
})


async function fillFullIntroSuggestions() {
  // also get the entire intro rating.
  let introductionPrompt = `The given context contains the introduction section of manuscript. Critically review each sentence. Now output a JSON array that contains any sentence that you think is a low rating and include your suggestion in the output.

Output your answer in a JSON format that contains an array of the low rated sentences that follow the scehma: [{"sentence": string, "suggestion": string}]. Limit your output to 3 sentences.

Respond only with valid JSON. Do not write an introduction or summary. Do not use markdown or any other formatting.`

/*
  await submitChat(introductionPrompt, '', full_intro_paragraph).then((response) => {
    // Update the paragraph_suggestions in the store
    console.log('full intro suggestions', JSON.parse(response))
    manuscriptStore.updateSectionSuggestions('Introduction', JSON.parse(response))
  })
    */
}
</script>

<style>
.card {
  width: 70%;
}
.pagination-buttons {
  display: flex;
  justify-content: space-between; /* Distribute space between buttons */
}
.pagination-button {
  background-color: #6c757d; /* Gray background */
  color: white; /* White text color */
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 1rem;
  text-align: center;
  display: inline-flex;
  align-items: center;
  transition:
    background-color 0.3s,
    transform 0.3s;
}

.pagination-button:hover {
  background-color: #5a6268; /* Slightly darker gray on hover */
  transform: scale(1.05); /* Slightly scale up on hover */
}

.pagination-button i {
  margin-left: 8px; /* Space between text and icon */
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
  display:inline;
}
</style>
