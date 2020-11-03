<template>
  <div v-if="$store.state.meta.chatInfo" class="info__block">
    <div @click="copyToClipboard" class="info__label">
      <span class="info__label_icon">
        <img src="@/assets/img/link.png" alt="" />
      </span>
      <span class="info__label_text"> Поделиться ссылкой на диалог </span>
    </div>
    <div @click="toggleBanChat" class="info__label">
      <span
        v-if="!$store.state.meta.chatInfo.is_banned"
        class="info__label_icon"
      >
        <img src="@/assets/img/delete-2.png" alt="" />
      </span>
      <span
        v-if="!$store.state.meta.chatInfo.is_banned"
        class="info__label_text info__label_text-pink"
      >
        Заблокировать
      </span>
      <span v-else class="info__label_text info__label_text-green">
        Разблокировать
      </span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    copyToClipboard() {
      const link = this.$store.state.meta.chatInfo.public_address;
      navigator.clipboard.writeText(link);
    },
    toggleBanChat() {
      this.$store.dispatch("toggleBanChatRequest");
    },
  },
};
</script>