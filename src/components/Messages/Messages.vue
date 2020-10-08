<template>
  <div class="chat__item chat-item">
    <MessagesHeader />
    <MessagesList />
    <MessagesFooter />
    <NewChatPopup />
  </div>
</template>

<script>
import MessagesHeader from "./MessagesHeader";
import MessagesList from "./MessagesList";
import MessagesFooter from "./MessagesFooter";
import NewChatPopup from "../ChatList/NewChatPopup";

export default {
  components: {
    MessagesHeader,
    MessagesList,
    MessagesFooter,
    NewChatPopup,
  },
  mounted() {
    this.$store.dispatch("fetchMessagesRequest");
  },
};
</script>