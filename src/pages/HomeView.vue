<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, type Router } from 'vue-router';
import type { ValidationRule } from 'vuetify';
import type { VForm } from 'vuetify/lib/components/VForm/VForm.mjs';


const form = ref<InstanceType<typeof VForm> | null>(null);
const printForm = ref<InstanceType<typeof VForm> | null>(null);
const searchValue = ref('');
const printValue = ref('');
const router: Router = useRouter();

const numericRules: ValidationRule[] = [
  (value: string): true | string => {
    if (/^[0-9]+$/.test(value)) return true;
    return 'Bitte geben Sie nur Nummern';
  },
];

async function onSearch(): Promise<void> {
  const result = await form.value?.validate();
  if (result?.valid) {
    router.push({ path: '/sleeves', query: { sleeveSequence: searchValue.value } });

  } else {
    return;
  }
}

async function onPrint(): Promise<void> {
  const result = await printForm.value?.validate();
  if (result?.valid) {
    console.log('PrintValue FROM HOME', printValue);
    router.push({ path: 'sleeves/print', query: { sleeveNumber: printValue.value } });
  }

}

</script>

<template>
  <v-container class="pa-4 fill-height d-flex align-center justify-center">
    <v-row class="flex-column" align="center" justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="2" class="mb-12">
          <v-card-title>
            <v-icon left>mdi-magnify</v-icon>
            Sleeve Satznummer Suchen
          </v-card-title>
          <v-card-text>
            <v-form ref="form" @submit.prevent>
              <v-text-field v-model="searchValue" :rules="numericRules" label="Bitte Sleeve Satznummer Eingeben"
                clearable @keyup.enter="onSearch" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="onSearch" prepend-icon="mdi-magnify" color="primary" variant="outlined" rounded="xl"
              size="x-large">
              Suchen
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card elevation="2">
          <v-card-title>
            <v-icon left>mdi-printer</v-icon>
            Print a Pick Note
          </v-card-title>
          <v-card-text>
            Generate and print a note for picking sleeves from the warehouse.
            <v-form ref="printForm" @submit.prevent>
              <v-text-field v-model="printValue" :rules="numericRules" label="Bitte Sleeve Nummer Eingeben" clearable
                @keyup.enter="onPrint" />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="onPrint" color="secondary"> Print Note </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
