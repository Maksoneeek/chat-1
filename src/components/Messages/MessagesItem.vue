<template>
  <div
    class="content-chat-content__message"
    :class="{ recipient: item.owner == 'me', sender: item.owner != 'me' }"
  >
    <div class="content-chat-content__message_container">
      <div class="content-chat-content__icon icon">{{ item.owner[0] }}</div>
      <div class="content-chat-content__block">
        <div class="content-chat-content__line">
          <div class="content-chat-content__name">{{ item.owner }}</div>
          <div
            class="content-chat-content__date"
            :class="{ checked: item.status == 'seen' }"
          >
            {{ getDate }}
          </div>
        </div>
        <div class="content-chat-content__item">
          <span>
            {{ item.body }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { convertDate } from "../../services/date";

export default {
  props: ["item"],
  computed: {
    getDate() {
      return convertDate(this.item.timestamp);
    },
  },
};
</script>