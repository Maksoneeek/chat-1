<template>
  <div v-if="currentChat" class="info__block">
    <div class="info__block_title">Добавить диалог в группу:</div>
    <form class="info__form" action="">
      <Toggle
        v-for="folder of folders"
        :id="folder.id"
        :text="folder.name"
        :toggleHandler="(unlink) => test(folder.id, unlink)"
        :key="folder.id"
      />
    </form>
  </div>
</template>

<script>
import Toggle from "../widgets/Toggle";

export default {
  components: {
    Toggle,
  },
  computed: {
    folders() {
      return this.$store.state.folders.folders;
    },
    currentChat() {
      return this.$store.getters.currentChat;
    },
  },
  methods: {
    test(folder_id, unlink) {
      this.$store.dispatch("linkFolderRequest", {
        folder_id,
        unlink,
      });
      console.log(folder_id, unlink);
    },
  },
};
</script>
