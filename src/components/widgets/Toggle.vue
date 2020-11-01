<template>
  <div
    @click="onToggle"
    class="checkbox info__checkbox"
    :class="{ active: active }"
  >
    <input type="checkbox" name="checkbox-1" />
    <div class="checkbox__item info__checkbox_item">
      <div class="checkbox__item_check">
        <img src="@/assets/img/Shape_26_copy_2.png" alt="" />
      </div>
      <div class="checkbox__item_notcheck">
        <img src="@/assets/img/Shape_26_copy_3.png" alt="" />
      </div>
    </div>
    <div class="info__checkbox_line">
      <span class="info__checkbox_text"> {{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
    };
  },
  props: ["text", "toggleHandler"],
  methods: {
    onToggle() {
      this.toggleHandler();
      this.active = !this.active;
    },
  },
};
</script>
