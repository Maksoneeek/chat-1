import Api from '../../services/api'

export default {
  state: {
    currentChatId: null,
    messages: []
  },
  mutations: {
    addMessages(state, messages) {
      state.messages = messages
    },
    addMessage(state, message) {
      state.messages.push(message)
    },
    setChatId(state, chatId) {
      state.currentChatId = chatId
    }
  },
  actions: {
    async fetchMessagesRequest({ commit, state }) {
      const messages = await Api.fetchMessages(state.currentChatId)

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