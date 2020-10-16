import Api from '../../services/api'

export default {
  state: {
    messages: []
  },
  mutations: {
    addMessages(state, messages) {
      state.messages = messages
    },
    addMessage(state, message) {
      state.messages.push(message)
    }
  },
  actions: {
    async fetchMessagesRequest({ commit, rootState }) {
      const messages = await Api.fetchMessages(rootState.meta.currentChatId)

      commit('addMessages', messages.data)
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