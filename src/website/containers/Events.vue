<template>
  <div class="events-wrapper">
    <Header
      activeItem="events"
      :isSolidHeader="true"
      :setShowRegisterModal="setShowRegisterModal"
      :setShowLoginModal="setShowLoginModal"
    />
    <div
      class="events-wrapper__outside"
      v-if="isMainEventsFetched && isSubEventsFetched"
    >
      <div class="events-wrapper__inside"></div>
    </div>
    <div
      class="events-wrapper__content"
      v-if="isMainEventsFetched && isSubEventsFetched"
    >
      <h2>Main Events</h2>
      <VueSlickCarousel
        :arrows="true"
        :dots="true"
        autoplay
        infinite
        :slidesToShow="4"
        :slidesToScroll="1"
      >
        <MainEventCard
          v-for="(card, index) in mainEventsData"
          :key="index"
          :card="card"
        />
      </VueSlickCarousel>

      <h2>Sub Events</h2>
      <EventsMenuView route="events" :data="subEventsData" />
    </div>
    <LoginModal
      :showFlag="showLoginModal"
      :setShowLoginModal="setShowLoginModal"
    />
    <RegisterModal
      :showFlag="showRegisterModal"
      :setShowRegisterModal="setShowRegisterModal"
    />
    <Spinner :smallLoader="false" />
    <Footer v-if="isMainEventsFetched && isSubEventsFetched" />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import store from "../../store/index";
import types from "../../store/types";
import Header from "../shared/Header";
import Spinner from "../shared/Spinner";
import MainEventCard from "../components/events/MainEventCard";
import LoginModal from "../components/home/LoginModal";
import RegisterModal from "../components/home/RegisterModal";
import EventsMenuView from "../components/events/EventsMenuView";

import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  data() {
    return {
      showLoginModal: false,
      showRegisterModal: false
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: types.user.getters.IS_USER_LOGGED_IN
    }),
    ...mapState({
      mainEventsData: state => state.events.mainEventsData,
      subEventsData: state => state.events.subEventsData,
      isMainEventsFetched: state => state.events.isMainEventsFetched,
      isSubEventsFetched: state => state.events.isSubEventsFetched
    })
  },
  watch: {
    isUserLoggedIn() {
      if (this.isUserLoggedIn) {
        this.setShowLoginModal(false);
        this.setShowRegisterModal(false);
      }
    }
  },
  methods: {
    ...mapActions({
      fetchMainEvents: types.events.actions.FETCH_MAIN_EVENTS,
      fetchSubEvents: types.events.actions.FETCH_SUB_EVENTS
    }),
    setShowLoginModal(value = false) {
      this.showLoginModal = value;
    },
    setShowRegisterModal(value = false) {
      this.showRegisterModal = value;
    }
  },
  components: {
    Header,
    LoginModal,
    RegisterModal,
    Spinner,
    MainEventCard,
    VueSlickCarousel,
    EventsMenuView
  },
  mounted() {
    store.commit(types.home.mutations.SET_SPINNER_FLAG, true);
    this.fetchMainEvents();
    this.fetchSubEvents();
  },
  updated() {
    if (this.isMainEventsFetched && this.isSubEventsFetched)
      store.commit(types.home.mutations.SET_SPINNER_FLAG, false);
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/sass/website/containers/events.scss";
</style>