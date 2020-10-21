<template>
  <div class="chat__letters letters-chat">
    <div class="letters-chat__body">
      <div class="letters-chat__item">
        <div class="letters-chat__item_grey">
          <img src="@/assets/img/all folders-grey.svg" alt="" />
        </div>
        <div class="letters-chat__item_hover">
          <img src="@/assets/img/all folders.svg" alt="" />
        </div>
        <div class="letters-chat__text" :class="{ visible: folderIsOpen }">
          Все диалоги (19)
        </div>
      </div>
      <div class="letters-chat__item">
        <div class="letters-chat__item_grey">
          <img src="@/assets/img/close mail-grey.svg" alt="" />
        </div>
        <div class="letters-chat__item_hover">
          <img src="@/assets/img/close mail.svg" alt="" />
        </div>
        <div class="letters-chat__text" :class="{ visible: folderIsOpen }">
          Непрочитанные (3)
        </div>
      </div>
      <div class="letters-chat__item">
        <div class="letters-chat__item_grey">
          <img src="@/assets/img/open mail-grey.svg" alt="" />
        </div>
        <div class="letters-chat__item_hover">
          <img src="@/assets/img/open mail.svg" alt="" />
        </div>
        <div class="letters-chat__text" :class="{ visible: folderIsOpen }">
          Прочитынные (16)
        </div>
      </div>
      <div class="letters-chat__item letters-chat__item_round">
        <div class="letters-chat__item_s">
          <img src="@/assets/img/telega.png" alt="" />
        </div>
        <div class="letters-chat__text" :class="{ visible: folderIsOpen }">
          Telegram (7)
        </div>
      </div>
      <div class="letters-chat__item letters-chat__item_round">
        <div class="letters-chat__item_s">
          <img src="@/assets/img/whatsapp.png" alt="" />
        </div>
        <div class="letters-chat__text" :class="{ visible: folderIsOpen }">
          WhatsApp (12)
        </div>
      </div>
      <div class="letters-chat__item letters-chat__item_round">
        <div class="letters-chat__item_s">
          <img src="@/assets/img/group_1.png" alt="" />
        </div>
        <div class="letters-chat__text" :class="{ visible: folderIsOpen }">
          Группа 1 (5)
        </div>
      </div>
      <div class="letters-chat__item letters-chat__item_round">
        <div class="letters-chat__item_s">
          <img src="@/assets/img/group_1_копия.png" alt="" />
        </div>
        <div class="letters-chat__text" :class="{ visible: folderIsOpen }">
          Группа 2 (4)
        </div>
      </div>
      <div class="letters-chat__new-chat" :class="{ visible: folderIsOpen }">
        <div class="letters-chat__new-chat-text">Создать группу</div>
        <form action="" class="letters-chat__form">
          <div class="letters-chat__input">
            <input type="text" placeholder="Название группы..." />
          </div>
          <button class="letters-chat__btn">
            <img src="@/assets/img/Слой_667.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    folderIsOpen() {
      return this.$store.state.meta.foldersIsOpen;
    },
  },
};
</script>