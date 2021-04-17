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
      <!-- DETAILS TAB -->
      <div
        :class="['tab-pane fade', activeTabIndex === 0 ? 'show active' : '']"
        v-if="activeTabIndex === 0"
        id="nav-home"
        role="tabpanel"
        aria-labelledby="nav-home-tab"
      >
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="row d-flex align-items-center">
                <img
                  v-if="data.images.img_logo !== null"
                  :src="data.images.img_logo.path"
                  :alt="data.initial_title + 'background'"
                  class="summit-tab-wrapper__details__img"
                />
                <div class="summit-tab-wrapper__details__info">
                  <p class="summit-tab-wrapper__details__title">
                    Location: <span>{{ data.location }}</span>
                  </p>
                  <p class="summit-tab-wrapper__details__title">
                    Attendess: <span>{{ data.attendess }}</span>
                  </p>
                </div>
              </div>
              <div class="row mt-3">
                <div
                  class="summit-tab-wrapper__details__description"
                  v-html="data.final_description"
                ></div>
              </div>
            </div>
            <div class="col-12 col-md-6" v-if="data.videos.vid_final !== null">
              <iframe
                width="100%"
                :height="getVideoHeight()"
                :src="getLiveVideoEmbedFormatter(data.videos.vid_final.path)"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              >
              </iframe>
            </div>
          </div>
        </div>
      </div>
      <!-- MEDIA TAB -->
      <div
        v-if="activeTabIndex === 1"
        :class="['tab-pane fade', activeTabIndex === 1 ? 'show active' : '']"
        id="nav-profile"
        role="tabpanel"
        aria-labelledby="nav-profile-tab"
      >
        <div
          class="summit-tab-wrapper__media-image"
          v-for="(image, i) in data.images.img_media"
          :key="i"
          role="button"
          @click="() => setClickedImageInMedia(image.path, i)"
        >
          <img :src="image.path" :alt="image.path" />
        </div>
      </div>
      <!-- GAMES AND TOURNAMENTS TAB -->
      <div
        v-if="activeTabIndex === 2"
        :class="['tab-pane fade', activeTabIndex === 2 ? 'show active' : '']"
        id="nav-profile"
        role="tabpanel"
        aria-labelledby="nav-profile-tab"
      >
        <div class="battle-tab">
          <h2 v-if="data.games.length > 0">Games</h2>
          <div class="row">
            <div
              class="col-12 col-lg-4 p-0"
              v-for="(card, index) in data.games"
              :key="index"
            >
              <GameCard :card="card" />
            </div>
          </div>
          <h2 v-if="data.tournaments.length > 0">Tournaments</h2>
          <div class="row">
            <div
              class="col-12 col-lg-4 p-0"
              v-for="(card, index) in data.tournaments"
              :key="index"
            >
              <TournamentCard :card="card" :tree="tree" />
            </div>
          </div>
          <h2
            style="color:white; text-align: center;margin-top: 10%;"
            v-if="data.games.length === 0 && data.tournaments.length === 0"
          >
            There are no battles now
          </h2>
        </div>
      </div>
      <!-- EVENTS TAB -->
      <div
        v-if="activeTabIndex === 3"
        :class="['tab-pane fade', activeTabIndex === 3 ? 'show active' : '']"
        id="nav-profile"
        role="tabpanel"
        aria-labelledby="nav-profile-tab"
      >
        <div
          class="events-wrapper__content-history battle-tab"
          v-if="mainEvents.length !== 0"
          id="main-events"
        >
          <h2 v-if="mainEvents.length !== 0">Main Events</h2>
          <VueSlickCarousel
            v-if="mainEvents.length !== 0"
            :arrows="true"
            :slidesToShow="isThisDeviceSmart ? 1 : 4"
            :slidesToScroll="1"
            autoplay
            infinite
          >
            <MainEventCard
              v-for="(card, index) in mainEvents"
              :key="index"
              :card="card"
              v-if="card.enabled"
              :sourceRoute="tree"
            />
          </VueSlickCarousel>

          <h2 v-if="subEvents.length !== 0">Sub Events</h2>
          <EventsMenuView
            v-if="subEvents.length !== 0"
            route="events"
            :data="subEvents"
          />
        </div>
        <h2
          style="color:white; text-align: center;margin-top: 10%;"
          v-if="data.events.length === 0"
        >
          There are no events now
        </h2>
      </div>
      <div
        v-if="activeTabIndex === 4"
        :class="['tab-pane fade', activeTabIndex === 4 ? 'show active' : '']"
        id="nav-profile"
        role="tabpanel"
        aria-labelledby="nav-profile-tab"
      >
        Giveaways
      </div>
    </div>
  </div>
</template>

<script>
// import TournamentItem from "../components/story/TournamentItem";
import GameCard from "../shared/GameCard";
import TournamentCard from "../shared/TournamentCard";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import redirectToNewTab from "../helpers/RedirectToNewTab";
import MainEventCard from "../components/events/MainEventCard";
import EventsMenuView from "../components/events/EventsMenuView";
import isDeviceSmart from "../helpers/DetectIsDeviceSmart";
// import { changeTextDirection } from "../helpers/StringsHelper";
import { liveVideoEmbedFormatter } from "../../dashboard/helpers/LiveVideoEmbedFormater";
import { truncateText } from "../helpers/StringsHelper";
import event from "../../store/modules/event";

export default {
  props: ["data", "setClickedImageInMedia"],
  data() {
    return {
      activeTabIndex: 0,
      tabs: ["Details", "Media", "Battles", "Events", "Giveaways"],
      tree: [
        {
          name: "Our Story",
          path: "/story"
        }
      ]
    };
  },
  computed: {
    isThisDeviceSmart() {
      return isDeviceSmart();
    },
    mainEvents() {
      return this.data.events.filter(event => event.type === "main");
    },
    subEvents() {
      return this.data.events.filter(event => event.type !== "main");
    }
  },
  methods: {
    setActiveTabIndex(index) {
      this.activeTabIndex = index;
    },
    selectClickAction(tab, index) {
      this.setActiveTabIndex(index);
    },
    getLiveVideoEmbedFormatter(url) {
      return liveVideoEmbedFormatter(url);
    },
    getVideoHeight() {
      if (isDeviceSmart()) return 150;
      return 380;
    },
    changeHexaStyleForTab() {
      const tabPanes = document.getElementsByClassName("tab-pane");
      for (let index = 0; index < tabPanes.length; index++) {
        const element = tabPanes[index];
        if (isDeviceSmart() && element.clientHeight > 3000)
          element.style.clipPath = `polygon(0 0,100% 0,100% 0.5%,100% 99.2%,95% 99.6%,60% 99.6%,5% 105%,5% 100%,0% 99.5%)`;
        else if (isDeviceSmart() && element.clientHeight > 2000)
          element.style.clipPath = `polygon(0 0,100% 0,100% 0.5%,100% 99.2%,95% 99.6%,60% 99.6%,5% 105%,5% 100%,0% 99.8%)`;
        else if (isDeviceSmart())
          element.style.clipPath = `polygon(0 0,100% 0,100% 0.5%,100% 96%,90% 98%,60% 98%,5% 110%,5% 100%,0% 98%)`;
        else if (element.clientHeight < 800)
          element.style.clipPath = `polygon(0 0,98.5% 0,100% 5%,100% 89%,98% 95%,66% 95%,50% 150%,6% 120%,0 93%)`;
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
    },
    trimText(text) {
      return truncateText(text);
    }
  },
  mounted() {
    this.changeHexaStyleForTab();
    this.tree.push({
      name: this.trimText(this.data.final_title),
      path: this.$router.history.current.path
    });
  },
  updated() {
    this.changeHexaStyleForTab();
    redirectToNewTab("description-container");
  },
  components: {
    // TournamentItem
    GameCard,
    TournamentCard,
    MainEventCard,
    EventsMenuView,
    VueSlickCarousel
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/sass/website/shared/summit-tabs.scss";
@import "../../assets/sass/website/containers/events.scss";
.battle-tab {
  h2 {
    color: #e7e7e7 !important;
    font-size: 1.5rem !important;
    font-weight: lighter !important;
    margin-top: 10px !important;
  }
}
</style>
