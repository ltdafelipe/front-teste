<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="abrir"
      persistent
      max-width="400px"
      @keydown.esc="fechaDialog()"
    >
      <v-card>
        <v-toolbar class="pt-3" flat>
          <h3 class="pl-5">Novo desenvolvedor</h3>
          <v-spacer></v-spacer>
          <v-btn class="mr-3" small text @click="fechaDialog()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="py-0">
          <v-form ref="formCadastroDesenvolvedor" lazy-validation>
            <v-container>
              <v-row dense>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="nome"
                    label="Nome *"
                    dense
                    outlined
                    :rules="rulesCampos"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="datanascimento"
                    label="Data nascimento *"
                    dense
                    :rules="rulesCampos"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions class="mx-5 pb-5 mt-n4">
          <small>* Campos obrigatórios</small>
          <v-spacer></v-spacer>
          <v-btn small outlined @click="validarDados()">
            <v-icon class="mr-1" small>mdi-check</v-icon>Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snack"
      bottom
      right
      :timeout="3000"
      :color="snackColor"
    >
      {{ snackText }}
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="snack = false"> Fechar </v-btn>
      </template>
    </v-snackbar>
  </v-layout>
</template>

<script>
import moment from "moment";
export default {
  props: {
    abrir: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      snack: false,
      dialogCriar: false,
      snackColor: "",
      snackText: "",
      rulesCampos: [
        (v) => v != "" || "O campo está vazio!",
        (v) => v != null || "O campo está vazio!",
      ],
      nome: "",
      datanascimento: "",
    };
  },

  methods: {
    validarDados() {
      if (this.$refs.formCadastroDesenvolvedor.validate()) {
        this.salvarDesenvolvedor();
      } else {
        this.criarAlerta("red", "Preencha os campos obrigatórios!");
      }
    },

    salvarDesenvolvedor() {},

    criarAlerta(cor, mensagem) {
      this.snack = true;
      this.snackColor = cor;
      this.snackText = mensagem;
    },

    fechaDialog() {
      this.$emit("fechar");
    },
  },
};
</script>
