export default {
  state: {
    messages: [
      { id: 11, type: 'text', owner: 'me', body: 'Привет я аниматор', status: 'sent', timestamp: Date.now() },
      { id: 12, type: 'text', owner: 'not me', body: 'Привет я аниматор', status: 'seen', timestamp: Date.now() },
      { id: 13, type: 'text', owner: 'me', body: 'Привет я аниматор', status: 'failed', timestamp: Date.now() },
      { id: 14, type: 'text', owner: 'me', body: 'Привет я аниматор', status: 'sent', timestamp: Date.now() },
      { id: 15, type: 'text', owner: 'me', body: 'Привет я аниматор', status: 'sent', timestamp: Date.now() },
      { id: 16, type: 'text', owner: 'me', body: 'Привет я аниматор', status: 'sent', timestamp: Date.now() }
    ]
  },
  mutations: {
    addMessage(state, message) {
      state.messages.push(message)
    }
  },
  actions: {
    createMessage({ commit }, body) {
      const newMessage = {
        id: Date.now(),
        type: 'text',
        owner: 'me',
        body,
        status: 'sent',
        timestamp: Date.now()
      }

      commit('addMessage', newMessage)
    }
  },
  getters: {

  }
}