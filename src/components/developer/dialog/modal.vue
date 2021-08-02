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
            <h3 class="pl-3">{{ titleModal }}</h3>
            <v-spacer></v-spacer>
            <v-btn class="mr-3" small outlined @click="closeDialog()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class="py-0">
            <v-form ref="formDeveloper" lazy-validation>
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
                      label="Idade *"
                      dense
                      :rules="rulesField"
                      type="number"
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
                          readonly
                          prepend-inner-icon="mdi-calendar"
                          :rules="rulesField"
                          v-bind="attrs"
                          @click:prepend-inner="menu_data = true"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="dev.birthdate"
                        locale="pt-br"
                        @input="menu_data = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="dev.hobby"
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
            <v-btn
              v-show="!editMode"
              small
              outlined
              :loading="loading"
              @click="validData('create')"
            >
              <v-icon class="mr-1" small>mdi-check</v-icon>Salvar
            </v-btn>
            <v-btn
              v-show="editMode"
              small
              outlined
              :loading="loading"
              @click="validData('update')"
            >
              <v-icon class="mr-1" small>mdi-check</v-icon>Atualizar
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
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
    editMode: {
      type: Boolean,
      default: null
    },
    titleModal: {
      type: String,
      default: null
    },
    developer: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      menu_data: false,
      loading: false,
      rulesField: [
        v => v != '' || 'Campo obrigatório!',
        v => v != null || 'Campo obrigatório!'
      ],
      dev: {
        name: '',
        birthdate: '',
        age: null,
        sex: 'M',
        hobby: ''
      }
    }
  },

  computed: {
    formatData() {
      return this.dev.birthdate
        ? moment(this.dev.birthdate).format('DD/MM/YYYY')
        : ''
    }
  },

  watch: {
    'dev.age'() {
      if (this.dev.age < 1) {
        this.$toast.warning('Idade somente de 1 até 100 anos!')
        this.dev.age = 1
      } else if (this.dev.age > 100) {
        this.$toast.warning('Idade somente de 1 até 100 anos!')
        this.dev.age = 1
      }
    }
  },

  mounted() {
    if (this.editMode) {
      this.getDeveloper()
    }
  },

  methods: {
    getDeveloper() {
      this.dev = copy(this.developer)
      this.formatDate()
    },

    formatDate() {
      this.dev.birthdate = moment(this.dev.birthdate, 'YYYY-MM-DD').format(
        'YYYY-MM-DD'
      )
    },

    validData(mode) {
      if (this.$refs.formDeveloper.validate()) {
        this.loading = true
        if (mode === 'create') {
          this.saveDeveloper()
        } else {
          this.updateDeveloper()
        }
      } else {
        this.$toast.warning('Preencha os campos obrigatórios!')
      }
    },

    saveDeveloper() {
      const developer = {
        name: this.dev.name,
        sex: this.dev.sex,
        age: this.dev.age,
        birthdate: moment(this.dev.birthdate).format('YYYY-MM-DD'),
        hobby: this.dev.hobby
      }
      this.$store.dispatch('actionCreateDeveloper', developer).then(() => {
        this.$emit('updateArray', 'create')
        this.loading = false
      })
    },

    updateDeveloper() {
      this.$store.dispatch('actionUpdateDeveloper', this.dev).then(() => {
        this.$emit('updateArray', 'update')
        this.loading = false
      })
    },

    closeDialog() {
      this.$emit('close')
    }
  }
}
</script>
