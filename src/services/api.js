import axios from 'axios';

class Api {

  baseUrl = 'https://sparkling-resonance-7945.getsandbox.com:443'

  fetchChats() {
    return axios.get(`${this.baseUrl}/chats`);
  }

  createChat(body) {
    return axios.post(`${this.baseUrl}/chats/create`, body)
  }

  checkUpdateChats() {
    return axios.get(`${this.baseUrl}/chats/check`)
  }

  fetchMessages(chatId) {
    return axios.get(`${this.baseUrl}/messages?id=${chatId}`);
  }

  sendMessage(chatId, body) {
    return axios.post(`${this.baseUrl}/messages/create?id=${chatId}`, body);
  }
}

export default new Api()