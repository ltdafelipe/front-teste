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
                  <v-radio-group v-model="sexo" row mandatory class="mt-n2">
                    <v-radio label="Masculino" value="M"></v-radio>
                    <v-radio label="Feminino" value="F"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="idade"
                    label="Idade"
                    dense
                    type="number"
                    :rules="rulesCampos"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-menu
                    v-model="menu_data"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="formataData"
                        label="Data de nascimento"
                        outlined
                        dense
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="datanascimento"
                      @input="menu_data = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-textarea
                    v-model="hobby"
                    auto-grow
                    outlined
                    label="Hobby"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions class="mx-5 pb-5 mt-n4">
          <small>* Campos obrigatórios</small>
          <v-spacer></v-spacer>
          <v-btn small outlined :loading="loading" @click="validarDados()">
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
      menu_data: false,
      loading: false,
      rulesCampos: [
        (v) => v != "" || "O campo está vazio!",
        (v) => v != null || "O campo está vazio!",
      ],
      nome: "",
      datanascimento: "",
      idade: null,
      sexo: "M",
      hobby: "",
    };
  },

  computed: {
    formataData() {
      return this.datanascimento
        ? moment(this.datanascimento).format("DD/MM/YYYY")
        : "";
    },
  },

  methods: {
    validarDados() {
      if (this.$refs.formCadastroDesenvolvedor.validate()) {
        this.loading = true;
        this.salvarDesenvolvedor();
      } else {
        this.criarAlerta("red", "Preencha os campos obrigatórios!");
      }
    },

    salvarDesenvolvedor() {
      const objeto = {
        nome: this.nome,
        sexo: this.sexo,
        idade: this.idade,
        datanascimento: moment(this.datanascimento).format("YYYY-MM-DD"),
        hobby: this.hobby,
      };
      console.log("objeto", objeto);
      this.$http
        .post(`${process.env.VUE_APP_API_URL}developers`, objeto)
        .then(() => {
          this.$emit("atualizaArray");
          this.loading = false;
        });
    },

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
