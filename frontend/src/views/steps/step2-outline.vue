<template>
  <div class="container mt-4">
    <h1>Outline</h1>
    <div class="table-container">
      <div class="table-wrapper">
        <table class="table table-bordered table-light">
          <thead>
            <tr>
              <th>Heading</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="heading in requiredHeadings" :key="heading">
              <td>{{ heading }}</td>
              <td>
                <span>
                  <i v-if="isHeadingPresent(heading)" class="bi bi-check-circle-fill text-success"></i>
                  <i v-else class="bi bi-x-circle-fill text-danger"></i>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-wrapper">
        <table class="table table-bordered table-light">
          <thead>
            <tr>
              <th>Check</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Order Check</td>
              <td>
                <p v-if="isOrderCorrect" class="text-success">
                  <i class="bi bi-check-circle-fill"></i> The order is correct.
                </p>
                <p v-else class="text-danger">
                  <i class="bi bi-x-circle-fill"></i> The order is incorrect.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="pagination-buttons mt-4">
      <RouterLink to="/submit-ms/" class="btn btn-primary previous"> Previous</RouterLink>
      <RouterLink to="/submit-ms/3-intro" class="btn btn-primary next"> Next</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useManuscriptStore } from '@/stores/manuscript'
import { useRouter } from 'vue-router'

const manuscriptStore = useManuscriptStore()
const router = useRouter()
const hierarchy = computed(() => manuscriptStore.hierarchy)

const requiredHeadings = ['Abstract', 'Introduction', 'Results', 'Discussion', 'Data & Methods']

const isHeadingPresent = (heading) => {
  return hierarchy.value.some((section) => section.heading === heading)
}

const isOrderCorrect = computed(() => {
  const headings = hierarchy.value.map((section) => section.heading)
  return JSON.stringify(headings) === JSON.stringify(requiredHeadings)
})

const goToNextPage = () => {
  router.push('/submit-ms/3-intro') // Navigate to the next page
}
</script>

<style scoped>
.table-container {
  display: flex;
  justify-content: space-between;
}

.table-wrapper {
  flex: 1;
  margin-right: 10px; /* Space between tables */
}

.table-wrapper:last-child {
  margin-right: 0;
}

.table {
  border-collapse: collapse;
}

.table th, .table td {
  border: 1px solid #e0e0e0; /* Light grey border */
  padding: 0.75rem;
  text-align: left;
}

.table thead th {
  background-color: #f8f9fa; /* Very light grey */
  color: #333;
}

.table tbody tr:nth-child(even) {
  background-color: #f9f9f9; /* Light grey for alternating rows */
}

.table tbody tr:nth-child(odd) {
  background-color: #ffffff; /* White background for rows */
}

.text-success {
  color: #28a745; /* Green for success */
}

.text-danger {
  color: #dc3545; /* Red for error */
}

.pagination-buttons {
  display: flex;
  justify-content: space-between;
}

.btn-secondary {
  background-color: #6c757d; /* Subtle grey */
  border: none;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268; /* Darker grey on hover */
}
</style>
