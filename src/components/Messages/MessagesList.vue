<template>
  <div class="chat-item__content content-chat-content">
    <div v-if="$store.state.messages.isLoading">
      <MessageLoader></MessageLoader>
      <MessageLoader :reversed="true"></MessageLoader>
      <MessageLoader></MessageLoader>
    </div>
    <MessagesItem
      v-for="message in messages"
      :key="message.id"
      :message="message"
    />
  </div>
</template>

<script>
import MessagesItem from "./MessagesItem";
import MessageLoader from "../loaders/MessageLoader";

export default {
  components: {
    MessagesItem,
    MessageLoader,
  },
  computed: {
    messages() {
      return this.$store.state.messages.messages;
    },
  },
  mounted() {
    let elem = this.$el;
    elem.scrollTop = elem.scrollHeight;
  },
  updated() {
    let elem = this.$el;
    elem.scrollTop = elem.scrollHeight;
  },
};
</script>