import axios from 'axios';

class Api {

  baseUrl = 'https://sparkling-resonance-7945.getsandbox.com:443'

  fetchChats(botref, time, program, folder_id) {
    return axios.get(`https://marketbot.biz/chat_v2/peers_list`, {
      params: {
        botref,
        time,
        limit: 32,
        program,
        folder_id
      }
    });
  }

  fecthUrgentChats(botref) {
    return axios.get(`https://marketbot.biz/chat_v2/urgent_peers?botref=${botref}`)
  }

  fetchFolders(botref) {
    return axios.get(`https://marketbot.biz/chat_v2/folders?botref=${botref}`)
  }

  createFolder(botref, name) {
    return axios.post(`https://marketbot.biz/chat_v2/createfolder`,
      {
        botref,
        name
      }
    )
  }

  fetchOptions(botref) {
    return axios.get(`https://marketbot.biz/chat_v2/opdata`, {
      params: {
        botref
      }
    })
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