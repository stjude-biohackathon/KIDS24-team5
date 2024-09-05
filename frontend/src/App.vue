<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

// listen for the llmLoading event and show a spinner
const loading = ref(false)

// add onMounting
onMounted(() => {
  // add listen for window
  window.addEventListener('llmLoading', () => {
    loading.value = true
  })
  window.addEventListener('llmLoaded', () => {
    loading.value = false
  })
})
</script>

<template>
  <header>
    <div v-if="loading" class="backdrop">
      <div class="spinner-container">
        <div class="spinner-grow bg-primary" style="width: 6rem; height: 6rem" role="status">
          <span class="d-none">Loading...</span>
        </div>
      </div>
    </div>
  </header>

  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 99%;
  height: 99%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
}

.logo {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px; /* Add some space between the image and the button */
}
</style>
