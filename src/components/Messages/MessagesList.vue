<template>
  <div @scroll="onScroll" class="chat-item__content content-chat-content">
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
  data() {
    return {
      afterFirstScroll: false,
    };
  },
  components: {
    MessagesItem,
    MessageLoader,
  },
  computed: {
    messages() {
      return this.$store.state.messages.messages;
    },
  },
  methods: {
    onScroll(event) {
      if (this.afterFirstScroll) {
        const { scrollTop, scrollHeight, clientHeight } = event.target;

        const scrollForTop = scrollHeight - clientHeight - scrollTop * -1;

        if (scrollForTop < 200) {
          this.$store.dispatch("lazyLoadMessages");
        }
      }
      this.afterFirstScroll = true;
    },
  },
  mounted() {
    let elem = this.$el;
    elem.scrollTop = elem.scrollHeight;
    this.afterFirstScroll = true;
  },
  updated() {
    this.afterFirstScroll = false;
    let elem = this.$el;
    elem.scrollTop = elem.scrollHeight;
  },
};
</script>