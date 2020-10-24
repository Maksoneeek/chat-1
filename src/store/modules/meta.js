export default {
  state: {
    botref: '62b769d71658',
    currentChatId: null,
    currentFolder: { id: 100, name: 'Все диалоги', type: "all", img: './static/img/all folders-grey.svg', imgHover: './static/img/all folders.svg' },
    time: 0,
    newChatPopup: false,
    templateListPopup: false,
    settingsPopup: false,
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
    },
    toggleTemplateListPopup(state) {
      state.templateListPopup = !state.templateListPopup
    },
    toggleSettingsPopup(state) {
      state.settingsPopup = !state.settingsPopup
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