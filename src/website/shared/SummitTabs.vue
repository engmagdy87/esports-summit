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
          v-if="
            tab === 'Battles' || tab === 'Events' || tab === 'Giveaways'
              ? !(summitYear == 2018 || summitYear === 2019)
              : true
          "
          >{{ tab }}</a
        >
      </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
      <div class="upper-segment"></div>
      <!-- DETAILS TAB -->
      <div
        :class="['tab-pane fade', activeTabIndex === 0 ? 'show active' : '']"
        v-show="activeTabIndex === 0"
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
        v-show="activeTabIndex === 1"
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
        v-show="
          activeTabIndex === 2 && (summitYear !== 2018 || summitYear !== 2019)
        "
        :class="['tab-pane fade', activeTabIndex === 2 ? 'show active' : '']"
        id="nav-profile"
        role="tabpanel"
        aria-labelledby="nav-profile-tab"
      >
        <div class="row">
          <div class="col">
            <ul
              class="home-wrapper__navLinks"
              v-if="data.tournaments.length > 0 || data.games.length > 0"
            >
              <li
                v-if="data.games.length > 0"
                :class="[isGamesActive ? 'home-wrapper__navLinks--active' : '']"
                @click="setIsGamesActive(true)"
              >
                Games
              </li>
              <li
                v-if="data.tournaments.length > 0"
                :class="[
                  !isGamesActive ? 'home-wrapper__navLinks--active' : ''
                ]"
                @click="setIsGamesActive(false)"
              >
                Tournaments
              </li>
            </ul>
          </div>
          <div
            class="col d-flex justify-content-end align-items-center"
            v-if="data.tournaments.length > 0 && data.games.length > 0"
          >
            <CustomSwitch
              :isMenuActive="isMenuActive"
              :setIsMenuActive="setIsMenuActive"
            />
          </div>
        </div>
        <!-- <div class="row" v-if="!isGamesActive">
          <div class="col">
            <CustomButton :setShowFiltersModal="setShowFiltersModal" />
          </div>
        </div> -->
        <MenuView
          :data="getCorrespondingData"
          :isGamesActive="isGamesActive"
          v-if="
            isMenuActive && data.tournaments.length > 0 && data.games.length > 0
          "
          :tree="tree"
          :isShownInHistory="true"
          :summitId="summitId"
        />
        <ListView
          :data="getCorrespondingData"
          :isGamesActive="
            isGamesActive &&
              data.tournaments.length > 0 &&
              data.games.length > 0
          "
          :tree="tree"
          :isShownInHistory="true"
          :summitId="summitId"
          v-else
        />
        <h2
          style="color:white; text-align: center;"
          v-if="data.games.length === 0 && data.tournaments.length === 0"
        >
          There are no battles now
        </h2>
      </div>
      <!-- EVENTS TAB -->
      <div
        v-show="
          activeTabIndex === 3 && (summitYear !== 2018 || summitYear !== 2019)
        "
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
              :sourceRoute="tree"
              :isDisplayedInStory="true"
            />
          </VueSlickCarousel>

          <h2
            v-if="subEvents.length !== 0"
            style="margin-top: -20px !important;"
          >
            Sub Events
          </h2>
          <EventsMenuView
            v-if="subEvents.length !== 0"
            route="events"
            :data="subEvents"
            :isDisplayedInStory="true"
          />
        </div>
        <h2
          style="color:white; text-align: center;"
          v-if="data.events.length === 0"
        >
          There are no events now
        </h2>
      </div>
      <!-- GIVEAWAYS TAB -->
      <div
        v-show="activeTabIndex === 4"
        :class="['tab-pane fade', activeTabIndex === 4 ? 'show active' : '']"
        id="nav-profile"
        role="tabpanel"
        aria-labelledby="nav-profile-tab"
      >
        <div
          class="events-wrapper__content-history battle-tab"
          v-if="giveaways.length !== 0"
          id="main-giveaway"
        >
          <h2 v-if="giveaways.length !== 0">Giveaways</h2>
          <VueSlickCarousel
            v-if="giveaways.length !== 0"
            :arrows="true"
            :slidesToShow="isThisDeviceSmart ? 1 : 4"
            :slidesToScroll="1"
            autoplay
            infinite
          >
            <GiveawayCard
              v-for="(card, index) in giveaways"
              :key="index"
              :card="card"
              :sourceRoute="tree"
              :isDisplayedInStory="true"
            />
          </VueSlickCarousel>

          <h2 v-if="offers.length !== 0">Offers</h2>
          <GiveawaysMenuView
            v-if="offers.length !== 0"
            route="offers"
            :data="offers"
            :sourceRoute="tree"
            :isDisplayedInStory="true"
          />
        </div>
        <h2
          style="color:white; text-align: center;"
          v-if="data.events.length === 0"
        >
          There are no giveaways or offers now
        </h2>
      </div>
      <div class="lower-segment">
        <div class="lower-segment--right"></div>
        <div class="lower-segment--left"></div>
      </div>
    </div>
    <!-- <Filters
      :showFlag="showFiltersModal"
      :setShowFiltersModal="setShowFiltersModal"
      :gamesData="data.games"
      :regionsData="regionsData"
    /> -->
  </div>
</template>

<script>
// import { mapState } from "vuex";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import redirectToNewTab from "../helpers/RedirectToNewTab";
import MainEventCard from "../components/events/MainEventCard";
import EventsMenuView from "../components/events/EventsMenuView";
import CustomSwitch from "../shared/CustomSwitch";
import MenuView from "../components/home/MenuView";
import ListView from "../components/home/ListView";
import GiveawayCard from "../components/giveaways/GiveawayCard";
import GiveawaysMenuView from "../components/giveaways/GiveawaysMenuView";
import isDeviceSmart from "../helpers/DetectIsDeviceSmart";
// import { changeTextDirection } from "../helpers/StringsHelper";
import { liveVideoEmbedFormatter } from "../../dashboard/helpers/LiveVideoEmbedFormater";
import { truncateText } from "../helpers/StringsHelper";

export default {
  props: ["data", "setClickedImageInMedia", "summitYear"],
  data() {
    return {
      activeTabIndex: 0,
      isGamesActive: true,
      isMenuActive: true,
      showFiltersModal: false,
      tabs: ["Details", "Media", "Battles", "Events", "Giveaways"],
      tree: [
        {
          name: "Our Story",
          path: "/story"
        }
      ],
      summitId: null
    };
  },
  computed: {
    // ...mapState({
    //   regionsData: state => state.regions.dashboardRegionsData
    // }),
    isThisDeviceSmart() {
      return isDeviceSmart();
    },
    mainEvents() {
      return this.data.events.filter(
        event => event.type === "main" && event.enabled
      );
    },
    subEvents() {
      return this.data.events.filter(
        event => event.type !== "main" && event.enabled
      );
    },
    giveaways() {
      return this.data.giveaway.filter(
        giveaway => giveaway.type === "giveaway" && giveaway.enabled
      );
    },
    offers() {
      return this.data.giveaway.filter(
        giveaway => giveaway.type === "offer" && giveaway.enabled
      );
    },
    getCorrespondingData() {
      return this.isGamesActive ? this.data.games : this.data.tournaments;
    }
  },
  methods: {
    setShowFiltersModal(value = false) {
      this.showFiltersModal = value;
    },
    setIsMenuActive(flag) {
      this.isMenuActive = flag;
    },
    setIsGamesActive(flag) {
      this.isGamesActive = flag;
      this.isMenuActive = true;
    },
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
    trimText(text) {
      return truncateText(text);
    }
  },
  mounted() {
    this.tree.push({
      name: this.trimText(this.data.final_title),
      path: this.$router.history.current.path
    });
    this.summitId = this.$router.history.current.params.summitName.split(
      "-"
    )[0];
  },
  updated() {
    redirectToNewTab("description-container");
  },
  components: {
    MainEventCard,
    EventsMenuView,
    VueSlickCarousel,
    CustomSwitch,
    MenuView,
    ListView,
    GiveawayCard,
    GiveawaysMenuView
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/sass/website/shared/summit-tabs.scss";
@import "../../assets/sass/website/containers/events.scss";
@import "../../assets/sass/website/containers/home.scss";
.battle-tab {
  .slick-slider.slick-initialized {
    padding-bottom: 50px;
    width: 94%;
    margin: auto;
  }
  h2 {
    color: #e7e7e7 !important;
    font-size: 1.5rem !important;
    font-weight: lighter !important;
    margin-top: 10px !important;
  }
}
.slick-slider {
  margin-top: unset !important;
}
</style>
