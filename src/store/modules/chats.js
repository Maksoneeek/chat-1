import Api from '../../services/api'

export default {
  state: {
    chats: []
  },
  mutations: {
    addChats(state, chats) {
      state.chats = chats
    },
    addChat(state, newChat) {
      state.chats.push(newChat)
    }
  },
  actions: {
    async fetchChatsRequest({ commit }) {
      const chats = await Api.fetchChats()

      commit('addChats', chats.data)
    },
    async checkUpdateChats({ dispatch }) {
      const update = await Api.checkUpdateChats();

      if (update.data) {
        console.log(update.data)
        update.data.unread.map((item) => {
          dispatch('updateChat', { ...item, isRead: false })
        })
      }

    },
    createChat({ commit }, payload) {
      const newChat = {
        id: Date.now(),
        isRead: false,
        ownerName: 'Default',
        ownerPhone: payload.ownerPhone,
        programm: 'Telegram',
        lastMessage: payload.message,
        timestamp: Date.now()
      }

      commit('addChat', newChat)
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