<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="openDialog"
      persistent
      max-width="400px"
      @keydown.esc="closeDialog()"
    >
      <v-card>
        <v-toolbar class="pt-3" flat>
          <h3 class="pl-5">Novo desenvolvedor</h3>
          <v-spacer></v-spacer>
          <v-btn class="mr-3" small text @click="closeDialog()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="py-0">
          <v-form ref="formDeveloperRegister" lazy-validation>
            <v-container>
              <v-row dense>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="name"
                    label="Nome *"
                    dense
                    outlined
                    :rules="rulesField"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-radio-group v-model="sex" row mandatory class="mt-n2">
                    <v-radio label="Masculino" value="M"></v-radio>
                    <v-radio label="Feminino" value="F"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="age"
                    label="Idade *"
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
                        v-model="formatData"
                        label="Data de nascimento *"
                        outlined
                        dense
                        :rules="rulesField"
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="birthdate"
                      @input="menu_data = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="hobby"
                    outlined
                    dense
                    :rules="rulesField"
                    label="Hobby *"
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
export default {
  props: {
    openDialog: {
      type: Boolean,
      default: false
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
      name: '',
      birthdate: '',
      age: null,
      sex: 'M',
      hobby: ''
    }
  },

  computed: {
    formatData() {
      return this.birthdate ? moment(this.birthdate).format('DD/MM/YYYY') : ''
    }
  },

  methods: {
    validData() {
      if (this.$refs.formDeveloperRegister.validate()) {
        this.loading = true
        this.saveDeveloper()
      } else {
        this.alertDeveloper('red', 'Preencha os campos obrigatórios!')
      }
    },

    saveDeveloper() {
      const developer = {
        name: this.name,
        sex: this.sex,
        age: this.age,
        birthdate: moment(this.birthdate).format('YYYY-MM-DD'),
        hobby: this.hobby
      }

      // this.$http
      //   .post(`${process.env.VUE_APP_API_URL}developers`, developer)
      //   .then(() => {
      this.$store.dispatch('actionCreateDeveloper', developer).then(() => {
        this.$emit('updateArray')
        this.loading = false
      })
    },

    alertDeveloper(color, message) {
      this.snack = true
      this.snackColor = color
      this.snackText = message
    },

    closeDialog() {
      this.$emit('close')
    }
  }
}
</script>
