<template>
  <div>
    <div class="row menu-view__row" v-if="isGamesActive">
      <div
        class="col-12 col-lg-4 p-0"
        v-for="(card, index) in data"
        :key="index"
      >
        <GameCard
          :card="card"
          :tree="tree"
          :isShownInHistory="isShownInHistory"
          :summitId="summitId"
        />
      </div>
    </div>
    <div class="row menu-view__row" v-if="!isGamesActive">
      <div
        class="col-12 col-lg-4 p-0"
        v-for="(card, index) in data"
        :key="index"
        v-if="card.enabled"
      >
        <TournamentCard :card="card" :tree="tree" />
      </div>
    </div>
  </div>
</template>

<script>
import GameCard from "../../shared/GameCard";
import TournamentCard from "../../shared/TournamentCard";

export default {
  props: ["data", "isGamesActive", "tree", "isShownInHistory", "summitId"],
  components: {
    GameCard,
    TournamentCard
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/sass/website/mixins.scss";
.menu-view {
  &__row {
    @include is-extra-small-mobile {
      width: 100%;
      margin: 0;
    }
  }
}
</style>
