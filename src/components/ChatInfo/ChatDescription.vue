<template>
  <div v-if="currentChat" class="info__block">
    <div class="info__icon">
      <span>{{ firstCharNickname }}</span>
    </div>
    <div class="item-list-chat__line info__line line">
      <span class="line__name info__name">
        {{ currentChat.profile.nickname }}
      </span>
      <div class="line__number info__number">
        {{ currentChat.profile.login }}
        <span
          class="line__messenger info__messenger"
          :class="{
            tg: ['TL', 'VK'].includes(currentChat.program),
            wp: ['GS', 'WA'].includes(currentChat.program),
            vb: ['VB'].includes(currentChat.program),
          }"
        >
          {{ program }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getProgram } from "../../services/utils";

export default {
  computed: {
    currentChat() {
      return this.$store.getters.currentChat;
    },
    program() {
      return getProgram(this.currentChat.program);
    },
    firstCharNickname() {
      if (!this.currentChat) return "";

      const nickname =
        this.currentChat.profile.nickname || this.currentChat.profile.login;

      let firtsChar = nickname[0];

      if (
        0xd800 <= firtsChar.charCodeAt(0) &&
        firtsChar.charCodeAt(0) <= 0xdbff
      ) {
        firtsChar = firtsChar + nickname[1];
      }

      return firtsChar;
    },
  },
};
</script>