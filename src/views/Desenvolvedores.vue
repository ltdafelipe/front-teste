<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card color="white">
          <v-container grid-list-xl fluid>
            <v-layout row>
              <v-flex xs12 sm6 md8 lg9 xl9>
                <v-text-field
                  v-model="busca"
                  hide-details
                  outlined
                  dense
                  label="Buscar"
                  prepend-inner-icon="mdi-magnify"
                ></v-text-field>
              </v-flex>
              <v-flex xl3>
                <v-btn dense outlined @click="criarNovoDesenvolvedor()">
                  <v-icon class="mr-2" small dark>mdi-plus</v-icon>Novo
                  desenvolvedor
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card color="white">
          <v-container grid-list-xl fluid>
            <v-layout row>
              <v-flex xl12 lg12 md12 sm12 xs12>
                <v-data-table
                  :headers="headers"
                  :items="arrayDesenvolvedores"
                  :search="busca"
                  :loading="loaderTabela"
                  no-data-text="Não há desenvolvedores a serem exibidos"
                  :page.sync="page"
                  :items-per-page="itemsPerPage"
                  hide-default-footer
                  @page-count="pageCount = $event"
                >
                  <template v-slot:item.sexo="{ item }">
                    {{ item.sexo === "M" ? "Masculino" : "Feminino" }}
                  </template>
                  <template v-slot:item.datanascimento="{ item }">
                    {{ item.datanascimento | data }}
                  </template>
                  <template v-slot:item.acao="{ item }">
                    <v-icon class="mr-2" @click="editarDesenvolvedor(item)">
                      mdi-pencil
                    </v-icon>
                    <v-icon color="red" @click="excluirDesenvolvedor(item)">
                      mdi-trash-can
                    </v-icon>
                  </template>
                  <v-alert
                    slot="no-results"
                    :value="true"
                    dense
                    outlined
                    type="error"
                    class="mt-4"
                    >Sua pesquisa por "{{ busca }}" não obteve
                    resultado.</v-alert
                  >
                </v-data-table>
                <div class="text-center pt-2">
                  <v-pagination
                    v-model="page"
                    :length="pageCount"
                  ></v-pagination>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-col>
      <v-snackbar
        v-model="snack"
        bottom
        right
        :timeout="3000"
        :color="snackColor"
      >
        {{ snackText }}
        <template v-slot:action="{ attrs }">
          <v-btn dark text v-bind="attrs" @click="snack = false">
            Fechar
          </v-btn>
        </template>
      </v-snackbar>
    </v-row>
    <dialog-criar
      v-if="dialogCriar"
      :abrir="dialogCriar"
      @atualizaArray="atualizaArray"
      @fechar="fecharDialogCriar"
    />
    <dialog-editar
      v-if="dialogEditar"
      :abrir="dialogEditar"
      :desenvolvedor="emiteDesenvolvedor"
      @atualizaEditarArray="atualizaEditarArray"
      @fechar="fecharDialogEditar"
    />
    <dialog-excluir
      v-if="dialogExcluir"
      :dialog="dialogExcluir"
      @fechar="fecharDialogExcluir"
      @excluir="confirmaExclusao"
    />
  </v-container>
</template>

<script>
import dialogCriarDesenvolvedor from "@/components/Criar_desenvolvedor";
import dialogEditarDesenvolvedor from "@/components/Editar_desenvolvedor";
import dialogExcluir from "@/components/Excluir_desenvolvedor";
export default {
  components: {
    "dialog-criar": dialogCriarDesenvolvedor,
    "dialog-editar": dialogEditarDesenvolvedor,
    "dialog-excluir": dialogExcluir,
  },

  data() {
    return {
      dialogCriar: false,
      dialogEditar: false,
      dialogExcluir: false,
      itemExclusao: null,
      page: 1,
      pageCount: 0,
      itemsPerPage: 30,
      busca: "",
      snack: false,
      snackColor: "",
      snackText: "",
      arrayDesenvolvedores: [],
      loaderTabela: false,
      headers: [
        {
          text: "Nome",
          align: "left",
          sortable: false,
          value: "nome",
          width: "350px",
        },
        {
          text: "Sexo",
          align: "left",
          sortable: false,
          value: "sexo",
        },
        {
          text: "Idade",
          align: "left",
          sortable: false,
          value: "idade",
        },
        {
          text: "Data de nascimento",
          align: "left",
          sortable: false,
          value: "datanascimento",
        },
        {
          text: "Ações",
          align: "left",
          sortable: false,
          value: "acao",
        },
      ],
    };
  },

  mounted() {
    this.consultaDesenvolvedores();
  },

  methods: {
    consultaDesenvolvedores() {
      this.loaderTabela = true;
      this.$http.get(`${process.env.VUE_APP_API_URL}developers`).then((res) => {
        this.arrayDesenvolvedores = res.data;
        this.loaderTabela = false;
      });
    },

    criarNovoDesenvolvedor() {
      this.dialogCriar = true;
    },

    editarDesenvolvedor(item) {
      this.emiteDesenvolvedor = item;
      this.dialogEditar = true;
    },

    fecharDialogCriar() {
      this.consultaDesenvolvedores();
      this.dialogCriar = false;
    },

    fecharDialogEditar() {
      this.consultaDesenvolvedores();
      this.dialogEditar = false;
    },

    atualizaEditarArray() {
      this.criarAlerta("success", "Desenvolvedor atualizado com sucesso!");
      this.dialogEditar = false;
      this.consultaDesenvolvedores();
    },

    atualizaArray() {
      this.criarAlerta("success", "Desenvolvedor cadastrado com sucesso!");
      this.dialogCriar = false;
      this.consultaDesenvolvedores();
    },

    excluirDesenvolvedor(item) {
      this.itemExclusao = item;
      this.dialogExcluir = true;
    },

    fecharDialogExcluir() {
      this.dialogExcluir = false;
    },

    async confirmaExclusao() {
      // Confirma exclusão do desenvolvedor
      this.$http
        .delete(
          `${process.env.VUE_APP_API_URL}developers/` + this.itemExclusao._id
        )
        .then(() => {
          this.criarAlerta("success", "Desenvolvedor excluído com sucesso!");
          this.consultaDesenvolvedores();
          this.dialogExcluir = false;
        });
    },

    criarAlerta(color, mensagem) {
      this.snack = true;
      this.snackColor = color;
      this.snackText = mensagem;
    },
  },
};
</script>
