<template>
  <div class="chat__list list-chat">
    <ChatListHeader />
    <div @scroll="onScroll" class="list-chat__scroll">
      <div v-if="$store.state.chats.loading">
        <ChatLoader></ChatLoader>
        <ChatLoader></ChatLoader>
        <ChatLoader></ChatLoader>
      </div>
      <div v-else-if="chats.length === 0">No Chats!</div>
      <ChatListItem
        v-else
        v-for="chat in chats"
        :key="chat.chat + chat.program"
        :item="chat"
      />
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
      return this.$store.getters.chats;
    },
  },
  methods: {
    onScroll(event) {
      const { scrollHeight, clientHeight, scrollTop } = event.target;

      const needFetchChats =
        scrollHeight - clientHeight < scrollTop + 100 &&
        !this.$store.state.chats.lazyLoading &&
        !this.$store.state.chats.isLoaded;

      if (needFetchChats) {
        this.$store.dispatch("lazyChatsRequest");
      }
    },
  },
  mounted() {
    this.$store.dispatch("lazyChatsRequest");
    this.$store.dispatch("fetchUrgentChats");
    // setInterval(() => {
    //   this.$store.dispatch("updateUrgentChats");
    // }, 5000);
    // setInterval(() => {
    //   this.$store.dispatch("updateChats");
    // }, 5000);
  },
};
</script>