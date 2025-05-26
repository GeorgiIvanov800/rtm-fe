<script setup lang="ts">
import type { ValidationRule } from 'vuetify';


const numericRules: ValidationRule[] = [
  (value: string): true | string => {
    if (/^[0-9]+$/.test(value)) return true
    return "Bitte geben Sie nur Nummern"
  }
]
</script>


<template>
  <v-container class="pa-4 fill-height d-flex align-center justify-center">
    <v-row class="flex-column" align="center" justify="center">
      <v-col cols="12" md="8" lg="6">
        <!-- Search Card -->
        <v-card elevation="2" class="mb-12">
          <v-card-title>
            <v-icon left>mdi-magnify</v-icon>
            Suche Sleeve
          </v-card-title>
          <v-card-text>
            <v-text-field :rules="numericRules" label="Bitte Sleeve Satznummer Eingeben" clearable />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn prepend-icon="$vuetify" color="primary" variant="outlined" rounded="xl" size="x-large">
              Search
            </v-btn>
          </v-card-actions>
        </v-card>

        <!-- Print Note Card -->
        <v-card elevation="2">
          <v-card-title>
            <v-icon left>mdi-printer</v-icon>
            Print a Pick Note
          </v-card-title>
          <v-card-text>
            Generate and print a note for picking sleeves from the warehouse.
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="secondary">
              Print Note
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
