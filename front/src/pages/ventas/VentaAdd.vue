<template>
  <q-page class="q-pa-xs">
    <div class="row">
      <div class="col-12">
<!--        btn atras-->
        <q-btn label="Atras" color="primary" @click="$router.push('/ventas')" no-caps icon="arrow_back" />
      </div>
      <div class="col-12 col-md-7">
        <q-card flat bordered class="q-ma-xs">
          <q-card-section>
            <q-input v-model="buscarProducto" label="Buscar producto" outlined dense debounce="300" @update:modelValue="buscarProductos" />
            <q-list bordered padding dense>
              <template v-for="producto in productos" :key="producto.id">
                <q-item  clickable v-ripple @click="agregarAlCarrito(producto)">
                  <q-item-section>
                    <q-item-label>{{ producto.nombre }}</q-item-label>
                    <q-item-label caption>
<!--                      <pre>{{producto}}</pre>-->
<!--                      {-->
<!--                      "id": 36,-->
<!--                      "nombre": "COMBO CUMPLEAÑERO",-->
<!--                      "precio": 0,-->
<!--                      "stock": 2,-->
<!--                      "producto_combo": [-->
<!--                      {-->
<!--                      "id": 6,-->
<!--                      "cantidad": 1,-->
<!--                      "producto_padre_id": 36,-->
<!--                      "producto_hijo_id": 30,-->
<!--                      "producto_hijo": {-->
<!--                      "id": 30,-->
<!--                      "nombre": "FRAPPÉ",-->
<!--                      "precio": 10,-->
<!--                      "stock": 99-->
<!--                      }-->
<!--                      }-->
<!--                      ]-->
<!--                      }-->
                      <span v-if="producto.producto_combo.length > 0">
                        <q-chip v-for="combo in producto.producto_combo" :key="combo.id" :label="combo.cantidad+' '+combo.producto_hijo.nombre" dense />
                      </span>
                      {{ producto.precio }} Bs
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption class="">
                      Cant <br>
                      {{ producto.stock }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator spaced inset />
              </template>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-5">
        <q-card flat bordered class="q-ma-xs">
          <q-card-section>
            <div class="div">
              <div class="text-h6 row items-center">
                <div>Carrito</div>
                <q-space />
                <q-btn icon="delete" color="red" dense @click="carrito = []" :loading="loading" size="10px" label="Limpiar" no-caps />
              </div>
              <div class="text-caption">Productos agregados al carrito</div>
            </div>
            <q-markup-table wrap-cells dense flat bordered>
              <thead>
              <tr class="bg-primary text-white">
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in carrito" :key="index">
                <td>{{ item.nombre }}</td>
                <td>
                  <q-input v-model.number="item.cantidadVenta" type="number" dense outlined />
                </td>
                <td>
                  {{ item.precio }} Bs
<!--                  <q-input v-model.number="item.precioVenta" type="number" dense outlined />-->
                </td>
                <td>{{ (item.cantidadVenta * item.precioVenta).toFixed(2) }} Bs</td>
                <td>
                  <q-btn icon="delete" color="red" dense @click="eliminarDelCarrito(index)" :loading="loading" size="10px" />
                </td>
              </tr>
              </tbody>
              <tfoot>
              <tr>
                <td colspan="3" class="text-right text-bold">Total</td>
                <td class="text-bold">{{ totalVenta }} Bs</td>
                <td></td>
              </tr>
              </tfoot>
            </q-markup-table>
            <q-btn label="Realizar Venta" color="positive" class="full-width q-mt-md" no-caps @click="realizarVenta"
                   :loading="loading"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="dialogVenta">
      <q-card flat bordered>
        <q-card-section class="q-pb-none row items-center">
          <div class="text-bold">
            Realizar Venta
          </div>
          <q-space />
          <q-btn flat dense round icon="close" @click="dialogVenta = false" />
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="realizarVentaPost">
            <q-input v-model="venta.nombre" label="Nombre Cliente" outlined dense :rules="[val => !!val || 'Campo requerido']" />
<!--            <q-input v-model="venta.fecha" label="Fecha" type="date" outlined dense />-->
<!--            <q-input v-model="venta.total" label="Total" outlined dense />-->
<!--            <q-input v-model="venta.productos" label="Productos" outlined dense />-->
            <q-btn label="Realizar Venta" color="positive" type="submit" no-caps :loading="loading" />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import {ref, computed, getCurrentInstance, onMounted} from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();

const { proxy } = getCurrentInstance();
const venta = ref({ nombre: "", fecha: new Date().toISOString().slice(0, 10) });
const productos = ref([]);
const productosAll = ref([]);
const carrito = ref([]);
let buscarProducto = ref("");
const dialogVenta = ref(false);
const loading = ref(false);

onMounted(() => {
  getProductos();
});
function getProductos() {
  proxy.$axios.get("/productos").then(response => {
    productos.value = response.data;
    productosAll.value = response.data;
  });
}

const totalVenta = computed(() => {
  return carrito.value.reduce((acc, item) => acc + (item.cantidadVenta * item.precioVenta), 0).toFixed(2);
});

function buscarProductos() {
  productos.value = productosAll.value.filter(p => p.nombre.toLowerCase().includes(buscarProducto.value.toLowerCase()));
}

function agregarAlCarrito(producto) {
  const item = carrito.value.find(p => p.id === producto.id);
  if (item) {
    item.cantidadVenta++;
  } else {
    carrito.value.push({ ...producto, cantidadVenta: 1, precioVenta: producto.precio });
  }
}

function eliminarDelCarrito(index) {
  carrito.value.splice(index, 1);
}

function realizarVenta() {
  // if (carrito.value.length === 0) {
  //   proxy.$q.notify({ color: "negative", message: "El carrito está vacío" });
  //   return;
  // }
  // proxy.$axios.post("/ventas", { ...venta.value, total: totalVenta.value, productos: carrito.value }).then(() => {
  //   carrito.value = [];
  //   venta.value = { nombre: "", fecha: new Date().toISOString().slice(0, 10) };
  //   proxy.$q.notify({ color: "positive", message: "Venta realizada con éxito" });
  // });
  if (carrito.value.length === 0) {
    proxy.$alert.error("El carrito está vacío", "Error");
    return;
  }
  dialogVenta.value = true;
  venta.value = { nombre: "SN", };
}
function realizarVentaPost() {
  if (carrito.value.length === 0) {
    proxy.$alert.error("El carrito está vacío");
    return;
  }
  loading.value = true;
  proxy.$axios.post("/ventas", { ...venta.value, total: totalVenta.value, productos: carrito.value }).then(async () => {
    carrito.value = [];
    venta.value = {nombre: "", fecha: new Date().toISOString().slice(0, 10)};
    dialogVenta.value = false;
    proxy.$alert.success("Venta realizada con éxito", "Éxito");
    router.push("/ventas");
    // await getProductos();
    buscarProducto.value = "";
  }).catch((res) => {
    proxy.$alert.error(res.response.data.message, "Error");
  }).finally(() => {
    loading.value = false;
  });
}
</script>
