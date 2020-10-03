<template>
  <div class="chat-item__content content-chat-content">
    <MessagesItem :type="'recipient'" />
    <MessagesItem :type="'sender'" />
    <MessagesItem :type="'sender'" />
    <MessagesItem :type="'recipient'" />
  </div>
</template>

<script>
import MessagesItem from "./MessagesItem";

export default {
  components: {
    MessagesItem,
  },
};
</script>