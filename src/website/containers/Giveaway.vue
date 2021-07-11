<template>
  <div class="events-wrapper" @scroll="updateScroll" id="scroll-wrapper">
    <Header
      activeItem="giveaways"
      :isSolidHeader="true"
      :setShowRegisterModal="setShowRegisterModal"
      :setShowLoginModal="setShowLoginModal"
      :isColorChanged="scrollPosition > 100"
    />
    <div
      class="events-wrapper__outside"
      v-if="
        isGiveawaysFetched && isOffersFetched && isCoverGiveawaysImageFetched
      "
    >
      <div
        class="events-wrapper__inside"
        v-if="coverGiveawaysImage !== null"
        :style="`backgroundImage: url(${coverGiveawaysImage.path})`"
      ></div>
    </div>
    <div
      class="events-wrapper__content"
      v-if="
        isGiveawaysFetched &&
          isOffersFetched &&
          (getEnabledGiveaways.length !== 0 || getEnabledOffers.length !== 0)
      "
    >
      <h2 v-if="getEnabledGiveaways.length !== 0">Giveaways</h2>
      <VueSlickCarousel
        v-if="getEnabledGiveaways.length !== 0"
        :arrows="true"
        :slidesToShow="isThisDeviceSmart ? 1 : 4"
        :slidesToScroll="1"
        autoplay
        infinite
        :centerMode="isThisDeviceSmart"
        :variableWidth="isThisDeviceSmart"
        :adaptiveHeight="isThisDeviceSmart"
      >
        <GiveawayCard
          v-for="(card, index) in getEnabledGiveaways"
          :key="index"
          :card="card"
          v-if="card.enabled"
          :sourceRoute="tree"
        />
      </VueSlickCarousel>

      <h2 v-if="getEnabledOffers.length !== 0">Offers</h2>
      <GiveawaysMenuView
        v-if="getEnabledOffers.length !== 0"
        route="offers"
        :data="getEnabledOffers"
        :sourceRoute="tree"
      />
      <div style="position: relative; margin-top: 100px;">
        <Footer
          v-if="
            isGiveawaysFetched &&
              isOffersFetched &&
              isCoverGiveawaysImageFetched &&
              getEnabledGiveaways.length !== 0
          "
        />
      </div>
    </div>
    <img
      v-if="
        isGiveawaysFetched &&
          isOffersFetched &&
          getEnabledGiveaways.length === 0 &&
          getEnabledOffers.length === 0
      "
      class="empty-content"
      src="/website/img/stay_tuned.png"
      alt="stay tuned"
    />
    <LoginModal
      :showFlag="showLoginModal"
      :setShowLoginModal="setShowLoginModal"
    />
    <RegisterModal
      :showFlag="showRegisterModal"
      :setShowRegisterModal="setShowRegisterModal"
    />
    <Spinner :smallLoader="false" />

    <Popup
      :data="randomPopupData"
      v-if="randomPopupData !== null && this.isRandomPopupDataFetched"
    />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import store from "../../store/index";
import types from "../../store/types";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import Spinner from "../shared/Spinner";
import GiveawayCard from "../components/giveaways/GiveawayCard";
import GiveawaysMenuView from "../components/giveaways/GiveawaysMenuView";
import LoginModal from "../components/home/LoginModal";
import RegisterModal from "../components/home/RegisterModal";
import isDeviceSmart from "../helpers/DetectIsDeviceSmart";
import Popup from "../shared/Popup";
import * as POPUPS_PLACES from "../constants/PopupsPlaces";

import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import giveaway from "../../store/modules/giveaway";

export default {
  data() {
    return {
      showLoginModal: false,
      showRegisterModal: false,
      randomPopupData: {},
      tree: [{ name: "Giveaways", path: "/giveaways" }],
      scrollPosition: null
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: types.user.getters.IS_USER_LOGGED_IN,
      randomPopup: types.popups.getters.GET_POPUP
    }),
    ...mapState({
      giveawaysData: state => state.giveaways.giveawaysData,
      offersData: state => state.giveaways.offersData,
      isGiveawaysFetched: state => state.giveaways.isGiveawaysFetched,
      isOffersFetched: state => state.giveaways.isOffersFetched,
      isCoverGiveawaysImageFetched: state =>
        state.summits.isCoverGiveawaysImageFetched,
      coverGiveawaysImage: state => state.summits.coverGiveawaysImage,
      isRandomPopupDataFetched: state => state.popups.isRandomPopupDataFetched
    }),
    isThisDeviceSmart() {
      return isDeviceSmart();
    },
    getEnabledGiveaways() {
      return this.giveawaysData.filter(giveaway => giveaway.enabled);
    },
    getEnabledOffers() {
      return this.offersData.filter(offer => offer.enabled);
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
      fetchGiveaways: types.giveaways.actions.FETCH_GIVEAWAYS,
      fetchOffers: types.giveaways.actions.FETCH_OFFERS,
      fetchCoverHomeGiveawaysImage:
        types.summits.actions.FETCH_COVER_GIVEAWAYS_IMAGE,
      fetchRandomPopup: types.popups.actions.FETCH_RANDOM_POPUPS
    }),
    setShowLoginModal(value = false) {
      this.showLoginModal = value;
    },
    setShowRegisterModal(value = false) {
      this.showRegisterModal = value;
    },
    updateScroll() {
      this.scrollPosition = document.getElementById("scroll-wrapper").scrollTop;
    }
  },
  components: {
    Header,
    Footer,
    LoginModal,
    RegisterModal,
    Spinner,
    GiveawayCard,
    GiveawaysMenuView,
    VueSlickCarousel,
    Popup
  },
  beforeDestroy() {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener("resize", this.onResize);
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    store.commit(types.home.mutations.SET_SPINNER_FLAG, true);
    this.fetchGiveaways();
    this.fetchOffers();
    this.fetchCoverHomeGiveawaysImage();
    this.fetchRandomPopup();
  },
  updated() {
    if (
      this.isGiveawaysFetched &&
      this.isOffersFetched &&
      this.isCoverGiveawaysImageFetched
    )
      store.commit(types.home.mutations.SET_SPINNER_FLAG, false);

    if (this.isRandomPopupDataFetched)
      this.randomPopupData = this.randomPopup(POPUPS_PLACES.GIVEAWAY);
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/sass/website/containers/events.scss";

.slick-slide {
  @include is-extra-small-mobile {
    width: 230px !important;
  }
}
</style>
