<template>
  <div class="chat-item__content content-chat-content">
    <MessagesItem
      v-for="message in messages"
      :key="message.id"
      :item="message"
    />
  </div>
</template>

<script>
import MessagesItem from "./MessagesItem";

export default {
  components: {
    MessagesItem,
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
    console.log("214");
    let elem = this.$el;
    elem.scrollTop = elem.scrollHeight;
  },
};
</script>