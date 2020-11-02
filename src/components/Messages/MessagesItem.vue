<template>
  <div
    class="content-chat-content__message"
    :class="{ recipient: sender == 'me', sender: sender != 'me' }"
  >
    <div class="content-chat-content__message_container">
      <div class="content-chat-content__icon icon">{{ sender[0] }}</div>
      <div class="content-chat-content__block">
        <div class="content-chat-content__line">
          <div class="content-chat-content__name">{{ sender }}</div>
          <div
            class="content-chat-content__date"
            :class="{ checked: message.status == 'seen' }"
          >
            {{ getDate }}
          </div>
        </div>
        <div
          class="content-chat-content__item"
          :class="{
            'content-chat-content__item_big': message.type === 'image',
          }"
        >
          <span v-if="message.type === 'text'">
            {{ message.text }}
          </span>
          <div
            v-else-if="message.type === 'image'"
            class="content-chat-content__img"
          >
            <img :src="message.url" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { convertDate } from "../../services/utils";

export default {
  props: ["message"],
  computed: {
    getDate() {
      return convertDate(this.message.time);
    },
    sender() {
      const botref = this.$store.state.meta.botref;

      if (botref === this.message.sender) {
        return "me";
      }

      return this.message.sender;
    },
  },
};
</script>