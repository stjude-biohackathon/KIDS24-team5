<template>
  <div class="container mt-4">
    <h1 class="text-center">Discussion <br /></h1>
    <div class="card w-70 p-3 py-1">
      <div class="card-body pb-0">
        <div class="card-text">
          <div class="alert alert-warning fs-2" role="alert">
            <i class="bi bi-exclamation-triangle-fill"></i> This page is under development.
          </div>
        </div>
      </div>
    </div>
    <div class="pagination-buttons mt-4">
      <RouterLink to="/submit-ms/3-intro" class="btn btn-primary previous"> Previous</RouterLink>
      <RouterLink to="/submit-ms/5-connectivity" class="btn btn-primary next"> Next</RouterLink>
    </div>
  </div>
</template>

<script setup></script>

<style>
.card {
  width: 70%;
}
</style>
