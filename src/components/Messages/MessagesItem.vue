<template>
  <div
    class="content-chat-content__message"
    :class="{
      recipient: sender == $store.getters['nickname'],
      sender: sender != $store.getters['nickname'],
      'content-chat-content__message_search': message.searched,
    }"
  >
    <div class="content-chat-content__message_container">
      <div
        class="content-chat-content__icon icon"
        :style="'background-color:' + color()"
      >
        {{ sender[0] }}
      </div>
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
          <div v-else-if="message.type === 'video'">
            <video controls v-if="!browserSupport(message.file_mime)">
              <source :src="message.url" type="video/mp4" />
            </video>
            <a v-else :download="message.file_orig_name" :href="message.url">{{
              message.file_orig_name
            }}</a>
          </div>
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
                  {{ message.file_orig_name }}
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
              controlsList="nodownload"
            ></audio>
          </div>
          <div
            v-if="message.button_text.length"
            class="content-chat-content__item_btns-body"
          >
            <button
              v-for="button in message.button_text"
              :key="button"
              class="content-chat-content__item_btn"
            >
              {{ button }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { convertDate, getColor } from "../../services/utils";
import { detect } from "detect-browser";

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
        return this.$store.getters["nickname"];
      }

      return this.message.sender;
    },
    textArray() {
      return this.message.text.trim().split("\n");
    },
    size() {
      return Math.floor(this.message.file_size / 1024) + "кб";
    },
  },
  methods: {
    onPlay() {
      this.audioPlay = true;
    },
    onPause() {
      this.audioPlay = false;
    },
    color() {
      return getColor(this.sender[0]);
    },
    browserSupport(mime) {
      const badSupportedMimes = ["video/webm", "video/ogg"];
      const badBrowsers = ["ie", "safari"];

      const browser = detect();

      if (!badSupportedMimes.includes(mime)) {
        return true;
      } else if (!badBrowsers.includes(browser.name)) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>