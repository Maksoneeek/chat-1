<template>
  <div
    v-if="this.$store.state.meta.chatInfo"
    class="info"
    :class="{ open: $store.state.meta.chatInfoOpen }"
  >
    <ChatDescription />
    <ChatActions />
    <Folders />
  </div>
</template>

<script>
import ChatDescription from "./ChatDescription";
import ChatActions from "./ChatActions";
import Folders from "./Folders";

export default {
  components: {
    ChatDescription,
    ChatActions,
    Folders,
  },
};
</script>