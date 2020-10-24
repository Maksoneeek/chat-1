<template>
  <div
    class="templates__line"
    :class="{ 'settings-templates-delete': deletable }"
  >
    <div class="templates__name">{{ template.name }}</div>
    <div class="templates__item">
      <img v-if="template.image" :src="template.image" alt="" />
      {{ template.text }}
    </div>
    <div
      v-if="deletable"
      @click="deleteTemplate"
      class="settings-templates-delete_item"
    >
      <img src="@/assets/img/delete.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["template", "deletable"],
  methods: {
    deleteTemplate() {
      this.$store.dispatch("deleteTemplateRequest", this.template.id);
    },
  },
};
</script>