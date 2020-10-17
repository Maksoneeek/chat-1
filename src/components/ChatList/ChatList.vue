<template>
  <div class="chat__list list-chat">
    <ChatListHeader />
    <div class="list-chat__scroll">
      <div v-if="$store.state.chats.isLoading">
        <ChatLoader></ChatLoader>
        <ChatLoader></ChatLoader>
        <ChatLoader></ChatLoader>
      </div>
      <ChatListItem v-else v-for="chat in chats" :key="chat.id" :item="chat" />
    </div>
  </div>
</template>

<script>
import ChatListHeader from "./ChatListHeader";
import ChatListItem from "./ChatListItem";
import ChatLoader from "../loaders/ChatLoader";

export default {
  components: {
    ChatListHeader,
    ChatListItem,
    ChatLoader,
  },
  computed: {
    chats() {
      return this.$store.getters.getChats;
    },
  },
  mounted() {
    this.$store.dispatch("fetchChatsRequest");
    this.$store.dispatch("checkUpdateChats");
    setInterval(() => {
      this.$store.dispatch("checkUpdateChats");
    }, 20000);
  },
};
</script>