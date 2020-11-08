<template>
  <div
    @scroll="onScroll"
    class="chat-item__content content-chat-content"
    :class="{
      'info-pad': $store.state.meta.chatInfoOpen,
      hidden: $store.state.meta.chatInfoOpen,
    }"
  >
    <div class="content-chat-content__arrows">
      <div
        class="content-chat-content__arrows_item content-chat-content__arrows_item-up"
      >
        <img src="@/assets/img/arrow-up.png" alt="" />
        <div class="content-chat-content__arrows_number">3</div>
      </div>
      <div
        class="content-chat-content__arrows_item content-chat-content__arrows_item-down"
      >
        <img src="@/assets/img/arrow-down.png" alt="" />
      </div>
    </div>
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
      updateInterval: null,
      lazyLoading: false,
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
          this.lazyLoading = true;
        }
      }
      this.afterFirstScroll = true;
    },
    setIntervalUpdate() {
      if (!this.$store.state.messages.isLoading) {
        return setInterval(() => this.$store.dispatch("updateMessages"), 5000);
      }
      return null;
    },
    clearIntervalUpdate() {
      if (this.updateInterval) {
        clearInterval(this.updateInterval);
      }
    },
  },
  mounted() {
    let elem = this.$el;
    elem.scrollTop = elem.scrollHeight;
  },
  beforeUpdate() {
    this.clearIntervalUpdate();
  },
  updated() {
    this.afterFirstScroll = false;
    if (!this.lazyLoading) {
      let elem = this.$el;
      elem.scrollTop = elem.scrollHeight;
    }
    this.lazyLoading = false;
    this.updateInterval = this.setIntervalUpdate();
  },
};
</script>