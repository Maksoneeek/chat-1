<template>
  <div class="wrapper">
    <div class="chat">
      <LeftBar />
      <div class="chat__container">
        <div class="chat__row">
          <ChatList />
          <Messages />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftBar from "./components/LeftBar";
import ChatList from "./components/ChatList/ChatList";
import Messages from "./components/Messages/Messages";

export default {
  components: {
    LeftBar,
    ChatList,
    Messages,
  },
};
</script>
