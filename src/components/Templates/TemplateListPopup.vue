<template>
  <div
    class="templates"
    :class="{ open: isOpen, 'templates-2': isNewChatTemplate }"
  >
    <div class="templates__header">
      <div class="templates__title">Ваши шаблоны</div>
      <form action="" class="templates__search">
        <div>
          <input
            v-model="searchString"
            type="text"
            placeholder="Поиск по названию..."
          />
          <img src="@/assets/img/search.png" alt="" />
        </div>
      </form>
    </div>
    <div class="templates__content">
      <TemplateItem
        v-for="template of templates"
        :key="template.id"
        :template="template"
      />
    </div>
  </div>
</template>

<script>
import TemplateItem from "./TemplateItem";

export default {
  data() {
    return {
      searchString: "",
    };
  },
  components: {
    TemplateItem,
  },
  computed: {
    isOpen() {
      return this.$store.state.meta.templateListPopup;
    },
    templates() {
      const templates = this.$store.state.options.options.templates || [];
      return templates.filter((template) =>
        template.name.toLowerCase().includes(this.searchString.toLowerCase())
      );
    },
    isNewChatTemplate() {
      return this.$store.state.meta.newChatTemplatePopup;
    },
  },
};
</script>