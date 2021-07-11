<template>
  <div class="row story-menu-wrapper">
    <div
      class="col-12 col-md-4 col-lg-3 col-xl-2"
      v-for="(card, index) in data"
      :key="index"
    >
      <SummitCard :card="card" :tree="tree" />
    </div>
  </div>
</template>

<script>
import SummitCard from "../../shared/SummitCard";

export default {
  props: ["data", "tree"],
  components: {
    SummitCard
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/sass/website/mixins.scss";

.story-menu-wrapper {
  margin-top: 3rem !important;
  @include is-extra-small-mobile {
    margin-top: 32px !important;
    padding: 0 16px;
  }
}
</style>
