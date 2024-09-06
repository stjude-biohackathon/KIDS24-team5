
<template>
  <nav aria-label="steps">
    <ul class="nav-steps">
      <li :class="{ 'current': isActive('/submit-ms/') }">
        <RouterLink to="/submit-ms/" exact>1. Submit</RouterLink>
      </li>
      <li :class="{ 'current': isActive('/submit-ms/2-outline') }">
        <RouterLink to="/submit-ms/2-outline" exact>2. Outline</RouterLink>
      </li>
      <li :class="{ 'current': isActive('/submit-ms/3-introduction') }">
        <RouterLink to="/submit-ms/3-introduction" exact>3. Introduction</RouterLink>
      </li>
      <li :class="{ 'current': isActive('/submit-ms/4-discussion') }">
        <RouterLink to="/submit-ms/4-discussion" exact>4. Discussion</RouterLink>
      </li>
    </ul>
  </nav>
  <RouterView />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

// Helper function to check if the current route is active
function isActive(path: string) {
  return route.path === path
}
</script>

<style scoped>
/* Step navigation style */
.nav-steps {
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
}

.nav-steps li {
  position: relative;
  flex: 1;
  text-align: center;
  padding: 1rem;
  background-color: #0d6efd; /* Blue for inactive steps */
  color: white;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out;
  margin-right: 0; /* Remove margin for the last step */
  z-index: 1;
}

.nav-steps li:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -15px; /* Adjust position of arrow */
  width: 0;
  height: 0;
  border-top: 1rem solid transparent;
  border-bottom: 1rem solid transparent;
  border-left: 15px solid #0d6efd; /* Arrow color */
  transform: translateY(-50%);
}

/* Active step styling (red background) */
.nav-steps li.current {
  background-color: #b94242; /* Red for active step */
  z-index: 2;
}

.nav-steps li.current::after {
  border-left-color: #b94242; /* Red arrow for the active step */
}

/* Inactive step arrow stays blue */
.nav-steps li:not(.current)::after {
  border-left-color: #0d6efd;
}

/* Link styles for steps */
.nav-steps li a {
  color: white;
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
}

/* Hover effect on inactive steps */
.nav-steps li:not(.current):hover {
  background-color: #2a02da; /* Darker blue on hover */
}

.nav-steps li:not(.current):hover::after {
  border-left-color: #2a02da; /* Arrow color on hover */
}
</style>
