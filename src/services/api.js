class Api {

  initialState = {
    chats: [
      { id: 1, sos: false, isRead: false, ownerName: 'Andrey', ownerPhone: '79069991244', programm: 'Telegram', lastMessage: 'Хочу засказать расчет', timestamp: Date.now() },
      { id: 2, sos: false, isRead: false, ownerName: 'Andrey', ownerPhone: '79069991244', programm: 'Whatsapp', lastMessage: 'Хочу заказать Петра', timestamp: Date.now() },
      { id: 3, sos: true, isRead: true, ownerName: 'Valera', ownerPhone: '79069991244', programm: 'Telegram', lastMessage: 'Хочу засказать расчет', timestamp: Date.now() },
      { id: 4, sos: false, isRead: false, ownerName: 'Valera', ownerPhone: '79069991244', programm: 'Whatsapp', lastMessage: 'Не хочу засказать расчет', timestamp: Date.now() },
      { id: 5, sos: false, isRead: false, ownerName: 'Petr', ownerPhone: '79069991244', programm: 'Whatsapp', lastMessage: 'Хочу засказать расчет', timestamp: Date.now() },
      { id: 6, sos: true, isRead: true, ownerName: 'Gena', ownerPhone: '79069991244', programm: 'Telegram', lastMessage: 'Хочу засказать расчет', timestamp: Date.now() },
    ],
    messages: {
      1: [
        { id: 11, type: 'text', owner: 'me', body: 'Привет я 1 аниматор', status: 'sent', timestamp: Date.now() },
        { id: 12, type: 'text', owner: 'not me', body: 'Привет я аниматор', status: 'seen', timestamp: Date.now() },
        { id: 13, type: 'text', owner: 'me', body: 'Привет я аниматор', status: 'failed', timestamp: Date.now() },
        { id: 14, type: 'text', owner: 'me', body: 'Привет я аниматор', status: 'sent', timestamp: Date.now() },
        { id: 15, type: 'text', owner: 'me', body: 'Привет я аниматор', status: 'sent', timestamp: Date.now() },
        { id: 16, type: 'text', owner: 'me', body: 'Привет я аниматор', status: 'sent', timestamp: Date.now() },
      ],
      2: [
        { id: 11, type: 'text', owner: 'me', body: 'Привет я 2 аниматор', status: 'sent', timestamp: Date.now() },
        { id: 12, type: 'text', owner: 'not me', body: 'Привет я аниматор', status: 'seen', timestamp: Date.now() },
        { id: 13, type: 'text', owner: 'me', body: 'Привет я аниматор', status: 'failed', timestamp: Date.now() },
      ],
      3: [
        { id: 11, type: 'text', owner: 'me', body: 'Привет я 3 аниматор', status: 'sent', timestamp: Date.now() },
        { id: 12, type: 'text', owner: 'not me', body: 'Привет я аниматор', status: 'seen', timestamp: Date.now() },
        { id: 13, type: 'text', owner: 'me', body: 'Привет я аниматор', status: 'failed', timestamp: Date.now() },
      ],
      4: [
        { id: 11, type: 'text', owner: 'me', body: 'Привет я 4 аниматор', status: 'sent', timestamp: Date.now() },
        { id: 12, type: 'text', owner: 'not me', body: 'Привет я аниматор', status: 'seen', timestamp: Date.now() },
        { id: 13, type: 'text', owner: 'me', body: 'Привет я аниматор', status: 'failed', timestamp: Date.now() },
      ],
      5: [
        { id: 11, type: 'text', owner: 'me', body: 'Привет я 5 аниматор', status: 'sent', timestamp: Date.now() },
        { id: 12, type: 'text', owner: 'not me', body: 'Привет я аниматор', status: 'seen', timestamp: Date.now() },
        { id: 13, type: 'text', owner: 'me', body: 'Привет я аниматор', status: 'failed', timestamp: Date.now() },
      ],
      6: [
      ],
    }
  }

  fetchChats() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.initialState.chats)
      }, 0)
    })
  }

  fetchMessages(chatId) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.initialState.messages[chatId])
      }, 0)
    })
  }
}

export default new Api()