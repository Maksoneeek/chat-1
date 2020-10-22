import Api from '../../services/api';

export default {
  state: {

    mailFolders: [
      { id: 100, name: 'Все диалоги', type: "all", img: './static/img/all folders-grey.svg', imgHover: './static/img/all folders.svg' },
      { id: 101, name: 'Непрочитанные', type: "unread", img: './static/img/close mail-grey.svg', imgHover: './static/img/close mail.svg' },
      { id: 102, name: 'Прочитанные', type: "read", img: './static/img/open mail-grey.svg', imgHover: './static/img/open mail.svg' },
    ],
    programFolders: [
      { id: 200, name: 'Telegram', program: "TL", img: './static/img/telega.png' },
      { id: 201, name: 'WhatsApp', program: "WA", img: './static/img/whatsapp.png' },
    ],
    folders: []
  },
  mutations: {
    setFolders(state, folders) {
      state.folders = folders
    },
    addFolder(state, folder) {
      state.folders.push(folder)
    }
  },
  actions: {
    async fetchFoldersRequest({ commit, rootState }) {
      try {
        const { botref } = rootState.meta;

        const response = await Api.fetchFolders(botref);

        if (response.data.folders) {
          commit('setFolders', response.data.folders);
        }
      } catch (e) {
        console.log(e)
      }
    },
    async createFolderRequest({ commit, rootState }, folderName) {
      try {
        const { botref } = rootState.meta;

        const response = await Api.createFolder(botref, folderName);

        const { success, id, name } = response.data;

        if (success) {
          commit('addFolder', {
            id,
            name
          });
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  getters: {

  }
}
