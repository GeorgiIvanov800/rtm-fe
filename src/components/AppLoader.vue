<script setup lang="ts">
const props = defineProps<{
  isLoading: boolean;
}>();
</script>
<template>
  <div class="text-center">
    <v-overlay :model-value="props.isLoading" class="align-center justify-center" persistent>
      <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
    </v-overlay>
  </div>
</template>
