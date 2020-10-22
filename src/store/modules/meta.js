export default {
  state: {
    botref: '62b769d71658',
    currentChatId: null,
    currentFolder: null,
    time: 0,
    newChatPopup: false,
    foldersIsOpen: false
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
    },
    toggleOpenFolders(state) {
      state.foldersIsOpen = !state.foldersIsOpen
    },
    setFolder(state, folder) {
      state.currentFolder = folder
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