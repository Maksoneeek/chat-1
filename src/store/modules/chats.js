import Api from '../../services/api'

export default {
  state: {
    isLoading: true,
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
        console.log('reauest')
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
        commit("setLoadingChats", false)
        commit('setLazyLoading', false)
      }
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
      return [...state.chats].sort((x, y) => y.last_msg_time - x.last_msg_time)
    },
    currentChat(state, getters, rootState) {
      return state.chats.find(item => item.id === rootState.meta.currentChatId)
    }
  }
}