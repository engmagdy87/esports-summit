<template>
  <div
    class="story-details-wrapper"
    v-if="isSummitCompleteDataFetched"
    @scroll="updateScroll"
    id="scroll-wrapper"
  >
    <Header
      activeItem="story"
      :isSolidHeader="true"
      :setShowRegisterModal="setShowRegisterModal"
      :setShowLoginModal="setShowLoginModal"
      :isColorChanged="scrollPosition > 100"
    />
    <div
      :class="[
        'story-details-wrapper__outside',
        summitCompleteData.cover_type === 'img'
          ? 'story-details-wrapper__outside--hexa-shape'
          : 'story-details-wrapper__outside--none'
      ]"
      v-if="showDetailsHero"
    >
      <div
        class="story-details-wrapper__inside"
        :class="[
          'story-details-wrapper__inside',
          summitCompleteData.cover_type === 'img'
            ? 'story-details-wrapper__inside--hexa-shape'
            : 'story-details-wrapper__inside--none'
        ]"
        v-if="
          (summitCompleteData.images.img_cover_main !== null &&
            summitCompleteData.images.img_cover_main.length !== 0) ||
            summitCompleteData.videos.vid_cover_main !== null
        "
        :style="
          summitCompleteData.cover_type === 'img'
            ? `backgroundImage: url(${summitCompleteData.images.img_cover_main[0].path})`
            : ''
        "
      >
        <img
          v-if="
            summitCompleteData.has_cover_over &&
              summitCompleteData.images.img_cover_over !== null
          "
          :src="summitCompleteData.images.img_cover_over.path"
        />
        <video
          autoplay
          muted
          loop
          id="myVideo"
          v-if="
            summitCompleteData.cover_type !== 'img' &&
              summitCompleteData.videos.vid_cover_main !== null
          "
          style="width: 100%;"
        >
          <source
            :src="summitCompleteData.videos.vid_cover_main.path"
            type="video/mp4"
          />
        </video>
      </div>
    </div>

    <div class="story-details-wrapper__content" v-if="showDetailsHero">
      <div class="container">
        <div class="row mb-4 mb-md-0 mobile-view__row">
          <div class="col-12 d-flex align-items-center mobile-view__col">
            <div class="story-details-wrapper__content__breadcrumb">
              <a
                v-for="(route, i) in summitShortDetails.tree"
                :href="route.path"
                :key="i"
                >{{ route.name }} >
              </a>
              <span>{{ summitCompleteData.final_title }}</span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col mt-3 mt-md-5">
            <SummitTabs
              :data="summitCompleteData"
              :setClickedImageInMedia="setClickedImageInMedia"
              :summitYear="summitCompleteData.year"
            />
          </div>
        </div>
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
    <ImageModal
      :showImageModalModal="showImageModalModal"
      :setShowImageModalModal="setShowImageModalModal"
      :clickedImageInMedia="clickedImageInMedia"
      :currentImageIndex="currentImageIndex"
      :setCurrentImageIndex="setCurrentImageIndex"
    />
    <Spinner :smallLoader="false" />
    <div style="position: relative; margin-top: 100px;">
      <Footer v-if="showDetailsHero" />
    </div>
    <Popup
      :data="randomPopupData"
      v-if="randomPopupData !== null && this.isRandomPopupDataFetched"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import store from "../../../store/index";
import types from "../../../store/types";
import Header from "../../shared/Header";
import Footer from "../../shared/Footer";
import LoginModal from "../../components/home/LoginModal";
import RegisterModal from "../../components/home/RegisterModal";
import ImageModal from "../../shared/ImageModal";
import Spinner from "../../shared/Spinner";
import SummitTabs from "../../shared/SummitTabs";
import { setSummitCookie, getSummitCookie } from "../../helpers/CookieHelper";
import Popup from "../../shared/Popup";
import * as POPUPS_PLACES from "../../constants/PopupsPlaces";

export default {
  data() {
    return {
      showLoginModal: false,
      showRegisterModal: false,
      showImageModalModal: false,
      summitShortDetails: {},
      randomPopupData: {},
      clickedImageInMedia: "",
      currentImageIndex: -1,
      scrollPosition: null
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: types.user.getters.IS_USER_LOGGED_IN,
      randomPopup: types.popups.getters.GET_POPUP
    }),
    ...mapState({
      summitDetails: state => state.summits.summitDetailsData,
      isSummitDetailsDataFetched: state =>
        state.summits.isSummitDetailsDataFetched,
      summitHistoryGames: state => state.story.summitHistoryGames,
      isSummitHistoryGamesFetched: state =>
        state.story.isSummitHistoryGamesFetched,
      summitTree: state => state.navigationTree.summitTree,
      isRandomPopupDataFetched: state => state.popups.isRandomPopupDataFetched
    }),
    showDetailsHero() {
      return Object.keys(this.summitDetails).length !== 0;
    },
    summitCompleteData() {
      return { ...this.summitDetails, games: this.summitHistoryGames };
    },
    isSummitCompleteDataFetched() {
      return (
        this.isSummitDetailsDataFetched && this.isSummitHistoryGamesFetched
      );
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
      fetchSummitDetails: types.summits.actions.FETCH_SUMMIT_DETAILS,
      fetchSummitHistoryGames: types.story.actions.FETCH_SUMMIT_HISTORY_GAMES,
      fetchRandomPopup: types.popups.actions.FETCH_RANDOM_POPUPS
    }),
    setShowImageModalModal(value = false) {
      this.showImageModalModal = value;
    },
    setShowLoginModal(value = false) {
      this.showLoginModal = value;
    },
    setShowRegisterModal(value = false) {
      this.showRegisterModal = value;
    },
    setClickedImageInMedia(imagePath, currentImageIndex) {
      this.clickedImageInMedia = imagePath;
      this.currentImageIndex = currentImageIndex;
      this.setShowImageModalModal(true);
    },
    setCurrentImageIndex(index) {
      if (index > this.summitDetails.images.img_media.length - 1)
        this.currentImageIndex = 0;
      else if (index < 0)
        this.currentImageIndex = this.summitDetails.images.img_media.length - 1;
      else this.currentImageIndex = index;

      this.clickedImageInMedia = this.summitDetails.images.img_media[
        this.currentImageIndex
      ].path;
    },
    notifyVue(message, color) {
      this.$notifications.notify({
        message: `<span>${message}</span>`,
        horizontalAlign: "right",
        verticalAlign: "top",
        type: color
      });
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
    Popup,
    SummitTabs,
    ImageModal
  },
  mounted() {
    const summitCookieData = getSummitCookie();
    if (this.$router.history.current.params.data !== undefined) {
      this.summitShortDetails = this.$router.history.current.params.data;
      store.commit(
        types.navigationTree.mutations.SET_SUMMIT_TREE,
        this.summitShortDetails
      );
      setSummitCookie(this.summitShortDetails);
    } else if (Object.keys(this.summitTree).length > 0) {
      this.summitShortDetails = this.summitTree;
    } else if (summitCookieData !== undefined) {
      this.summitShortDetails = summitCookieData;
      store.commit(
        types.navigationTree.mutations.SET_SUMMIT_TREE,
        this.summitShortDetails
      );
    }

    const summitId = this.$router.history.current.params.summitName.split(
      "-"
    )[0];

    this.fetchSummitDetails(summitId);
    this.fetchSummitHistoryGames(summitId);
    this.fetchRandomPopup();
  },
  updated() {
    if (this.isRandomPopupDataFetched)
      this.randomPopupData = this.randomPopup(
        POPUPS_PLACES.SUMMIT_HISTORY_DETAILS
      );
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/sass/website/containers/story/story-details.scss";
</style>
