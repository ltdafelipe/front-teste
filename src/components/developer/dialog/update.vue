<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="openDialog"
      persistent
      max-width="400px"
      @keydown.esc="closeDialog()"
    >
      <v-card>
        <v-container grid-list-xl fluid>
          <v-toolbar flat>
            <h3 class="pl-3">Detalhes</h3>
            <v-spacer></v-spacer>
            <v-btn class="mr-3" small outlined @click="closeDialog()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class="py-0">
            <v-form ref="formDeveloperUpdate" lazy-validation>
              <v-container>
                <v-row dense>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="dev.name"
                      label="Nome *"
                      dense
                      outlined
                      :rules="rulesField"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-radio-group
                      v-model="dev.sex"
                      row
                      mandatory
                      class="mt-n2"
                    >
                      <v-radio label="Masculino" value="M"></v-radio>
                      <v-radio label="Feminino" value="F"></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="dev.age"
                      label="Idade"
                      dense
                      type="number"
                      :rules="rulesField"
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
                          :rules="rulesField"
                          v-bind="attrs"
                          v-on="on"
                          @change="formatDate"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="dev.birthdate"
                        @input="menu_data = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="dev.hobby"
                      :rules="rulesField"
                      dense
                      outlined
                      label="Hobby"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions class="mx-5 pb-5 mt-n4">
            <small>* Campos obrigatórios</small>
            <v-spacer></v-spacer>
            <v-btn small outlined :loading="loading" @click="validData()">
              <v-icon class="mr-1" small>mdi-check</v-icon>Salvar
            </v-btn>
          </v-card-actions>
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
import moment from 'moment'
import { copy } from '@/util/copy'
export default {
  props: {
    openDialog: {
      type: Boolean,
      default: false
    },
    developer: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      snack: false,
      snackColor: '',
      snackText: '',
      menu_data: false,
      loading: false,
      rulesField: [
        v => v != '' || 'O campo está vazio!',
        v => v != null || 'O campo está vazio!'
      ],
      dev: {
        name: '',
        sex: 'M',
        age: null,
        birthdate: '',
        hobby: ''
      }
    }
  },

  computed: {
    formataData() {
      return this.dev.birthdate
        ? moment(this.dev.birthdate, 'YYYY-MM-DD').format('DD/MM/YYYY')
        : ''
    }
  },

  mounted() {
    this.getDeveloper()
  },

  methods: {
    formatDate() {
      this.dev.birthdate = moment(this.dev.birthdate, 'YYYY-MM-DD').format(
        'YYYY-MM-DD'
      )
    },

    getDeveloper() {
      this.dev = copy(this.developer)
      this.formatDate()
    },

    closeDialog() {
      this.$emit('close')
    },

    validData() {
      if (this.$refs.formDeveloperUpdate.validate()) {
        this.loading = true
        this.updateDeveloper()
      } else {
        this.alertDeveloper('red', 'Preencha os campos obrigatórios!')
      }
    },

    updateDeveloper() {
      this.$store.dispatch('actionUpdateDeveloper', this.dev).then(() => {
        this.$emit('updateEditArray')
        this.loading = false
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
