<template>
  <div class="info__block">
    <div class="info__block_title">Добавить диалог в группу:</div>
    <form class="info__form" action="">
      <Toggle
        v-for="folder of folders"
        :text="folder.name"
        :toggleHandler="() => test(folder.id)"
        :key="folder.id"
      />
    </form>
  </div>
</template>

<script>
import Toggle from "../widgets/Toggle";

export default {
  components: {
    Toggle,
  },
  computed: {
    folders() {
      return this.$store.state.folders.folders;
    },
  },
  methods: {
    test(id) {
      console.log(id);
    },
  },
};
</script>
