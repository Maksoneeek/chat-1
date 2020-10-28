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

  fetchQtyFolders(botref) {
    return axios(`https://marketbot.biz/chat_v2/get_chat_counts?botref=${botref}`)
  }

  createFolder(botref, name) {

    const bodyFormData = new FormData();
    bodyFormData.append('botref', botref);
    bodyFormData.append('name', name);

    return axios.post(`https://marketbot.biz/chat_v2/createfolder`, bodyFormData, {
      'Content-Type': 'multipart/form-data'
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

  createTemplate(botref, body) {
    const bodyFormData = new FormData();
    bodyFormData.append('botref', botref);
    bodyFormData.append('name', body.name);
    bodyFormData.append('text', body.text);
    bodyFormData.append('type', body.type);

    return axios.post(`https://marketbot.biz/chat_v2/submit_new_template`, bodyFormData, {
      'Content-Type': 'multipart/form-data'
    })
  }

  deleteTemplate(botref, id) {
    return axios.get(`https://marketbot.biz/chat_v2/del_template`, {
      params: {
        botref,
        tpl_id: id
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