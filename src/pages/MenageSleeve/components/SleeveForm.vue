<script lang="ts" setup>
import {
  SaveSleeveRequestConditionEnum,
  SaveSleeveRequestTypeEnum,
  type SaveSleeveRequest,
} from '@/openapi';
import { useRouter } from 'vue-router';
import { VDateInput } from 'vuetify/labs/VDateInput';
import { SleeveConditionDE } from '@/utils/translateTypes';
import { computed } from 'vue';
import { SleeveTypeDE } from '@/utils/translateTypes';
import { useField, useForm } from 'vee-validate';
import { validationSchema } from '@/utils/validations';

const router = useRouter();
const emit = defineEmits<{
  (e: 'save', payload: SaveSleeveRequest): void;
}>();



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
  kmStand: number;
  notes: string;

}>({
  validationSchema,
});


const { value: sequenceNumber, errorMessage: sequenceNumberError } = useField<number>('sequenceNumber');
const { value: sleeveNumber, errorMessage: sleeveNumberError } = useField<number>('sleeveNumber');
const { value: design, errorMessage: designError } = useField<string>('design');
const { value: color, errorMessage: colorError } = useField<string>('color');
const { value: manufacturer, errorMessage: manufacturerError } = useField<string>('manufacturer');
const { value: gear, errorMessage: gearError } = useField<number>('gear');
const { value: circumference, errorMessage: circumferenceError } = useField<number>('circumference');
const { value: slot, errorMessage: slotError } = useField<number>('slot');
const { value: width, errorMessage: widthError } = useField<number>('width');
const { value: warehouse, errorMessage: warehouseError } = useField<string>('warehouse');
const { value: type, errorMessage: typeError } = useField<SaveSleeveRequestTypeEnum>('type');
const { value: condition, errorMessage: conditionError } = useField<SaveSleeveRequestConditionEnum>('condition');
const { value: manufactureDate } = useField<Date | null>('manufactureDate');
const { value: kmStand } = useField<number>('kmStand');
const { value: notes } = useField<string>('notes');


const onSubmit = handleSubmit((values) => {
  console.log('On Submit clicked');

  const payload: SaveSleeveRequest = {
    ...values,
    manufactureDate: values.manufactureDate ? values.manufactureDate.toISOString().slice(0, 10) : '',
  };
  emit('save', payload);
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
                  <v-number-input v-model="sequenceNumber" label="Satz Nummer" outlined dense
                    :error-messages="sequenceNumberError" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-number-input v-model="sleeveNumber" label="Sleeve Nummer" outlined dense
                    :error-messages="sleeveNumberError" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="color" label="Farbe" outlined dense :error-messages="colorError" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="design" label="Motiv" outlined dense :error-messages="designError" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select v-model="type" label="Sleeve typ" outlined dense :items="typesOptions" item-title="label"
                    item-value="value" :error-messages="typeError" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="manufacturer" label="Hersteller" outlined dense
                    :error-messages="manufacturerError" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-date-input v-model="manufactureDate" clearable label="Herstellungsdatum"></v-date-input>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-number-input v-model="gear" label="Zahnrad" :error-messages="gearError"></v-number-input>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-number-input v-model="circumference" label="Umfang"
                    :error-messages="circumferenceError"></v-number-input>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-number-input v-model="width" label="Breite" :error-messages="widthError"></v-number-input>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-number-input v-model="kmStand" label="Km Stand"></v-number-input>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select v-model="warehouse" label="Lager" :items="warehouseOptions" outlined dense
                    :error-messages="warehouseError" />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-number-input v-model="slot" label="Lager Platz" :error-messages="slotError"></v-number-input>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select v-model="condition" label="Sleeve-Zustand" :items="conditionOptions" item-title="label"
                    item-value="value" outlined dense :error-messages="conditionError" />
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="notes" label="Anmerkingen" rows="3" outlined dense />
                </v-col>
              </v-row>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" type="submit"> Speichern </v-btn>
                <v-btn text @click="cancel">Zurück</v-btn>
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
