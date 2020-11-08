<template>
  <div
    class="content-chat-content__message"
    :class="{
      recipient: sender == 'me',
      sender: sender != 'me',
      'content-chat-content__message_search': message.searched,
    }"
  >
    <div class="content-chat-content__message_container">
      <div class="content-chat-content__icon icon">{{ sender[0] }}</div>
      <div class="content-chat-content__block">
        <div class="content-chat-content__line">
          <div class="content-chat-content__name">{{ sender }}</div>
          <div
            class="content-chat-content__date"
            :class="{
              checked: message.status == 'seen',
              notchecked:
                message.status == 'sent' || message.status == 'enqueued',
            }"
          >
            {{ getDate }}
          </div>
        </div>
        <div
          class="content-chat-content__item"
          :class="{
            'content-chat-content__item_big': ['image', 'video'].includes(
              message.type
            ),
          }"
        >
          <span v-if="message.text && message.type !== 'file'">
            <span v-for="(text, index) in textArray" :key="index"
              >{{ text }}<br
            /></span>
          </span>
          <div
            v-if="message.type === 'image'"
            class="content-chat-content__img"
          >
            <img :src="message.url" alt="" />
          </div>
          <video v-else-if="message.type === 'video'" controls>
            <source :src="message.url" type="video/mp4" />
          </video>
          <div
            v-else-if="message.type === 'file'"
            class="content-chat-content__file"
          >
            <a download :href="message.url">
              <div class="content-chat-content__file_icon">
                <img src="@/assets/img/file.png" alt="" />
              </div>
              <div class="content-chat-content__file_block">
                <div class="content-chat-content__file_name">
                  {{ message.text }}
                </div>
                <div class="content-chat-content__file_size">{{ size }}</div>
              </div>
            </a>
          </div>
          <div
            v-else-if="message.type === 'audio'"
            class="content-chat-content__audio"
          >
            <audio
              @playing="onPlay"
              @pause="onPause"
              :class="{ stop: audioPlay }"
              :src="message.url"
              preload="auto"
              controls
            ></audio>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { convertDate } from "../../services/utils";

export default {
  data() {
    return {
      audioPlay: false,
    };
  },
  props: ["message"],
  computed: {
    getDate() {
      return convertDate(this.message.time);
    },
    sender() {
      const botref = this.$store.state.meta.botref;

      if (botref === this.message.sender) {
        return "me";
      }

      return this.message.sender;
    },
    textArray() {
      return this.message.text.trim().split("\n");
    },
    size() {
      try {
        let url = this.message.url;
        let req = new XMLHttpRequest();
        req.open("GET", url, false);
        req.send();
        return req.getResponseHeader("content-length") / 1024 + "кб";
      } catch (e) {
        console.log("Не удалось определить размер файла");
      }
      return "";
    },
  },
  methods: {
    onPlay() {
      this.audioPlay = true;
    },
    onPause() {
      this.audioPlay = false;
    },
  },
};
</script>