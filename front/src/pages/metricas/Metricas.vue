<template>
  <q-page class="q-pa-xs">
    <q-card>
      <q-card-section>
        <q-form @submit.prevent="getMetricas">
          <div class="row">
            <div class="col-12 col-md-2">
              <q-input dense outlined v-model="fechaInicio" label="Fecha Inicio" type="date" />
            </div>
            <div class="col-12 col-md-2">
              <q-input dense outlined v-model="fechaFin" label="Fecha Fin" type="date" />
            </div>
            <div class="col-12 col-md-2 flex flex-center">
              <q-btn color="primary" label="Buscar" type="submit" icon="search" no-caps />
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-card-section>
        <div class="row">
          <div class="col-12">
            <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-markup-table dense flat bordered>
          <thead>
          <tr>
            <th>Fecha</th>
            <th>Total (Bs)</th>
            <th>Usuarios y Montos</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="m in metricas" :key="m.fecha">
            <td>{{ m.fechaFormat }}</td>
            <td>{{ m.monto_total }}</td>
            <td>
              <div v-for="caja in m.cajas" :key="caja.id">
                {{ caja.user.name }} - {{ caja.monto_real }} Bs
              </div>
            </td>
          </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import moment from "moment";
import { ref, getCurrentInstance, onMounted } from "vue";

const { proxy } = getCurrentInstance();

const fechaInicio = ref(moment().startOf("isoWeek").format("YYYY-MM-DD"));
const fechaFin = ref(moment().endOf("isoWeek").format("YYYY-MM-DD"));

const metricas = ref([]);
const series = ref([]);

const chartOptions = ref({
  chart: {              type: 'bar',
    height: 350,
    stacked: true,
    toolbar: {
      show: true
    },
    zoom: {
      enabled: true
    } },
  plotOptions: { bar: { horizontal: false, columnWidth: "55%", endingShape: "rounded" } },
  dataLabels: { enabled: false },
  stroke: { show: true, width: 2, colors: ["transparent"] },
  xaxis: { categories: [] },
  yaxis: { title: { text: "Monto Total (Bs)" } },
  fill: { opacity: 1 },
  tooltip: { y: { formatter: (val) => `${val} Bs` } },
});

onMounted(() => {
  // getMetricas();
});

function getMetricas() {
  proxy.$alert.dialogPromptPassword('Ingrese Codigo').onOk((data) => {
    console.log(data)
    if (data === 'aventura') {
      proxy.$axios.get("/metricas", { params: { fechaInicio: fechaInicio.value, fechaFin: fechaFin.value } })
        .then(response => {
          console.log("Datos recibidos:", response.data);

          metricas.value = response.data.arrayFecha; // Usamos arrayFecha del JSON recibido

          // Extraer fechas formateadas (eje X del gráfico)
          const categories = metricas.value.map(d => d.fechaFormat);

          // Obtener todos los usuarios únicos
          const usuariosUnicos = new Set();
          metricas.value.forEach(d => {
            d.cajas.forEach(caja => {
              usuariosUnicos.add(caja.user.name);
            });
          });

          // Inicializar montos en 0 para cada usuario en todas las fechas
          const userMontos = {};
          usuariosUnicos.forEach(user => {
            userMontos[user] = new Array(categories.length).fill(0);
          });

          // Llenar los montos en la posición correcta de la fecha
          metricas.value.forEach((d, index) => {
            d.cajas.forEach(caja => {
              userMontos[caja.user.name][index] = parseFloat(caja.monto_real); // Aseguramos que sean números
            });
          });

          // Construir series para ApexCharts
          series.value = Object.keys(userMontos).map(name => ({
            name,
            data: userMontos[name],
          }));

          console.log("Categorías actualizadas:", categories);

          // Actualizar las categorías en el gráfico
          chartOptions.value.xaxis.categories = categories;

          // Forzar actualización si ApexCharts no detecta cambios
          chartOptions.value = {...chartOptions.value};
        })
        .catch(error => {
          console.error("Error al obtener métricas:", error);
        });
    } else {
      proxy.$alert.error('Contraseña incorrecta', 'Error');
    }
  }).onCancel(() => {
    // console.log('Cancel')
  });


}
</script>
