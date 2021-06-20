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
      v-if="
        isMainEventsFetched &&
          isSubEventsFetched &&
          isCoverHomeEventsImageFetched
      "
    >
      <div
        class="events-wrapper__inside"
        v-if="coverHomeEventsImage !== null"
        :style="`backgroundImage: url(${coverHomeEventsImage.path})`"
      ></div>
    </div>
    <div
      class="events-wrapper__content"
      v-if="
        isMainEventsFetched &&
          isSubEventsFetched &&
          (mainEventsData.length !== 0 || subEventsData.length !== 0)
      "
      id="main-events"
    >
      <h2 v-if="mainEventsData.length !== 0 && showMainTitle">Main Events</h2>
      <VueSlickCarousel
        v-if="mainEventsData.length !== 0"
        :arrows="true"
        :slidesToShow="isThisDeviceSmart ? 1 : 4"
        :slidesToScroll="1"
        autoplay
        infinite
      >
        <MainEventCard
          v-for="(card, index) in mainEventsData"
          :key="index"
          :card="card"
          v-if="card.enabled"
          :sourceRoute="tree"
        />
      </VueSlickCarousel>

      <h2 v-if="subEventsData.length !== 0 && showSubTitle">Sub Events</h2>
      <EventsMenuView
        v-if="subEventsData.length !== 0"
        route="events"
        :data="subEventsData"
      />
      <Footer
        v-if="
          isMainEventsFetched &&
            isSubEventsFetched &&
            isCoverHomeEventsImageFetched &&
            (mainEventsData.length !== 0 || subEventsData.length !== 0)
        "
      />
    </div>
    <h2
      style="color:white; text-align: center;margin-top: 10%;"
      v-if="
        isMainEventsFetched &&
          isSubEventsFetched &&
          mainEventsData.length === 0 &&
          subEventsData.length === 0
      "
    >
      There are no events now
    </h2>
    <LoginModal
      :showFlag="showLoginModal"
      :setShowLoginModal="setShowLoginModal"
    />
    <RegisterModal
      :showFlag="showRegisterModal"
      :setShowRegisterModal="setShowRegisterModal"
    />
    <Spinner :smallLoader="false" />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import store from "../../store/index";
import types from "../../store/types";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import Spinner from "../shared/Spinner";
import MainEventCard from "../components/events/MainEventCard";
import LoginModal from "../components/home/LoginModal";
import RegisterModal from "../components/home/RegisterModal";
import EventsMenuView from "../components/events/EventsMenuView";
import isDeviceSmart from "../helpers/DetectIsDeviceSmart";
import * as POPUPS_PLACES from "../constants/PopupsPlaces";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  data() {
    return {
      showLoginModal: false,
      showRegisterModal: false,
      tree: [{ name: "Events", path: "/events" }]
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
      isSubEventsFetched: state => state.events.isSubEventsFetched,
      isCoverHomeEventsImageFetched: state =>
        state.summits.isCoverHomeEventsImageFetched,
      coverHomeEventsImage: state => state.summits.coverHomeEventsImage
    }),
    isThisDeviceSmart() {
      return isDeviceSmart();
    },
    showMainTitle() {
      return this.mainEventsData.filter(event => event.enabled).length > 0;
    },
    showSubTitle() {
      return this.subEventsData.filter(event => event.enabled).length > 0;
    }
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
      fetchSubEvents: types.events.actions.FETCH_SUB_EVENTS,
      fetchCoverHomeEventsImage:
        types.summits.actions.FETCH_COVER_HOME_EVENTS_IMAGE
    }),
    setShowLoginModal(value = false) {
      this.showLoginModal = value;
    },
    setShowRegisterModal(value = false) {
      this.showRegisterModal = value;
    },
    setHeroClipPath() {
      const outsideSegment = document.getElementsByClassName(
        "events-wrapper__outside"
      );
      const insideSegment = document.getElementsByClassName(
        "events-wrapper__inside"
      );

      const outsideElement = outsideSegment[0];
      const insideElement = insideSegment[0];

      const is_x_extra_small_mobile = window.matchMedia("(max-width: 399px)");
      const is_extra_small_mobile = window.matchMedia(
        "(min-width: 400px) and (max-width: 600px)"
      );
      const is_mobile = window.matchMedia(
        "(min-width: 601px) and (max-width: 767px)"
      );
      const is_tablet = window.matchMedia(
        "(min-width: 768px) and (max-width: 991px)"
      );
      const is_desktop = window.matchMedia(
        "(min-width: 992px) and (max-width: 1199px)"
      );
      const is_large_desktop = window.matchMedia(
        "(min-width: 1200px) and (max-width: 1499px)"
      );
      const is_extra_large_desktop = window.matchMedia("(min-width: 1500px)");
      let value;
      if (is_x_extra_small_mobile.matches) value = 1;
      if (is_extra_small_mobile.matches) value = 1.05;
      if (is_extra_small_mobile.matches) value = 1.05;
      if (is_mobile.matches) value = 1.1;
      if (is_tablet.matches) value = 1.16;
      if (is_desktop.matches) value = 1.2;
      if (is_large_desktop.matches) value = 1.3;
      if (is_extra_large_desktop.matches) value = 1.4;

      const outsideClippedPath = `polygon(
    0 0,
    100% 0,
    100% 0%,
    100% ${100 - (40 / outsideElement.clientHeight) * 100}%,
    ${100 - (20 / outsideElement.clientWidth) * 100}% ${100 -
        (20 / outsideElement.clientHeight) * 100}%,
    66% ${100 - (20 / outsideElement.clientHeight) * 100}%,
    ${50 + (20 / outsideElement.clientHeight) * 100}% ${value *
        (100 + (20 / insideElement.clientWidth) * 100)}%,
    ${(40 / outsideElement.clientWidth) * 100}% ${100 +
        (20 / outsideElement.clientHeight) * 100}%,
    0 ${100 - (20 / outsideElement.clientHeight) * 100}%
    )`;

      const insideClippedPath = `polygon(
    0 0,
    100% 0,
    100% 0%,
    100% ${100 - (40 / insideElement.clientHeight) * 100}%,
    ${100 - (20 / insideElement.clientWidth) * 100}% ${100 -
        (20 / insideElement.clientHeight) * 100}%,
    66% ${100 - (20 / insideElement.clientHeight) * 100}%,
    ${50 + (20 / insideElement.clientHeight) * 100}% ${value *
        (100 + (20 / insideElement.clientWidth) * 100)}%,
    ${(40 / insideElement.clientWidth) * 100}% ${100 +
        (20 / insideElement.clientHeight) * 100}%,
    0 ${100 - (20 / insideElement.clientHeight) * 100}%
    )`;

      outsideElement.style.clipPath = outsideClippedPath;
      insideElement.style.clipPath = insideClippedPath;
    },
    onResize() {
      this.setHeroClipPath();
    }
  },
  components: {
    Header,
    LoginModal,
    RegisterModal,
    Footer,
    Spinner,
    MainEventCard,
    VueSlickCarousel,
    EventsMenuView
  },
  beforeDestroy() {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener("resize", this.onResize);
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    store.commit(types.home.mutations.SET_SPINNER_FLAG, true);
    this.fetchMainEvents();
    this.fetchSubEvents();
    this.fetchCoverHomeEventsImage();
  },
  updated() {
    if (
      this.isMainEventsFetched &&
      this.isSubEventsFetched &&
      this.isCoverHomeEventsImageFetched
    )
      store.commit(types.home.mutations.SET_SPINNER_FLAG, false);

    if (this.isRandomPopupDataFetched)
      this.randomPopupData = this.randomPopup(POPUPS_PLACES.EVENTS);

    this.setHeroClipPath();
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/sass/website/containers/events.scss";
</style>
