<template>
  <div
    class="list-chat__item item-list-chat"
    :class="{ active: CurrentChatId == item.id }"
    @click="setChatId(item.id)"
  >
    <div class="item-list-chat__body">
      <div
        class="item-list-chat__icon item-list-chat__icon_new icon"
        :class="{ icon_new: item.sos }"
      >
        {{ item.ownerName[0].toUpperCase() }}
      </div>
      <div class="item-list-chat__block">
        <div class="item-list-chat__line line">
          <span class="line__name"> {{ item.ownerName }} </span>
          <div class="line__number">
            {{ item.ownerPhone }}
            <span
              class="line__messenger"
              :class="{
                tg: item.programm == 'Telegram',
                wp: item.programm == 'Whatsapp',
              }"
            >
              {{ item.programm }}
            </span>
          </div>
        </div>
        <div
          class="item-list-chat__text"
          :class="{ 'item-list-chat__text_new': item.isRead }"
        >
          {{ item.lastMessage.slice(0, 20) + "..." }}
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
      return convertDate(this.item.timestamp);
    },
    CurrentChatId() {
      return this.$store.state.messages.currentChatId;
    },
  },
  methods: {
    setChatId(id) {
      this.$store.commit("setChatId", id);
      this.$store.dispatch("fetchMessagesRequest");
    },
  },
};
</script>