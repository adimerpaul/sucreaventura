<template>
  <q-page class="q-pa-xs">
    <q-card flat bordered>
      <q-card-section class="q-pa-xs">
        <q-form @submit="getReservas">
        <div class="row">
          <div class="col-6 col-md-2">
            <q-input v-model="fechaInicio" label="Fecha Inicio" type="date" outlined dense />
          </div>
          <div class="col-6 col-md-2">
            <q-input v-model="fechaFin" label="Fecha Fin" type="date" outlined dense />
          </div>
          <div class="col-6 col-md-2">
            <q-select v-model="user" label="Usuario" outlined dense :options="users"
                      v-if="$store.user.role === 'Admin'"
                      emit-value map-options :option-value="'id'" :option-label="'name'" />
          </div>
          <div class="col-6 col-md-2">
            <q-select v-model="tipo" label="Tipo" outlined dense :options="['Todo', 'Adelanto', 'Confirmado']"
                      v-if="$store.user.role === 'Admin'"/>
          </div>
<!--          <div class="col-6 col-md-2">-->
<!--            <q-select v-model="agencia" label="Agencia" outlined dense :options="['Todo','Ayacucho','Oquendo']"-->
<!--                      v-if="$store.user.role === 'Admin'"/>-->
<!--          </div>-->
          <div class="col-12 col-md-2 flex flex-center">
            <q-btn label="Buscar" color="primary" type="submit" icon="search" no-caps :loading="loading" />
          </div>
          <div class="col-12 col-md-12 q-pa-xs">
            <q-input v-model="filter" label="Filtro" outlined dense @update:modelValue="filtroReservas" />
          </div>
        </div>
        </q-form>
        <div class="row" v-if="$store.user.role === 'Admin'">
          <div class="col-6 col-md-2 q-pa-xs">
            <q-list bordered padding dense>
              <q-item clickable v-ripple dense>
                <q-item-section avatar>
                  <q-avatar color="indigo" text-color="white" icon="event" />
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1">
                    <span class="text-weight-bold">
                      {{reservas.length}} reservas
                    </span>
                  </q-item-label>
                  <q-item-label caption lines="2">
                    Cantidad
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-6 col-md-2 q-pa-xs">
            <q-list bordered padding dense>
              <q-item clickable v-ripple dense>
                <q-item-section avatar>
                  <q-avatar color="orange" text-color="white" icon="attach_money" />
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1">
                    <span class="text-weight-bold">
                      Bs {{reservas.filter(reserva => reserva.estado !== 'Cancelado').reduce((acc, reserva) => acc + parseFloat(reserva.adelanto), 0).toFixed(2)}}
                    </span>
                  </q-item-label>
                  <q-item-label caption lines="2">
                    Adelanto
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-6 col-md-2 q-pa-xs">
            <q-list bordered padding dense>
              <q-item clickable v-ripple dense>
                <q-item-section avatar>
                  <q-avatar color="blue" text-color="white" icon="attach_money" />
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1">
                    <span class="text-weight-bold">
                      Bs {{reservas.filter(reserva => reserva.estado !== 'Cancelado').reduce((acc, reserva) => acc + parseFloat(reserva.saldo), 0).toFixed(2)}}
                    </span>
                  </q-item-label>
                  <q-item-label caption lines="2">
                    Saldo
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-6 col-md-2 q-pa-xs">
            <q-list bordered padding dense>
              <q-item clickable v-ripple dense>
                <q-item-section avatar>
                  <q-avatar color="green" text-color="white" icon="attach_money" />
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1">
                    <span class="text-weight-bold">
                      Bs {{reservas.filter(reserva => reserva.estado !== 'Cancelado').reduce((acc, reserva) => acc + parseFloat(reserva.total), 0).toFixed(2)}}
                    </span>
                  </q-item-label>
                  <q-item-label caption lines="2">
                    Total
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-6 col-md-2 q-pa-xs">
            <q-list bordered padding dense>
              <q-item clickable v-ripple dense>
                <q-item-section avatar>
                  <q-avatar color="red" text-color="white" icon="cancel" />
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1">
                    <span class="text-weight-bold">
                      Bs {{reservas.filter(reserva => reserva.estado === 'Cancelado').reduce((acc, reserva) => acc + parseFloat(reserva.total), 0).toFixed(2)}}
                    </span>
                  </q-item-label>
                  <q-item-label caption lines="2">
                    Anulados
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
        <q-markup-table wrap-cells dense flat bordered>
          <thead>
            <tr class="bg-green text-white">
              <th>Opcion</th>
              <th>Nombre</th>
              <th>Sala</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Total</th>
              <th>Adelanto</th>
              <th>Saldo</th>
              <th>Estado</th>
              <th>Observaciones</th>
              <th>Adelanto</th>
              <th>Confirmado</th>
              <th>Agencia</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reserva in reservas" :key="reserva.id">
              <td>
                <q-btn-group v-if="reserva.estado === 'Reservado'">
                  <q-btn dense label="Anular" color="red" icon="delete" no-caps @click="anular(reserva.id)" size="10px" :loading />
                  <q-btn dense label="Confirmar" color="blue" icon="check" no-caps @click="confirmar(reserva)" size="10px" :loading />
                </q-btn-group>
<!--                <q-btn-group v-else-if="reserva.estado === 'Finalizado' && reserva.directo">-->
<!--                  <q-btn dense label="Anular D" color="red" icon="delete" no-caps @click="anular(reserva.id)" size="10px" :loading />-->
<!--                </q-btn-group>-->
                <div v-else-if="reserva.estado === 'Finalizado'" class="text-green text-bold text-center">
                  Finalizado
                </div>
                <div v-else class="text-red text-bold text-center">
                  Anulado <br>
                  <div style="font-size: 10px">
                    {{reserva.user_cancelado?.name}}
                  </div>
                </div>
<!--                <q-btn-dropdown dense label="Opciones" no-caps size="9px" color="primary">-->
<!--                  <q-item v-close-popup>-->
<!--                    <q-item-section>-->
<!--                      <q-btn dense label="Anular" color="red" icon="delete" no-caps @click="anular(reserva.id)" />-->
<!--                    </q-item-section>-->
<!--                  </q-item>-->
<!--&lt;!&ndash;                  <q-item>&ndash;&gt;-->
<!--&lt;!&ndash;                    <q-item-section>&ndash;&gt;-->
<!--&lt;!&ndash;                      <q-btn dense label="Imprimir" color="indigo" icon="print" no-caps />&ndash;&gt;-->
<!--&lt;!&ndash;                    </q-item-section>&ndash;&gt;-->
<!--&lt;!&ndash;                  </q-item>&ndash;&gt;-->
<!--&lt;!&ndash;                  <q-item>&ndash;&gt;-->
<!--&lt;!&ndash;                    <q-item-section>&ndash;&gt;-->
<!--&lt;!&ndash;                      <q-btn dense label="Copiar URL" color="green" icon="link" no-caps />&ndash;&gt;-->
<!--&lt;!&ndash;                    </q-item-section>&ndash;&gt;-->
<!--&lt;!&ndash;                  </q-item>&ndash;&gt;-->
<!--                  <q-item>-->
<!--                    <q-item-section>-->
<!--                      <q-btn dense label="Confirmar" color="blue" icon="check" no-caps @click="confirmar(reserva.id)" />-->
<!--                    </q-item-section>-->
<!--                  </q-item>-->
<!--                </q-btn-dropdown>-->
              </td>
              <td>{{reserva.nombre}}</td>
              <td>{{reserva.sala}}</td>
              <td>
<!--                {{reserva.fecha_creacion}}-->
                {{$filters.dateDmYHis(reserva.fecha_creacion)}}
              </td>
              <td class="text-right">{{reserva.horario}}</td>
              <td class="text-right">
<!--                si ya esta finalizado que no se pueda ver que solo los admin lo vean-->
                <span v-if="reserva.estado !== 'Finalizado' && reserva.estado !== 'Anulado'">
                  {{reserva.total}}
                </span>
                <span v-else-if="$store.user.role === 'Admin'">
                    {{parseFloat(reserva.total).toFixed(2)}}
                </span>
              </td>
              <td class="text-right">{{reserva.adelanto}}</td>
              <td class="text-right">{{reserva.total - reserva.adelanto}}</td>
              <td>
                <q-chip :color="reserva.color" dense size="10px">{{reserva.estado}}</q-chip>
              </td>
              <td>{{reserva.observaciones}}</td>
              <td>
                <div style="font-size: 10px;width: 80px; white-space: normal; overflow-wrap: break-word;">
                  {{reserva.user?.username}}
                </div>
              </td>
              <td>
                <div style="font-size: 10px;width: 80px; white-space: normal; overflow-wrap: break-word;">
                  {{reserva.user_confirmado?.username}}
                </div>
              </td>
              <td>
                <div style="font-size: 10px;width: 80px; white-space: normal; overflow-wrap: break-word;">
                  {{reserva.agencia}}
                </div>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
<!--        <pre>{{reservas}}</pre>-->
<!--        [-->
<!--        {-->
<!--        "id": 43,-->
<!--        "nombre": "betty",-->
<!--        "numero_personas": 1,-->
<!--        "observaciones": "betty",-->
<!--        "estado": "Reservado",-->
<!--        "json": "{\"3-2\":\"9:30\",\"4-2\":\"10:00\"}",-->
<!--        "sala": "Sala 3",-->
<!--        "motivo_cancelacion": null,-->
<!--        "total": "10.00",-->
<!--        "adelanto": 0,-->
<!--        "tiempo": "01:00",-->
<!--        "horario": "9:30 - 10:30",-->
<!--        "fecha": "2025-02-21 00:00:00",-->
<!--        "fecha_confirmacion": null,-->
<!--        "fecha_cancelacion": null,-->
<!--        "user_id": 1,-->
<!--        "user_cancelado_id": null,-->
<!--        "color": "yellow"-->
<!--        },-->
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
import {getCurrentInstance, onMounted, ref} from "vue";
import moment from "moment";
import { useRouter } from 'vue-router';

const router = useRouter();

const {proxy} = getCurrentInstance()
const fechaInicio = ref(moment().format('YYYY-MM-DD'))
const fechaFin = ref(moment().format('YYYY-MM-DD'))
const reservas = ref([])
const reservasAll = ref([])
const loading = ref(false)
const filter = ref('')
const users = ref([])
const user = ref(0)
const tipo = ref('Todo')
const agencia = ref('Todo')

onMounted(() => {
  getReservas()
  getUsers()
})
function getUsers() {
  users.value = [{id: 0, name: 'Todos'}]
  proxy.$axios.get('users').then(response => {
    response.data.forEach(user => {
      users.value.push(user)
    })
  }).catch(error => {
    console.log(error)
  })
}
function filtroReservas() {
  reservas.value = reservasAll.value.filter(reserva => {
    return reserva.nombre.toLowerCase().includes(filter.value.toLowerCase())
  })
}
function confirmar(reserva) {
  const adelanto = parseFloat(reserva.adelanto).toFixed(2)
  const total = parseFloat(reserva.total).toFixed(2)
  const saldo = parseFloat(reserva.total - reserva.adelanto).toFixed(2)
  proxy.$alert.dialogConfirm('<span style="color: blue;font-size: 20px;font-weight: bold">' +
    '¿Desea confirmar la reserva? <br> </span>' +
    'Total: ' + total + '<br>' +
    'Adelanto: ' + adelanto + '<br>' +
    '<span style="color: red;font-size: 20px;font-weight: bold">Saldo: ' + saldo + ' Bs</span>'+
    '')
    .onOk(() => {
      loading.value = true
      proxy.$axios.post('reservasConfirmar', {
        id : reserva.id,
      })
        .then(response => {
          proxy.$socket.emit("reservas");
          // getReservas()
          router.push('/reservas')
        })
        .catch(error => {
          // console.log(error)
          proxy.$alert.error(error.response.data.message, 'Error')
          loading.value = false
        })
    })
}
function anular(id) {
  proxy.$alert.dialogAnular('<span style="color: red;font-size: 20px;font-weight: bold">¿Desea anular la reserva?</span>')
    .onOk(() => {
      loading.value = true
      proxy.$axios.post('reservasAnular', {id})
        .then(response => {
          proxy.$socket.emit("reservas");
          getReservas()
        })
        .catch(error => {
          console.log(error)
        })
    })
}
function getReservas() {
  loading.value = true
  proxy.$axios.get('reservasAll',{
    params: {
      fechaInicio: fechaInicio.value,
      fechaFin: fechaFin.value,
      user_id: user.value,
      tipo: tipo.value,
      agencia: agencia.value,
    }
  }).then(response => {
    reservas.value = response.data
    reservasAll.value = response.data
  })
  .catch(error => {
    console.log(error)
  }).finally(() => {
    loading.value = false
  })
}
</script>
