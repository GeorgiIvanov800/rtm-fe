<template>
  <v-footer app class="d-flex flex-column" color="#1565C0">
    <div class="d-flex w-100 align-center px-4 py-2">
      <strong>Get connected with me on social networks!</strong>

      <div class="d-flex ga-2 ms-auto">
        <v-btn v-for="icon in icons" :key="icon" :icon="icon" size="small" variant="plain"></v-btn>
      </div>
    </div>

    <div class="px-4 py-2 bg-surface-variant text-center w-100 rounded-lg">
      {{ new Date().getFullYear() }} — <strong>Georgi Ivanov</strong>
    </div>
  </v-footer>
</template>
<script setup lang="ts">
const icons = [
  'mdi-facebook',
  'mdi-twitter',
  'mdi-linkedin',
]
</script>
