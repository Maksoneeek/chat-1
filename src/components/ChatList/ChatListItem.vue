<template>
  <div
    class="list-chat__item item-list-chat"
    :class="{ active: CurrentChatId == item.chat }"
    @click="setChatId(item.chat)"
  >
    <div class="item-list-chat__body">
      <div
        class="item-list-chat__icon item-list-chat__icon_new icon"
        :class="{ icon_new: false }"
      >
        {{ item.profile.nickname[0].toUpperCase() }}
        <span v-if="item.unread_msg_count != 0">2</span>
      </div>
      <div class="item-list-chat__block">
        <div class="item-list-chat__line line">
          <span class="line__name">
            {{ item.profile.nickname }}
          </span>
          <div class="line__number">
            {{ item.profile.login }}
            <span
              class="line__messenger"
              :class="{
                tg: item.program == 'TL',
                wp: item.program == 'GS',
              }"
            >
              {{ item.program }}
            </span>
          </div>
        </div>
        <div
          class="item-list-chat__text"
          :class="{ 'item-list-chat__text_new': item.unread_msg_count != 0 }"
        >
          {{ item.last_msg_text.slice(0, 20) + "..." }}
        </div>
        <div class="item-list-chat__date">{{ getDate }}</div>
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
      return convertDate(this.item.last_msg_time);
    },
    CurrentChatId() {
      return this.$store.state.meta.currentChatId;
    },
  },
  methods: {
    setChatId(id) {
      this.$store.commit("setChatId", id);

      // this.$store.dispatch("fetchMessagesRequest");
      // if (!this.item.isRead) {
      //   this.$store.dispatch("updateChat", {
      //     id,
      //     isRead: true,
      //   });
      // }
    },
  },
};
</script>