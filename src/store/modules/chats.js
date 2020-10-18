import Api from '../../services/api'

export default {
  state: {
    lazyLoading: false,
    isLoaded: false,
    chats: []
  },
  mutations: {
    addChats(state, chats) {
      state.chats = state.chats.concat(chats)
    },
    addChat(state, newChat) {
      state.chats.push(newChat)
    },
    setLoadingChats(state, loadingState) {
      state.isLoading = loadingState
    },
    setLazyLoading(state, loading) {
      state.lazyLoading = loading
    },
    setLoaded(state, loaded) {
      state.isLoaded = loaded
    }
  },
  actions: {
    async fetchChatsRequest({ commit, rootState }) {
      try {
        const { botref, time } = rootState.meta;
        commit('setLazyLoading', true)

        const chats = await Api.fetchChats(botref, time);

        if (chats.data.peers.length > 0) {
          const lastMessageTime = chats.data.peers.slice(-1)[0].last_msg_time;

          commit('addChats', chats.data.peers)
          commit('setTime', lastMessageTime)
        } else {
          commit("setLoaded", true)
        }

      } catch (e) {
        console.log(e)
      } finally {
        commit('setLazyLoading', false)
      }
    },
    async fetchUrgentChats({ commit, rootState }) {
      try {
        const { botref } = rootState.meta;

        const chats = await Api.fecthUrgentChats(botref);

        if (chats.data.sos || chats.data.unread) {
          commit('addChats', [...chats.data.sos, ...chats.data.unread])
        }

      } catch (e) {
        console.log(e)
      }
    },
    async createChat({ commit }, payload) {
      const newChat = {
        isRead: true,
        ownerName: 'Default',
        ownerPhone: payload.ownerPhone,
        programm: 'Telegram',
        lastMessage: payload.message,
        timestamp: Date.now()
      }

      const response = await Api.createChat(newChat)

      if (response.data.status == "ok") {
        commit('addChat', newChat)
      }
    },
    async updateUrgentChats({ commit, dispatch, rootState }) {
      try {
        const { botref } = rootState.meta;

        const chats = await Api.fecthUrgentChats(botref);

        if (chats.data.sos || chats.data.unread) {
          const updChats = [...chats.data.sos, ...chats.data.unread];
          for (let chat of updChats) {
            dispatch('updateChat', chat)
          }
        }

      } catch (e) {
        console.log(e)
      } finally {
        commit("setLoadingChats", false)
      }
    },
    updateChat({ commit, state }, updChat) {
      const updChats = state.chats.map(chat => {
        if ((chat.chat == updChat.chat) && (chat.program == updChat.program)) {
          return updChat
        }
        return chat
      });
      commit('addChats', updChats)
    }
  },
  getters: {
    getChatsLength(state) {
      return state.chats.length
    },
    getChats(state) {
      return [...state.chats].sort((x, y) => y.last_msg_time - x.last_msg_time)
    },
    currentChat(state, getters, rootState) {
      return state.chats.find(item => item.id === rootState.meta.currentChatId)
    }
  }
}