<template>
  <!-- <div class="home-wrapper" @scroll="detectScroll"> -->
  <div class="home-wrapper" @scroll="updateScroll" id="scroll-wrapper">
    <Header
      activeItem="home"
      :setShowRegisterModal="setShowRegisterModal"
      :setShowLoginModal="setShowLoginModal"
      :isColorChanged="scrollPosition > 100"
    />
    <div class="home-wrapper__hero">
      <VueSlickCarousel
        v-if="filteredMainEventsData.length !== 0 && isMainEventsFetched"
        :arrows="false"
        :dots="true"
        :pauseOnHover="false"
        :slidesToShow="1"
        :slidesToScroll="1"
        :autoplaySpeed="5000"
        autoplay
        infinite
      >
        <img
          v-for="(event, index) in filteredMainEventsData"
          :key="index"
          :src="event.images.img_cover_home.path"
          :alt="event.initial_title"
          class="home-wrapper__slide"
          @click="redirectTo(event.id, event.initial_title)"
          v-if="event.enabled"
        />
      </VueSlickCarousel>
    </div>
    <div class="home-wrapper__content" id="home">
      <!--**************************** COMING SOON SUMMIT ****************************-->
      <div class="home-wrapper__ready-section">
        <img src="/website/img/home/get_ready.png" alt="get ready" />
        <video
          controls
          autoplay
          muted
          loop
          @click="e => toggleFullScreenMode(e)"
          id="video"
        >
          <source src="/website/vid/home-video.mp4" type="video/mp4" />
          Your browser does not support HTML video.
        </video>
      </div>
      <div
        class="home-wrapper__ready-section home-wrapper__ready-section--section-2"
      >
        <img
          class="home-wrapper__battles"
          src="/website/img/home/20_games-words.png"
          alt="battles"
        />
      </div>
      <!-- ************************************************************************** -->
      <!-- <div
        v-if="
          isGamesDataFetched &&
            isTournamentsDataFetched &&
            isDashboardRegionsDataFetched &&
            isMainEventsFetched
        "
      >
        <h2>Join The Battle</h2>
        <div class="row home-wrapper__row">
          <div class="col home-wrapper__col">
            <ul class="home-wrapper__navLinks">
              <li
                :class="[isGamesActive ? 'home-wrapper__navLinks--active' : '']"
                @click="setIsGamesActive(true)"
              >
                Games
              </li>
              <li
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
            class="col d-flex justify-content-end align-items-center switcher"
          >
            <CustomSwitch
              :isMenuActive="isMenuActive"
              :setIsMenuActive="setIsMenuActive"
            />
          </div>
        </div>
        <div class="row filter" v-if="!isGamesActive">
          <div class="col">
            <CustomButton :setShowFiltersModal="setShowFiltersModal" />
          </div>
        </div>
        <MenuView
          :data="getCorrespondingData"
          :isGamesActive="isGamesActive"
          v-if="isMenuActive && isGamesDataFetched && isTournamentsDataFetched"
          :tree="tree"
        />
        <ListView
          :data="getCorrespondingData"
          :isGamesActive="
            isGamesActive && isGamesDataFetched && isTournamentsDataFetched
          "
          :tree="tree"
          v-else
        />
      </div> -->

      <!-- <div
        class="row"
        v-if="
          isGamesDataFetched &&
            isTournamentsDataFetched &&
            isDashboardRegionsDataFetched &&
            isFooterSponsorsDataFetched &&
            isMainEventsFetched
        "
      >
        <div class="col pt-5 d-flex justify-content-center align-items-center">
          <img class="" src="/website/img/footer/sponsors-main.png" />
        </div>
      </div> -->
      <Footer
        v-if="
          isGamesDataFetched &&
            isTournamentsDataFetched &&
            isDashboardRegionsDataFetched &&
            isFooterSponsorsDataFetched &&
            isMainEventsFetched
        "
      />
    </div>
    <LoginModal
      :showFlag="showLoginModal"
      :setShowLoginModal="setShowLoginModal"
    />
    <RegisterModal
      :showFlag="showRegisterModal"
      :setShowRegisterModal="setShowRegisterModal"
    />
    <Filters
      :showFlag="showFiltersModal"
      :setShowFiltersModal="setShowFiltersModal"
      :gamesData="gamesData"
      :regionsData="regionsData"
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
import VueSlickCarousel from "vue-slick-carousel";
import store from "../../store/index";
import types from "../../store/types";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import CustomSwitch from "../shared/CustomSwitch";
import MenuView from "../components/home/MenuView";
import ListView from "../components/home/ListView";
import Spinner from "../shared/Spinner";
import LoginModal from "../components/home/LoginModal";
import RegisterModal from "../components/home/RegisterModal";
import Filters from "../components/tournaments/Filters";
import { reformatStringToBeInURL } from "../helpers/StringsHelper";
import Popup from "../shared/Popup";
import * as POPUPS_PLACES from "../constants/PopupsPlaces";

export default {
  data() {
    return {
      isGamesActive: true,
      isMenuActive: true,
      showLoginModal: false,
      showRegisterModal: false,
      showFiltersModal: false,
      // footerCssClass: "hide",
      tree: [{ name: "Home", path: "/" }],
      randomPopupData: {},
      scrollPosition: null
    };
  },
  computed: {
    ...mapState({
      tournamentsData: state => state.tournaments.filteredTournamentsData,
      isTournamentsDataFetched: state =>
        state.tournaments.isTournamentsDataFetched,
      gamesData: state => state.games.gamesCardViewData,
      isGamesDataFetched: state => state.games.isGamesCardsViewDataFetched,
      regionsData: state => state.regions.dashboardRegionsData,
      isDashboardRegionsDataFetched: state =>
        state.regions.isDashboardRegionsDataFetched,
      footerSponsorsData: state => state.sponsors.footerSponsorsData,
      isFooterSponsorsDataFetched: state =>
        state.sponsors.isFooterSponsorsDataFetched,
      mainEventsData: state => state.events.mainEventsData,
      isMainEventsFetched: state => state.events.isMainEventsFetched,
      isRandomPopupDataFetched: state => state.popups.isRandomPopupDataFetched
    }),
    ...mapGetters({
      isUserLoggedIn: types.user.getters.IS_USER_LOGGED_IN,
      randomPopup: types.popups.getters.GET_POPUP
    }),
    getCorrespondingData() {
      return this.isGamesActive ? this.gamesData : this.tournamentsData;
    },
    filteredMainEventsData() {
      return this.mainEventsData.filter(
        event => event.images.img_cover_home !== null
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
      fetchGames: types.games.actions.FETCH_GAMES_CARD_VIEW,
      fetchTournaments: types.tournaments.actions.FETCH_TOURNAMENTS,
      fetchRegions: types.regions.actions.FETCH_REGIONS_FOR_DASHBOARD,
      fetchFooterSponsors: types.sponsors.actions.FETCH_FOOTER_SPONSORS,
      fetchMainEvents: types.events.actions.FETCH_MAIN_EVENTS,
      fetchRandomPopup: types.popups.actions.FETCH_RANDOM_POPUPS
    }),
    setShowLoginModal(value = false) {
      this.showLoginModal = value;
    },
    setShowRegisterModal(value = false) {
      this.showRegisterModal = value;
    },
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
    redirectTo(id, title) {
      this.$router.push({
        name: "event",
        params: {
          eventName: `${id}-${reformatStringToBeInURL(title)}`,
          data: { id, title, tree: [{ name: "Home", path: "/" }] }
        }
      });
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
    // detectScroll(e) {
    // if (e.target.scrollTop <= 120) this.footerCssClass = "hide";
    // else if (
    //   e.target.scrollTop > 120 &&
    //   e.target.scrollTop + e.target.offsetHeight < e.target.scrollHeight
    // )
    //   this.footerCssClass = "show-small";
    //******************** */
    // if (e.target.scrollTop + e.target.offsetHeight === e.target.scrollHeight)
    //   this.footerCssClass = "show-small";
    // else this.footerCssClass = "hide";
    // }
    updateScroll() {
      this.scrollPosition = document.getElementById("scroll-wrapper").scrollTop;
    }
  },
  components: {
    Header,
    LoginModal,
    RegisterModal,
    Spinner,
    Footer,
    Popup,
    Filters,
    VueSlickCarousel,
    CustomSwitch,
    MenuView,
    ListView
  },
  mounted() {
    store.commit(types.home.mutations.SET_SPINNER_FLAG, true);
    this.fetchGames();
    this.fetchTournaments();
    this.fetchRegions();
    this.fetchFooterSponsors();
    this.fetchMainEvents();
    this.fetchRandomPopup();
    const scrollId = this.$router.history.current.hash.split("#")[1];
    if (scrollId && document.getElementById("home") !== null)
      document.getElementById("home").scrollIntoView();
    if (scrollId === "tournaments") this.isGamesActive = false;
    if (scrollId === "games") this.isGamesActive = true;
  },
  updated() {
    if (this.isRandomPopupDataFetched)
      this.randomPopupData = this.randomPopup(POPUPS_PLACES.HOME);

    if (
      this.isGamesDataFetched &&
      this.isTournamentsDataFetched &&
      this.isDashboardRegionsDataFetched &&
      this.isFooterSponsorsDataFetched &&
      this.isMainEventsFetched
    )
      store.commit(types.home.mutations.SET_SPINNER_FLAG, false);
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/sass/website/containers/home.scss";
@import "../../assets/sass/website/mixins.scss";
.switcher {
  @include is-extra-small-mobile {
    display: none !important;
  }
}
.filter {
  @include is-extra-small-mobile {
    display: none !important;
  }
}
</style>
