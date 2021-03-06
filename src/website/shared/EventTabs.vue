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
    },
    changeHexaStyleForTab() {
      const tabPanes = document.getElementsByClassName("tab-pane");
      for (let index = 0; index < tabPanes.length; index++) {
        const element = tabPanes[index];
        if (isDeviceSmart())
          element.style.clipPath = `polygon(0 0,98% 0,100% 3%,100% 95%,95% 98%,70% 98%,50% 110%,5% 99.5%,0% 98%)`;
        else if (element.clientHeight < 800)
          element.style.clipPath = `polygon(0 0,98.5% 0,100% 5%,100% 92.5%,98.5% 97%,66% 97%,50% 150%,6% 110%,0 96%)`;
        else if (element.clientHeight >= 800 && element.clientHeight < 1300)
          element.style.clipPath = `polygon(0 0,98% 0,100% 1.5%,100% 97%,98% 98.8%,60% 98.8%,55% 105%,10% 105%,0 99%)`;
        else if (element.clientHeight >= 1300 && element.clientHeight < 1600)
          element.style.clipPath = `polygon(0 0,98% 0,100% 1.5%,100% 98%,98% 98.8%,60% 98.8%,57% 100%,20% 105%,0 99.2%)`;
        else if (element.clientHeight >= 1600 && element.clientHeight < 2000)
          element.style.clipPath = `polygon(0 0,98% 0,100% 1%,100% 98%,98% 99%,60% 99%,57% 100%,20% 105%,0 99.5%)`;
        else if (element.clientHeight >= 1600 && element.clientHeight < 3000)
          element.style.clipPath = `polygon(0 0,98% 0,100% 1%,100% 98%,98% 99%,60% 99%,57% 100%,20% 105%,0 99.5%)`;
        else if (element.clientHeight >= 3000 && element.clientHeight < 5000)
          element.style.clipPath = `polygon(0 0,98% 0,100% 0.6%,100% 99%,98% 99.5%,66% 99.5%,60% 101%,15% 105%,0 99.5%)`;
        else if (element.clientHeight >= 5000 && element.clientHeight < 8200)
          element.style.clipPath = `polygon(0 0,98% 0,100% 0.3%,100% 99.5%,98% 99.7%,66% 99.7%,50% 101%,9% 101%,0 99.7%)`;
      }
    }
  },
  mounted() {
    this.changeHexaStyleForTab();
    this.data.forEach(tab => {
      this.tabs.push(tab.final_title);
    });
  },
  updated() {
    this.changeHexaStyleForTab();
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
