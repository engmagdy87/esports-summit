<template>
  <div class="event-details-wrapper">
    <Header
      activeItem="events"
      :isSolidHeader="true"
      :setShowRegisterModal="setShowRegisterModal"
      :setShowLoginModal="setShowLoginModal"
    />
    <div class="event-details-wrapper__outside" v-if="showDetailsHero">
      <div
        class="event-details-wrapper__inside"
        v-if="eventDetails.images.img_cover_main.length !== 0"
        :style="
          eventDetails.cover_type === 'img'
            ? `backgroundImage: url(${eventDetails.images.img_cover_main[0].path})`
            : ''
        "
      >
        <video
          autoplay
          muted
          loop
          id="myVideo"
          v-if="eventDetails.cover_type !== 'img'"
        >
          <source
            :src="eventDetails.videos.vid_cover_main.path"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
    <div class="event-details-wrapper__content">
      <div class="event-details-wrapper__content__breadcrumb">
        <a href="/events">Event</a>
        <span> > {{ eventDetails.initial_title }}</span>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-3 event-details-wrapper__content__logo">
            <img
              v-if="showDetailsHero"
              :src="eventDetails.images.img_logo.path"
              :alt="eventDetails.initial_title"
            />
          </div>
          <div class="col-9">
            <div class="row">
              <div
                class="col d-flex justify-content-end align-items-center mb-4"
              >
                SPONSORS
              </div>
            </div>
            <div class="row">
              <div class="col">{{ eventDetails.initial_description }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row event-details-wrapper__content__tournaments mb-5">
          <div class="col">
            Event Tournaments
          </div>
          <div class="col d-flex justify-content-end align-items-center">
            <div class="event-details-wrapper__content__cutom-btn-outside">
              <div class="event-details-wrapper__content__cutom-btn-inside">
                SPONSORS
              </div>
            </div>
          </div>
        </div>
        <EventsMenuView
          route="event-details"
          :data="eventDetails.tournaments"
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
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import types from "../../../store/types";
import Header from "../../shared/Header";
import EventsMenuView from "../../components/events/EventsMenuView";
import LoginModal from "../../components/home/LoginModal";
import RegisterModal from "../../components/home/RegisterModal";
import Spinner from "../../shared/Spinner";

export default {
  data() {
    return {
      showLoginModal: false,
      showRegisterModal: false
    };
  },
  computed: {
    ...mapGetters({
      isUserLoggedIn: types.user.getters.IS_USER_LOGGED_IN
    }),
    ...mapState({
      eventDetails: state => state.events.eventDetails
    }),
    showDetailsHero() {
      return Object.keys(this.eventDetails).length !== 0;
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
      fetchEventDetails: types.events.actions.FETCH_EVENT_DETAILS
    }),
    setShowLoginModal(value = false) {
      this.showLoginModal = value;
    },
    setShowRegisterModal(value = false) {
      this.showRegisterModal = value;
    }
  },
  components: {
    Header,
    LoginModal,
    RegisterModal,
    Spinner,
    EventsMenuView
  },
  mounted() {
    this.fetchEventDetails(this.$router.history.current.params.eventId);
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/sass/website/containers/events/event-details.scss";
</style>