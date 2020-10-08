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
    async fetchMessagesRequest({ commit }) {
      const messages = await Api.fetchMessages()

      commit('addMessages', messages)
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