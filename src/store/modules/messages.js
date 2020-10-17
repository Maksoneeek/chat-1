import Api from '../../services/api'

export default {
  state: {
    isLoading: false,
    messages: []
  },
  mutations: {
    addMessages(state, messages) {
      state.messages = messages
    },
    addMessage(state, message) {
      state.messages.push(message)
    },
    setLoadingMessages(state, loadingState) {
      state.isLoading = loadingState
    }
  },
  actions: {
    async fetchMessagesRequest({ commit, rootState }) {
      commit('addMessages', [])
      commit('setLoadingMessages', true)
      const messages = await Api.fetchMessages(rootState.meta.currentChatId)

      commit('addMessages', messages.data)
      commit('setLoadingMessages', false)
    },
    createMessage({ commit }, body) {
      const newMessage = {
        id: Date.now(),
        type: 'text',
        owner: 'me',
        body,
        status: 'sent',
        timestamp: Date.now()
      }

      commit('addMessage', newMessage)
    }
  },
  getters: {

  }
}