<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" class="mt-12">
        <v-card color="white">
          <v-container grid-list-xl fluid>
            <v-layout row>
              <v-flex xs12 sm6 md8 lg9 xl11>
                <v-text-field
                  v-model="search"
                  hide-details
                  outlined
                  dense
                  label="Nome"
                  prepend-inner-icon="mdi-magnify"
                ></v-text-field>
              </v-flex>
              <v-flex xl1 class="justify-end d-flex">
                <v-btn color="primary" @click="createNewDeveloper()">
                  <v-icon small dark>mdi-plus</v-icon>
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
                  :items="arrayDevelopers"
                  :loading="loaderTable"
                  no-data-text="Não há desenvolvedores a serem exibidos"
                  :page.sync="page"
                  hide-default-footer
                >
                  <template v-slot:item.sex="{ item }">
                    {{ item.sex === 'M' ? 'Masculino' : 'Feminino' }}
                  </template>
                  <template v-slot:item.birthdate="{ item }">
                    {{ item.birthdate | data }}
                  </template>
                  <template v-slot:item.acao="{ item }">
                    <v-icon class="mr-2" @click="editDeveloper(item)">
                      mdi-pencil
                    </v-icon>
                    <v-icon color="red" @click="deleteDeveloper(item)">
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
                    >Sua pesquisa por "{{ search }}" não obteve
                    resultado.</v-alert
                  >
                </v-data-table>
                <div class="text-center pt-2">
                  <v-pagination
                    v-model="page"
                    :length="countPages"
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
    <dialog-create
      v-if="openDialogCreate"
      :open-dialog="openDialogCreate"
      @updateArray="updateArray"
      @close="closeCreateDialog"
    />
    <dialog-update
      v-if="openDialogUpdate"
      :open-dialog="openDialogUpdate"
      :developer="emitDeveloper"
      @updateEditArray="updateEditArray"
      @close="closeUpdateDialog"
    />
    <dialog-delete
      v-if="deleteDialog"
      :dialog="deleteDialog"
      @close="closeDeleteDialog"
      @delete="deleteConfirm"
    />
  </v-container>
</template>

<script>
import dialogCreate from '@/components/developer/dialog/create'
import dialogUpdate from '@/components/developer/dialog/update'
import dialogDelete from '@/components/developer/dialog/delete'
import { mapGetters } from 'vuex'
export default {
  components: {
    'dialog-create': dialogCreate,
    'dialog-update': dialogUpdate,
    'dialog-delete': dialogDelete
  },

  data() {
    return {
      openDialogCreate: false,
      openDialogUpdate: false,
      deleteDialog: false,
      itemRemove: null,
      page: 1,
      countPages: 0,
      limit: 5,
      search: '',
      snack: false,
      snackColor: '',
      snackText: '',
      arrayDevelopers: [],
      loaderTable: false,
      headers: [
        {
          text: 'Nome',
          align: 'left',
          sortable: false,
          value: 'name',
          width: '350px'
        },
        {
          text: 'Sexo',
          align: 'left',
          sortable: false,
          value: 'sex'
        },
        {
          text: 'Idade',
          align: 'left',
          sortable: false,
          value: 'age'
        },
        {
          text: 'Data de nascimento',
          align: 'left',
          sortable: false,
          value: 'birthdate'
        },
        {
          text: 'Ações',
          align: 'left',
          sortable: false,
          value: 'acao'
        }
      ]
    }
  },

  computed: {
    ...mapGetters(['getAllDevelopers', 'getPagination'])
  },

  watch: {
    page() {
      this.getDevelopers()
    },

    search() {
      this.getDevelopers()
    }
  },

  mounted() {
    this.getDevelopers()
  },

  methods: {
    getDevelopers() {
      this.loaderTable = true
      const dados = {
        page: parseInt(this.page),
        limit: parseInt(this.limit),
        search: this.search
      }
      this.$store.dispatch('actionGetAllDevelopers', dados).then(() => {
        this.arrayDevelopers = this.getAllDevelopers
        this.countPages = this.getPagination
        this.loaderTable = false
      })
    },

    createNewDeveloper() {
      this.openDialogCreate = true
    },

    editDeveloper(item) {
      this.emitDeveloper = item
      this.openDialogUpdate = true
    },

    closeCreateDialog() {
      this.getDevelopers()
      this.openDialogCreate = false
    },

    closeUpdateDialog() {
      this.getDevelopers()
      this.openDialogUpdate = false
    },

    updateEditArray() {
      this.alertDeveloper('success', 'Desenvolvedor atualizado com sucesso!')
      this.openDialogUpdate = false
      this.getDevelopers()
    },

    updateArray() {
      this.alertDeveloper('success', 'Desenvolvedor cadastrado com sucesso!')
      this.openDialogCreate = false
      this.getDevelopers()
    },

    deleteDeveloper(item) {
      this.itemRemove = item
      this.deleteDialog = true
    },

    closeDeleteDialog() {
      this.deleteDialog = false
    },

    async deleteConfirm() {
      this.$store
        .dispatch('actionDeleteDeveloper', this.itemRemove._id)
        .then(() => {
          this.alertDeveloper('success', 'Desenvolvedor excluído com sucesso!')
          this.getDevelopers()
          this.deleteDialog = false
        })
    },

    alertDeveloper(color, message) {
      this.snack = true
      this.snackColor = color
      this.snackText = message
    }
  }
}
</script>
