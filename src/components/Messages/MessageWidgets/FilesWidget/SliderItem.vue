<template>
  <div class="preview-chat__slider-big_item">
    <div class="preview-chat__block">
      <div class="preview-chat__block_title">Предпросмотр файлов</div>
      <div class="preview-chat__name">{{ file.file.name }}</div>
      <div class="preview-chat__size">{{ size }}</div>
    </div>
    <div v-if="file.type === 'image'" class="preview-chat__slider-big_img">
      <img :src="file.url" alt="" />
    </div>
    <div v-else class="preview-chat__slider-big_file">
      Предпросмотр выбранного файла недоступен
    </div>
  </div>
</template>

<script>
export default {
  props: ["file"],
  computed: {
    size() {
      return Math.ceil(this.file.file.size / 1024) + " кб";
    },
  },
};
</script>