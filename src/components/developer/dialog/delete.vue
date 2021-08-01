<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card color="primary darken-2" class="pa-0">
      <v-card color="white" class="pa-6">
        <v-layout row wrap justify-center>
          <h4 class="mb-5 mt-4">Deseja confirmar a exclusão?</h4>
        </v-layout>
        <br />
        <v-layout row wrap justify-center class="mb-2">
          <v-btn
            :loading="loading"
            color="primary darken-1"
            class="mr-5"
            @click="remove()"
            >Sim</v-btn
          >
          <v-btn color="grey lighten-2" @click="closeDialog">Não</v-btn>
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
      default: false
    }
  },

  data() {
    return {
      loading: false
    }
  },

  methods: {
    closeDialog() {
      this.$emit('close')
    },

    remove() {
      this.loading = true
      this.$emit('delete')
    }
  }
}
</script>
