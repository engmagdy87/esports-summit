<template>
  <div
    :class="[
      'popup-container',
      showEventPopup ? 'popup-container--show' : 'popup-container--hide',
      isGiveawayPopupVisible ? 'popup-container--shifted' : ''
    ]"
    data-toggle="tooltip"
    data-placement="top"
    :title="data.title"
  >
    <div
      class="popup-wrapper"
      v-if="data.images !== null && data.images !== undefined"
      :style="`backgroundImage: url(${data.images.img_main.path})`"
      @click="redirectTo"
    >
      <span
        class="close-popup"
        @click="
          e => {
            e.stopPropagation();
            closePopup();
          }
        "
        >&times;</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "isGiveawayPopupVisible"],
  data() {
    return {
      showEventPopup: true
    };
  },
  methods: {
    redirectTo() {
      const url = this.data.link;
      if (url.includes("http")) window.open(url, "_blank");
      else window.open(`http://${url}`, "_blank");
    },
    closePopup() {
      this.showEventPopup = false;
    }
  },
  watch: {
    data() {
      this.showEventPopup = Object.keys(this.data).length > 0;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/sass/website/shared/popup.scss";
</style>
