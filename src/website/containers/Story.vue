<template>
  <div class="story-wrapper" @scroll="updateScroll" id="scroll-wrapper">
    <div v-if="isStoryFetched && isSummitsHistoryDataFetched">
      <Header
        activeItem="story"
        :isSolidHeader="true"
        :setShowRegisterModal="setShowRegisterModal"
        :setShowLoginModal="setShowLoginModal"
        :isColorChanged="scrollPosition > 100"
      />
      <div
        :class="[
          'story-wrapper__outside',
          storyData.cover_type === 'img'
            ? 'story-wrapper__outside--hexa-shape'
            : 'story-wrapper__outside--none'
        ]"
        v-if="!isDataEmpty"
      >
        <div
          :class="[
            'story-wrapper__inside',
            storyData.cover_type === 'img'
              ? 'story-wrapper__inside--hexa-shape'
              : 'story-wrapper__outside--none'
          ]"
          v-if="
            (storyData.images.img_cover_main !== null &&
              storyData.images.img_cover_main.length !== 0) ||
              storyData.videos.vid_cover_main !== null
          "
          :style="
            storyData.images.img_cover_main !== null &&
            storyData.images.img_cover_main.length !== 0
              ? `backgroundImage: url(${storyData.images.img_cover_main[0].path})`
              : ''
          "
        >
          <img
            v-if="
              storyData.has_cover_over &&
                storyData.images.img_cover_over !== null
            "
            :src="storyData.images.img_cover_over.path"
          />
          <video
            autoplay
            muted
            loop
            id="myVideo"
            v-if="storyData.cover_type !== 'img'"
            style="width: 100%;"
          >
            <source
              :src="storyData.videos.vid_cover_main.path"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
      <div class="story-wrapper__content">
        <!-- <div class="row">
        <div class="col-12">
          <h1>{{ storyData.initial_title }}</h1>
        </div>
        <div class="col-12 col-md-6">
          <div
            class="story-paragraph description-container"
            v-html="storyData.initial_description"
          ></div>
        </div>
        <div
          class="col-12 col-md-6"
          v-if="storyData.videos.vid_initial !== null"
        >
          <iframe
            :width="isThisDeviceSmart ? '320' : '560'"
            :height="getVideoHeight(storyData.videos.vid_initial.path)"
            :src="getLiveVideoEmbedFormatter(storyData.videos.vid_initial.path)"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          >
          </iframe>
        </div>
      </div> -->

        <div class="clipped-section is-view--desktop">
          <div class="clipped-section__left-corner"></div>
          <div class="clipped-section__right-corner"></div>
          <div class="clipped-section__bottom-left-corner"></div>
          <div class="clipped-section__bottom-right-corner"></div>
          <div class="upper-segment">
            <h1>{{ storyData.initial_title }}</h1>
          </div>
          <!-- <div class="body-shadow">
          <div class="lower-segment-shadow"></div>
        </div> -->
          <div class="body">
            <div class="body__top-clipped"></div>
            <div class="row">
              <div class="col-12 col-lg-6">
                <div
                  class="story-paragraph description-container story-text"
                  v-html="storyData.initial_description"
                ></div>
              </div>
              <div
                class="col-12 col-lg-6 story-video"
                v-if="storyData.videos.vid_initial !== null"
              >
                <video
                  controls
                  autoplay
                  muted
                  loop
                  @click="e => toggleFullScreenMode(e)"
                  id="video"
                >
                  <source
                    src="https://www.esportssummit-me.com/b2b_for_site.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support HTML video.
                </video>
                <!-- <iframe
                  style="width:100%"
                  :height="getVideoHeight(storyData.videos.vid_initial.path)"
                  :src="
                    getLiveVideoEmbedFormatter(
                      storyData.videos.vid_initial.path
                    )
                  "
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                >
                </iframe> -->
              </div>
            </div>
          </div>
          <div class="lower-segment">
            <div class="lower-segment__left"></div>
            <div class="lower-segment__center"></div>
            <div class="lower-segment__right"></div>
          </div>
        </div>

        <!-- ************************** -->
        <div class="clipped-section-tabs is-view--mobile">
          <nav style="margin-bottom:-1px">
            <div
              class="nav"
              id="nav-tab"
              role="tablist"
              style="flex-wrap: nowrap;"
            >
              <a
                class="upper-segment-tabs active"
                id="nav-home-tab"
                data-toggle="tab"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                <div class="clipped-section-tabs__top-right-corner" />
                {{ storyData.initial_title }}</a
              >
            </div>
          </nav>
          <div class="body-tabs">
            <div class="segment upper-segment-tabs-main" />
            <div class="clipped-section-tabs__top-right-corner-main" />
            <div
              class="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              <div class="row">
                <div class="col-12 col-lg-6">
                  <div
                    class="story-paragraph description-container story-text"
                    style="display:flex"
                    v-html="storyData.initial_description"
                  ></div>
                </div>
                <div
                  class="col-12 col-lg-6 story-video"
                  v-if="storyData.videos.vid_initial !== null"
                >
                  <video
                    controls
                    autoplay
                    muted
                    loop
                    @click="e => toggleFullScreenMode(e)"
                    id="video"
                  >
                    <source
                      src="https://www.esportssummit-me.com/b2b_for_site.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support HTML video.
                  </video>
                  <!-- <iframe
                  style="width:100%"
                  :height="getVideoHeight(storyData.videos.vid_initial.path)"
                  :src="
                    getLiveVideoEmbedFormatter(
                      storyData.videos.vid_initial.path
                    )
                  "
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                >
                </iframe> -->
                </div>
              </div>
            </div>
          </div>
          <div class="segment lower-segment-tabs" />
          <div class="clipped-section-tabs__bottom-left-corner" />
          <div class="clipped-section-tabs__bottom-right-corner" />
        </div>
        <!-- ************************** -->
        <StoryMenuView :data="summitsHistoryData" :tree="tree" />
      </div>
      <div style="position: relative; margin-top: 100px;">
        <Footer />
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
    <Popup
      :data="randomPopupData"
      v-if="randomPopupData !== null && this.isRandomPopupDataFetched"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import types from "../../store/types";
import store from "../../store/index";
import StoryMenuView from "../components/story/StoryMenuView";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import LoginModal from "../components/home/LoginModal";
import RegisterModal from "../components/home/RegisterModal";
import Spinner from "../shared/Spinner";
import redirectToNewTab from "../helpers/RedirectToNewTab";
import isDeviceSmart from "../helpers/DetectIsDeviceSmart";
import Popup from "../shared/Popup";
import * as POPUPS_PLACES from "../constants/PopupsPlaces";
import { liveVideoEmbedFormatter } from "../../dashboard/helpers/LiveVideoEmbedFormater";
import setClipPath from "../helpers/ClipPath";

export default {
  data() {
    return {
      showLoginModal: false,
      showRegisterModal: false,
      tree: [
        {
          name: "Our Story",
          path: "/story"
        }
      ],
      randomPopupData: {},
      scrollPosition: null
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: types.user.getters.IS_USER_LOGGED_IN,
      randomPopup: types.popups.getters.GET_POPUP
    }),
    ...mapState({
      storyData: state => state.story.storyData,
      summitsHistoryData: state => state.summits.summitsHistoryData,
      isStoryFetched: state => state.story.isStoryFetched,
      isSummitsHistoryDataFetched: state =>
        state.summits.isSummitsHistoryDataFetched,
      isRandomPopupDataFetched: state => state.popups.isRandomPopupDataFetched
    }),
    isDataEmpty() {
      return (
        this.storyData !== undefined && Object.keys(this.storyData).length === 0
      );
    },
    isThisDeviceSmart() {
      return isDeviceSmart();
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
      fetchStory: types.story.actions.FETCH_STORY,
      fetchSummitsHistory: types.summits.actions.FETCH_SUMMITS_HISTORY,
      fetchRandomPopup: types.popups.actions.FETCH_RANDOM_POPUPS
    }),
    setShowLoginModal(value = false) {
      this.showLoginModal = value;
    },
    setShowRegisterModal(value = false) {
      this.showRegisterModal = value;
    },
    getLiveVideoEmbedFormatter(url) {
      return liveVideoEmbedFormatter(url);
    },
    getVideoHeight(path) {
      if (isDeviceSmart() && path.includes("facebook")) return 180;
      if (!isDeviceSmart() && path.includes("facebook")) return 400;
      if (isDeviceSmart() && !path.includes("facebook")) return 200;
      if (!isDeviceSmart() && !path.includes("facebook")) return 350;
    },
    toggleFullScreenMode(e) {
      e.preventDefault();
      let elem = document.getElementById(`video`);
      elem.addEventListener("fullscreenchange", () => {
        elem.muted = !document.fullscreenElement;
      });
      if (!document.fullscreenElement) {
        elem.muted = false;
        elem.requestFullscreen().catch(err => {
          alert(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
          );
        });
      } else {
        elem.muted = true;
        document.exitFullscreen();
      }
    },
    updateScroll() {
      this.scrollPosition = document.getElementById("scroll-wrapper").scrollTop;
    }
  },
  components: {
    StoryMenuView,
    Header,
    Footer,
    LoginModal,
    RegisterModal,
    Popup,
    Spinner
  },
  beforeDestroy() {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener("resize", this.onResize);
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    store.commit(types.home.mutations.SET_SPINNER_FLAG, true);
    this.fetchStory();
    this.fetchSummitsHistory();
    this.fetchRandomPopup();
  },
  updated() {
    redirectToNewTab("description-container");
    if (this.isRandomPopupDataFetched)
      this.randomPopupData = this.randomPopup(POPUPS_PLACES.STORY);

    if (this.isStoryFetched && this.isSummitsHistoryDataFetched)
      store.commit(types.home.mutations.SET_SPINNER_FLAG, false);

    if (!isDeviceSmart()) setClipPath();
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/sass/website/containers/story.scss";
</style>
