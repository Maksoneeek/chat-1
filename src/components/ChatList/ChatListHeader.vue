<template>
  <div
    class="list-chat__header header-list-chat"
    :class="{ 'header-list-chat-mobile': mobile }"
  >
    <div v-if="!searchOpen" class="header-list-chat__title">
      Ваши диалоги <span>({{ chatsLength() }})</span>
    </div>
    <div class="header-list-chat__icons">
      <div
        v-if="!searchOpen && visibleExitButton"
        @click="exitChat"
        class="header-list-chat__icon"
      >
        <svg viewBox="0 0 448 512" width="15px" height="15px">
          <path
            fill="#ffffff"
            d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"
            class=""
          ></path>
        </svg>
      </div>
      <SearchPanel
        :toggleOuterOpen="toggleSearchOpen"
        :allSearch="true"
        :onDispatch="'searchAllChats'"
      />
      <div
        v-if="!searchOpen"
        @click="toggleFolderOpen"
        class="header-list-chat__icon"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          width="24px"
          height="24px"
          viewBox="0 0 612 792"
          enable-background="new 0 0 612 792"
          xml:space="preserve"
        >
          <linearGradient
            id="SVGID_1_"
            gradientUnits="userSpaceOnUse"
            x1="23.294"
            y1="643.2184"
            x2="559.7175"
            y2="193.1057"
          >
            <stop offset="0" style="stop-color: #5d2c91" />
            <stop offset="1" style="stop-color: #d6496f" />
          </linearGradient>
          <path
            fill="url(#SVGID_1_)"
            d="M588.094,505.05c13.203,0,23.906-10.703,23.906-23.906V281.527c0-19.157-7.46-37.168-21.006-50.713  c-13.545-13.543-31.551-21-50.7-21h-0.013l-260.623-0.005c-9.781-42.4-47.841-74.115-93.164-74.125l-90.867-0.029  c-52.728,0-95.625,42.897-95.625,95.625v349.439c0,0.14-0.002-0.139,0,0l0,0c0,52.728,42.897,95.625,95.625,95.625h420.749  c52.727,0,95.625-42.897,95.625-95.625c0-13.203-10.703-23.906-23.906-23.906s-23.906,10.703-23.906,23.906  c0,26.364-21.449,47.812-47.812,47.812H95.626c-26.364,0-47.812-21.449-47.812-47.811V231.28c0-0.172,0.004,0.171,0,0l0,0  c0-26.364,21.449-47.812,47.804-47.812l90.863,0.029c26.358,0.006,47.802,21.453,47.802,47.812v2.406  c0,13.203,10.703,23.906,23.906,23.906l282.097,0.005c6.384-0.001,12.386,2.484,16.902,6.999c4.515,4.514,7.001,10.518,7.001,16.903  v199.617C564.188,494.347,574.89,505.05,588.094,505.05z M570.472,301.375H130.856c-13.203,0-23.906,10.703-23.906,23.906  s10.703,23.906,23.906,23.906h439.617V301.375z"
          />
        </svg>
      </div>
      <div
        v-if="!searchOpen"
        @click="toggleNewChatPopup"
        class="header-list-chat__icon"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Layer_1"
          x="0px"
          y="0px"
          width="18px"
          height="18px"
          viewBox="0 0 512 512"
          enable-background="new 0 0 512 512"
          xml:space="preserve"
        >
          <linearGradient
            id="SVGID_1_"
            gradientUnits="userSpaceOnUse"
            x1="59.8756"
            y1="420.5679"
            x2="449.9832"
            y2="93.2288"
          >
            <stop offset="0" style="stop-color: #5d2c91" />
            <stop offset="1" style="stop-color: #d6496f" />
          </linearGradient>
          <path
            fill="url(#SVGID_1_)"
            d="M256,0c50.531,0,99.676,15,142.117,43.375c9.184,6.137,11.648,18.559,5.512,27.742  c-6.141,9.184-18.563,11.648-27.742,5.512C340.043,52.664,298.59,40,256,40C136.898,40,40,136.898,40,256s96.898,216,216,216  s216-96.898,216-216c0-39.504-10.758-78.145-31.105-111.738c-5.723-9.445-2.703-21.746,6.746-27.469  c9.445-5.723,21.742-2.703,27.465,6.746C499.242,163.383,512,209.188,512,256c0,68.379-26.629,132.668-74.98,181.02  S324.379,512,256,512s-132.668-26.629-181.02-74.98S0,324.379,0,256S26.629,123.332,74.98,74.98S187.621,0,256,0z M236,366.5  v-90.018h-90c-11.046,0-20-8.954-20-20s8.954-20,20-20h90V145.5c0-11.046,8.954-20,20-20s20,8.954,20,20v90.982h90  c11.046,0,20,8.954,20,20c0,11.046-8.954,20-20,20h-90V366.5c0,11.046-8.954,20-20,20S236,377.546,236,366.5L236,366.5z"
          />
        </svg>
      </div>
      <div
        v-if="!searchOpen"
        @click="toggleSettingsOpen"
        class="header-list-chat__icon"
      >
        <svg width="23px" height="23px" viewBox="0 0 612 792">
          <linearGradient
            id="SVGID_1_"
            gradientUnits="userSpaceOnUse"
            x1="52.8954"
            y1="719.6017"
            x2="445.3101"
            y2="390.3268"
            gradientTransform="matrix(1.1953 0 0 1.1953 8.2423 -267.3545)"
          >
            <stop offset="0" style="stop-color: #5d2c91" />
            <stop offset="1" style="stop-color: #d6496f" />
          </linearGradient>
          <path
            fill="url(#SVGID_1_)"
            width="100%"
            height="100%"
            d="M306,534.656c-76.456,0-138.656-62.202-138.656-138.656S229.544,257.344,306,257.344  S444.656,319.545,444.656,396c0,13.249-1.871,26.366-5.561,38.984c-3.708,12.673-16.982,19.941-29.657,16.235  c-12.673-3.707-19.941-16.983-16.235-29.656c2.416-8.256,3.64-16.858,3.64-25.563c0-50.092-40.753-90.844-90.844-90.844  S215.156,345.908,215.156,396s40.753,90.844,90.844,90.844c9.38,0,18.615-1.418,27.45-4.215  c12.585-3.984,26.023,2.991,30.006,15.578c3.984,12.588-2.989,26.022-15.577,30.006C334.371,532.489,320.28,534.656,306,534.656z   M389.672,630.281V618.24c0-3.166,1.994-6.036,5.055-7.3l0.467-0.194c3.101-1.286,6.551-0.672,8.79,1.567l8.513,8.513  c13.545,13.547,31.555,21.006,50.714,21.006c19.156,0,37.167-7.46,50.714-21.006l16.904-16.904  c13.545-13.546,21.005-31.556,21.005-50.712c0-19.157-7.46-37.167-21.005-50.712l-8.513-8.513c-2.24-2.24-2.856-5.691-1.568-8.792  l0.18-0.438c1.275-3.087,4.147-5.082,7.313-5.082h12.04c39.546,0,71.719-32.173,71.719-71.719v-23.906  c0-39.546-32.173-71.719-71.719-71.719h-12.04c-3.166,0-6.039-1.995-7.282-5.005l-0.213-0.516c-1.287-3.101-0.673-6.552,1.567-8.792  l8.514-8.513c27.963-27.963,27.963-73.463,0-101.426l-16.904-16.904c-13.546-13.546-31.556-21.006-50.714-21.006  s-37.168,7.46-50.714,21.006l-8.512,8.512c-2.241,2.241-5.696,2.856-8.782,1.573l-0.451-0.186c-3.087-1.274-5.081-4.144-5.081-7.312  v-12.042c0-39.546-32.173-71.719-71.719-71.719h-23.906c-39.546,0-71.719,32.173-71.719,71.719v12.042  c0,3.166-1.994,6.036-5.055,7.3l-0.467,0.194c-3.098,1.289-6.552,0.673-8.79-1.567l-8.513-8.513  c-13.545-13.546-31.555-21.006-50.714-21.006c-19.156,0-37.167,7.46-50.714,21.006l-16.902,16.904  c-27.963,27.963-27.963,73.463,0.001,101.427l8.512,8.512c2.24,2.241,2.856,5.692,1.531,8.881l-0.145,0.349  c-1.274,3.087-4.147,5.082-7.313,5.082h-12.04C32.173,312.329,0,344.502,0,384.048v23.906c0,39.546,32.173,71.719,71.719,71.719  h12.04c3.166,0,6.038,1.995,7.282,5.005l0.213,0.516c1.287,3.101,0.673,6.551-1.568,8.792l-8.512,8.513  c-13.546,13.546-21.006,31.556-21.006,50.714c0,19.156,7.46,37.167,21.005,50.712l16.904,16.904  c13.546,13.546,31.556,21.006,50.714,21.006s37.168-7.46,50.714-21.006l8.512-8.512c2.239-2.241,5.694-2.856,8.782-1.573  l0.451,0.186c3.087,1.274,5.081,4.144,5.081,7.312v12.039c0,39.546,32.173,71.719,71.719,71.719h23.906  C357.499,702,389.672,669.827,389.672,630.281z M174.206,578.505l-8.513,8.514c-4.515,4.515-10.518,7.001-16.904,7.001  c-6.385,0-12.388-2.487-16.904-7.002l-16.904-16.904c-4.516-4.516-7.002-10.519-7.002-16.904s2.486-12.389,7.002-16.904l8.513-8.513  c15.969-15.971,20.648-39.878,11.924-60.914l-0.155-0.375c-8.69-21.046-28.906-34.644-51.504-34.644h-12.04  c-13.182,0-23.906-10.724-23.906-23.906v-23.906c0-13.182,10.724-23.906,23.906-23.906h12.04c22.596,0,42.813-13.598,51.537-34.721  l0.111-0.271c8.741-21.042,4.064-44.963-11.914-60.942l-8.512-8.512c-9.322-9.321-9.322-24.487,0-33.809l16.903-16.904  c4.516-4.515,10.52-7.002,16.905-7.002c6.387,0,12.388,2.486,16.904,7.002l8.514,8.514c15.98,15.978,39.902,20.653,60.95,11.908  l0.337-0.14c21.046-8.689,34.645-28.905,34.645-51.502v-12.042c0-13.182,10.724-23.906,23.906-23.906h23.906  c13.182,0,23.906,10.724,23.906,23.906v12.042c0,22.597,13.599,42.814,34.671,51.516l0.323,0.134  c21.04,8.738,44.961,4.062,60.941-11.914l8.513-8.514c4.515-4.515,10.518-7.001,16.904-7.001c6.385,0,12.388,2.487,16.904,7.002  l16.904,16.904c9.322,9.321,9.322,24.487,0.001,33.808l-8.514,8.514c-15.977,15.978-20.653,39.898-11.948,60.853l0.179,0.436  c8.69,21.043,28.906,34.641,51.504,34.641h12.04c13.182,0,23.906,10.724,23.906,23.906v23.906c0,13.182-10.724,23.906-23.906,23.906  h-12.04c-22.596,0-42.813,13.598-51.505,34.644l-0.155,0.375c-8.725,21.036-4.046,44.944,11.924,60.914l8.514,8.513  c4.515,4.515,7.001,10.519,7.001,16.904s-2.486,12.388-7.002,16.904l-16.903,16.904c-4.516,4.515-10.52,7.002-16.905,7.002  c-6.387,0-12.388-2.486-16.904-7.002l-8.514-8.514c-15.979-15.975-39.901-20.65-60.95-11.908l-0.337,0.14  c-21.046,8.69-34.645,28.906-34.645,51.504v12.042c0,13.182-10.724,23.906-23.906,23.906h-23.906  c-13.182,0-23.906-10.724-23.906-23.906V618.24c0-22.597-13.599-42.814-34.671-51.516l-0.323-0.134  c-7.04-2.924-14.4-4.346-21.679-4.346C198.992,562.245,184.84,567.874,174.206,578.505z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import SearchPanel from "../widgets/SearchPanel";

export default {
  props: ["mobile"],
  data() {
    return {
      searchOpen: false,
    };
  },
  components: {
    SearchPanel,
  },
  computed: {
    visibleExitButton() {
      return (
        this.$store.state.meta.currentProgram &&
        this.$store.state.meta.currentChatId
      );
    },
  },
  methods: {
    toggleNewChatPopup() {
      this.$store.commit("openPopup", "write first");
    },
    toggleFolderOpen() {
      this.$store.commit("toggleOpenFolders");
    },
    toggleSettingsOpen() {
      this.$store.commit("openPopup", "settings");
    },
    toggleSearchOpen() {
      this.searchOpen = !this.searchOpen;
    },
    chatsLength() {
      const folder = this.$store.state.meta.currentFolder;
      return this.$store.getters.getQtyFolder(folder) || "0";
    },
    exitChat() {
      this.$store.commit("setChatId", null);
      this.$store.commit("setProgram", null);
    },
  },
};
</script>