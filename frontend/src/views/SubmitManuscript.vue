<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <RouterLink to="/submit-ms/">
        <a>
          <li class="breadcrumb-item">1. Submit</li>
        </a>
      </RouterLink>
      <RouterLink to="/submit-ms/2-outline">
        <a>
          <li class="breadcrumb-item">2. Outline</li>
        </a>
      </RouterLink>
      <RouterLink to="/submit-ms/2-outline">
        <a>
          <li class="breadcrumb-item">3. Paragraph</li>
        </a>
      </RouterLink>
      <RouterLink to="/submit-ms/2-outline">
        <a>
          <li class="breadcrumb-item">4. Connectivity</li>
        </a>
      </RouterLink>
    </ol>
  </nav>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
