<template>
  <div class="letters-chat__new-chat" :class="{ visible: folderIsOpen }">
    <div
      @click="toggleOpen"
      class="letters-chat__new-chat-text"
      :class="{ none: isOpen }"
    >
      Создать группу
    </div>
    <form
      @submit.prevent="createFolder"
      action=""
      class="letters-chat__form"
      :class="{ open: isOpen }"
    >
      <div class="letters-chat__input">
        <input
          v-model="folderName"
          type="text"
          placeholder="Название группы..."
        />
      </div>
      <button class="letters-chat__btn">
        <img src="@/assets/img/Слой_667.png" alt="" />
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      folderName: "",
    };
  },
  computed: {
    folderIsOpen() {
      return this.$store.state.meta.foldersIsOpen;
    },
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
    createFolder() {
      if (this.folderName.trim()) {
        this.$store.dispatch("createFolderRequest", this.folderName);
        this.isOpen = false;
        this.folderName = "";
      }
    },
  },
};
</script>