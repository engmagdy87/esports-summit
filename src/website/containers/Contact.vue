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
        <div class="upper-segment-shadow"></div>
        <div class="upper-segment"><h1>Contact Us</h1></div>
        <div class="body-shadow">
          <div class="lower-segment-shadow"></div>
          <div class="lower-segment"></div>
        </div>
        <div class="body">
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
    <Footer v-if="isCoverContactUsImageFetched" />
    <Popup :data="randomPopupData" v-if="randomPopupData !== null" />
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
      fetchRandomPopup: types.popups.actions.FETCH_RANDOM_POPUPS
    }),
    setShowLoginModal(value = false) {
      this.showLoginModal = value;
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
      const lowerSegment = document.getElementsByClassName("lower-segment");
      const lowerSegmentShadow = document.getElementsByClassName(
        "lower-segment-shadow"
      );
      const element = lowerSegment[0];
      const elementShadow = lowerSegmentShadow[0];

      const clippedPath = `polygon(
      0 0,
      100% 0,
      100% 0,
      100% 0,
      ${100 - (20 / element.clientWidth) * 100}% 100%,
      ${(20 / element.clientWidth) * 100}% 100%,
      0 0,
      0 0
    )`;

      element.style.clipPath = clippedPath;
      elementShadow.style.clipPath = clippedPath;

      const mobile = window.matchMedia("(max-width: 600px)");
      if (mobile.matches) {
        const upperSegment = document.getElementsByClassName("upper-segment");
        const upperSegmentShadow = document.getElementsByClassName(
          "upper-segment-shadow"
        );
        const upperElement = upperSegment[0];
        const upperElementShadow = upperSegmentShadow[0];
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
        upperElement.style.clipPath = upperClippedPath;
        upperElementShadow.style.clipPath = upperClippedPath;
      }
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
  mounted() {
    this.fetchCoverContactUsImage();
    this.fetchRandomPopup();
  },
  updated() {
    this.setClipPath();
    if (this.isCoverContactUsImageFetched)
      store.commit(types.home.mutations.SET_SPINNER_FLAG, false);

    if (this.isRandomPopupDataFetched)
      this.randomPopupData = this.randomPopup(POPUPS_PLACES.CONTACT);
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/sass/website/containers/contact.scss";
</style>
