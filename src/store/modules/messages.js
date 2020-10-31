import Api from '../../services/api'

export default {
  state: {
    isLoading: false,
    isLazyLoading: false,
    isLoaded: false,
    lastMessageId: 0,
    messages: []
  },
  mutations: {
    setMessages(state, messages) {
      state.messages = messages
    },
    concatMessages(state, messages) {
      state.messages = messages.concat(state.messages)
    },
    addMessage(state, message) {
      state.messages.push(message)
    },
    setLoadingMessages(state, loadingState) {
      state.isLoading = loadingState
    },
    setLastMessageId(state, id) {
      state.lastMessageId = id
    },
    setLazyLoading(state, loadingState) {
      state.isLazyLoading = loadingState
    },
    setLoaded(state, stateLoaded) {
      state.isLoaded = stateLoaded
    }
  },
  actions: {
    async fetchFirstMessagesRequest({ commit, rootState }) {
      try {
        commit('setMessages', [])
        commit('setLoaded', false)
        commit('setLoadingMessages', true)

        const { botref, currentChatId, currentProgram } = rootState.meta;

        const response = await Api.fetchMessagesHistory(botref, currentProgram, currentChatId, 0);


        if (response.data.messages) {
          const messages = response.data.messages;

          //messages.reverse()
          commit('setMessages', messages)
          commit('setLastMessageId', messages.slice(-1)[0].id)

          if (messages.length < 32) {
            commit('setLoaded', true)
          }
        }
      } catch (e) {
        console.log(e)
      } finally {
        commit('setLoadingMessages', false)
      }
    },
    async lazyLoadMessages({ commit, state, rootState }) {
      if (!state.isLoaded && !state.isLazyLoading) {
        try {
          commit('setLazyLoading', true)

          const { botref, currentChatId, currentProgram } = rootState.meta;
          let { lastMessageId } = state;
          lastMessageId = -lastMessageId;

          const response = await Api.fetchMessagesHistory(botref, currentProgram, currentChatId, lastMessageId);

          if (response.data.messages) {
            const messages = response.data.messages;

            //messages.reverse()
            commit('concatMessages', messages)
            commit('setLastMessageId', messages.slice(-1)[0].id)

            if (messages.length < 32) {
              commit('setLoaded', true)
            }
          }

        } catch (e) {
          console.log(e)
        } finally {
          commit('setLazyLoading', false)
        }
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