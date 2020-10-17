<template>
  <div class="message-loader" :class="{ reversed: reversed }">
    <div class="message-loader__avatar">
      <b-skeleton circle width="45px" height="45px"></b-skeleton>
    </div>
    <div class="message-loader__text">
      <b-skeleton
        width="20%"
        :position="getPosition"
        :animated="true"
      ></b-skeleton>
      <b-skeleton width="100%" height="80px" :animated="true"></b-skeleton>
    </div>
  </div>
</template>

<script>
export default {
  props: ["reversed"],
  computed: {
    getPosition() {
      if (this.reversed) {
        return "is-right";
      }
      return "";
    },
  },
};
</script>

<style scoped>
.message-loader {
  display: flex;
  padding: 10px 0;
}

.message-loader__text {
  margin: 0 0 0 15px;
  width: 40%;
}

.message-loader.reversed {
  flex-direction: row-reverse;
}

.message-loader.reversed .message-loader__text {
  margin: 0 15px 0 0;
  float: right;
}
</style>
