<script lang="ts" setup>
import type { SaveSleeveRequest } from '@/openapi';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();

const formData = reactive<SaveSleeveRequest>({
  sequenceNumber: 0,
  sleeveNumber: 0,
  design: "",
  color: '',
  manufacturer: "",
  notes: '',
  gear: 0,
  circumference: 0,
  slot: 0,
  manufactureDate: '',
  width: 0,
  kmStand: 0,
  warehouse: '',
  status: '',
  type: "FLAT",
  condition: 'NEW',
});

const isValid = ref(false);

async function submit() {
  console.log('Sleeve Data: ', { ...formData });

}

function cancel() {
  router.back();
}
</script>

<template>
  <h1>Sleeve Form Works</h1>
  <v-container class="pa-4" fluid>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="2">
          <!-- Заглавен бар на картата -->
          <v-toolbar flat color="primary">
            <v-toolbar-title class="white--text">
              Нов ръкав
            </v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form ref="sleeveForm" v-model="isValid" lazy-validation>
              <v-row dense>
                <!-- Поле: Име -->
                <v-col cols="12" sm="6">
                  <v-text-field v-model="formData.sequenceNumber" label="Satz Nummer" outlined dense />
                </v-col>

                <!-- Поле: Цвят -->
                <v-col cols="12" sm="6">
                  <v-select v-model="formData.color" :items="['Бял', 'Черен', 'Син', 'Червен']" label="Цвят" outlined
                    dense />
                </v-col>

                <!-- Поле: Размер -->
                <v-col cols="12" sm="6">
                  <v-text-field v-model="formData.circumference" label="Размер" outlined dense />
                </v-col>

                <!-- Поле: Описание -->
                <v-col cols="12">
                  <v-textarea v-model="formData.sleeveNumber" label="Описание" rows="3" outlined dense />
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn :disabled="!isValid" color="primary" @click="submit">
              Създай
            </v-btn>
            <v-btn text @click="cancel">Откажи</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
