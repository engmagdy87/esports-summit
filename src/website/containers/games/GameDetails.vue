<template>
  <div class="game-details-wrapper" @scroll="updateScroll" id="scroll-wrapper">
    <Header
      activeItem="games"
      :isSolidHeader="true"
      :setShowRegisterModal="setShowRegisterModal"
      :setShowLoginModal="setShowLoginModal"
      :isColorChanged="scrollPosition > 100"
    />
    <div class="game-details-wrapper__outside" v-if="showDetailsHero">
      <div
        class="game-details-wrapper__inside"
        v-if="
          gameDetails.images.img_cover_main !== null &&
            gameDetails.images.img_cover_main.length !== 0
        "
        :style="
          `backgroundImage: url(${gameDetails.images.img_cover_main[0].path})`
        "
      ></div>
    </div>
    <div class="game-details-wrapper__content" v-if="showDetailsHero">
      <div class="game-details-wrapper__content__breadcrumb">
        <a
          v-for="(route, i) in gameShortDetails.tree"
          :href="route.path"
          :key="i"
          >{{ route.name }} >
        </a>
        <span>{{ gameDetails.title }}</span>
      </div>
      <div class="container is-view--desktop">
        <div class="row">
          <div class="col-12 col-lg-3 game-details-wrapper__content__logo">
            <img
              v-if="gameDetails.images.img_logo !== null"
              :src="gameDetails.images.img_logo.path"
              :alt="gameDetails.title"
            />
          </div>
          <div class="col-12 col-lg-9">
            <div class="row">
              <div
                class="col description-container game-details-wrapper__content__description"
                v-html="gameDetails.description"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <!-- ************************* -->
      <div class="is-view--mobile">
        <ClippedBox>
          <div class="game-details-wrapper__content__logo">
            <img
              v-if="gameDetails.images.img_logo !== null"
              :src="gameDetails.images.img_logo.path"
              :alt="gameDetails.title"
            />
            <div
              class="col description-container game-details-wrapper__content__description"
              v-html="gameDetails.description"
            ></div>
          </div>
        </ClippedBox>
      </div>
      <!-- ************************* -->
      <div class="container menu-view__container">
        <div
          class="row menu-view__row game-details-wrapper__content__tournaments"
        >
          <div class="col menu-view__col">
            Tournaments
          </div>
        </div>
        <MenuView
          :data="gameDetails.tournaments"
          :isGamesActive="false"
          :tree="newTree"
        />
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
import Popup from "../../shared/Popup";
import MenuView from "../../components/home/MenuView";
import LoginModal from "../../components/home/LoginModal";
import RegisterModal from "../../components/home/RegisterModal";
import Spinner from "../../shared/Spinner";
import ClippedBox from "../../shared/ClippedBox";
import redirectToNewTab from "../../helpers/RedirectToNewTab";
import { setGameCookie, getGameCookie } from "../../helpers/CookieHelper";
import * as POPUPS_PLACES from "../../constants/PopupsPlaces";

export default {
  data() {
    return {
      showLoginModal: false,
      showRegisterModal: false,
      gameShortDetails: {},
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
      gameDetails: state => state.games.gameDetailsData,
      gameTree: state => state.navigationTree.gameTree,
      isRandomPopupDataFetched: state => state.popups.isRandomPopupDataFetched
    }),
    showDetailsHero() {
      return Object.keys(this.gameDetails).length !== 0;
    },
    newTree() {
      const tree = [].concat(this.gameShortDetails.tree);
      tree.push({
        name: this.gameShortDetails.title,
        path: this.$router.history.current.path
      });
      return tree;
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
      fetchGameDetails: types.games.actions.FETCH_GAME_DETAILS,
      fetchGameHistoryDetails: types.games.actions.FETCH_GAME_HISTORY_DETAILS,
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
    Popup,
    Spinner,
    MenuView,
    ClippedBox
  },
  mounted() {
    const gameCookieData = getGameCookie();
    if (this.$router.history.current.params.data !== undefined) {
      this.gameShortDetails = this.$router.history.current.params.data;
      store.commit(
        types.navigationTree.mutations.SET_GAME_TREE,
        this.gameShortDetails
      );
      setGameCookie(this.gameShortDetails);
    } else if (Object.keys(this.gameTree).length > 0) {
      this.gameShortDetails = this.gameTree;
    } else if (gameCookieData !== undefined) {
      this.gameShortDetails = gameCookieData;
      store.commit(
        types.navigationTree.mutations.SET_GAME_TREE,
        this.gameShortDetails
      );
    }

    const gameId = this.$router.history.current.params.gameName.split("-")[0];

    if (this.$route.params.data && this.$route.params.data.isShownInHistory) {
      const { summitId } = this.$route.params.data;
      this.fetchGameHistoryDetails({ summitId, gameId });
    } else this.fetchGameDetails(gameId);
    this.fetchRandomPopup();
  },
  updated() {
    redirectToNewTab("description-container");
    if (this.isRandomPopupDataFetched)
      this.randomPopupData = this.randomPopup(POPUPS_PLACES.GAME_DETAILS);
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/sass/website/containers/games/game-details.scss";
</style>
