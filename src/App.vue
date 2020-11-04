<template>
  <div class="wrapper">
    <div class="chat" :class="{ pad: folderIsOpen }">
      <LeftBar />
      <div class="chat__container">
        <div class="chat__row">
          <ChatList />
          <Messages />
          <FilesPopup />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftBar from "./components/Folders/FolderBar";
import ChatList from "./components/ChatList/ChatList";
import Messages from "./components/Messages/Messages";
import FilesPopup from "./components/Messages/MessageWidgets/FilesWidget/FilesPopup";

export default {
  components: {
    LeftBar,
    ChatList,
    Messages,
    FilesPopup,
  },
  computed: {
    folderIsOpen() {
      return this.$store.state.meta.foldersIsOpen;
    },
  },
  mounted() {
    this.$store.dispatch("fetchOptionsRequest");
  },
};
</script>
