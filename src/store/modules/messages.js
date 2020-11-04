import Api from '../../services/api'

export default {
  state: {
    isLoading: false,
    isLazyLoading: false,
    isLoaded: false,
    lastMessageId: 0,
    freshMessageId: null,
    templateId: null,
    text: '',
    files: [],
    messages: []
  },
  mutations: {
    setMessages(state, messages) {
      state.messages = messages
    },
    concatMessages(state, messages) {
      state.messages = state.messages.concat(messages)
    },
    setStartMessages(state, messages) {
      state.messages = [...messages, ...state.messages]
    },

    setLoadingMessages(state, loadingState) {
      state.isLoading = loadingState
    },
    setLazyLoading(state, loadingState) {
      state.isLazyLoading = loadingState
    },
    setLoaded(state, stateLoaded) {
      state.isLoaded = stateLoaded
    },

    setLastMessageId(state, id) {
      state.lastMessageId = id
    },
    setFreshMessageId(state, id) {
      state.freshMessageId = id
    },
    setTemplateId(state, id) {
      state.templateId = id;
    },
    updateText(state, text) {
      state.text = text;
    },
    setFiles(state, files) {
      state.files = files
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

        if (response.data.messages.length) {
          const messages = response.data.messages;

          commit('setMessages', messages)
          commit('setLastMessageId', messages.slice(-1)[0].id)
          commit('setFreshMessageId', messages[0].id)

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

          if (response.data.messages.length && (currentChatId === rootState.meta.currentChatId)) {
            const messages = response.data.messages;

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
    async updateMessages({ commit, state, rootState }) {
      if (state.freshMessageId) {
        try {
          const { botref, currentChatId, currentProgram } = rootState.meta;
          let { freshMessageId } = state;

          const response = await Api.fetchMessagesHistory(botref, currentProgram, currentChatId, freshMessageId);

          if (response.data.messages.length && (currentChatId === rootState.meta.currentChatId)) {
            const messages = response.data.messages;

            commit('setStartMessages', messages)
            commit('setFreshMessageId', messages[0].id)
          }

        } catch (e) {
          console.log(e)
        }
      }
    },
    async writeFirstRequest({ commit, dispatch, rootState }, { phone, message }) {
      const { botref } = rootState.meta;

      const response = await Api.writeFirst(botref, phone, message);

      if (response.data.peer) {

        const newChat = {
          ...response.data.peer,
          last_msg_text: response.data.msg_text
        };

        commit("addChat", newChat);
        commit("setChatId", response.data.peer.chat);
        commit("setProgram", response.data.program);
        dispatch("fetchFirstMessagesRequest");
      }
    },
    async sendMessage({ dispatch, commit, state, rootState }) {
      try {
        const { botref, currentChatId, currentProgram } = rootState.meta;
        const { text, files, templateId } = state;

        const response = await Api.sendMessage(botref, currentProgram, currentChatId, text, files, templateId);
        commit('setTemplateListPopup', false)

        if (response.data.success) {
          dispatch('updateMessages')
          commit("updateText", '')
          commit("setFiles", [])
          commit("setTemplateId", null)
        }

      } catch (e) {
        console.log(e)
      }
    }
  },

  getters: {
    templateId(state) {
      return state.templateId;
    }
  }
}