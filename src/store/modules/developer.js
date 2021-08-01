import developerService from '../../services/developerService'
import * as types from '../mutation-types'

const state = {
  developers: [],
  countPages: 0,
  developer: {}
}

const getters = {
  getAllDevelopers: state => state.developers,
  getPagination: state => state.countPages,
  getOneDeveloper: state => state.developer
}

const actions = {
  actionGetAllDevelopers: async ({ commit }, filterPagination) => {
    const { developers, countPages } = await developerService.findAllDeveloper(
      filterPagination
    )
    await commit('saveDevelopersData', developers)
    await commit('savePagination', countPages)
  },

  actionCreateDeveloper: async ({ commit }, data) => {
    const developer = await developerService.createDeveloper(data)
    await commit('saveDeveloper', developer)
  },

  actionUpdateDeveloper: async ({ commit }, data) => {
    const developer = await developerService.updateDeveloper(data)
    await commit('updateDeveloper', developer)
  },

  actionDeleteDeveloper: async ({ commit }, id) => {
    await developerService.deleteDeveloper(id)
  }
}

const mutations = {
  saveDevelopersData(state, developersData) {
    state.developers = developersData
  },

  savePagination(state, pagination) {
    state.countPages = pagination
  },

  saveDeveloper(state, developer) {
    state.developer = developer
  },

  updateDeveloper(state, developer) {
    state.developer = developer
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
