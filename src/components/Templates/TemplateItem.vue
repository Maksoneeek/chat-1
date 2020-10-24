<template>
  <div class="templates__line">
    <div class="templates__name">{{ template.name }}</div>
    <div class="templates__item">
      <img v-if="template.image" :src="template.image" alt="" />
      {{ template.text }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["template"],
};
</script>