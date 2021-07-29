<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card color="primary darken-2" class="pa-0">
      <v-card color="white" class="pa-6">
        <v-layout row wrap justify-center>
          <h4 class="mb-2">Deseja confirmar a exclusão?</h4>
        </v-layout>
        <br />
        <v-layout row wrap justify-center>
          <v-btn
            :loading="loading"
            color="primary darken-1"
            class="mr-5"
            @click="excluir"
            >Sim</v-btn
          >
          <v-btn color="grey lighten-2" @click="fecharDialog">Não</v-btn>
        </v-layout>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      loading: false,
    };
  },

  methods: {
    fecharDialog() {
      this.$emit("fechar");
    },

    excluir() {
      this.loading = true;
      this.$emit("excluir");
    },
  },
};
</script>
