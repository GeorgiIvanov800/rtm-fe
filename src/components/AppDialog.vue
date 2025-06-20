<script setup lang="ts">
import { useDialogStore } from '@/stores/dialogStore';
const dialogStore = useDialogStore();


</script>
<template>
  <div class="text-center pa-4">
    <v-dialog v-model="dialogStore.isVisible" width="auto">
      <v-card max-width="400" prepend-icon="mdi-update" text="dialogStore.message" title="dialogStore.title">
      </v-card>
    </v-dialog>
  </div>
</template>
