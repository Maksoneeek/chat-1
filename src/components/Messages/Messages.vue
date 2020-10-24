<template>
  <div class="chat__item chat-item">
    <MessagesHeader />
    <MessagesList />
    <MessagesFooter />
    <NewChatPopup />
    <TemplateListPopup />
  </div>
</template>

<script>
import MessagesHeader from "./MessagesHeader";
import MessagesList from "./MessagesList";
import MessagesFooter from "./MessagesFooter";
import NewChatPopup from "../ChatList/NewChatPopup";
import TemplateListPopup from "../Templates/TemplateListPopup";

export default {
  components: {
    MessagesHeader,
    MessagesList,
    MessagesFooter,
    NewChatPopup,
    TemplateListPopup,
  },
  mounted() {
    //this.$store.dispatch("fetchMessagesRequest");
  },
};
</script>