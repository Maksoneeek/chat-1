export default {
  state: {
    currentChatId: null,
    newChatPopup: false
  },
  mutations: {
    toggleNewChatPopup(state) {
      state.newChatPopup = !state.newChatPopup
    },
    setChatId(state, chatId) {
      state.currentChatId = chatId
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