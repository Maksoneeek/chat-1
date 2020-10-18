import axios from 'axios';

class Api {

  baseUrl = 'https://sparkling-resonance-7945.getsandbox.com:443'

  fetchChats(botref, time) {
    return axios.get(`https://marketbot.biz/chat_v2/peers_list?botref=${botref}&limit=32&time=${time}`);
  }

  fecthUrgentChats(botref) {
    return axios.get(`https://marketbot.biz/chat_v2/urgent_peers?botref=${botref}`)
  }

  createChat(body) {
    return axios.post(`${this.baseUrl}/chats/create`, body)
  }

  fetchMessages(chatId) {
    return axios.get(`${this.baseUrl}/messages?id=${chatId}`);
  }

  sendMessage(chatId, body) {
    return axios.post(`${this.baseUrl}/messages/create?id=${chatId}`, body);
  }
}

export default new Api()