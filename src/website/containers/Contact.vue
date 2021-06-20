<template>
  <div class="contact-wrapper">
    <Header
      activeItem="contact"
      :isSolidHeader="true"
      :setShowRegisterModal="setShowRegisterModal"
      :setShowLoginModal="setShowLoginModal"
    />
    <div class="contact-wrapper__outside" v-if="isCoverContactUsImageFetched">
      <div
        class="contact-wrapper__inside"
        v-if="coverContactUsImage !== null"
        :style="`backgroundImage: url(${coverContactUsImage.path})`"
      ></div>
    </div>
    <div class="contact-wrapper__content" v-if="isCoverContactUsImageFetched">
      <!-- <div class="row">
        <div class="col-12">
          <h1>Contact Us</h1>
        </div>
        <div class="col-12 col-md-6">
          <p>
            We are taking our community seriously, if you need our help or
            having any question about anything please don't hesitate to contact
            us or send us on our mail<br />
            <span class="contact-wrapper__content__icon">
              <img src="website/img/email.svg" alt="email icon" />
            </span>
            <span>Info@esportssummit-me.com</span><br />
          </p>

          <p>
            For buisness inquiries in contact us on
            <br />
            <span class="contact-wrapper__content__icon">
              <img src="website/img/email.svg" alt="email icon" />
            </span>
            <span>business@esportssummit-me.com</span>
          </p>

          
        </div>
        <div class="col-12 col-md-6">
          <form>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                id="email"
                placeholder="Enter E-mail"
                v-model="email"
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                id="subject"
                placeholder="Enter Subject"
                v-model="subject"
              />
            </div>
            <div class="form-group">
              <textarea
                rows="5"
                class="form-control border-input"
                placeholder="Enter Message"
                v-model="message"
              >
              </textarea>
            </div>
            <div
              class="btn float-right contact-wrapper__content__custom-button-wrapper__outside"
              role="button"
              @click="sendMessage"
            >
              Send
            </div>
          </form>
        </div>
      </div> -->
      <div class="clipped-section">
        <div class="clipped-section__left-corner"></div>
        <div class="clipped-section__right-corner"></div>
        <div class="clipped-section__bottom-left-corner"></div>
        <div class="clipped-section__bottom-right-corner"></div>
        <div class="upper-segment">
          <h1>Contact Us</h1>
        </div>
        <!-- <div class="body-shadow">
          <div class="lower-segment-shadow"></div>
        </div> -->
        <div class="body">
          <div class="body__top-clipped"></div>
          <div class="row">
            <div class="col-12 col-md-6">
              <p class="contact-us-text">
                We are taking our community seriously, if you need our help or
                having any question about anything please don't hesitate to
                contact us or send us on our mail<br />
                <!-- <span class="contact-wrapper__content__icon">
                  <img src="website/img/email.svg" alt="email icon" />
                </span> -->
                <span>Info@esportssummit-me.com</span><br />
              </p>

              <p class="contact-us-text">
                For buisness inquiries in contact us on
                <br />
                <!-- <span class="contact-wrapper__content__icon">
                  <img src="website/img/email.svg" alt="email icon" />
                </span> -->
                <span>business@esportssummit-me.com</span>
              </p>

              <!-- <div class="mb-3 mb-md-0">
            <span class="contact-wrapper__content__icon">
              <img src="website/img/phone.svg" alt="phone icon" />
            </span>
            <span>+20 123456789</span>
          </div> -->
            </div>
            <div class="col-12 col-md-5 offset-md-1">
              <form>
                <div class="form-group">
                  <div></div>
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    placeholder="Enter E-mail"
                    v-model="email"
                  />
                </div>
                <div class="form-group">
                  <div></div>
                  <input
                    type="text"
                    class="form-control"
                    id="subject"
                    placeholder="Enter Subject"
                    v-model="subject"
                  />
                </div>
                <div class="form-group" style="margin-bottom:10px">
                  <div class="text-area"></div>
                  <textarea
                    rows="6"
                    class="form-control border-input"
                    placeholder="Enter Message"
                    v-model="message"
                  >
                  </textarea>
                </div>
                <div
                  class="contact-wrapper__content__custom-button-wrapper float-right"
                >
                  <div
                    class="contact-wrapper__content__custom-button-wrapper__mask"
                  ></div>
                  <div
                    class="contact-wrapper__content__custom-button-wrapper__outside"
                    role="button"
                    @click="sendMessage"
                  >
                    Send
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="lower-segment">
          <div class="lower-segment__left"></div>
          <div class="lower-segment__center"></div>
          <div class="lower-segment__right"></div>
        </div>
      </div>
      <!-- <img src="website/img/contact_us-02.svg" alt="email icon" /> -->
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
      <Footer v-if="isCoverContactUsImageFetched" />
    </div>
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
      email: "",
      subject: "",
      message: "",
      randomPopupData: {}
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: types.user.getters.IS_USER_LOGGED_IN,
      randomPopup: types.popups.getters.GET_POPUP
    }),
    ...mapState({
      isCoverContactUsImageFetched: state =>
        state.summits.isCoverContactUsImageFetched,
      coverContactUsImage: state => state.summits.coverContactUsImage,
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
      postMessage: types.contact.actions.SEND_MESSAGE,
      fetchCoverContactUsImage:
        types.summits.actions.FETCH_COVER_CONTACT_US_IMAGE,
      fetchRandomPopup: types.popS
    }),
    setShowLoginModal(value = false) {
      this.showLoginMo;
    },
    setShowRegisterModal(value = false) {
      this.showRegisterModal = value;
    },
    sendMessage: async function() {
      const payload = {
        email: this.email,
        subject: this.subject,
        message: this.message
      };
      try {
        await this.postMessage(payload);
        this.email = "";
        this.subject = "";
        this.message = "";
        this.notifyVue("Message sent successfully", "success");
      } catch (error) {
        this.notifyVue("Something wrong happen!", "danger");
      }
    },
    notifyVue(message, color) {
      this.$notifications.notify({
        message: `<span>${message}</span>`,
        horizontalAlign: "right",
        verticalAlign: "top",
        type: color
      });
    },
    setClipPath() {
      //   const lowerSegment = document.getElementsByClassName("lower-segment");
      //   const lowerSegmentShadow = document.getElementsByClassName(
      //     "lower-segment-shadow"
      //   );
      //   const element = lowerSegment[0];
      //   const elementShadow = lowerSegmentShadow[0];

      //   const clippedPath = `polygon(
      //   0 0,
      //   100% 0,
      //   100% 0,
      //   100% 0,
      //   ${100 - (20 / element.clientWidth) * 100}% 100%,
      //   ${(20 / element.clientWidth) * 100}% 100%,
      //   0 0,
      //   0 0
      // )`;

      // element.style.clipPath = clippedPath;
      // elementShadow.style.clipPath = clippedPath;

      const mobile = window.matchMedia("(max-width: 600px)");
      if (mobile.matches) {
        const upperSegment = document.getElementsByClassName("upper-segment");
        const bottomLeftSegment = document.getElementsByClassName(
          "lower-segment__left"
        );
        const bottomRightSegment = document.getElementsByClassName(
          "lower-segment__right"
        );

        const upperElement = upperSegment[0];
        const bottomLeftSegmentElement = bottomLeftSegment[0];
        const bottomRightSegmentElement = bottomRightSegment[0];

        const upperClippedPath = `polygon(
      ${(20 / upperElement.clientWidth) * 100}% 0,
      100% 0%,
      ${100 - (20 / upperElement.clientWidth) * 100}% 0,
      100% ${(20 / upperElement.clientHeight) * 100}%,
      100% 0,
      100% 100%,
      0 100%,
      0 100%,
      0 ${(20 / 67) * 100}%
    )`;

        const bottomLeftSegmentClippedPath = `polygon(
      0 0,
      100% 0%,
      100% 100%,
      100% 0,
      100% 0,
      100% 100%,
      0 100%,
      16% 100%,
      0 0
    )`;
        const bottomRightSegmentClippedPath = `polygon(
      0 0,
      100% 0%,
      100% 100%,
      100% 0,
      100% 0,
      100% 100%,
      0 100%,
      16% 100%,
      0 0
    )`;

        upperElement.style.clipPath = upperClippedPath;
        bottomLeftSegmentElement.style.clipPath = bottomLeftSegmentClippedPath;
        bottomRightSegmentElement.style.clipPath = bottomRightSegmentClippedPath;
      }
    },
    setHeroClipPath() {
      const outsideSegment = document.getElementsByClassName(
        "contact-wrapper__outside"
      );
      const insideSegment = document.getElementsByClassName(
        "contact-wrapper__inside"
      );

      const outsideElement = outsideSegment[0];
      const insideElement = insideSegment[0];

      const is_x_extra_small_mobile = window.matchMedia("(max-width: 399px)");
      const is_extra_small_mobile = window.matchMedia(
        "(min-width: 400px) and (max-width: 600px)"
      );
      const is_mobile = window.matchMedia(
        "(min-width: 601px) and (max-width: 767px)"
      );
      const is_tablet = window.matchMedia(
        "(min-width: 768px) and (max-width: 991px)"
      );
      const is_desktop = window.matchMedia(
        "(min-width: 992px) and (max-width: 1199px)"
      );
      const is_large_desktop = window.matchMedia(
        "(min-width: 1200px) and (max-width: 1499px)"
      );
      const is_extra_large_desktop = window.matchMedia("(min-width: 1500px)");
      let value;
      if (is_x_extra_small_mobile.matches) value = 1;
      if (is_extra_small_mobile.matches) value = 1.05;
      if (is_extra_small_mobile.matches) value = 1.05;
      if (is_mobile.matches) value = 1.1;
      if (is_tablet.matches) value = 1.16;
      if (is_desktop.matches) value = 1.2;
      if (is_large_desktop.matches) value = 1.3;
      if (is_extra_large_desktop.matches) value = 1.4;

      const outsideClippedPath = `polygon(
    0 0,
    100% 0,
    100% 0%,
    100% ${100 - (40 / outsideElement.clientHeight) * 100}%,
    ${100 - (20 / outsideElement.clientWidth) * 100}% ${100 -
        (20 / outsideElement.clientHeight) * 100}%,
    66% ${100 - (20 / outsideElement.clientHeight) * 100}%,
    ${50 + (20 / outsideElement.clientHeight) * 100}% ${value *
        (100 + (20 / insideElement.clientWidth) * 100)}%,
    ${(40 / outsideElement.clientWidth) * 100}% ${100 +
        (20 / outsideElement.clientHeight) * 100}%,
    0 ${100 - (20 / outsideElement.clientHeight) * 100}%
    )`;

      const insideClippedPath = `polygon(
    0 0,
    100% 0,
    100% 0%,
    100% ${100 - (40 / insideElement.clientHeight) * 100}%,
    ${100 - (20 / insideElement.clientWidth) * 100}% ${100 -
        (20 / insideElement.clientHeight) * 100}%,
    66% ${100 - (20 / insideElement.clientHeight) * 100}%,
    ${50 + (20 / insideElement.clientHeight) * 100}% ${value *
        (100 + (20 / insideElement.clientWidth) * 100)}%,
    ${(40 / insideElement.clientWidth) * 100}% ${100 +
        (20 / insideElement.clientHeight) * 100}%,
    0 ${100 - (20 / insideElement.clientHeight) * 100}%
    )`;

      outsideElement.style.clipPath = outsideClippedPath;
      insideElement.style.clipPath = insideClippedPath;
    },
    onResize() {
      this.setHeroClipPath();
    }
  },
  components: {
    Header,
    Footer,
    LoginModal,
    RegisterModal,
    Spinner,
    Popup
  },
  beforeDestroy() {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener("resize", this.onResize);
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    this.fetchCoverContactUsImage();
    this.fetchRandomPopup();
  },
  updated() {
    if (this.isCoverContactUsImageFetched)
      store.commit(types.home.mutations.SET_SPINNER_FLAG, false);

    if (this.isRandomPopupDataFetched)
      this.randomPopupData = this.randomPopup(POPUPS_PLACES.CONTACT);

    this.setClipPath();
    this.setHeroClipPath();
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/sass/website/containers/contact.scss";
</style>
