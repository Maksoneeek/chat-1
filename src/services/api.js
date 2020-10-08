class Api {

  initialState = {
    chats: [
      { id: 1, isRead: true, ownerName: 'Andrey', ownerPhone: '79069991244', programm: 'Telegram', lastMessage: 'Хочу засказать расчет', timestamp: Date.now() },
      { id: 2, isRead: true, ownerName: 'Andrey', ownerPhone: '79069991244', programm: 'Whatsapp', lastMessage: 'Хочу заказать Петра', timestamp: Date.now() },
      { id: 3, isRead: true, ownerName: 'Valera', ownerPhone: '79069991244', programm: 'Telegram', lastMessage: 'Хочу засказать расчет', timestamp: Date.now() },
      { id: 4, isRead: false, ownerName: 'Valera', ownerPhone: '79069991244', programm: 'Whatsapp', lastMessage: 'Не хочу засказать расчет', timestamp: Date.now() },
      { id: 5, isRead: false, ownerName: 'Petr', ownerPhone: '79069991244', programm: 'Whatsapp', lastMessage: 'Хочу засказать расчет', timestamp: Date.now() },
      { id: 6, isRead: false, ownerName: 'Gena', ownerPhone: '79069991244', programm: 'Telegram', lastMessage: 'Хочу засказать расчет', timestamp: Date.now() },
    ],
    messages: [
      { id: 11, type: 'text', owner: 'me', body: 'Привет я аниматор', status: 'sent', timestamp: Date.now() },
      { id: 12, type: 'text', owner: 'not me', body: 'Привет я аниматор', status: 'seen', timestamp: Date.now() },
      { id: 13, type: 'text', owner: 'me', body: 'Привет я аниматор', status: 'failed', timestamp: Date.now() },
      { id: 14, type: 'text', owner: 'me', body: 'Привет я аниматор', status: 'sent', timestamp: Date.now() },
      { id: 15, type: 'text', owner: 'me', body: 'Привет я аниматор', status: 'sent', timestamp: Date.now() },
      { id: 16, type: 'text', owner: 'me', body: 'Привет я аниматор', status: 'sent', timestamp: Date.now() },
    ]
  }

  fetchChats() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.initialState.chats)
      }, 0)
    })
  }

  fetchMessages() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.initialState.messages)
      }, 0)
    })
  }
}

export default new Api()