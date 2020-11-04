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
    newChatTemplatePopup: false,
    settingsPopup: false,
    foldersIsOpen: false,
    chatInfoOpen: false,
    filesPopupOpen: false
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
    toggleNewChatTemplatePopup(state) {
      state.newChatTemplatePopup = !state.newChatTemplatePopup
    },
    setTemplateListPopup(state, bool) {
      state.templateListPopup = bool
    },
    setNewChatTemplatePopup(state, bool) {
      state.newChatTemplatePopup = bool
    },
    toggleSettingsPopup(state) {
      state.settingsPopup = !state.settingsPopup
    },
    setChatInfo(state, chatInfo) {
      state.chatInfo = chatInfo
    },
    toggleChatInfo(state) {
      state.chatInfoOpen = !state.chatInfoOpen
    },
    toggleFilesPopup(state) {
      state.filesPopupOpen = !state.filesPopupOpen
    },
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
    },
    async toggleBanChatRequest({ state, dispatch }) {
      try {
        const { currentChatId, botref, currentProgram, chatInfo } = state;
        const { is_banned } = chatInfo;

        const response = await Api.toggleBanChat(botref, currentProgram, currentChatId, is_banned);

        if (response.data.success) {
          dispatch("fetchChatInfoRequest")
        }

      } catch (e) {
        console.log(e)
      }
    }
  },
  getters: {
    currentChatId(state) {
      return state.currentChatId;
    },
    chatIsConnected(state) {
      if (state.chatInfo) {
        return state.chatInfo.is_connected || false;
      }

      return false
    },
    isBannedChat(state) {
      if (state.chatInfo) {
        return state.chatInfo.is_banned;
      }
      return true;
    }
  }
}