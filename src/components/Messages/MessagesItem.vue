<template>
  <div class="content-chat-content__message" :class="type">
    <div class="content-chat-content__message_container">
      <div class="content-chat-content__icon icon">A</div>
      <div class="content-chat-content__block">
        <div class="content-chat-content__line">
          <div class="content-chat-content__name">Andrey</div>
          <div class="content-chat-content__date">12 июня, 18:26</div>
        </div>
        <div class="content-chat-content__item">
          <span>
            Привет,я Валерa!!! Хочу заказать аниматора на детский праздник
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["type"],
};
</script>