<template>
  <q-page class="q-pa-xs">
    <FormularioReservas :agencia="'Ayacucho'" :color="'green'"/>
  </q-page>
</template>
<script>
import moment from "moment";
import FormularioReservas from "pages/reservas/FormularioReservas.vue";

export default {
  components: {FormularioReservas},
};
</script>
