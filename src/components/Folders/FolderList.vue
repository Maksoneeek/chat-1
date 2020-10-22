<template>
  <div>
    <MailFolderItem
      v-for="folder of mailFolders"
      :key="folder.id"
      :folder="folder"
      :visible="folderIsOpen"
      :count="$store.getters.getChatsByType(folder.type).length"
    />
    <FolderItem
      v-for="folder of programFolders"
      :key="folder.id"
      :folder="folder"
      :visible="folderIsOpen"
      :count="$store.getters.getChatsByProgram(folder.program).length"
    />
    <FolderItem
      v-for="folder of folders"
      :key="folder.id"
      :folder="folder"
      :visible="folderIsOpen"
      :count="$store.getters.getChatsByGroupId(folder.id).length"
    />
  </div>
</template>

<script>
import FolderItem from "./FolderItem";
import MailFolderItem from "./MailFolderItem";

export default {
  components: {
    FolderItem,
    MailFolderItem,
  },
  computed: {
    folderIsOpen() {
      return this.$store.state.meta.foldersIsOpen;
    },
    mailFolders() {
      return this.$store.state.folders.mailFolders;
    },
    programFolders() {
      return this.$store.state.folders.programFolders;
    },
    folders() {
      return this.$store.state.folders.folders;
    },
  },
  mounted() {
    this.$store.dispatch("fetchFoldersRequest");
  },
};
</script>