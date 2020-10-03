<template>
  <div class="chat__list list-chat">
    <ChatListHeader />
    <ChatListItem v-for="chat in chats" :key="chat.id" :item="chat" />
  </div>
</template>

<script>
import ChatListHeader from "./ChatListHeader";
import ChatListItem from "./ChatListItem";

export default {
  components: {
    ChatListHeader,
    ChatListItem,
  },
  computed: {
    chats() {
      return this.$store.state.chats.chats;
    },
  },
};
</script>