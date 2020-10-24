<template>
  <div @click="setFolder" class="letters-chat__item">
    <div class="letters-chat__item_grey">
      <img :src="folder.img" alt="" />
    </div>
    <div class="letters-chat__item_hover">
      <img :src="folder.imgHover" alt="" />
    </div>
    <div class="letters-chat__text" :class="{ visible: visible }">
      {{ folder.name }} ({{ count }})
    </div>
  </div>
</template>

<script>
export default {
  props: ["folder", "visible", "count"],
  methods: {
    setFolder() {
      this.$store.commit("setFolder", this.folder);
      this.$store.dispatch("fetchChatsRequest");
    },
  },
};
</script>