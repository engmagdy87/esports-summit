<template>
  <div class="testimonials-wrapper">
    <Header
      activeItem="testimonials"
      :isSolidHeader="true"
      :setShowRegisterModal="setShowRegisterModal"
      :setShowLoginModal="setShowLoginModal"
    />
    <div
      class="testimonials-wrapper__outside"
      v-if="isCoverTestimonialsImageFetched"
    >
      <div
        class="testimonials-wrapper__inside"
        v-if="coverTestimonialsImage !== null"
        :style="`backgroundImage: url(${coverTestimonialsImage.path})`"
      ></div>
    </div>
    <div class="testimonials-wrapper__content" v-if="isTestimonialsFetched">
      <h1 v-if="testimonialsData.length !== 0">Testimonials</h1>
      <div>
        <TestimonialsMenuView :data="testimonialsData" />
      </div>
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
    <Footer v-if="isTestimonialsFetched && isCoverTestimonialsImageFetched" />
    <Popup
      :data="randomPopupData"
      v-if="randomPopupData !== null && this.isRandomPopupDataFetched"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import store from "../../store/index";
import types from "../../store/types";
import TestimonialsMenuView from "../components/testimonials/TestimonialsMenuView";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import LoginModal from "../components/home/LoginModal";
import RegisterModal from "../components/home/RegisterModal";
import Spinner from "../shared/Spinner";
import Popup from "../shared/Popup";
import * as POPUPS_PLACES from "../constants/PopupsPlaces";

export default {
  data() {
    return {
      showLoginModal: false,
      showRegisterModal: false,
      randomPopupData: {}
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: types.user.getters.IS_USER_LOGGED_IN,
      randomPopup: types.popups.getters.GET_POPUP
    }),
    ...mapState({
      testimonialsData: state => state.testimonials.testimonialsData,
      coverTestimonialsImage: state => state.summits.coverTestimonialsImage,
      isCoverTestimonialsImageFetched: state =>
        state.summits.isCoverTestimonialsImageFetched,
      isTestimonialsFetched: state =>
        state.testimonials.isTestimonialsDataFetched,
      isRandomPopupDataFetched: state => state.popups.isRandomPopupDataFetched
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
      fetchTestimonials: types.testimonials.actions.FETCH_TESTIMONIALS,
      fetchRandomPopup: types.popups.actions.FETCH_RANDOM_POPUPS,
      fetchCoverTestimonialsImage:
        types.summits.actions.FETCH_COVER_TESTIMONIALS_IMAGE
    }),
    setShowLoginModal(value = false) {
      this.showLoginModal = value;
    },
    setShowRegisterModal(value = false) {
      this.showRegisterModal = value;
    }
  },
  components: {
    TestimonialsMenuView,
    Header,
    Footer,
    LoginModal,
    RegisterModal,
    Spinner,
    Popup
  },
  mounted() {
    store.commit(types.home.mutations.SET_SPINNER_FLAG, true);
    this.fetchTestimonials();
    this.fetchRandomPopup();
    this.fetchCoverTestimonialsImage();
  },
  updated() {
    if (this.isTestimonialsFetched && this.isCoverTestimonialsImageFetched)
      store.commit(types.home.mutations.SET_SPINNER_FLAG, false);
    if (this.isRandomPopupDataFetched)
      this.randomPopupData = this.randomPopup(POPUPS_PLACES.TESTIMONIALS);
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/sass/website/containers/testimonials.scss";
</style>
