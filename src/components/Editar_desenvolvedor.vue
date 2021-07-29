<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="abrir"
      persistent
      max-width="500px"
      @keydown.esc="fechaDialog()"
    >
      <v-card>
        <v-container grid-list-xl fluid>
          <v-toolbar flat>
            <h3 class="pl-3">Detalhes</h3>
            <v-spacer></v-spacer>
            <v-btn
              v-if="botaoSalvar"
              small
              outlined
              class="mr-3 d-flex d-sm-none"
              @click="validarDados()"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
            <v-btn class="mr-3" small outlined @click="fechaDialog()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class="py-0">
            <v-form ref="formEditarDesenvolvedor" lazy-validation>
              <v-container>
                <v-row dense>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="novoDesenvolvedor.nome"
                      :rules="rulesCampos"
                      label="Nome"
                      dense
                      outlined
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="novoDesenvolvedor.datanascimento"
                      label="Data nascimento"
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
        </v-container>
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
    desenvolvedor: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      snack: false,
      visualizacao: true,
      botaoSalvar: false,
      snackColor: "",
      snackText: "",
      rulesCampos: [
        (v) => v != "" || "O campo está vazio!",
        (v) => v != null || "O campo está vazio!",
      ],
      novoDesenvolvedor: {},
    };
  },

  mounted() {
    this.novoDesenvolvedor = this.desenvolvedor.map((res) => {
      return res;
    });
  },

  methods: {
    fechaDialog() {
      this.visualizacao = true;
      this.botaoSalvar = false;
      this.$emit("fechar");
    },

    validarDados() {
      if (this.$refs.formEditarDesenvolvedor.validate()) {
        this.alterarDesenvolvedor();
      } else {
        this.criarAlerta("red", "Preencha os campos obrigatórios!");
      }
    },

    alterarDesenvolvedor() {},

    criarAlerta(cor, mensagem) {
      this.snack = true;
      this.snackColor = cor;
      this.snackText = mensagem;
    },
  },
};
</script>
