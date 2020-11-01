import Api from '../../services/api';

export default {
  state: {
    botref: '62b769d71658',
    currentChatId: null,
    chatInfo: null,
    currentProgram: null,
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
    setProgram(state, program) {
      state.currentProgram = program
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
    },
    setChatInfo(state, chatInfo) {
      state.chatInfo = chatInfo
    }
  },
  actions: {
    async fetchChatInfoRequest({ state, commit }) {
      try {
        const { currentChatId, botref, currentProgram } = state;

        const response = await Api.fetchChatInfo(botref, currentProgram, currentChatId);

        if (response.data && (currentChatId === state.currentChatId)) {
          commit('setChatInfo', response.data)
        }

      } catch (e) {
        console.log(e)
      }
    },
    async leaveChat({ state, commit }) {
      try {
        const { currentChatId, botref, currentProgram, chatInfo } = state;

        if (chatInfo.is_connected) {
          const response = await Api.leaveChat(botref, currentProgram, currentChatId);

          if (response.data.success) {
            commit("setChatId", null);
            commit("setProgram", null);
            commit("setChatInfo", null);
            commit("setMessages", []);
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  getters: {
    currentChatId(state) {
      return state.currentChatId;
    }
  }
}