import Api from '../../services/api'

export default {
  state: {
    isLoading: false,
    messages: []
  },
  mutations: {
    setMessages(state, messages) {
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
      try {
        commit('setMessages', [])
        commit('setLoadingMessages', true)

        const { botref, currentChatId, currentProgram } = rootState.meta;

        const response = await Api.fetchMessagesHistory(botref, currentProgram, currentChatId, 0);

        console.log(response)

        if (response.data.messages) {
          commit('setMessages', response.data.messages)
        }
      } catch (e) {
        console.log(e)
      } finally {
        commit('setLoadingMessages', false)
      }
    },
    async createMessage({ commit }, body) {
      const newMessage = {
        type: 'text',
        owner: 'me',
        body,
        status: 'sent',
        timestamp: Date.now()
      }

      const response = await Api.sendMessage(1, newMessage)
      console.log(response)
      if (response.data.status == "ok") {
        commit('addMessage', newMessage)
      }
    }
  },
  getters: {

  }
}