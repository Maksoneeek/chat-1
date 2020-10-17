<template>
  <div class="chat-loader">
    <div class="chat-loader__avatar">
      <b-skeleton circle width="45px" height="45px"></b-skeleton>
    </div>
    <div class="chat-loader__text">
      <b-skeleton width="100%" :animated="true"></b-skeleton>
      <b-skeleton width="60%" :animated="true"></b-skeleton>
    </div>
  </div>
</template>

<style scoped>
.chat-loader {
  display: flex;
  padding: 10px 18px 20px;
  height: 84px;
}

.chat-loader__text {
  margin: 0 0 0 15px;
  width: 60%;
}
</style>