import Api from '../../services/api'

export default {
  state: {
    options: {}
  },
  mutations: {
    setOptions(state, options) {
      state.options = options
    }
  },
  actions: {
    async fetchOptionsRequest({ commit, rootState }) {
      const { botref } = rootState.meta;

      const response = await Api.fetchOptions(botref);

      commit('setOptions', response.data)
    }
  },
  getters: {
    templates(state) {
      return state.templates
    }
  }
}
