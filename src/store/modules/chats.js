import Api from '../../services/api'

export default {
  state: {
    loading: false,
    lazyLoading: false,
    isLoaded: false,
    chats: []
  },
  mutations: {
    addChats(state, chats) {
      state.chats = chats
    },
    addChat(state, newChat) {
      state.chats.push(newChat)
    },
    setLoading(state, loading) {
      state.loading = loading
    },
    lazyAddChats(state, chats) {
      const idChats = state.chats.map(chat => chat.chat + chat.program);
      for (let chat of chats) {
        const chatId = chat.chat + chat.program;
        if (!(idChats.includes(chatId))) {
          state.chats.push(chat)
        }
      }
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
        commit('setLoading', true)
        commit("setLoaded", false)
        commit("addChats", [])

        const { botref, currentFolder } = rootState.meta;
        let { id, type, program } = currentFolder;

        if (type || program) {
          id = undefined
        }

        const chats = await Api.fetchChats(botref, 0, program, id);

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
        commit('setLoading', false)
      }
    },
    async lazyChatsRequest({ commit, rootState }) {
      try {
        commit('setLazyLoading', true);

        const { botref, time, currentFolder } = rootState.meta;
        let { id, type, program } = currentFolder;

        if (type || program) {
          id = undefined
        }

        const chats = await Api.fetchChats(botref, time, program, id);

        if (chats.data.peers.length > 0) {
          const lastMessageTime = chats.data.peers.slice(-1)[0].last_msg_time;

          commit('lazyAddChats', chats.data.peers)
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

        const sosChats = chats.data.sos.map(chat => {
          return {
            ...chat,
            sos: true
          }
        })

        if (sosChats || chats.data.unread) {
          commit('addChats', [...sosChats, ...chats.data.unread])
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
    async updateChats({ dispatch, rootState }) {
      try {

        const { botref, currentFolder } = rootState.meta;
        let { id, type, program } = currentFolder;

        if (type || program) {
          id = undefined
        }

        const chats = await Api.fetchChats(botref, 0, program, id);

        for (let chat in chats.data.peers) {
          dispatch('updateChat', chat)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async updateUrgentChats({ dispatch, rootState }) {
      try {
        const { botref } = rootState.meta;

        const chats = await Api.fecthUrgentChats(botref);

        const sosChats = chats.data.sos.map(chat => {
          return {
            ...chat,
            sos: true
          }
        })

        if (sosChats || chats.data.unread) {
          const updChats = [...sosChats, ...chats.data.unread];
          for (let chat of updChats) {
            dispatch('updateChat', chat)
          }
        }

      } catch (e) {
        console.log(e)
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
    chats(state, getters, rootState) {
      const currentFolder = rootState.meta.currentFolder;
      if (!currentFolder) {
        return getters.getSortChats
      } else {
        if (currentFolder.type) {
          return getters.getChatsByType(currentFolder.type)
        } else if (currentFolder.program) {
          return getters.getChatsByProgram(currentFolder.program)
        } else {
          return getters.getChatsByGroupId(currentFolder.id)
        }
      }
    },
    getChatsLength(state) {
      return state.chats.length
    },
    getSortChats(state) {
      return [...state.chats].sort((mess1, mess2) => {
        if (mess1.sos === mess2.sos) {
          if (mess1.unread_msg_count === mess2.unread_msg_count) {
            return mess2.last_msg_time - mess1.last_msg_time
          } else {
            return mess2.unread_msg_count - mess1.unread_msg_count
          }
        } else {
          return mess1.sos ? -1 : 1
        }
      })
    },
    currentChat(state, getters, rootState) {
      return state.chats.find(item => item.id === rootState.meta.currentChatId)
    },
    getChatsByGroupId: (state, getters) => id => {
      return getters.getSortChats.filter(chat => chat.folder_id === id);
    },
    getChatsByProgram: (state, getters) => program => {
      return getters.getSortChats.filter(chat => chat.program === program);
    },
    getChatsByType: (state, getters) => type => {
      if (type === 'read') {
        return getters.getSortChats.filter(chat => chat.unread_msg_count === 0);
      } else if (type === "unread") {
        return getters.getSortChats.filter(chat => chat.unread_msg_count !== 0);
      } else {
        return getters.getSortChats
      }

    }
  }
}