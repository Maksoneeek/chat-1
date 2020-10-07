import Vue from 'vue'
import Vuex from 'vuex'
import chats from './modules/chats'
import messages from './modules/messages'
import meta from './modules/meta'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    chats,
    messages,
    meta
  }
})
