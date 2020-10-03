<template>
  <div class="chat__list list-chat">
    <ChatListHeader />
    <ChatListItem />
    <ChatListItem />
    <ChatListItem />
    <ChatListItem />
    <ChatListItem />
    <ChatListItem />
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
};
</script>