<script setup lang="ts">
import { SleeveControllerApi, type SleeveResponse } from '@/openapi';
import { computed, ref } from 'vue';
import { type DataTableHeader } from 'vuetify';
import { tr } from 'vuetify/locale';

const props = defineProps<{
  sequenceNumber?: number;
}>();

const sleeveData = ref(<SleeveResponse[]>([]));
const EMPTY_MESSAGE = ref('Keine Sleeves mit der angegebenen Satznummer gefunden. Bitte versuchen Sie es mit einer anderen Nummer.');
const number = Number(props.sequenceNumber);

const sleeveApi = new SleeveControllerApi();
const testNumber: number = 1002;



async function getSleevesBySequenceNumber() {
  console.log("Clicked");
  try {
    const response = await sleeveApi.getSleeveSequenceNumber(testNumber);
    return sleeveData.value = response.data;
  } catch (e) {
    console.error('Opps unexpected', e);
    return [];
  }
}

const headers: DataTableHeader[] = [
  { title: 'Satz Nummer', key: 'sequenceNumber', align: 'start', sortable: true },
  { title: 'Sleeve Number', key: 'sleeveNumber', align: 'start', sortable: true },
  { title: 'Type', key: 'type', align: 'start', sortable: true },
  { title: 'Design', key: 'design', align: 'start', sortable: true },
  { title: 'Farbe', key: 'color', align: 'start', sortable: true },
  { title: 'Lager', key: 'warehouse', align: 'start', sortable: true },
  { title: 'Platz', key: 'slot', align: 'start', sortable: true },
  { title: 'Datum', key: 'manufactureDate', align: 'start', sortable: true },
  { title: 'Zahnrad', key: 'gear', align: 'start', sortable: true },
  { title: 'Anmerkungen', key: 'notes', align: 'start', sortable: true },
  { title: 'Width', key: 'width', align: 'start', sortable: true },
  { title: 'Km Stand', key: 'kmStand', align: 'start', sortable: true },
  { title: 'Status', key: 'status', align: 'start', sortable: true },
  { title: 'Zustand', key: 'condition', align: 'start', sortable: true },
  { title: 'Hersteller', key: 'manufacturer', align: 'start', sortable: true },

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
    <v-data-table-virtual :headers="headers" :items="sleeveData" item-value="sequenceNumber"
      :no-data-text="EMPTY_MESSAGE" hide-default-footer show-expand>
      <template v-slot:item.warehouse="{ item }">
        {{ item.warehouse?.name }}
      </template>
      <template #[`item.data-table-expand`]="{ internalItem, isExpanded, toggleExpand }">
        <v-btn :append-icon="isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          :text="isExpanded(internalItem) ? 'Collapse' : 'More info'" class="text-none" color="medium-emphasis"
          size="small" variant="text" border slim @click="toggleExpand(internalItem)"></v-btn>
      </template>

      <template v-slot:expanded-row="{ columns, item }">

        <tr>
          <td :colspan="columns.length" class="py-2">
            <v-sheet rounded="lg" border>
              <v-table density="compact">
                <tbody class="bg-surface-light">
                  <tr>
                    <th>Lager</th>
                  </tr>
                </tbody>

                <tbody>
                  <tr>
                    <td>{{ item.warehouse?.name }}</td>
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
