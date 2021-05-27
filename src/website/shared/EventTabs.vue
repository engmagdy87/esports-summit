<template>
  <div>
    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <a
          v-for="(tab, index) in tabs"
          :key="index"
          :class="[
            'nav-item nav-link',
            activeTabIndex === index ? 'active' : ''
          ]"
          id="nav-home-tab"
          data-toggle="tab"
          role="tab"
          aria-controls="nav-home"
          aria-selected="true"
          @click="selectClickAction(tab, index)"
          >{{ tab }}</a
        >
      </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
      <div class="upper-segment"></div>
      <div
        v-for="(event, i) in data"
        :key="i"
        :class="['tab-pane fade', activeTabIndex === i ? 'show active' : '']"
        v-if="activeTabIndex === i"
        id="nav-home"
        role="tabpanel"
        aria-labelledby="nav-home-tab"
      >
        <div class="row p-3">
          <div class="col-12 col-md-5">
            <div class="row d-flex align-items-center">
              <img
                v-if="event.images.img_logo !== null"
                :src="event.images.img_logo.path"
                :alt="event.initial_title + 'background'"
                class="event-tab-wrapper__details__img"
              />
              <div class="event-tab-wrapper__details__info">
                <p class="event-tab-wrapper__details__title">
                  Location: <span>{{ event.summit.location }}</span>
                </p>
              </div>
            </div>
            <div class="row mt-3">
              <div
                class="event-tab-wrapper__details__description"
                v-html="event.final_description"
              ></div>
            </div>
          </div>
          <div class="col-12 col-md-7" v-if="event.videos.vid_final !== null">
            <iframe
              width="100%"
              :height="getVideoHeight(event.videos.vid_final.path)"
              :src="getLiveVideoEmbedFormatter(event.videos.vid_final.path)"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              v-if="
                event.videos.vid_final !== null &&
                  event.videos.vid_final.path !== ''
              "
            >
            </iframe>
            <img
              class="event-tab-wrapper__details__placeholder-img"
              v-else-if="event.images.img_media.length > 0"
              :src="event.images.img_media[0].path"
              @click="
                setClickedImageInMedia(event.images.img_media[0].path, 0, i)
              "
            />
            <EventHistoryGallery
              v-if="event.images.img_media.length > 0"
              :images="event.images.img_media"
              :setClickedImageInMedia="setClickedImageInMedia"
              :currentEventIndex="i"
            />
          </div>
        </div>
      </div>
      <div class="lower-segment">
        <div class="lower-segment--right"></div>
        <div class="lower-segment--left"></div>
      </div>
    </div>
    <ImageModal
      :showImageModalModal="showImageModalModal"
      :setShowImageModalModal="setShowImageModalModal"
      :clickedImageInMedia="clickedImageInMedia"
      :currentImageIndex="currentImageIndex"
      :setCurrentImageIndex="setCurrentImageIndex"
    />
  </div>
</template>

<script>
import EventHistoryGallery from "../components/events/EventHistoryGallery";
import ImageModal from "../shared/ImageModal";
import redirectToNewTab from "../helpers/RedirectToNewTab";
import isDeviceSmart from "../helpers/DetectIsDeviceSmart";
import { changeTextDirection } from "../helpers/StringsHelper";
import { liveVideoEmbedFormatter } from "../../dashboard/helpers/LiveVideoEmbedFormater";

export default {
  props: ["data", "redirectTo"],
  data() {
    return {
      activeTabIndex: 0,
      tabs: [],
      showImageModalModal: false,
      clickedImageInMedia: "",
      currentImageIndex: -1,
      currentEventIndex: -1
    };
  },
  methods: {
    setActiveTabIndex(index) {
      this.activeTabIndex = index;
    },
    selectClickAction(tab, index) {
      this.setActiveTabIndex(index);
      this.clickedImageInMedia = "";
      this.currentImageIndex = -1;
    },
    setShowImageModalModal(value = false) {
      this.showImageModalModal = value;
    },
    setClickedImageInMedia(imagePath, currentImageIndex, currentEventIndex) {
      this.currentEventIndex = currentEventIndex;
      this.clickedImageInMedia = imagePath;
      this.currentImageIndex = currentImageIndex;
      this.setShowImageModalModal(true);
    },
    getLiveVideoEmbedFormatter(url) {
      return liveVideoEmbedFormatter(url);
    },
    setCurrentImageIndex(index) {
      if (index > this.data[this.currentEventIndex].images.img_media.length - 1)
        this.currentImageIndex = 0;
      else if (index < 0)
        this.currentImageIndex =
          this.data[this.currentEventIndex].images.img_media.length - 1;
      else this.currentImageIndex = index;

      this.clickedImageInMedia = this.data[
        this.currentEventIndex
      ].images.img_media[this.currentImageIndex].path;
    },
    getVideoHeight(path) {
      if (isDeviceSmart() && path.includes("facebook")) return 150;
      if (!isDeviceSmart() && path.includes("facebook")) return 450;
      if (isDeviceSmart() && !path.includes("facebook")) return 200;
      if (!isDeviceSmart() && !path.includes("facebook")) return 350;
    }
  },
  mounted() {
    this.data.forEach(tab => {
      this.tabs.push(tab.final_title);
    });
  },
  updated() {
    redirectToNewTab("description-container");
  },
  components: {
    EventHistoryGallery,
    ImageModal
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/sass/website/shared/event-tabs.scss";
</style>
