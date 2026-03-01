<template>
  <q-page class="q-pa-sm q-pa-md-md dashboard-bg">
    <q-card flat bordered class="q-mb-md">
      <q-card-section class="q-pb-xs">
        <div class="row items-center q-col-gutter-sm">
          <div class="col-12 col-md-3">
            <div class="text-h6 text-weight-bold">Dashboard</div>
            <div class="text-caption text-grey-7">
              {{ isAdmin ? 'Vista Administrador' : 'Vista Vendedor' }}
            </div>
          </div>
          <div class="col-6 col-md-2">
            <q-input v-model="filters.fechaInicio" label="Fecha Inicio" type="date" dense outlined />
          </div>
          <div class="col-6 col-md-2">
            <q-input v-model="filters.fechaFin" label="Fecha Fin" type="date" dense outlined />
          </div>
          <div class="col-12 col-md-2" v-if="isAdmin">
            <q-select
              v-model="filters.agencia"
              :options="agencias"
              label="Agencia"
              dense
              outlined
            />
          </div>
          <div class="col-12 col-md-2" v-if="isAdmin">
            <q-select
              v-model="filters.user_id"
              :options="usersOptions"
              emit-value
              map-options
              option-value="id"
              option-label="name"
              label="Usuario"
              dense
              outlined
            />
          </div>
          <div class="col-12 col-md-1">
            <q-btn color="primary" icon="search" label="Buscar" no-caps @click="getDashboard" :loading="loading" class="full-width" />
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-xs">
        <q-btn-toggle
          v-model="quickRange"
          no-caps
          unelevated
          spread
          toggle-color="primary"
          :options="quickRanges"
          @update:model-value="applyQuickRange"
        />
      </q-card-section>
    </q-card>

    <div class="row q-col-gutter-sm q-mb-sm">
      <div class="col-6 col-md-3">
        <q-card flat bordered class="metric-card">
          <q-card-section>
            <div class="text-caption text-grey-7">Ingresos Totales</div>
            <div class="text-h6 text-weight-bold text-primary">{{ money(kpis.ingresos_totales) }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6 col-md-3">
        <q-card flat bordered class="metric-card">
          <q-card-section>
            <div class="text-caption text-grey-7">Ventas</div>
            <div class="text-h6 text-weight-bold">{{ money(kpis.ventas_total) }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6 col-md-3">
        <q-card flat bordered class="metric-card">
          <q-card-section>
            <div class="text-caption text-grey-7">Adelantos</div>
            <div class="text-h6 text-weight-bold">{{ money(kpis.reservas_adelanto) }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6 col-md-3">
        <q-card flat bordered class="metric-card">
          <q-card-section>
            <div class="text-caption text-grey-7">Saldos Cobrados</div>
            <div class="text-h6 text-weight-bold">{{ money(kpis.reservas_saldo) }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row q-col-gutter-sm q-mb-sm">
      <div class="col-4 col-md-2">
        <q-card flat bordered>
          <q-card-section class="text-center">
            <q-badge color="indigo" rounded class="q-mb-xs">Reservas</q-badge>
            <div class="text-h6">{{ kpis.reservas_total }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4 col-md-2">
        <q-card flat bordered>
          <q-card-section class="text-center">
            <q-badge color="orange" rounded class="q-mb-xs">Reservado</q-badge>
            <div class="text-h6">{{ kpis.reservas_reservadas }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4 col-md-2">
        <q-card flat bordered>
          <q-card-section class="text-center">
            <q-badge color="green" rounded class="q-mb-xs">Finalizado</q-badge>
            <div class="text-h6">{{ kpis.reservas_finalizadas }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4 col-md-2">
        <q-card flat bordered>
          <q-card-section class="text-center">
            <q-badge color="red" rounded class="q-mb-xs">Cancelado</q-badge>
            <div class="text-h6">{{ kpis.reservas_canceladas }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-8 col-md-4">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-caption text-grey-7">Tasa de Cierre</div>
            <div class="text-subtitle1 text-weight-bold">{{ closingRate }}%</div>
            <q-linear-progress :value="closingRate / 100" color="positive" size="10px" rounded />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row q-col-gutter-sm">
      <div class="col-12 col-lg-8">
        <q-card flat bordered>
          <q-card-section class="row items-center">
            <div class="text-subtitle1 text-weight-bold">Ingresos por Día</div>
            <q-space />
            <q-chip dense color="primary" text-color="white">Histograma</q-chip>
          </q-card-section>
          <q-card-section>
            <apexchart height="330" type="bar" :options="incomeBarOptions" :series="incomeBarSeries" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-lg-4">
        <q-card flat bordered>
          <q-card-section class="text-subtitle1 text-weight-bold">Distribución de Pagos</q-card-section>
          <q-card-section>
            <apexchart height="330" type="donut" :options="paymentsPieOptions" :series="paymentsPieSeries" />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row q-col-gutter-sm q-mt-sm">
      <div class="col-12 col-sm-6 col-lg-4">
        <q-card flat bordered>
          <q-card-section class="text-subtitle1 text-weight-bold">Estado de Reservas</q-card-section>
          <q-card-section>
            <apexchart height="320" type="donut" :options="estadoPieOptions" :series="estadoPieSeries" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-lg-8" v-if="isAdmin">
        <q-card flat bordered>
          <q-card-section class="text-subtitle1 text-weight-bold">Top Usuarios por Ingresos</q-card-section>
          <q-card-section>
            <apexchart height="320" type="bar" :options="topUsersOptions" :series="topUsersSeries" />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-card flat bordered class="q-mt-sm">
      <q-card-section class="text-subtitle1 text-weight-bold">Detalle Diario</q-card-section>
      <q-card-section class="q-pa-none">
        <q-table
          flat
          dense
          :rows="dailyRows"
          :columns="dailyColumns"
          row-key="fecha"
          :pagination="{ rowsPerPage: 0 }"
        />
      </q-card-section>
    </q-card>

    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, ref } from 'vue'
import moment from 'moment'

const { proxy } = getCurrentInstance()

const isAdmin = computed(() => proxy.$store.user?.role === 'Admin')
const loading = ref(false)

const quickRange = ref('week')
const quickRanges = [
  { label: 'Semana', value: 'week' },
  { label: 'Mes', value: 'month' },
  { label: '30 Días', value: '30days' },
]

const agencias = ['Todo', 'Central', 'Ricardo']
const usersOptions = ref([{ id: 0, name: 'Todos' }])

const filters = ref({
  fechaInicio: moment().startOf('isoWeek').format('YYYY-MM-DD'),
  fechaFin: moment().endOf('isoWeek').format('YYYY-MM-DD'),
  agencia: 'Todo',
  user_id: 0,
})

const dashboard = ref({
  kpis: {
    ingresos_totales: 0,
    ventas_total: 0,
    reservas_adelanto: 0,
    reservas_saldo: 0,
    reservas_total: 0,
    reservas_reservadas: 0,
    reservas_finalizadas: 0,
    reservas_canceladas: 0,
  },
  charts: {
    daily: { labels: [], series: [] },
    payments_pie: { labels: ['Ventas', 'Adelantos', 'Saldos'], series: [0, 0, 0] },
    reservas_estado: { labels: ['Reservado', 'Finalizado', 'Cancelado'], series: [0, 0, 0] },
    top_usuarios: [],
  },
  daily_table: [],
})

const kpis = computed(() => dashboard.value.kpis)
const closingRate = computed(() => {
  if (!kpis.value.reservas_total) return 0
  return ((kpis.value.reservas_finalizadas / kpis.value.reservas_total) * 100).toFixed(1)
})

const incomeBarSeries = computed(() => dashboard.value.charts.daily.series || [])
const paymentsPieSeries = computed(() => dashboard.value.charts.payments_pie.series || [0, 0, 0])
const estadoPieSeries = computed(() => dashboard.value.charts.reservas_estado.series || [0, 0, 0])

const topUsersSeries = computed(() => ([
  { name: 'Ingresos', data: (dashboard.value.charts.top_usuarios || []).map(u => u.total) }
]))

const incomeBarOptions = computed(() => ({
  chart: {
    type: 'bar',
    stacked: true,
    toolbar: { show: true },
    fontFamily: 'Roboto, sans-serif',
  },
  xaxis: { categories: dashboard.value.charts.daily.labels || [] },
  yaxis: {
    labels: { formatter: val => `Bs ${Number(val).toFixed(0)}` },
  },
  stroke: { width: 1 },
  plotOptions: { bar: { borderRadius: 4, columnWidth: '55%' } },
  legend: { position: 'top' },
  colors: ['#1565C0', '#FB8C00', '#2E7D32'],
  tooltip: {
    y: { formatter: val => `Bs ${Number(val).toFixed(2)}` },
  },
}))

const paymentsPieOptions = computed(() => ({
  chart: { type: 'donut', fontFamily: 'Roboto, sans-serif' },
  labels: dashboard.value.charts.payments_pie.labels || ['Ventas', 'Adelantos', 'Saldos'],
  legend: { position: 'bottom' },
  colors: ['#1565C0', '#FB8C00', '#2E7D32'],
  dataLabels: {
    formatter: val => `${Number(val).toFixed(1)}%`,
  },
  tooltip: {
    y: { formatter: val => `Bs ${Number(val).toFixed(2)}` },
  },
}))

const estadoPieOptions = computed(() => ({
  chart: { type: 'donut', fontFamily: 'Roboto, sans-serif' },
  labels: dashboard.value.charts.reservas_estado.labels || ['Reservado', 'Finalizado', 'Cancelado'],
  legend: { position: 'bottom' },
  colors: ['#F9A825', '#2E7D32', '#C62828'],
  dataLabels: {
    formatter: val => `${Number(val).toFixed(1)}%`,
  },
}))

const topUsersOptions = computed(() => ({
  chart: { type: 'bar', fontFamily: 'Roboto, sans-serif', toolbar: { show: false } },
  plotOptions: { bar: { horizontal: true, borderRadius: 5 } },
  xaxis: {
    categories: (dashboard.value.charts.top_usuarios || []).map(u => `${u.name} (${u.sucursal})`),
    labels: { formatter: val => `Bs ${Number(val).toFixed(0)}` },
  },
  colors: ['#5E35B1'],
  tooltip: {
    y: { formatter: val => `Bs ${Number(val).toFixed(2)}` },
  },
}))

const dailyRows = computed(() => dashboard.value.daily_table || [])
const dailyColumns = [
  { name: 'fechaLabel', label: 'Fecha', field: 'fechaLabel', align: 'left' },
  { name: 'ventas', label: 'Ventas', field: 'ventas', align: 'right', format: val => `Bs ${Number(val).toFixed(2)}` },
  { name: 'adelanto', label: 'Adelantos', field: 'adelanto', align: 'right', format: val => `Bs ${Number(val).toFixed(2)}` },
  { name: 'saldo', label: 'Saldos', field: 'saldo', align: 'right', format: val => `Bs ${Number(val).toFixed(2)}` },
  { name: 'total', label: 'Total Día', field: 'total', align: 'right', format: val => `Bs ${Number(val).toFixed(2)}` },
]

function money(value) {
  return `Bs ${Number(value || 0).toFixed(2)}`
}

function applyQuickRange(value) {
  if (value === 'week') {
    filters.value.fechaInicio = moment().startOf('isoWeek').format('YYYY-MM-DD')
    filters.value.fechaFin = moment().endOf('isoWeek').format('YYYY-MM-DD')
  } else if (value === 'month') {
    filters.value.fechaInicio = moment().startOf('month').format('YYYY-MM-DD')
    filters.value.fechaFin = moment().endOf('month').format('YYYY-MM-DD')
  } else {
    filters.value.fechaInicio = moment().subtract(29, 'days').format('YYYY-MM-DD')
    filters.value.fechaFin = moment().format('YYYY-MM-DD')
  }
  getDashboard()
}

function loadUsers() {
  if (!isAdmin.value) return
  proxy.$axios.get('users')
    .then((res) => {
      usersOptions.value = [{ id: 0, name: 'Todos' }, ...res.data.map(u => ({ id: u.id, name: `${u.name} (${u.sucursal})` }))]
    })
    .catch((error) => {
      proxy.$alert.error(error.response?.data?.message || 'Error al cargar usuarios')
    })
}

function getDashboard() {
  loading.value = true
  proxy.$axios.get('dashboard', { params: filters.value })
    .then((res) => {
      dashboard.value = res.data
    })
    .catch((error) => {
      proxy.$alert.error(error.response?.data?.message || 'Error al cargar dashboard')
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  loadUsers()
  getDashboard()
})
</script>

<style scoped>
.dashboard-bg {
  background: linear-gradient(180deg, #f8fafc 0%, #eef4ff 100%);
}
.metric-card {
  min-height: 106px;
}
</style>
