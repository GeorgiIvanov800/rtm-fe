<script lang="ts" setup>
import {
  SaveSleeveRequestConditionEnum,
  SaveSleeveRequestTypeEnum,
  type SaveSleeveRequest,
} from '@/openapi';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { VDateInput } from 'vuetify/labs/VDateInput';
import { SleeveConditionDE } from '@/utils/translateTypes';
import { computed } from 'vue';
import { SleeveTypeDE } from '@/utils/translateTypes';
import { useField, useForm } from 'vee-validate';
import { validationSchema } from '@/utils/validations';

const router = useRouter();

const formData = ref<SaveSleeveRequest>({
  sequenceNumber: 0,
  sleeveNumber: 0,
  design: '',
  color: '',
  manufacturer: '',
  notes: '',
  gear: 0,
  circumference: 0,
  slot: 0,
  manufactureDate: '',
  width: 0,
  kmStand: 0,
  warehouse: '',
  status: '',
  type: 'FLAT',
  condition: 'NEW',
});

//Transle the types to German
const typesOptions = computed<{ value: SaveSleeveRequestTypeEnum; label: string; }[]>(() => {
  return (Object.entries(SleeveTypeDE) as [SaveSleeveRequestTypeEnum, string][]).map(
    ([enumValue, germanLabel]) => ({
      value: enumValue,
      label: germanLabel,
    }),
  );
});

//Transle the condition to German
const conditionOptions = computed<{ value: SaveSleeveRequestConditionEnum; label: string; }[]>(
  () => {
    return (Object.entries(SleeveConditionDE) as [SaveSleeveRequestConditionEnum, string][]).map(
      ([enumValue, germanLabel]) => ({
        value: enumValue,
        label: germanLabel,
      }),
    );
  },
);

const warehouseOptions: string[] = ['G', 'L1', 'L3'];

const { handleSubmit } = useForm<{
  sequenceNumber: number;
  sleeveNumber: number;
  design: string;
  color: string;
  manufacturer: string;
  gear: number;
  circumference: number;
  slot: number;
  width: number;
  warehouse: string;
  type: string;
  condition: string;
  manufactureDate: Date | null;

}>({
  validationSchema,
});


const sequenceNumber = useField<number>('sequenceNumber');
const sleeveNumber = useField<number>('sleeveNumber');
const design = useField<string>('design');
const color = useField<string>('color');
const manufacturer = useField<string>('manufacturer');
const gear = useField<number>('gear');
const circumference = useField<number>('circumference');
const slot = useField<number>('slot');
const width = useField<number>('width');
const warehouse = useField<string>('warehouse');
const type = useField<string>('type');
const condition = useField<string>('condition');
const { value: manufactureDate } =
  useField<Date | null>('manufactureDate');


const onSubmit = handleSubmit((values) => {
  console.log('On Submit clicked');
  console.log(manufactureDate.value);
  alert(JSON.stringify(values, null, 2));
});

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
          <v-toolbar flat color="primary">
            <v-toolbar-title class="white--text"> Neu Sleeve </v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <form @submit.prevent="onSubmit">
              <v-row dense>
                <v-col cols="12" sm="6">
                  <v-number-input v-model="sequenceNumber.value.value" label="Satz Nummer" outlined dense
                    :error-messages="sequenceNumber.errorMessage.value ? [sequenceNumber.errorMessage.value] : []" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-number-input v-model="sleeveNumber.value.value" label="Sleeve Nummer" outlined dense
                    :error-messages="sleeveNumber.errorMessage.value ? [sleeveNumber.errorMessage.value] : []" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="color.value.value" label="Farbe" outlined dense
                    :error-messages="color.errorMessage.value" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="design.value.value" label="Motiv" outlined dense
                    :error-messages="design.errorMessage.value" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select v-model="type.value.value" label="Sleeve typ" outlined dense :items="typesOptions"
                    item-title="label" item-value="value" :error-messages="type.errorMessage.value" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="manufacturer.value.value" label="Hersteller" outlined dense
                    :error-messages="manufacturer.errorMessage.value" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-date-input v-model="manufactureDate" clearable label="Herstellungsdatum"></v-date-input>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-number-input v-model="gear.value.value" label="Zahnrad"
                    :error-messages="gear.errorMessage.value"></v-number-input>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-number-input v-model="circumference.value.value" label="Umfang"
                    :error-messages="circumference.errorMessage.value"></v-number-input>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-number-input v-model="width.value.value" label="Breite"
                    :error-messages="width.errorMessage.value"></v-number-input>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-number-input v-model="formData.kmStand" label="Km Stand"></v-number-input>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select v-model="warehouse.value.value" label="Lager" :items="warehouseOptions" outlined dense
                    :error-messages="warehouse.errorMessage.value" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-number-input v-model="slot.value.value" label="Lager Platz"
                    :error-messages="slot.errorMessage.value"></v-number-input>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select v-model="condition.value.value" label="Sleeve-Zustand" :items="conditionOptions"
                    item-title="label" item-value="value" outlined dense
                    :error-messages="condition.errorMessage.value" />
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="formData.notes" label="Anmerkingen" rows="3" outlined dense />
                </v-col>
              </v-row>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="onSubmit"> Speichern </v-btn>
                <v-btn text @click="cancel">Zurück</v-btn>
                <v-btn text>Validate</v-btn>
              </v-card-actions>
            </form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
:deep(.v-number-input__control) {
  display: none !important;
}
</style>
