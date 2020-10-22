<template>
  <div class="chat__letters letters-chat">
    <div class="letters-chat__body">
      <FolderList />
      <CreateFolderForm />
    </div>
  </div>
</template>

<script>
import FolderList from "./FolderList";
import CreateFolderForm from "./CreateFolderForm";

export default {
  components: {
    FolderList,
    CreateFolderForm,
  },
};
</script>