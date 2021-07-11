<template>
  <div class="events-menu-view-wrapper">
    <div class="row menu-view__row">
      <div
        class="col-12 col-lg-4 p-0"
        v-for="(card, index) in data"
        :key="index"
      >
        <SubEventCard
          :card="card"
          v-if="route === 'events'"
          :sourceRoute="[
            {
              name: 'Events',
              path: '/events'
            }
          ]"
          :isDisplayedInStory="isDisplayedInStory"
        />
        <TournamentCard
          :card="card"
          :tree="tree"
          v-else-if="route === 'event-details'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SubEventCard from "../../components/events/SubEventCard";
import TournamentCard from "../../shared/TournamentCard";

export default {
  props: ["data", "route", "tree", "isDisplayedInStory"],
  components: {
    SubEventCard,
    TournamentCard
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/sass/website/mixins.scss";
.events-menu-view-wrapper {
  margin-bottom: 50px;
  @include is-extra-small-mobile {
    margin-bottom: 30px;
  }
}
.menu-view {
  &__row {
    @include is-extra-small-mobile {
      width: 100%;
      margin: 0;
      padding: 0 14px;
    }
  }
}
</style>
