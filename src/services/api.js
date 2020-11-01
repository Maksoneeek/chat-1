import axios from 'axios';

class Api {

  baseUrl = 'https://marketbot.biz/chat_v2'

  fetchChats(botref, time, program, folder_id) {
    return axios.get(`${this.baseUrl}/peers_list`, {
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
    return axios.get(`${this.baseUrl}/urgent_peers`, {
      params: {
        botref
      }
    })
  }

  fetchFolders(botref) {
    return axios.get(`${this.baseUrl}/folders`, {
      params: {
        botref
      }
    })
  }

  fetchQtyFolders(botref) {
    return axios(`${this.baseUrl}/get_chat_counts`, {
      params: {
        botref
      }
    })
  }

  createFolder(botref, name) {

    const bodyFormData = new FormData();
    bodyFormData.append('botref', botref);
    bodyFormData.append('name', name);

    return axios.post(`${this.baseUrl}/createfolder`, bodyFormData, {
      'Content-Type': 'multipart/form-data'
    }
    )
  }

  fetchOptions(botref) {
    return axios.get(`${this.baseUrl}/opdata`, {
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

    if (body.image) {
      bodyFormData.append('image', body.image)
    }

    return axios.post(`${this.baseUrl}/submit_new_template`, bodyFormData, {
      'Content-Type': 'multipart/form-data'
    })
  }

  deleteTemplate(botref, id) {
    return axios.get(`${this.baseUrl}/del_template`, {
      params: {
        botref,
        tpl_id: id
      }
    })
  }

  fetchMessagesHistory(botref, program, chat, id) {
    return axios.get(`${this.baseUrl}/history`, {
      params: {
        botref,
        program,
        chat,
        id,
        limit: 32
      }
    });
  }

  fetchChatInfo(botref, program, chat) {
    return axios.get(`${this.baseUrl}/chatinfo`, {
      params: {
        botref,
        program,
        chat
      }
    });
  }

  leaveChat(botref, program, chat) {
    return axios.get(`${this.baseUrl}/leave`, {
      params: {
        botref,
        program,
        chat
      }
    });
  }

  linkFolder(botref, program, chat, folder_id, unlink) {
    const bodyFormData = new FormData();
    bodyFormData.append('botref', botref);
    bodyFormData.append('program', program);
    bodyFormData.append('chat', chat);
    bodyFormData.append('folder_id', folder_id);
    bodyFormData.append('unlink', unlink);

    return axios.post(`${this.baseUrl}/linkfolder`, bodyFormData, {
      'Content-Type': 'multipart/form-data'
    })
  }

  writeFirst(botref, phone, msg_text) {
    return axios.get(`${this.baseUrl}/write_first`, {
      params: {
        botref,
        phone,
        msg_text
      }
    })
  }

  sendMessage(chatId, body) {
    return axios.post(`${this.baseUrl}/messages/create?id=${chatId}`, body);
  }
}

export default new Api()