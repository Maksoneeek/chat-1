import axios from 'axios';

class Api {

  baseUrl = 'https://sparkling-resonance-7945.getsandbox.com:443'

  fetchChats() {
    return axios.get(`${this.baseUrl}/chats`);
  }

  checkUpdateChats() {
    return axios.get(`${this.baseUrl}/chats/check`)
  }

  fetchMessages(chatId) {
    return axios.get(`${this.baseUrl}/messages?id=${chatId}`);
  }
}

export default new Api()