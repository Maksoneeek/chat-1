<template>
  <div class="list-chat__item item-list-chat">
    <div class="item-list-chat__body">
      <div class="item-list-chat__icon item-list-chat__icon_new icon">
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
export default {
  props: ["item"],
  computed: {
    getDate() {
      const date = new Date(this.item.timestamp).toDateString().slice(4, 10);
      const time = new Date(this.item.timestamp).toTimeString().slice(0, 5);
      return `${date}, ${time}`;
    },
  },
};
</script>