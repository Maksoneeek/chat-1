import Api from '../../services/api'

export default {
  state: {
    isLoading: false,
    chats: []
  },
  mutations: {
    addChats(state, chats) {
      state.chats = chats
    },
    addChat(state, newChat) {
      state.chats.push(newChat)
    },
    setLoadingChats(state, loadingState) {
      state.isLoading = loadingState
    }
  },
  actions: {
    async fetchChatsRequest({ commit }) {
      commit("setLoadingChats", true)
      const chats = await Api.fetchChats()

      commit('addChats', chats.data)
      commit("setLoadingChats", false)
    },
    async checkUpdateChats({ dispatch }) {
      const update = await Api.checkUpdateChats();

      if (update.data) {
        update.data.unread.map((item) => {
          dispatch('updateChat', { ...item, isRead: false })
        })
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
    updateChat({ commit, state }, payload) {
      const updState = state.chats.map(item => {
        if (item.id == payload.id) {
          return {
            ...item,
            ...payload,
          }
        }
        return item
      });
      commit('addChats', updState)
    }
  },
  getters: {
    getChatsLength(state) {
      return state.chats.length
    },
    getChats(state) {
      return [...state.chats].sort((x, y) => y.sos ? 1 : -1)
    },
    currentChat(state, getters, rootState) {
      return state.chats.find(item => item.id === rootState.meta.currentChatId)
    }
  }
}