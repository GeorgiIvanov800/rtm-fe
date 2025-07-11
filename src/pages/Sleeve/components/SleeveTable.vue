<script setup lang="ts">
import { type DataTableHeader } from 'vuetify';
import { formatDate } from '@/utils/formatDate';
import type { SleeveResponse, SleeveResponseConditionEnum, SleeveResponseTypeEnum } from '@/openapi';
import { ref, computed } from 'vue';
import { SleeveTypeDE, SleeveConditionDE } from '@/utils/translateTypes';



const props = defineProps<{
  sleeves: SleeveResponse[] | [];
  searchValue: number;
  isAdmin: boolean;
}>();

const EMPTY_MESSAGE = 'Keine Sleeves mit der angegebenen Satznummer gefunden. Bitte versuchen Sie es mit einer anderen Nummer.';

const localSearchValue = ref<number>(props.searchValue);

const emit = defineEmits<{
  (e: 'search', value: number): void;
  (e: 'redirect'): void;
  (e: 'edit', value: number): void;
  (e: 'delete', value: number): void;
}>();

const items = computed(() => props.sleeves);

const translateSleeveType = (type: SleeveResponseTypeEnum | undefined): string => {
  if (type === undefined) {
    return 'N/A';
  }
  return SleeveTypeDE[type] || type;
};

const translateSleeveCondition = (type: SleeveResponseConditionEnum | undefined): string => {
  if (type === undefined) {
    return 'N/A';
  }
  return SleeveConditionDE[type] || type;
};

const headers = computed( () => {
  const baseHeaders: DataTableHeader[] = [
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
]
  if(props.isAdmin) {
    baseHeaders.push({ title: 'Actions', key: 'actions', align: 'end', sortable: false })
  }
 return baseHeaders;
});
</script>

<template>
  <v-data-table-virtual :headers="headers" :items="items" item-value="id" :no-data-text="EMPTY_MESSAGE"
    hide-default-footer show-expand>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>
          <v-icon color="medium-emphasis" icon="mdi-cog" size="large" start></v-icon>
          Sleeves
        </v-toolbar-title>
        <v-btn v-if="props.isAdmin" class="me-2" prepend-icon="mdi-plus" rounded="lg" text="Neu Sleeve Erstelen" border
          @click="emit('redirect')"></v-btn>
      </v-toolbar>
    </template>
    <template v-slot:[`item.type`]="{ item }">
      {{ translateSleeveType(item.type) }}
    </template>
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
                  <td>{{ translateSleeveCondition(item.condition) }}</td>
                  <td>{{ item.kmStand }} km</td>
                  <td>{{ item.status }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-sheet>
        </td>
      </tr>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <div class="d-flex ga-2 justify-end">
        <v-icon color="medium-emphasis" icon="mdi-pencil" size="small"
          @click="emit('edit', item.sleeveNumber!)"></v-icon>

        <v-icon @click="emit('delete', item.id!)" color="medium-emphasis" icon="mdi-delete" size="small"></v-icon>
      </div>
    </template>
    <template v-slot:tfoot>
      <tr>
        <td>
          <v-number-input v-model="localSearchValue" class="ma-lg-1 pa-0" variant="outlined" density="compact"
            placeholder="Satz Nummer" hide-details @keyup.enter="emit('search', localSearchValue)"></v-number-input>
        </td>
        <td>
          <v-btn @click="emit('search', localSearchValue)" prepend-icon="$vuetify" variant="tonal"> Neu Suchen
          </v-btn>
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
