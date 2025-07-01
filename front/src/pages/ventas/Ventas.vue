<template>
  <q-page class="q-pa-xs">
    <q-card flat bordered>
      <q-card-section class="q-pa-xs">
        <q-form @submit.prevent="getVentas">
          <div class="row">
            <div class="col-12 col-md-2">
              <q-input v-model="fechaInicio" label="Fecha Inicio" type="date" outlined dense />
            </div>
            <div class="col-12 col-md-2">
              <q-input v-model="fechaFin" label="Fecha Fin" type="date" outlined dense />
            </div>
            <div class="col-12 col-md-2">
              <q-select v-model="user" label="Usuario" outlined dense :options="users"
                        option-label="name" option-value="id" emit-value map-options
                        v-if="$store.user.role === 'Admin'"
              />
              <!--              <pre>{{user}}</pre>-->
            </div>
            <div class="col-12 col-md-2 flex flex-center">
              <q-btn style="width: 150px" label="Buscar" color="primary" type="submit" icon="search" no-caps :loading="loading" />
            </div>
            <div class="col-12 col-md-2">
              <q-select v-model="reporte" label="Tipo Reporte" outlined dense :options="reportes"
                        v-if="$store.user.role === 'Admin'"
              />
            </div>
            <div class="col-12 col-md-2 flex flex-center">
              <q-btn style="width: 150px" label="Imprimir" color="indigo" icon="print" no-caps :loading="loading"
                     @click="imprimir" v-if="$store.user.role === 'Admin'"
              />
            </div>
            <div class="col-12 col-md-12 flex flex-center">
            </div>
            <div class="col-12 col-md-4">
              <q-input v-model="filter" label="Filtro" outlined dense @update:modelValue="filtroVentas" />
            </div>
            <div class="col-12 col-md-2 flex flex-center">
              <q-btn style="width: 150px" label="Venta" color="positive" @click="$router.push('/ventas/add')" no-caps icon="add_circle_outline"
                     :loading="loading"
              />
            </div>
            <div class="col-12 col-md-4 flex flex-center">
            </div>
            <div class="col-12 col-md-2 flex flex-center">
              <q-btn style="width: 150px" label="Cerrar Caja" color="red" @click="cerraCaja" no-caps icon="point_of_sale"
                     :loading="loading"
              />
            </div>
          </div>
        </q-form>
        <div class="row">
          <div class="col-12 col-md-4 q-pa-xs">
            <q-list bordered padding dense>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="indigo" text-color="white" icon="event" />
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1">
                    <span class="text-weight-bold">
                      {{ventas.length}} ventas
                    </span>
                  </q-item-label>
                  <q-item-label caption lines="2">
                    Cantida de ventas
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-list bordered padding dense v-if="$store.user.role === 'Admin'">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="green" text-color="white" icon="attach_money" />
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1">
                    <span class="text-weight-bold">
                      Bs {{ventas.filter(venta => !venta.anulada).reduce((acc, venta) => acc + parseFloat(venta.total), 0).toFixed(2)}}
                    </span>
                  </q-item-label>
                  <q-item-label caption lines="2">
                    Total de ventas
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-12 col-md-4 q-pa-xs">
            <q-list bordered padding dense>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="red" text-color="white" icon="cancel" />
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1">
                    <span class="text-weight-bold">
                      Bs {{ventas.filter(venta => venta.anulada).reduce((acc, venta) => acc + parseFloat(venta.total), 0).toFixed(2)}}
                    </span>
                  </q-item-label>
                  <q-item-label caption lines="2">
                    Total de reservas canceladas
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="q-mt-md">
      <q-card-section>
        <q-markup-table wrap-cells dense flat bordered>
          <thead>
          <tr>
            <th>Acciones</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Nombre Cliente</th>
            <th>Usuario</th>
            <th>Detalle</th>
            <th>Agencia</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="venta in ventas" :key="venta.id">
            <td>
              <q-btn style="width: 80px" icon="remove_circle_outline" color="negative" dense @click="anular(venta.id)" label="Anular" no-caps size="10px"
                     v-if="!venta.anulada"
              />
              <div v-else>
                <q-chip color="red" text-color="white" label="Anulada" />
              </div>
            </td>
            <td>{{ venta.fecha }}</td>
            <td>{{ venta.total }}</td>
            <td>{{ venta.nombre }}</td>
            <td>{{ venta.user?.name }}</td>
            <td>
              <div style="max-width: 200px;wrap-option: wrap">
                {{ venta.detalleText }}
              </div>
            </td>
            <td>{{ venta.agencia }}</td>
          </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
    </q-card>
  </q-page>
<!--  dialogCaja-->
  <q-dialog v-model="dialogCaja" persistent>
    <q-card flat bordered style="width: 350px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-bold">
          Cerrar Caja
        </div>
        <q-space />
        <q-btn flat dense icon="close" @click="dialogCaja = false" />
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="cerraCajaSubmit">
<!--          <q-input v-model="caja.monto_inicial" label="Monto Inicial" type="number" outlined dense hint="" />-->
          <q-input v-model="caja.monto_final" label="Monto Final" type="number" outlined dense hint="" />
          <q-input type="textarea" v-model="caja.observacion" label="Observación" outlined dense hint="" />
          <q-btn label="Cerrar Caja" color="red" type="submit" :loading="loading" no-caps icon="point_of_sale" class="q-mt-md" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
<!--  myElement-->
  <div id="myElement" class="hidden"></div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import moment from "moment";
import {Impresion} from "src/addons/Impresion.js";

const { proxy } = getCurrentInstance();
const fechaInicio = ref(moment().format("YYYY-MM-DD"));
const fechaFin = ref(moment().format("YYYY-MM-DD"));
const ventas = ref([]);
const ventasAll = ref([]);
const loading = ref(false);
const filter = ref("");
const users = ref([]);
const user = ref('');
const reporte = ref('CAJA');
const dialogCaja = ref(false);
const caja = ref({});
const productos = ref([]);
const reportes = ref([
  'CAJA',
  'PRODUCTOS',
  'SALA'
]);

onMounted(() => {
  getVentas();
  getUsers();
  getProductos();
});

function getProductos() {
  proxy.$axios.get("/productos").then(response => {
    productos.value = response.data;
  });
}

function imprimir() {
  if (!user.value && reporte.value !== 'PRODUCTOS') {
    proxy.$alert.error("Seleccione un usuario", "Por favor");
    return;
  }

  loading.value = true;

  if (reporte.value === 'PRODUCTOS' && user.value === '') {
    // 🔁 Si seleccionó "Todos" y el reporte es PRODUCTOS, iterar todos los usuarios
    const promesas = users.value
      .filter(u => u.id !== '') // excluir el "Todos"
      .map(usuario =>
        proxy.$axios.post("/ventas/imprimir", {
          user_id: usuario.id,
          fechaInicio: fechaInicio.value,
          fechaFin: fechaFin.value,
          reporte: reporte.value
        }).then(res => {
          return {
            data: res.data,
            usuario: usuario.name
          };
        })
      );

    Promise.all(promesas).then(resultados => {
      // unir todos los datos para imprimir en una sola hoja
      let dataFinal = {
        productos: [],
        productosCombo: [],
        productosGaseosa: [],
        productosPipoca: [],
        productosFrape: []
      };

      resultados.forEach(({ data }) => {
        // fusionar arrays de cada usuario
        ['productos', 'productosCombo', 'productosGaseosa', 'productosPipoca', 'productosFrape'].forEach(key => {
          if (data[key]) {
            dataFinal[key] = dataFinal[key].concat(data[key]);
          }
        });
      });

      // Agrupar por nombre para evitar duplicados (solo suma cantidades)
      const agrupar = (items) => {
        const mapa = {};
        items.forEach(item => {
          const key = item.nombre;
          if (!mapa[key]) {
            mapa[key] = { ...item };
          } else {
            mapa[key].cantidad_total += item.cantidad_total;
          }
        });
        return Object.values(mapa);
      };

      dataFinal.productos = agrupar(dataFinal.productos);
      dataFinal.productosCombo = agrupar(dataFinal.productosCombo);
      dataFinal.productosGaseosa = agrupar(dataFinal.productosGaseosa);
      dataFinal.productosPipoca = agrupar(dataFinal.productosPipoca);
      dataFinal.productosFrape = agrupar(dataFinal.productosFrape);

      Impresion.imprimirProductos(
        dataFinal,
        fechaInicio.value,
        fechaFin.value,
        'Todos',
        productos.value
      );
    }).finally(() => {
      loading.value = false;
    });

  } else {
    // 🔁 Caso normal: usuario específico
    const userFind = users.value.find(usuario => usuario.id === user.value);
    proxy.$axios.post("/ventas/imprimir", {
      user_id: user.value,
      fechaInicio: fechaInicio.value,
      fechaFin: fechaFin.value,
      reporte: reporte.value
    }).then((res) => {
      if (reporte.value === 'CAJA') {
        Impresion.imprimirCaja(res.data, fechaInicio.value, fechaFin.value, userFind.name);
      }
      if (reporte.value === 'PRODUCTOS') {
        Impresion.imprimirProductos(res.data, fechaInicio.value, fechaFin.value, userFind.name, productos.value);
      }
      if (reporte.value === 'SALA') {
        Impresion.imprimirSalas(res.data, fechaInicio.value, fechaFin.value, userFind.name);
      }
    }).finally(() => {
      loading.value = false;
    });
  }
}

function cerraCaja() {
  dialogCaja.value = true;
  caja.value = {
    monto_inicial: 0,
    monto_final: 0,
    observacion: ''
  };
}
function cerraCajaSubmit() {
  loading.value = true;
  proxy.$axios.post("/cajas", caja.value).then((res) => {
    dialogCaja.value = false;
    // getVentas();
    proxy.$alert.success("Registrado correctamente", res.data);
  }).finally(() => {
    loading.value = false;
  });
}
function filtroVentas() {
  ventas.value = ventasAll.value.filter(venta => {
    return (
      venta.nombre.toLowerCase().includes(filter.value.toLowerCase()) ||
      venta.user?.name.toLowerCase().includes(filter.value.toLowerCase()) ||
      venta.detalleText.toLowerCase().includes(filter.value.toLowerCase())
    //    texto de detalle
    );
  });
}

function anular(id) {
  proxy.$q.dialog({
    title: "Anular Venta",
    message: "¿Está seguro de anular la venta?",
    ok: "Sí",
    cancel: "No"
  }).onOk(() => {
    loading.value = true;
    proxy.$axios.put(`/ventas/${id}/anular`).then(() => {
      getVentas();
    }).finally(() => {
      loading.value = false;
    });
  });
}
function getUsers() {
  // users todos
  users.value = [
    { id: '', name: 'Todos' }
  ]
  proxy.$axios.get("/usersSucursal").then(response => {
    // users.value = response.data;
    response.data.forEach(user => {
      users.value.push({ id: user.id, name: user.name });
    });
  });
}
function getVentas() {
  loading.value = true;
  proxy.$axios.get("/ventas", {
    params: { fechaInicio: fechaInicio.value, fechaFin: fechaFin.value, user_id: user.value }
  }).then(response => {
    ventas.value = response.data;
    // for (let venta of ventas.value) {
    //   const find = users.value.find(usuario => usuario.id === venta.user_id);
    //   if (!find) {
    //     users.value.push({ id: venta.user_id, name: venta.user?.name });
    //   }
    // }
    // if (ventas.value.length > 0) {
    //   user.value = ventas.value[0].user_id;
    // }
    ventasAll.value = response.data;
  }).finally(() => {
    loading.value = false;
  });
}

function verDetalles(id) {
  proxy.$router.push(`/ventas/${id}`);
}
</script>
