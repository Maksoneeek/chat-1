<template>
  <div class="wrapper">
    <div class="chat" :class="{ pad: folderIsOpen }">
      <LeftBar />
      <div class="chat__container">
        <div class="chat__row">
          <ChatList />
          <StartPage v-if="!$store.state.meta.currentChatId" />
          <Messages v-else />
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
import StartPage from "./components/StartPage";

export default {
  components: {
    LeftBar,
    ChatList,
    Messages,
    FilesPopup,
    StartPage,
  },
  computed: {
    folderIsOpen() {
      return this.$store.state.meta.foldersIsOpen;
    },
  },
  beforeMount() {
    this.$store.commit("setBotref", this.$route.query.botref);
    this.$store.dispatch("fetchOptionsRequest");
  },
};
</script>
