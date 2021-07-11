<template>
  <div class="contact-wrapper" @scroll="updateScroll" id="scroll-wrapper">
    <Header
      activeItem="contact"
      :isSolidHeader="true"
      :setShowRegisterModal="setShowRegisterModal"
      :setShowLoginModal="setShowLoginModal"
      :isColorChanged="scrollPosition > 100"
    />
    <div class="contact-wrapper__outside" v-if="isCoverContactUsImageFetched">
      <div
        class="contact-wrapper__inside"
        v-if="coverContactUsImage !== null"
        :style="`backgroundImage: url(${coverContactUsImage.path})`"
      ></div>
    </div>
    <div
      class="contact-wrapper__content is-view--desktop"
      v-if="isCoverContactUsImageFetched"
    >
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
    <!-- ************************** -->
    <div class="clipped-section-tabs is-view--mobile">
      <nav style="margin-bottom:-1px">
        <div class="nav" id="nav-tab" role="tablist" style="flex-wrap: nowrap;">
          <a
            class="upper-segment-tabs active"
            id="nav-home-tab"
            data-toggle="tab"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >
            <div class="clipped-section-tabs__top-right-corner" />
            CONTACT US</a
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
      <div class="segment lower-segment-tabs" />
      <div class="clipped-section-tabs__bottom-left-corner" />
      <div class="clipped-section-tabs__bottom-right-corner" />
    </div>
    <!-- ************************** -->
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
import setClipPath from "../helpers/ClipPath";
import isDeviceSmart from "../helpers/DetectIsDeviceSmart";
import * as POPUPS_PLACES from "../constants/PopupsPlaces";

export default {
  data() {
    return {
      showLoginModal: false,
      showRegisterModal: false,
      email: "",
      subject: "",
      message: "",
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
    updateScroll() {
      this.scrollPosition = document.getElementById("scroll-wrapper").scrollTop;
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

    if (!isDeviceSmart()) setClipPath();
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/sass/website/containers/contact.scss";
</style>
