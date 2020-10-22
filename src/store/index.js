import Vue from 'vue'
import Vuex from 'vuex'
import chats from './modules/chats'
import messages from './modules/messages'
import meta from './modules/meta'
import folders from './modules/folders'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    chats,
    messages,
    meta,
    folders
  }
})
