<template>
  <div class="chat__item chat-item">
    <MessagesHeader />
    <MessagesList />
    <MessagesFooter />
    <NewChatPopup />
    <TemplateListPopup />
    <TemplateListPopup
      :writeFirst="true"
      v-if="$store.state.meta.newChatTemplatePopup"
    />
    <ChatInfo />
    <SettingsPopup />
  </div>
</template>

<script>
import MessagesHeader from "./MessagesHeader";
import MessagesList from "./MessagesList";
import MessagesFooter from "./MessagesFooter";
import NewChatPopup from "../ChatList/NewChatPopup";
import TemplateListPopup from "../Templates/TemplateListPopup";
import SettingsPopup from "../Templates/SettingsPopup";
import ChatInfo from "../ChatInfo/ChatInfo";

export default {
  components: {
    MessagesHeader,
    MessagesList,
    MessagesFooter,
    NewChatPopup,
    TemplateListPopup,
    SettingsPopup,
    ChatInfo,
  },
  mounted() {
    //this.$store.dispatch("fetchMessagesRequest");
  },
};
</script>