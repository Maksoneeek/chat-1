import Api from '../../services/api'

export default {
  state: {},
  mutations: {
    setOptions(state, options) {
      Object.assign(state, options)
    }
  },
  actions: {
    async fetchOptionsRequest({ commit, rootState }) {
      const { botref } = rootState.meta;

      const response = await Api.fetchOptions(botref);

      commit('setOptions', response.data)
    }
  },
  getters: {}
}
