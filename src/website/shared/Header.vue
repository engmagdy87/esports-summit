<template>
  <header
    :class="[
      'header-wrapper',
      isSolidHeader ? 'header-wrapper--solid' : 'header-wrapper--gradient'
    ]"
  >
    <transition appear name="fade">
      <div class="header-mask" v-if="isColorChanged"></div>
    </transition>
    <div class="header-wrapper__logo">
      <a href="/" alt="esports summit" style="width: 100%;">
        <img src="/website/img/ess-logo.png" alt="ess logo" />
      </a>
    </div>
    <!-- DESKTOP UI -->
    <nav class="header-wrapper--desktop">
      <ul class="header-wrapper__navLinks">
        <li
          :class="[
            activeItem === 'home' ? 'header-wrapper__navLinks--active' : ''
          ]"
        >
          <a href="/">Home</a>
        </li>
        <li
          :class="[
            activeItem === 'events' ? 'header-wrapper__navLinks--active' : ''
          ]"
        >
          <a href="/events">Events</a>
        </li>
        <li
          :class="[
            activeItem === 'giveaways' ? 'header-wrapper__navLinks--active' : ''
          ]"
        >
          <a href="/giveaways">Giveaways</a>
        </li>
        <li
          :class="[
            activeItem === 'story' ? 'header-wrapper__navLinks--active' : ''
          ]"
        >
          <a href="/story">Our Story</a>
        </li>
        <!-- <li
          :class="[
            activeItem === 'testimonials'
              ? 'header-wrapper__navLinks--active'
              : ''
          ]"
        >
          <a href="/testimonials">Testimonials</a>
        </li> -->
        <li
          :class="[
            activeItem === 'contact' ? 'header-wrapper__navLinks--active' : ''
          ]"
        >
          <a href="/contact">Contact Us</a>
        </li>
        <div class="float-right header-wrapper__right-section">
          <div>
            <img
              v-if="userCookie === null"
              class="header-wrapper__user-section-icon"
              src="../../../public/website/img/user.svg"
              alt="user"
            />
            <li @click="setShowLoginModal(true)" v-if="userCookie === null">
              <a class="header-wrapper__user-section" href="#">Login</a>
            </li>
            <li
              class="header-wrapper__user-section"
              @click="setShowRegisterModal(true)"
              v-if="userCookie === null"
            >
              <span class="header-wrapper__user-section">/</span
              ><a class="header-wrapper__user-section" href="#">Sign Up</a>
            </li>
            <li class="float-right" v-if="userCookie !== null">
              <Avatar :logoutUser="logoutUser" :userCookie="userCookie" />
            </li>
            <li v-if="userCookie !== null && isUserAdmin" class="float-right">
              <a href="/dashboard">
                <img
                  class="header-wrapper__dashboard-img"
                  src="/website/img/dashboard.svg"
                  alt="dashboard"
                />
              </a>
            </li>
          </div>
          <div class="header-wrapper__right-section--social">
            <img
              class="header-wrapper__social-media-icon"
              src="/website/img/footer/discord.png"
              alt="discord"
              @click="redirectTo('https://discord.gg/PUwd4cZ')"
            />
            <img
              class="header-wrapper__social-media-icon header-wrapper__social-media-icon--short"
              src="/website/img/footer/instagram.png"
              alt="instagram"
              @click="redirectTo('https://www.instagram.com/theesportssummit/')"
            />
            <img
              class="header-wrapper__social-media-icon header-wrapper__social-media-icon--short"
              src="/website/img/footer/youtube.png"
              alt="youtube"
              @click="
                redirectTo(
                  'https://www.youtube.com/channel/UCeOGq-S3xKR8opZKNXYrd2w'
                )
              "
            />
            <img
              class="header-wrapper__social-media-icon header-wrapper__social-media-icon--short"
              src="/website/img/footer/facebook.png"
              alt="facebook"
              @click="redirectTo('https://www.facebook.com/theesportssummit/')"
            />
          </div>
        </div>
      </ul>
    </nav>

    <!-- MOBILE UI -->
    <div class="header-wrapper--mobile">
      <div ref="myNav" class="overlay">
        <a class="closebtn" @click="closeNav">
          &times;
        </a>

        <div class="overlay-content">
          <li
            :class="[
              activeItem === 'home' ? 'header-wrapper__navLinks--active' : ''
            ]"
          >
            <a href="/" @click="closeNav">
              Home
            </a>
          </li>
          <li
            :class="[
              activeItem === 'events' ? 'header-wrapper__navLinks--active' : ''
            ]"
          >
            <a href="/events" @click="closeNav">Events</a>
          </li>
          <li
            :class="[
              activeItem === 'giveaways'
                ? 'header-wrapper__navLinks--active'
                : ''
            ]"
          >
            <a href="/giveaways" @click="closeNav">Giveaways</a>
          </li>
          <li
            :class="[
              activeItem === 'story' ? 'header-wrapper__navLinks--active' : ''
            ]"
          >
            <a href="/story" @click="closeNav">Our Story</a>
          </li>
          <!-- <li
            :class="[
              activeItem === 'testimonials'
                ? 'header-wrapper__navLinks--active'
                : ''
            ]"
          >
            <a href="/testimonials" @click="closeNav">Testimonials</a>
          </li> -->
          <li
            :class="[
              activeItem === 'contact' ? 'header-wrapper__navLinks--active' : ''
            ]"
          >
            <a href="/contact" @click="closeNav">Contact Us</a>
          </li>
          <li @click="setShowRegisterModal(true)" v-if="userCookie === null">
            <a href="#" @click="closeNav">Sign Up</a>
          </li>
          <li @click="setShowLoginModal(true)" v-if="userCookie === null">
            <a href="#" @click="closeNav">Login</a>
          </li>
          <li v-if="userCookie !== null">
            <a href="/profile">
              Profile
            </a>
          </li>
          <li v-if="userCookie !== null && isUserAdmin">
            <a href="/dashboard">
              Dashboard
            </a>
          </li>
          <li v-if="userCookie !== null" @click="logoutUser">
            <a href="#">
              Logout
            </a>
          </li>
        </div>
      </div>

      <span class="hamburger-menu" @click="openNav">
        &#9776;
      </span>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import store from "../../store/index";
import types from "../../store/types";
import Avatar from "./Avatar";
import { removeCookie, getUserCookie } from "../helpers/CookieHelper";

export default {
  data() {
    return {
      userCookie: null
    };
  },
  props: [
    "activeItem",
    "setShowRegisterModal",
    "setShowLoginModal",
    "isSolidHeader",
    "isColorChanged"
  ],
  methods: {
    openNav() {
      this.$refs.myNav.style.height = "100%";
    },
    closeNav() {
      this.$refs.myNav.style.height = "0%";
    },
    logoutUser() {
      removeCookie();
      store.commit(types.user.mutations.SET_USER_PERSONA, {});
      this.closeNav();
    },
    redirectTo(url) {
      if (url.includes("http")) window.open(url, "_blank");
      else window.open(`http://${url}`, "_blank");
    }
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: types.user.getters.IS_USER_LOGGED_IN,
      isUserAdmin: types.user.getters.IS_USER_ADMIN
    }),
    ...mapState({
      userVerification: state => state.user.userVerification,
      userPersona: state => state.user.userPersona
    })
  },
  watch: {
    userVerification() {
      if (this.userVerification.status) this.userCookie = getUserCookie();
    },
    userPersona() {
      if (Object.keys(this.userPersona).length === 0) this.userCookie = null;
    }
  },
  components: {
    Avatar
  },
  mounted() {
    if (getUserCookie() !== undefined) this.userCookie = getUserCookie();
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/sass/website/shared/header.scss";
.fade-enter-active {
  transition: all 0.5s;
}
.fade-leave-active {
  transition: all 0.5s;
}
</style>
