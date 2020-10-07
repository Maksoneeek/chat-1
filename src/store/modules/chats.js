export default {
  state: {
    chats: [
      { id: 1, isRead: true, ownerName: 'Andrey', ownerPhone: '79069991244', programm: 'Telegram', lastMessage: 'Хочу засказать расчет', timestamp: Date.now() },
      { id: 2, isRead: true, ownerName: 'Andrey', ownerPhone: '79069991244', programm: 'Whatsapp', lastMessage: 'Хочу заказать Петра', timestamp: Date.now() },
      { id: 3, isRead: true, ownerName: 'Valera', ownerPhone: '79069991244', programm: 'Telegram', lastMessage: 'Хочу засказать расчет', timestamp: Date.now() },
      { id: 4, isRead: false, ownerName: 'Valera', ownerPhone: '79069991244', programm: 'Whatsapp', lastMessage: 'Не хочу засказать расчет', timestamp: Date.now() },
      { id: 5, isRead: false, ownerName: 'Petr', ownerPhone: '79069991244', programm: 'Whatsapp', lastMessage: 'Хочу засказать расчет', timestamp: Date.now() },
      { id: 6, isRead: false, ownerName: 'Gena', ownerPhone: '79069991244', programm: 'Telegram', lastMessage: 'Хочу засказать расчет', timestamp: Date.now() },
    ]
  },
  mutations: {
    addChat(state, newChat) {
      state.chats.push(newChat)
    }
  },
  actions: {
    createChat({ commit }, payload) {
      const newChat = {
        id: Date.now(),
        isRead: false,
        ownerName: 'Default',
        ownerPhone: payload.ownerPhone,
        programm: 'Telegram',
        lastMessage: payload.message,
        timestamp: Date.now()
      }

      commit('addChat', newChat)
    }
  },
  getters: {
    getChatsLength(state) {
      return state.chats.length
    }
  }
}