<template>
  <div class="event-history-gallery">
    <div
      class="event-history-gallery__img-container"
      v-for="(image, i) in images"
      :key="i"
      @click="() => setClickedImageInMedia(image.path, i, currentEventIndex)"
    >
      <img :src="image.path" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["images", "setClickedImageInMedia", "currentEventIndex"]
};
</script>

<style lang="scss" scoped>
@import "../../../assets/sass/website/color-palette.scss";
@import "../../../assets/sass/website/mixins.scss";
.event-history-gallery {
  width: 100%;
  max-width: 100%;
  height: 150px;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  &::-webkit-scrollbar {
    background-color: $accent !important;
    height: 8px !important;
    border-radius: 10px !important;
    @include is-extra-small-mobile {
      height: 3px !important;
    }
  }
  &::-webkit-scrollbar-thumb {
    background-color: $primary !important;
    border-radius: 10px !important;
  }
  &__img-container {
    height: 100%;
    margin: 5px;
    cursor: pointer;
    img {
      height: 100%;
    }
  }
}
</style>
