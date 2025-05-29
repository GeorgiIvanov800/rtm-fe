<script setup lang="ts">
import { SleeveControllerApi, type SleeveResponse } from '@/openapi';
import { computed, ref } from 'vue';
import { type DataTableHeader } from 'vuetify';
import { tr } from 'vuetify/locale';
import { formatDate } from '@/utils/formatDate';
const props = defineProps<{
  sequenceNumber?: number;
}>();

const sleeveData = ref(<SleeveResponse[]>[]);
const EMPTY_MESSAGE = ref(
  'Keine Sleeves mit der angegebenen Satznummer gefunden. Bitte versuchen Sie es mit einer anderen Nummer.',
);
const number = Number(props.sequenceNumber);

const sleeveApi = new SleeveControllerApi();
const testNumber: number = 1002;

async function getSleevesBySequenceNumber() {
  console.log('Clicked');
  try {
    const response = await sleeveApi.getSleeveSequenceNumber(testNumber);
    return (sleeveData.value = response.data);
  } catch (e) {
    console.error('Opps unexpected', e);
    return [];
  }
}



const headers: DataTableHeader[] = [
  { title: 'Satz Nummer', key: 'sequenceNumber', align: 'start' },
  { title: 'Type', key: 'type', align: 'start' },
  { title: 'Design', key: 'design', align: 'start' },
  { title: 'Farbe', key: 'color', align: 'start' },
  { title: 'Lager', key: 'warehouse', align: 'start' },
  { title: 'Platz', key: 'slot', align: 'start' },
  { title: 'Zahnrad', key: 'gear' },
  { title: 'Width', key: 'width' },
  { title: 'Sleeve Number', key: 'sleeveNumber' },
  { title: 'Datum', key: 'manufactureDate', align: 'end', sortable: true },
];
</script>

<template>
  <h1>Sleeve Table Works</h1>
  <p>{{ sequenceNumber }}</p>
  <h1>{{ sequenceNumber }}</h1>
  <v-btn @click="getSleevesBySequenceNumber" prepend-icon="$vuetify" variant="tonal">
    Button
  </v-btn>
  <v-container>
    <v-data-table-virtual :headers="headers" :items="sleeveData" item-value="id" :no-data-text="EMPTY_MESSAGE"
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
    </v-data-table-virtual>
  </v-container>
</template>
