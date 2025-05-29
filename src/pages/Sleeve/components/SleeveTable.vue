<script setup lang="ts">
import { type DataTableHeader } from 'vuetify';
import { formatDate } from '@/utils/formatDate';
import type { SleeveResponse } from '@/openapi';
import { ref } from 'vue';
import { computed } from 'vue';


const props = defineProps<{
  sleeves: SleeveResponse[] | [];
  searchValue: number;
}>();


const EMPTY_MESSAGE = 'Keine Sleeves mit der angegebenen Satznummer gefunden. Bitte versuchen Sie es mit einer anderen Nummer.';

const localSearchValue = ref<number>(props.searchValue);

const emit = defineEmits<{
  (e: 'search', value: number): void;
}>();

const items = computed(() => props.sleeves);

const headers: DataTableHeader[] = [
  { title: 'Satz Nummer', key: 'sequenceNumber', align: 'start', sortable: false },
  { title: 'Type', key: 'type', align: 'start', sortable: false },
  { title: 'Design', key: 'design', align: 'start', sortable: false },
  { title: 'Farbe', key: 'color', align: 'start', sortable: false },
  { title: 'Lager', key: 'warehouse', align: 'start', sortable: false },
  { title: 'Platz', key: 'slot', align: 'start', sortable: false },
  { title: 'Zahnrad', key: 'gear', sortable: false },
  { title: 'Breite', key: 'width', sortable: false },
  { title: 'Sleeve Number', key: 'sleeveNumber', sortable: false },
  { title: 'Datum', key: 'manufactureDate', align: 'end', sortable: true },
];
</script>

<template>
  <v-data-table-virtual :headers="headers" :items="items" item-value="id" :no-data-text="EMPTY_MESSAGE"
    hide-default-footer show-expand>
    <template #[`item.warehouse`]="{ item }">
      {{ item.warehouse?.name }}
    </template>
    <template #[`item.manufactureDate`]="{ item }">
      {{ formatDate(item.manufactureDate!) }}
    </template>
    <template #[`item.data-table-expand`]="{ internalItem, isExpanded, toggleExpand }">
      <v-btn :append-icon="isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        :text="isExpanded(internalItem) ? 'Einklappen' : 'Mehr Infos'" class="text-none" color="medium-emphasis"
        size="small" variant="text" border slim @click="toggleExpand(internalItem)"></v-btn>
    </template>

    <template v-slot:expanded-row="{ columns, item }">
      <tr>
        <td :colspan="columns.length" class="py-2">
          <v-sheet rounded="lg" border>
            <v-table density="compact">
              <tbody class="bg-surface-light">
                <tr>
                  <th>Anmerkungen</th>
                  <th>Hersteller</th>
                  <th>Zustand</th>
                  <th>Km Stand</th>
                  <th>Status</th>
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <td>{{ item.notes }}</td>
                  <td>{{ item.manufacturer }}</td>
                  <td>{{ item.condition }}</td>
                  <td>{{ item.kmStand }} km</td>
                  <td>{{ item.status }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-sheet>
        </td>
      </tr>
    </template>
    <template v-slot:tfoot>
      <tr>
        <td>
          <v-number-input v-model="localSearchValue" class="ma-lg-1 pa-0" variant="outlined" density="compact"
            placeholder="Satz Nummer" hide-details></v-number-input>
        </td>
        <td>
          <v-btn @click="emit('search', localSearchValue)" prepend-icon="$vuetify" variant="tonal"> Neu Suchen </v-btn>
        </td>
      </tr>
    </template>
  </v-data-table-virtual>
</template>

<style scoped>
:deep(.v-number-input__control) {
  display: none !important;
}
</style>
