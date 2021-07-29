<template>
  <v-app class="fundo-principal">
    <v-main>
      <Desenvolvedores />
    </v-main>
  </v-app>
</template>

<script>
import Desenvolvedores from "./views/Desenvolvedores";

export default {
  name: "App",

  components: {
    Desenvolvedores,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
.fundo-principal {
  background-color: #90caf9 !important;
}
</style>
