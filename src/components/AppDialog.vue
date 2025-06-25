<script setup lang="ts">
import { useDialogStore } from '@/stores/dialogStore';
import { useRouter } from 'vue-router';
const dialogStore = useDialogStore();
const router = useRouter();


</script>
<template>
  <div class="text-center pa-4">
    <v-dialog v-model="dialogStore.isVisible" width="auto">
      <v-card max-width="400" :prepend-icon="dialogStore.color === 'success' ? 'mdi-check-circle' : 'mdi-alert-circle'"
        :text="dialogStore.message" :title="dialogStore.title">
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn :color="dialogStore.color" variant="tonal" @click="dialogStore.hideDialog()">
            Schließen
          </v-btn>
        </template>
      </v-card>

    </v-dialog>
  </div>
</template>
