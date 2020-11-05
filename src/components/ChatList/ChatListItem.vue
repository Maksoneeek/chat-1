<template>
  <div
    class="list-chat__item item-list-chat"
    :class="{
      active: CurrentChatId + CurrentProgram == item.chat + item.program,
    }"
    @click="setChat(item.chat, item.program)"
  >
    <div class="item-list-chat__body">
      <div
        class="item-list-chat__icon item-list-chat__icon_new icon"
        :class="{ icon_new: item.sos }"
      >
        <p class="icon_name">
          {{ firstCharNickname }}
        </p>
        <span v-if="item.unread_msg_count != 0">{{
          item.unread_msg_count
        }}</span>
      </div>
      <div class="item-list-chat__block">
        <div class="item-list-chat__line line">
          <span class="line__name">
            {{ item.profile.nickname || item.profile.login }}
          </span>
          <div class="line__number">
            {{ item.profile.login }}
            <span
              class="line__messenger"
              :class="{
                tg: ['TL', 'VK'].includes(item.program),
                wp: ['GS', 'WA'].includes(item.program),
                vb: ['VB'].includes(item.program),
              }"
            >
              {{ program }}
            </span>
          </div>
        </div>
        <div
          v-if="item.last_msg_text"
          class="item-list-chat__text"
          :class="{ 'item-list-chat__text_new': item.unread_msg_count != 0 }"
        >
          {{ textMessage }}
        </div>
        <div class="item-list-chat__date">{{ getDate }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { convertDate, getProgram } from "../../services/utils";

export default {
  props: ["item"],
  computed: {
    getDate() {
      return convertDate(this.item.last_msg_time);
    },
    program() {
      return getProgram(this.item.program);
    },
    CurrentChatId() {
      return this.$store.state.meta.currentChatId;
    },
    CurrentProgram() {
      return this.$store.state.meta.currentProgram;
    },
    firstCharNickname() {
      const nickname = this.item.profile.nickname || this.item.profile.login;

      let firtsChar = nickname[0];

      if (
        0xd800 <= firtsChar.charCodeAt(0) &&
        firtsChar.charCodeAt(0) <= 0xdbff
      ) {
        firtsChar = firtsChar + nickname[1];
      }

      return firtsChar;
    },
    textMessage() {
      if (this.item.last_msg_text.length < 20) {
        return this.item.last_msg_text;
      } else {
        return this.item.last_msg_text.slice(0, 20) + "...";
      }
    },
  },
  methods: {
    setChat(id, program) {
      this.$store.commit("setChatId", id);
      this.$store.commit("setProgram", program);

      this.$store.dispatch("fetchFirstMessagesRequest");
      this.$store.dispatch("fetchChatInfoRequest");
      // if (!this.item.isRead) {
      //   this.$store.dispatch("updateChat", {
      //     id,
      //     isRead: true,
      //   });
      // }
      this.$store.dispatch("unreadMessagesRequest");
    },
  },
};
</script>