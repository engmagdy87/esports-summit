<template>
  <div v-if="showFormWhenDataFetched">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="/dashboard/tournaments">Tournaments</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ operation }}
        </li>
      </ol>
    </nav>
    <h4 slot="header" class="card-title">{{ operation }}</h4>
    <form>
      <div class="row">
        <div class="col-md-6">
          <base-input
            type="text"
            label="Initial Title"
            placeholder="Enter Initial Title"
            v-model="tournament.initial_title"
            :autofocus="true"
            :isInvalid="errors.initial_title !== undefined"
            :isRequired="true"
          >
          </base-input>
          <p class="error-message" v-if="errors.initial_title !== undefined">
            {{ errors.initial_title }}
          </p>
        </div>
        <div class="col-md-6">
          <base-input
            type="text"
            label="Final Title"
            placeholder="Enter Final Title"
            v-model="tournament.final_title"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <div class="form-group">
            <label
              >Initial Description<span class="error-message"> *</span></label
            >
            <vue-pell-editor
              :actions="editorOptions"
              :style-with-css="false"
              placeholder=""
              v-model="tournament.initial_description"
              :class="
                errors.initial_description !== undefined
                  ? 'pell-content--is-invalid'
                  : ''
              "
            />
            <p
              class="error-message"
              v-if="errors.initial_description !== undefined"
            >
              {{ errors.initial_description }}
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label>Final Description</label>
            <vue-pell-editor
              :actions="editorOptions"
              :style-with-css="false"
              default-paragraph-separator="p"
              placeholder=""
              v-model="tournament.final_description"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <base-input
            type="text"
            label="Format"
            placeholder="Enter Format"
            v-model="tournament.format"
          >
          </base-input>
        </div>
        <div class="col-md-6">
          <base-input
            type="text"
            label="Register Link"
            placeholder="Enter Register Link"
            v-model="tournament.register_link"
          >
          </base-input>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4">
          <base-input
            type="date"
            label="Registeration Start Date"
            placeholder="Enter Registeration Start Date"
            v-model="tournament.register_start_at"
            :isInvalid="errors.register_start_at !== undefined"
            :isRequired="true"
            @change="checkDatesSequence"
          >
          </base-input>
          <p
            class="error-message"
            v-if="errors.register_start_at !== undefined"
          >
            {{ errors.register_start_at }}
          </p>
        </div>
        <div class="col-md-4">
          <base-input
            type="date"
            label="Registeration End Date"
            placeholder="Enter Registeration End Date"
            v-model="tournament.register_end_at"
            :isInvalid="errors.register_end_at !== undefined"
            :isRequired="true"
            @change="checkDatesSequence"
          >
          </base-input>
          <p class="error-message" v-if="errors.register_end_at !== undefined">
            {{ errors.register_end_at }}
          </p>
        </div>
        <div class="col-md-4">
          <base-input
            type="date"
            label="Kick-off Date"
            placeholder="Enter Kick-off Date"
            v-model="tournament.kick_off_date"
            :isInvalid="errors.kick_off_date !== undefined"
            :isRequired="true"
            @change="checkDatesSequence"
          >
          </base-input>
          <p class="error-message" v-if="errors.kick_off_date !== undefined">
            {{ errors.kick_off_date }}
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="region">Region</label>
            <select class="form-control" v-model="tournament.region_id">
              <option value="-1">--Please select region</option>
              <option
                v-for="(region, index) in regionsListData"
                :selected="tournament.region_id === region.id"
                :key="index"
                :value="region.id"
                >{{ region.title }}</option
              >
            </select>
            <p class="error-message" v-if="errors.region_id !== undefined">
              {{ errors.region_id }}
            </p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="platform">Platform</label>
            <select class="form-control" v-model="tournament.platform_id">
              <option value="-1">--Please select platform</option>
              <option
                v-for="(platform, index) in platformsListData"
                :selected="tournament.platform_id === platform.id"
                :key="index"
                :value="platform.id"
                >{{ platform.title }}</option
              >
            </select>
            <p class="error-message" v-if="errors.platform_id !== undefined">
              {{ errors.platform_id }}
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="game">Game</label>
            <select class="form-control" v-model="tournament.game_id">
              <option value="-1">--Please select game</option>
              <option
                v-for="(game, index) in gamesListData"
                :selected="tournament.game_id === game.id"
                :key="index"
                :value="game.id"
                >{{ game.title }}</option
              >
            </select>
            <p class="error-message" v-if="errors.game_id !== undefined">
              {{ errors.game_id }}
            </p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="event">Event</label>
            <select class="form-control" v-model="tournament.event_id">
              <option value="-1">--Please select event</option>
              <option
                v-for="(event, index) in eventsListData"
                :selected="tournament.event_id === event.id"
                :key="index"
                :value="event.id"
                >{{ event.initial_title }}</option
              >
            </select>
            <p class="error-message" v-if="errors.event_id !== undefined">
              {{ errors.event_id }}
            </p>
          </div>
        </div>
      </div>
      <div class="row mt-3 mb-3">
        <div class="col-md-6 mt-auto mb-auto">
          <div class="custom-control custom-switch">
            <input
              type="checkbox"
              class="custom-control-input"
              id="enabled"
              v-model="tournament.enabled"
            />
            <label class="custom-control-label" for="enabled"
              >Publish Tournament</label
            >
          </div>
        </div>
        <div class="col-md-6 mt-auto mb-auto">
          <div class="custom-control custom-switch">
            <input
              type="checkbox"
              class="custom-control-input"
              id="show_sponsors"
              v-model="tournament.show_sponsors"
            />
            <label class="custom-control-label" for="show_sponsors"
              >Show Sponsors</label
            >
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mt-auto mb-auto">
          <div class="custom-control custom-switch">
            <input
              type="checkbox"
              class="custom-control-input"
              id="has_rules"
              v-model="tournament.has_rules"
            />
            <label class="custom-control-label" for="has_rules"
              >Tournament Rules</label
            >
          </div>
        </div>
        <div class="col-md-6">
          <base-input
            type="text"
            label="Rule Title"
            placeholder="Enter Rule Title"
            v-model="tournament.rules.title"
          >
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label>Rule Description</label>
          <vue-pell-editor
            :actions="editorOptions"
            :style-with-css="false"
            default-paragraph-separator="p"
            placeholder=""
            v-model="tournament.rules.content"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-6">
          <base-input
            type="text"
            label="Winner"
            placeholder="Enter Winner"
            v-model="tournament.winner"
          >
          </base-input>
        </div>
        <div class="col-12 col-md-6">
          <base-input
            type="number"
            label="Prize"
            placeholder="Enter Prize"
            v-model="tournament.price"
            :min="0"
          >
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <base-input
            type="text"
            label="Contact Title"
            placeholder="Enter Contact Title"
            v-model="tournament.contacts.title"
          >
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="form-group">
            <label>Contact Description</label>
            <vue-pell-editor
              :actions="editorOptions"
              :style-with-css="false"
              default-paragraph-separator="p"
              placeholder=""
              v-model="tournament.contacts.content"
            />
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <base-input
            type="text"
            label="Video Stream"
            placeholder="Enter Video Stream"
            v-model="tournament.vid_stream"
          >
          </base-input>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <base-input
            type="text"
            label="Schedule Title"
            placeholder="Enter Schedule Title"
            v-model="tournament.schedule_title"
          >
          </base-input>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6  mt-auto mb-auto">
          <div class="custom-control custom-switch">
            <input
              type="checkbox"
              class="custom-control-input"
              id="has_cover_over"
              v-model="tournament.has_cover_over"
            />
            <label class="custom-control-label" for="has_cover_over"
              >Cover Over Image</label
            >
          </div>
        </div>
        <div class="col-md-6  mt-auto mb-auto">
          <div class="form-group">
            <label for="cover-type">Cover Type</label>
            <select class="form-control" v-model="tournament.cover_type">
              <option value="-1">--Please select cover type</option>
              <option
                v-for="(type, index) in eventCoverTypes"
                :selected="tournament.cover_type === type.value"
                :key="index"
                :value="type.value"
                >{{ type.label }}</option
              >
            </select>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <div>
            <label class="mr-5" for="media-images">Choose Schedule Image</label>
            <input
              type="file"
              id="media-images"
              accept="image/png, image/jpeg"
              @change="e => setFile(e, 'img_schedule')"
              ref="img_schedule"
            />
            <br />
            <ImagePreview
              v-if="
                editData !== undefined &&
                  operation === 'Edit Tournament' &&
                  editData.images !== null &&
                  editData.images.img_schedule !== null
              "
              :image="editData.images.img_schedule"
              :setShowDeleteDialogFlag="setImageDataFlag"
              openedFor="img_schedule"
            />
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <div>
            <label class="mr-5" for="media-images"
              >Choose Cover Over Image</label
            >
            <input
              type="file"
              id="media-images"
              accept="image/png, image/jpeg"
              @change="e => setFile(e, 'img_cover_over')"
              ref="img_cover_over"
            />
            <br />
            <ImagePreview
              v-if="
                editData !== undefined &&
                  operation === 'Edit Tournament' &&
                  editData.images !== null &&
                  editData.images.img_cover_over !== null
              "
              :image="editData.images.img_cover_over"
              :setShowDeleteDialogFlag="setImageDataFlag"
              openedFor="img_cover_over"
            />
          </div>
        </div>
      </div>
      <div class="row mt-3 mb-3">
        <div class="col">
          <div>
            <label for="img logo" class="mr-5">Choose Logo Image</label>
            <input
              type="file"
              id="img logo"
              accept="image/png, image/jpeg"
              @change="e => setFile(e, 'img_logo')"
              ref="img_logo"
            />
            <br />
            <ImagePreview
              v-if="
                editData !== undefined &&
                  operation === 'Edit Tournament' &&
                  editData.images !== null &&
                  editData.images.img_logo !== null
              "
              :image="editData.images.img_logo"
              :setShowDeleteDialogFlag="setImageDataFlag"
              openedFor="img_logo"
            />
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <div>
            <label class="mr-5" for="media-images1">Choose Card Image</label>
            <input
              type="file"
              id="media-images1"
              accept="image/png, image/jpeg"
              @change="e => setFile(e, 'img_card')"
              ref="img_card"
            />
            <br />
            <ImagePreview
              v-if="
                editData !== undefined &&
                  operation === 'Edit Tournament' &&
                  editData.images !== null &&
                  editData.images.img_card !== null
              "
              :image="editData.images.img_card"
              :setShowDeleteDialogFlag="setImageDataFlag"
              openedFor="img_card"
            />
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <div>
            <label class="mr-5" for="media-images"
              >Choose Cover Main Images</label
            >
            <input
              type="file"
              id="media-images"
              accept="image/png, image/jpeg"
              multiple
              ref="img_cover_main"
            />
            <br />
            <div
              v-if="
                editData !== undefined &&
                  (operation === 'Edit Tournament' ||
                    (editData.images !== null &&
                      editData.images.img_cover_main !== null))
              "
              class="image-preview-list"
            >
              <ImagePreview
                v-for="(img, index) in editData.images.img_cover_main"
                :key="index"
                :image="img"
                :setShowDeleteDialogFlag="setImageDataFlag"
                openedFor="img_cover_main"
                :imageIndex="index"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <label class="mr-5" for="media-images1"
            >Choose Cover Main Video</label
          >
          <input
            type="file"
            id="logo"
            accept="video/*"
            @change="getVideo"
            ref="vid_cover_main"
          />
          <br />
          <VideoPreview
            v-if="
              editData !== undefined &&
                operation === 'Edit Tournament' &&
                editData.videos !== null &&
                editData.videos.vid_cover_main !== null
            "
            :video="editData.videos.vid_cover_main"
            :setShowDeleteDialogFlag="setVideoDataFlag"
            openedFor="vid_cover_main"
          />
        </div>
      </div>

      <div class="text-center">
        <button
          type="button"
          class="btn btn-info btn-fill float-right"
          @click="clickAction"
        >
          Save
        </button>
      </div>
      <div class="clearfix"></div>
      <DeleteDialog
        :showFlag="showFlag"
        :setShowDeleteDialogFlag="
          contentType === 'video' ? setVideoDataFlag : setImageDataFlag
        "
        :item="contentType === 'video' ? 'Video' : 'Image'"
        :deleteAction="contentType === 'video' ? removeVideo : removeImage"
      />
    </form>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import ImagePreview from "../../../website/shared/ImagePreview.vue";
import VideoPreview from "../../../website/shared/VideoPreview.vue";
import DeleteDialog from "../../../website/shared/DeleteDialog";
import store from "../../../store/index";
import types from "../../../store/types";
import {
  createTournament,
  editTournament
} from "../../../website/helpers/APIsHelper.js";
import regions from "../../../store/modules/regions";
import platforms from "../../../store/modules/platforms";
import isDatesInProperSequence from "../../../dashboard/helpers/DateHelper";
import editorOptions from "../../../dashboard/wysiwyg-factory/options";

export default {
  components: {
    ImagePreview,
    DeleteDialog,
    VideoPreview
  },
  data() {
    return {
      openedFor: "",
      contentType: "",
      imageIndex: null,
      showFlag: false,
      imageId: null,
      editData: this.$router.history.current.params.data || { images: null },
      operation: this.$route.name,
      tournament: {
        initial_title: "",
        final_title: "",
        initial_description: "",
        final_description: "",
        format: "",
        register_link: "",
        winner: "",
        price: 0,
        register_start_at: "",
        register_end_at: "",
        kick_off_date: "",
        cover_type: "-1",
        region_id: "-1",
        platform_id: "-1",
        game_id: "-1",
        event_id: "-1",
        has_cover_over: false,
        show_sponsors: false,
        enabled: false,
        has_rules: false,
        rules: { title: "", content: "" },
        contacts: { title: "", content: "" },
        schedule_title: "",
        img_logo: "",
        img_cover_over: "",
        img_schedule: "",
        img_card: "",
        vid_stream: "",
        vid_cover_main: ""
      },
      editorOptions,
      errors: {},
      CTAClicked: false
    };
  },
  methods: {
    ...mapActions({
      deleteImage: types.tournaments.actions.DELETE_TOURNAMENT_IMAGE,
      deleteVideo: types.tournaments.actions.DELETE_EVENT_VIDEO,
      fetchRegionsList: types.regions.actions.FETCH_REGIONS_FOR_DASHBOARD,
      fetchPlatformsList: types.platforms.actions.FETCH_PLATFORMS_FOR_DASHBOARD,
      fetchGamesList: types.games.actions.FETCH_GAMES_FOR_DASHBOARD,
      fetchEventsList: types.events.actions.FETCH_EVENT_LIST,
      fetchSummitsList: types.summits.actions.FETCH_SUMMITS_LIST,
      fetchCoverTypes: types.events.actions.FETCH_EVENT_COVER_TYPES
    }),
    clickAction() {
      this.operation === "Edit Tournament"
        ? this.saveData(editTournament, "Tournament Updated Successfully")
        : this.saveData(createTournament, "Tournament Created Successfully");
    },
    setImageDataFlag(flag, imageId, openedFor, imageIndex, contentType) {
      this.showFlag = flag;
      this.imageId = imageId;
      this.openedFor = openedFor;
      this.imageIndex = imageIndex;
      this.contentType = contentType;
    },
    setVideoDataFlag(flag, videoId, openedFor, contentType) {
      this.showFlag = flag;
      this.videoId = videoId;
      this.openedFor = openedFor;
      this.contentType = contentType;
    },
    setFile(e, key) {
      const files = e.target.files;

      if (!files.length) return;

      this.tournament[key] = files[0];
    },
    getVideo() {
      this.tournament.vid_cover_main = this.$refs.vid_cover_main.files[0];
    },
    checkDatesSequence() {
      if (
        isDatesInProperSequence(
          this.tournament.register_start_at,
          this.tournament.register_end_at
        ) === false ||
        isDatesInProperSequence(
          this.tournament.register_end_at,
          this.tournament.kick_off_date
        ) === false
      ) {
        this.notifyVue("Please insert dates in proper sequence", "danger");
      }
    },
    saveData: async function(saveFunction, successMessage) {
      if (
        isDatesInProperSequence(
          this.tournament.register_start_at,
          this.tournament.register_end_at
        ) === false ||
        isDatesInProperSequence(
          this.tournament.register_end_at,
          this.tournament.kick_off_date
        ) === false
      ) {
        this.notifyVue("Please insert dates in proper sequence", "danger");
      } else if (this.tournament.region_id === "-1") {
        this.errors = {
          ...this.errors,
          region_id: "Please choose proper region"
        };
        this.notifyVue("Please choose proper region", "danger");
      } else if (this.tournament.platform_id === "-1") {
        this.errors = {
          ...this.errors,
          platform_id: "Please choose proper platform"
        };
        this.notifyVue("Please choose proper platform", "danger");
      } else if (this.tournament.game_id === "-1") {
        this.errors = { ...this.errors, game_id: "Please choose proper game" };
        this.notifyVue("Please choose proper game", "danger");
      } else if (this.tournament.event_id === "-1") {
        this.errors = {
          ...this.errors,
          event_id: "Please choose proper event"
        };
        this.notifyVue("Please choose proper event", "danger");
      } else {
        this.errors = {};
        this.CTAClicked = true;
        let formData = new FormData();
        formData.append("initial_title", this.tournament.initial_title);
        formData.append("final_title", this.tournament.final_title);
        formData.append(
          "initial_description",
          this.tournament.initial_description
        );
        formData.append("final_description", this.tournament.final_description);
        formData.append("format", this.tournament.format);
        formData.append("register_link", this.tournament.register_link);
        formData.append("winner", this.tournament.winner);
        formData.append("schedule_title", this.tournament.schedule_title);
        formData.append("price", this.tournament.price);
        formData.append("register_start_at", this.tournament.register_start_at);
        formData.append("register_end_at", this.tournament.register_end_at);
        formData.append("kick_off_date", this.tournament.kick_off_date);
        formData.append("cover_type", this.tournament.cover_type);
        formData.append("region_id", this.tournament.region_id);
        formData.append("platform_id", this.tournament.platform_id);
        formData.append("game_id", this.tournament.game_id);
        formData.append("event_id", this.tournament.event_id);
        formData.append("show_sponsors", this.tournament.show_sponsors ? 1 : 0);
        formData.append("enabled", this.tournament.enabled ? 1 : 0);
        formData.append("has_rules", this.tournament.has_rules ? 1 : 0);
        formData.append(
          "has_cover_over",
          this.tournament.has_cover_over ? 1 : 0
        );
        formData.append("rules", JSON.stringify(this.tournament.rules));
        formData.append("contacts", JSON.stringify(this.tournament.contacts));
        formData.append("img_logo", this.tournament.img_logo);
        formData.append("img_cover_over", this.tournament.img_cover_over);
        formData.append("img_schedule", this.tournament.img_schedule);
        formData.append("img_card", this.tournament.img_card);
        formData.append("vid_stream", this.tournament.vid_stream);
        formData.append("vid_cover_main", this.tournament.vid_cover_main);

        for (var i = 0; i < this.$refs.img_cover_main.files.length; i++) {
          let file = this.$refs.img_cover_main.files[i];
          formData.append("img_cover_main[]", file);
        }

        try {
          store.commit(types.home.mutations.SET_SPINNER_FLAG, true);

          if (this.operation === "Edit Tournament")
            await saveFunction(this.editData.id, formData);
          else await saveFunction(formData);

          store.commit(types.home.mutations.SET_SPINNER_FLAG, false);
          this.notifyVue(successMessage, "success");
          this.$router.push("/dashboard/tournaments/list");
        } catch (error) {
          this.errors = { ...error.data.errors };
          Object.keys(error.data.errors).forEach(err => {
            const errorMessage = error.data.errors[err][0];
            this.notifyVue(errorMessage, "danger");
            this.errors = { ...this.errors, [err]: errorMessage };
          });
          store.commit(types.home.mutations.SET_SPINNER_FLAG, false);
        }
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
    removeImage: async function() {
      const payload = { tournamentId: this.editData.id, imageId: this.imageId };
      const response = await this.deleteImage(payload);

      switch (this.openedFor) {
        case "img_logo":
          this.editData.images.img_logo = null;
          break;

        case "img_card":
          this.editData.images.img_card = null;
          break;

        case "img_cover_over":
          this.editData.images.img_cover_over = null;
          break;

        case "img_schedule":
          this.editData.images.img_schedule = null;
          break;

        case "img_cover_main":
          this.editData.images.img_cover_main.splice(this.imageIndex, 1);
          break;

        case "vid_cover_main":
          this.editData.videos.vid_cover_main = null;
          break;

        default:
          break;
      }

      this.notifyVue("Image Deleted Successfully", "success");
      this.setImageDataFlag(false);
      store.commit(types.home.mutations.SET_SPINNER_FLAG, false);
    },
    removeVideo: async function() {
      const payload = { tournamentId: this.editData.id, videoId: this.videoId };

      const response = await this.deleteVideo(payload);

      switch (this.openedFor) {
        case "vid_cover_main":
          this.editData.videos.vid_cover_main = null;
          break;

        default:
          break;
      }

      this.notifyVue("Video Deleted Successfully", "success");
      this.setVideoDataFlag(false);
      store.commit(types.home.mutations.SET_SPINNER_FLAG, false);
    }
  },
  computed: {
    ...mapState({
      isSummitsListFetched: state => state.summits.isSummitsListFetched,
      isDashboardRegionsDataFetched: state =>
        state.regions.isDashboardRegionsDataFetched,
      isDashboardPlatformsDataFetched: state =>
        state.platforms.isDashboardPlatformsDataFetched,
      isDashboardGamesDataFetched: state =>
        state.games.isDashboardGamesDataFetched,
      isEventsListFetched: state => state.events.isEventsListFetched,
      regionsListData: state => state.regions.dashboardRegionsData,
      platformsListData: state => state.platforms.dashboardPlatformsData,
      gamesListData: state => state.games.dashboardGamesData,
      eventsListData: state => state.events.eventsList,
      eventCoverTypes: state => state.events.eventCoverTypes,
      isEventCoverTypesFetched: state => state.events.isEventCoverTypesFetched
    }),
    // minDate() {
    //   var today = new Date();
    //   var date =
    //     today.getFullYear() +
    //     "-" +
    //     ("0" + (today.getMonth() + 1)).slice(-2) +
    //     "-" +
    //     today.getDate();
    //   return date;
    // },
    showFormWhenDataFetched() {
      if (this.operation !== "Edit Tournament")
        return (
          this.isDashboardRegionsDataFetched &&
          this.isDashboardPlatformsDataFetched &&
          this.isDashboardGamesDataFetched &&
          this.isEventsListFetched &&
          this.isSummitsListFetched &&
          this.isEventCoverTypesFetched
        );
      return true;
    }
  },
  beforeMount() {
    if (
      !this.$router.history.current.params.data &&
      this.$route.name === "Edit Tournament"
    )
      this.$router.push({
        path: "/dashboard/tournaments"
      });
  },
  mounted() {
    store.commit(types.home.mutations.SET_SPINNER_FLAG, true);
    this.fetchRegionsList();
    this.fetchPlatformsList();
    this.fetchGamesList();
    this.fetchEventsList();
    this.fetchSummitsList();
    this.fetchCoverTypes();
    if (this.$route.name === "Edit Tournament") {
      this.tournament.initial_title = this.editData.initial_title || "";
      this.tournament.final_title = this.editData.final_title || "";
      this.tournament.initial_description =
        this.editData.initial_description || "";
      this.tournament.final_description = this.editData.final_description || "";
      this.tournament.format = this.editData.format || "";
      this.tournament.register_link = this.editData.register_link || "";
      this.tournament.winner = this.editData.winner || "";
      this.tournament.schedule_title = this.editData.schedule_title || "";
      this.tournament.price = this.editData.price || 0;
      this.tournament.register_start_at = this.editData.register_start_at.split(
        " "
      )[0];
      this.tournament.register_end_at = this.editData.register_end_at.split(
        " "
      )[0];
      this.tournament.kick_off_date = this.editData.kick_off_date.split(" ")[0];
      this.tournament.cover_type = this.editData.cover_type;
      this.tournament.region_id =
        this.editData.region !== null ? this.editData.region.id : "-1";
      this.tournament.platform_id =
        this.editData.platform !== null ? this.editData.platform.id : "-1";
      this.tournament.game_id =
        this.editData.game !== null ? this.editData.game.id : "-1";
      this.tournament.event_id =
        this.editData.event !== null ? this.editData.event.id : "-1";
      this.tournament.show_sponsors = this.editData.show_sponsors;
      this.tournament.enabled = this.editData.enabled;
      this.tournament.has_rules = this.editData.has_rules;
      this.tournament.has_cover_over = this.editData.has_cover_over;
      this.tournament.rules = this.editData.rule;
      this.tournament.contacts = this.editData.contact;
      this.tournament.img_logo = this.editData.images.img_logo;
      this.tournament.img_cover_over = this.editData.images.img_cover_over;
      this.tournament.img_schedule = this.editData.images.img_schedule;
      this.tournament.img_card = this.editData.images.img_card;

      this.tournament.vid_stream =
        (this.editData.videos.vid_stream !== null &&
          this.editData.videos.vid_stream.path) ||
        "";
      this.tournament.vid_cover_main =
        (this.editData.videos.vid_cover_main !== null &&
          this.editData.videos.vid_cover_main.path) ||
        "";
    }
  },
  updated() {
    if (
      this.isDashboardRegionsDataFetched &&
      this.isDashboardPlatformsDataFetched &&
      this.isDashboardGamesDataFetched &&
      this.isEventsListFetched &&
      this.isSummitsListFetched &&
      !this.CTAClicked
    )
      store.commit(types.home.mutations.SET_SPINNER_FLAG, false);
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/sass/website/color-palette.scss";

.custom-control-input:checked ~ .custom-control-label::before {
  border-color: $primary !important;
  background-color: $primary !important;
}
.image-preview-list {
  display: flex;
  width: 100%;
  overflow-x: auto;
  &::-webkit-scrollbar {
    background-color: $accent !important;
    border-radius: 20px !important;
  }
  &::-webkit-scrollbar-thumb {
    background-color: $primary !important;
    border-radius: 20px !important;
  }
}
</style>
