<template>
  <div class="chat__item chat-item">
    <MessagesHeader />
    <MessagesList />
    <MessagesFooter />
  </div>
</template>

<script>
import MessagesHeader from "./MessagesHeader";
import MessagesList from "./MessagesList";
import MessagesFooter from "./MessagesFooter";

export default {
  components: {
    MessagesHeader,
    MessagesList,
    MessagesFooter,
  },
};
</script>