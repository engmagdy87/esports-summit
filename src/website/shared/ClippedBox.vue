<template>
  <div class="clipped-section">
    <div class="clipped-section__top-left-corner" />
    <div class="clipped-section__top-right-corner" />

    <div class="segment upper-segment" />

    <div class="body">
      <slot></slot>
    </div>

    <div class="segment lower-segment" />

    <div class="clipped-section__bottom-left-corner" />
    <div class="clipped-section__bottom-right-corner" />
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/sass/website/color-palette.scss";
@import "../../assets/sass/website/variables.scss";
@import "../../assets/sass/website/mixins.scss";

$border-thickness: 1px;
$bg: rgba(0, 0, 0, 0.75);

.clipped-section {
  position: relative;
  margin-bottom: 100px;
  @include is-extra-small-mobile {
    margin-bottom: 32px;
  }
  &__top-left-corner {
    position: absolute;
    height: $border-thickness;
    width: $corner-width;
    background-color: $mobile-primary;
    top: $clipping-value;
    left: 0px;
    transform: rotate(-45deg);
    transform-origin: top left;
    z-index: 10;
  }
  &__top-right-corner {
    display: block;
    position: absolute;
    height: $border-thickness;
    width: $corner-width;
    background-color: $mobile-primary;
    top: $clipping-value;
    right: 0px;
    transform: rotate(45deg);
    transform-origin: top right;
    z-index: 10;
  }
  &__bottom-left-corner {
    position: absolute;
    height: $border-thickness;
    width: $corner-width;
    background-color: $mobile-primary;
    bottom: $clipping-value;
    left: 0px;
    transform: rotate(45deg);
    transform-origin: bottom left;
    z-index: 10;
  }
  &__bottom-right-corner {
    position: absolute;
    height: $border-thickness;
    width: $corner-width;
    background-color: $mobile-primary;
    bottom: $clipping-value;
    right: 0px;
    transform: rotate(-45deg);
    transform-origin: bottom right;
    z-index: 10;
  }
}

.segment {
  height: $clipping-value;
  width: 100%;
  background-color: $bg;
}
.upper-segment {
  border-top: $border-thickness solid $mobile-primary;
  clip-path: polygon(
    $clipping-value 0,
    100% 0,
    100% 0,
    calc(100% - #{$clipping-value}) calc(100% - #{$clipping-value}),
    100% 100%,
    100% 100%,
    0 $clipping-value,
    0 $clipping-value
  );
}
.lower-segment {
  border-bottom: $border-thickness solid $mobile-primary;
  clip-path: polygon(
    $clipping-value $clipping-value,
    0 0,
    100% 0,
    calc(100% - #{$clipping-value}) 100%,
    0 100%,
    100% 100%,
    0 $clipping-value,
    0 $clipping-value
  );
}
.body {
  position: relative;
  width: 100%;
  height: fit-content;
  padding: 0 16px 6px;
  background-color: $bg;
  border-left: $border-thickness solid $mobile-primary;
  border-right: $border-thickness solid $mobile-primary;
}
</style>
