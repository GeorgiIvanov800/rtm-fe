<script setup lang="ts">
import type { SleeveResponse } from '@/openapi';
import { getSleeveBySleeveNumber } from '@/services/sleeveService';
import { useLoadingStore } from '@/stores/loading';
import { isAxiosError } from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { format, compareAsc, parseJSON } from "date-fns";

const route = useRoute();
const sleeve = ref<SleeveResponse>();
const error = ref<string | null>(null);
const loadingStore = useLoadingStore();
const sleeveNumber = ref<number>(Number(route.query.sleeveNumber) || 0);
const dateTime = format(new Date().toLocaleDateString(), "dd/MM/yyyy");
let manufactureDate: string = '';
onMounted(() => {
  getSleeve(sleeveNumber.value);
});

async function getSleeve(sleeveNumber: number) {
  loadingStore.startLoading();
  error.value = null;
  try {
    sleeve.value = await getSleeveBySleeveNumber(sleeveNumber);
    console.log(sleeve.value);
    manufactureDate = format(new Date(sleeve.value.manufactureDate!), "dd/MM/yyyy");
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      error.value = err.message;
    }
  } finally {
    loadingStore.stopLoading();
  }
}

</script>

<template>

  <body>

    <div class="a5-landscape-page">
      <div class="label-grid">

        <div class="grid-box top-box">

          <div class="top-info-container">
            <div class="detail-box">
              <div class="box-label">Herrstelungsdatum</div>
              <div class="box-value">{{ manufactureDate }}</div>
            </div>
            <div class="detail-box">
              <div class="box-label">Lager</div>
              <div class="box-value">{{ sleeve?.warehouse?.name }} / {{ sleeve?.slot }}</div>
            </div>
          </div>

          <div class="sleeve-number">{{ sleeve?.sequenceNumber }}</div>
        </div>

        <div class="grid-box">
          <div class="box-label">Umfang / Zahnrad</div>
          <div class="box-value">{{ sleeve?.circumference }}mm / {{ sleeve?.gear }}</div>
        </div>

        <div class="grid-box">
          <div class="box-label">Farbbezeichnung</div>
          <div class="box-value">{{ sleeve?.color }}</div>
        </div>

        <div class="grid-box">
          <div class="box-label">Motiv Beschreibung</div>
          <div class="box-value">{{ sleeve?.design }}</div>
        </div>

        <div class="grid-box">
          <div class="box-label">Letzter Einsatz</div>
          <div class="box-value">{{ dateTime }}</div>
        </div>

        <div class="grid-box" style="grid-column: 1 / 3; text-align: center;">
          <div class="box-label">Gereingt vom</div>
          <div class="box-value">Иван Иванов</div>
        </div>

      </div>
    </div>

  </body>
</template>


<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #e9e9e9;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
}

.a5-landscape-page {
  width: 210mm;
  height: 148mm;
  background-color: white;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  padding: 10mm;
  box-sizing: border-box;
}

.label-grid {
  border: 2px solid black;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 2fr 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  gap: 5mm;
  padding: 5mm;
}

.grid-box {
  border: 1px solid #666;
  padding: 8px;
  display: flex;
  flex-direction: column;
}

.top-box {
  grid-column: 1 / 3;
  justify-content: center;
  align-items: center;
  position: relative;
}


.top-box .top-info-container {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;

}

.top-box .sleeve-number {
  font-size: 72pt;
  font-weight: bold;
}

.box-label {
  font-size: 9pt;
  color: #555;
  margin-bottom: 4px;
}

.box-value {
  font-size: 16pt;
  font-weight: bold;
}

.top-info-container .detail-box {
  border: 1px solid #888;
  padding: 4px 8px;
}

.top-info-container .box-label {
  font-size: 8pt;
}

.top-info-container .box-value {
  font-size: 12pt;
}
</style>
