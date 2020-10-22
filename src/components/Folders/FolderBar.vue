<template>
  <div class="chat__letters letters-chat">
    <div class="letters-chat__body">
      <FolderList />
      <div class="letters-chat__new-chat" :class="{ visible: folderIsOpen }">
        <div class="letters-chat__new-chat-text">Создать группу</div>
        <form action="" class="letters-chat__form">
          <div class="letters-chat__input">
            <input type="text" placeholder="Название группы..." />
          </div>
          <button class="letters-chat__btn">
            <img src="@/assets/img/Слой_667.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import FolderList from "./FolderList";

export default {
  components: {
    FolderList,
  },
  computed: {
    folderIsOpen() {
      return this.$store.state.meta.foldersIsOpen;
    },
  },
};
</script>