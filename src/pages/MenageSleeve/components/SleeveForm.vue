<script setup lang="ts">
import {
  SaveSleeveRequestConditionEnum,
  SaveSleeveRequestTypeEnum,
  type SaveSleeveRequest,
  type SleeveResponse,
} from '@/openapi';
import { useRouter } from 'vue-router';
import { VDateInput } from 'vuetify/labs/VDateInput';
import { SleeveConditionDE } from '@/utils/translateTypes';
import { computed } from 'vue';
import { SleeveTypeDE } from '@/utils/translateTypes';
import { useField, useForm } from 'vee-validate';
import { validationSchema } from '@/utils/validations';
import { format } from 'date-fns';
import { createSelectOptions, getChangedFields } from '@/utils/form-helper';

const router = useRouter();
const emit = defineEmits<{
  (e: 'save', payload: SaveSleeveRequest): void;
  (e: 'update', payload: Partial<SaveSleeveRequest>): void;
}>();

const props = defineProps<{
  initialData: SleeveResponse | null;
}>();

const formInitialValues = computed(() => {
  if (!props.initialData) {
    return undefined;
  }

  const initialValuesForForm: SaveSleeveRequest = {
    sequenceNumber: props.initialData.sequenceNumber ?? 0,
    sleeveNumber: props.initialData.sleeveNumber ?? 0,
    design: props.initialData.design ?? '',
    color: props.initialData.color ?? '',
    manufacturer: props.initialData.manufacturer ?? '',
    gear: props.initialData.gear ?? 0,
    circumference: props.initialData.circumference ?? 0,
    slot: props.initialData.slot ?? 0,
    width: props.initialData.width ?? 0,
    warehouse: props.initialData.warehouse?.name ?? '',
    type: props.initialData.type ?? SaveSleeveRequestTypeEnum.Paint,
    condition: props.initialData.condition ?? SaveSleeveRequestConditionEnum.New,
    manufactureDate: props.initialData.manufactureDate ?? '',
    kmStand: props.initialData.kmStand,
    notes: props.initialData.notes,
  };
  return initialValuesForForm;
});

//Transle the types to German
const typesOptions = computed(() => createSelectOptions(SleeveTypeDE));

//Transle the conditions to German
const conditionOptions = computed(() => createSelectOptions(SleeveConditionDE));


const warehouseOptions = [
  { id: 1, name: 'L3' },
  { id: 2, name: 'L1' },
  { id: 3, name: 'G' },
];

const { handleSubmit } = useForm<SaveSleeveRequest>({
  validationSchema,
  initialValues: formInitialValues.value,
});

const { value: sequenceNumber, errorMessage: sequenceNumberError } =
  useField<number>('sequenceNumber');
const { value: sleeveNumber, errorMessage: sleeveNumberError } = useField<number>('sleeveNumber');
const { value: design, errorMessage: designError } = useField<string>('design');
const { value: color, errorMessage: colorError } = useField<string>('color');
const { value: manufacturer, errorMessage: manufacturerError } = useField<string>('manufacturer');
const { value: gear, errorMessage: gearError } = useField<number>('gear');
const { value: circumference, errorMessage: circumferenceError } =
  useField<number>('circumference');
const { value: slot, errorMessage: slotError } = useField<number>('slot');
const { value: width, errorMessage: widthError } = useField<number>('width');
const { value: warehouseName, errorMessage: warehouseError } = useField<string>('warehouse');
const { value: type, errorMessage: typeError } = useField<SaveSleeveRequestTypeEnum>('type');
const { value: condition, errorMessage: conditionError } =
  useField<SaveSleeveRequestConditionEnum>('condition');
const { value: manufactureDateString } = useField<string | null>('manufactureDate');
const { value: kmStand } = useField<number>('kmStand');
const { value: notes } = useField<string>('notes');

const dateForPicker = computed({
  get(): Date | null {
    return manufactureDateString.value ? new Date(manufactureDateString.value) : null;
  },
  set(newValue: Date | null) {
    manufactureDateString.value = newValue ? format(newValue, 'yyyy-MM-dd') : null;
  },
});

const warehouseForPicker = computed({
  get() {
    return warehouseOptions.find((opt) => opt.name === warehouseName.value) || null;
  },
  set(newValue: { id: number; name: string; } | null) {
    warehouseName.value = newValue ? newValue.name : '';
  },
});

const onSubmit = handleSubmit((formValues) => {
  if (props.initialData && formInitialValues.value) {

    const changedFields = getChangedFields(formValues, formInitialValues.value);

    emit('update', changedFields);
  } else {
    const payload: SaveSleeveRequest = {
      ...formValues,
    };
    emit('save', payload);
  }
});

function cancel() {
  router.back();
}
</script>

<template>
  <v-container class="pa-4" fluid>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="2">
          <v-toolbar flat color="primary">
            <v-toolbar-title class="white--text"> Neu Sleeve </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="onSubmit">
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
                  <v-date-input v-model="dateForPicker" clearable label="Herstellungsdatum"></v-date-input>
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
                  <v-select v-model="warehouseForPicker" label="Lager" :items="warehouseOptions" item-title="name"
                    return-object outlined dense :error-messages="warehouseError" />
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
                <v-btn v-if="initialData?.id" color="primary" type="submit"> Aktualisieren </v-btn>
                <v-btn v-else color="primary" type="submit"> Speichern </v-btn>
                <v-btn text @click="cancel">Zurück</v-btn>
              </v-card-actions>
            </v-form>
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
