<template>
  <q-page class="q-pa-xs">
    <q-card flat bordered>
      <q-card-section class="q-pa-xs">
        <q-form @submit="getProductos">
          <div class="row">
            <div class="col-12 col-md-4">
              <q-input v-model="filter" label="Buscar producto" outlined dense @update:modelValue="filtroProductos" />
            </div>
            <div class="col-12 col-md-8 text-right">
              <q-btn label="Agregar" color="green" icon="add_circle_outline" no-caps @click="abrirModal" :loading="loading" />
            </div>
          </div>
        </q-form>
        <q-markup-table wrap-cells dense flat bordered>
          <thead>
          <tr class="text-bold bg-primary text-white">
            <th>Nombre</th>
            <th>Combo</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Agencia</th>
            <th>Acciones</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="producto in productos" :key="producto.id">
            <td>{{ producto.nombre }}</td>
            <td>
              <template v-if="producto.producto_combo.length">
                <ul>
                  <li v-for="combo in producto.producto_combo" :key="combo.id">
                    {{ combo.cantidad }} x {{ combo.producto_hijo?.nombre }}
                  </li>
                </ul>
<!--                <pre>{{producto.producto_combo}}</pre>-->
<!--                [-->
<!--                {-->
<!--                "id": 1,-->
<!--                "cantidad": 1,-->
<!--                "producto_padre_id": 15,-->
<!--                "producto_hijo_id": 14,-->
<!--                "producto_hijo": {-->
<!--                "id": 14,-->
<!--                "nombre": "PIPOCA GRANDE",-->
<!--                "precio": 10,-->
<!--                "stock": 2011-->
<!--                }-->
<!--                },-->
<!--                {-->
<!--                "id": 2,-->
<!--                "cantidad": 2,-->
<!--                "producto_padre_id": 15,-->
<!--                "producto_hijo_id": 3,-->
<!--                "producto_hijo": {-->
<!--                "id": 3,-->
<!--                "nombre": "GASEOSA 600 ML.",-->
<!--                "precio": 6,-->
<!--                "stock": 3399-->
<!--                }-->
<!--                }-->
<!--                ]-->
              </template>
            </td>
            <td>{{ producto.precio }}</td>
            <td>{{ producto.stock }}</td>
            <td>{{ producto.agencia }}</td>
            <td>
              <q-btn icon="edit" color="blue" class="q-mr-md" size="10px" dense @click="editarProducto(producto)" :loading="loading" />
              <q-btn icon="delete" color="red" size="10px" dense @click="eliminarProducto(producto.id)" v-if="$store.user.role === 'Admin'" :loading="loading" />
<!--              <pre>{{$store.user}}</pre>-->
            </td>
          </tr>
          </tbody>
        </q-markup-table>
<!--        <pre>{{productos}}</pre>-->
      </q-card-section>
    </q-card>

    <q-dialog v-model="modalVisible">
      <q-card>
        <q-card-section class="text-h6 q-pb-none row items-center">
          <div v-if="producto.id">Editar producto</div>
          <div v-else>Agregar producto</div>
          <q-space />
          <q-btn flat dense icon="close" @click="modalVisible = false" />
        </q-card-section>
        <q-card-section>
          <q-form @submit.prevent="guardarProducto">
            <q-input v-model="producto.nombre" label="Nombre" outlined dense required hint="" />
            <q-input v-model="producto.precio" label="Precio" type="number" outlined dense required hint="" />
            <q-input v-model="producto.stock" label="Stock" type="number" outlined dense required hint="" />
            <q-btn label="Guardar" color="primary" type="submit" class="q-mt-md" />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import {useQuasar} from "quasar";

const { proxy } = getCurrentInstance();
const productos = ref([]);
const productosAll = ref([]);
const filter = ref("");
const modalVisible = ref(false);
const producto = ref({ id: null, nombre: "", precio: "", stock: "" });
const $q = useQuasar();
const loading = ref(false);
onMounted(() => {
  getProductos();
});

function filtroProductos() {
  productos.value = productosAll.value.filter(p => p.nombre.toLowerCase().includes(filter.value.toLowerCase()));
}

function getProductos() {
  proxy.$axios.get("/productos").then(response => {
    productos.value = response.data;
    productosAll.value = response.data;
  });
}

function abrirModal() {
  producto.value = { id: null, nombre: "", precio: "", stock: "" };
  modalVisible.value = true;
}

function editarProducto(p) {
  producto.value = { ...p };
  modalVisible.value = true;
}

function guardarProducto() {
  if (producto.value.id) {
    const original = productosAll.value.find(p => p.id === producto.value.id)
    if (original && parseInt(producto.value.stock) < original.stock) {
      $q.notify({
        type: 'warning',
        message: 'No se puede reducir el stock. Solo se permite aumentarlo.',
        position: 'top',
      })
      return
    }

    proxy.$axios.put(`/productos/${producto.value.id}`, producto.value).then(getProductos)
  } else {
    proxy.$axios.post("/productos", producto.value).then(getProductos)
  }

  modalVisible.value = false
}

function eliminarProducto(id) {
  $q.dialog({
    title: "Eliminar producto",
    message: "¿Está seguro de eliminar este producto?",
    persistent: true,
    ok: {
      label: "Sí",
      color: "negative",
      push: true
    },
    cancel: {
      label: "No",
      color: "primary",
      push: true
    }
  }).onOk(() => {
    loading.value = true;
    proxy.$axios.delete(`/productos/${id}`).then(getProductos).catch((res) => {
      proxy.$alert.error(res.response.data.message, "Error");
    }).finally(() => {
      loading.value = false;
    });
  });
}
</script>
