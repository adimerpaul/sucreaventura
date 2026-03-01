<template>
  <q-page class="q-pa-xs">
    <FormularioReservas :agencia="'Ricardo'" :color="'blue'"/>
  </q-page>
</template>
<script>
import moment from "moment";
import FormularioReservas from "pages/reservas/FormularioReservas.vue";

export default {
  components: {FormularioReservas},
};
</script>
