<template>
  <q-page class="q-pa-xs">
    <FormularioReservas :agencia="'Ricardo'" :color="'blue'" />
  </q-page>
</template>
<script>
import FormularioReservas from "pages/reservas/FormularioReservas.vue";

export default {
  components: { FormularioReservas },
};
</script>
