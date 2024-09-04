<template>
  <div class="container">
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
  </div>
</template>

<script setup>
import './assets/styles.css' // Import the CSS file
</script>