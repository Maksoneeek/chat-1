export default {
  state: {
    botref: '62b769d71658',
    currentChatId: null,
    time: 0,
    newChatPopup: false
  },
  mutations: {
    toggleNewChatPopup(state) {
      state.newChatPopup = !state.newChatPopup
    },
    setChatId(state, chatId) {
      state.currentChatId = chatId
    },
    setTime(state, time) {
      state.time = time
    }
  },
  actions: {

  },
  getters: {
    currentChatId(state) {
      return state.currentChatId;
    }
  }
}