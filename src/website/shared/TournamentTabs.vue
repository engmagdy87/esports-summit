<template>
  <div>
    <nav class="is-view--desktop">
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
        <div
          class="col-lg-4 d-flex align-items-center justify-content-end tab-pane__custom-button-wrapper"
          role="button"
        >
          <div
            class="tab-pane__custom-button-wrapper__outside"
            @click="redirectTo"
          >
            REGISTER
          </div>
        </div>
      </div>
    </nav>
    <div class="tab-content is-view--desktop" id="nav-tabContent">
      <div class="upper-segment"></div>
      <div
        v-if="activeTabIndex === 0"
        :class="['tab-pane fade', activeTabIndex === 0 ? 'show active' : '']"
        id="nav-home"
        role="tabpanel"
        aria-labelledby="nav-home-tab"
      >
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-2">
              <img
                v-if="data.images.img_logo !== null"
                :src="data.images.img_logo.path"
                :alt="data.initial_title + 'background'"
                class="tab-wrapper__details__img"
              />
            </div>
            <div class="col-12 col-md-10">
              <div class="row">
                <div class="col-12 col-md-9">
                  <div class="row d-flex">
                    <h1 class="tab-wrapper__details__title">
                      {{ data.initial_title }}
                    </h1>
                    <span class="tab-wrapper__details__format">
                      {{ data.format }}
                    </span>
                  </div>
                  <div class="row d-flex mt-1 mb-1">
                    <span class="tab-wrapper__details__platform">
                      {{ data.platform }}
                    </span>
                    -
                    <span class="tab-wrapper__details__region">
                      {{ data.region }}
                    </span>
                  </div>
                  <div class="row">
                    <span
                      class="badge badge-pill badge-secondary tab-wrapper__details__kick-off"
                      ><img
                        src="/website/img/calendar.svg"
                        alt="calendar icon"
                      />
                      <span>{{ data.kick_off_date.split(" ")[0] }}</span></span
                    >
                  </div>
                </div>
                <div class="col-12 col-md-3 tab-wrapper__details__register">
                  <div :class="getCSSClass(data.register_status)"></div>
                  <span v-if="data.register_status === 'open'"
                    >Registeration is now open</span
                  >
                  <span v-else-if="data.register_status === 'closed'"
                    >Register was closed</span
                  >
                  <span v-else-if="data.register_status === 'soon'"
                    >Register coming soon</span
                  >
                </div>
              </div>
              <div class="row">
                <div class="col-12" style="padding:0">
                  <div
                    class="tab-wrapper__details__description"
                    v-html="data.initial_description"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="activeTabIndex === 1"
        :class="['tab-pane fade', activeTabIndex === 1 ? 'show active' : '']"
        id="nav-profile"
        role="tabpanel"
        aria-labelledby="nav-profile-tab"
      >
        <h3 :class="isRuleTitleArabicText ? 'tab-title--ar' : 'tab-title--en'">
          {{ data.rules.title }}
        </h3>
        <div class="description-container" v-html="data.rules.content"></div>
      </div>
      <div
        v-if="activeTabIndex === 2"
        :class="['tab-pane fade', activeTabIndex === 2 ? 'show active' : '']"
        id="nav-contact"
        role="tabpanel"
        aria-labelledby="nav-contact-tab"
      >
        <div class="row">
          <div class="col-12">
            <h3 class="pl-3">{{ data.schedule_title }}</h3>
          </div>
          <div class="col-12">
            <img
              v-if="data.images.img_schedule !== null"
              :src="data.images.img_schedule.path"
              :alt="data.schedule_title + 'background'"
              class="w-100 p-3"
            />
          </div>
        </div>
      </div>
      <div
        v-if="activeTabIndex === 3"
        :class="['tab-pane fade', activeTabIndex === 3 ? 'show active' : '']"
        id="nav-contact"
        role="tabpanel"
        aria-labelledby="nav-contact-tab"
      >
        <div
          class="row"
          v-if="
            data.streaming !== null &&
              data.streaming.path !== null &&
              data.streaming.path !== ''
          "
        >
          <div
            :class="[
              'col-12 ',
              getLiveVideoChatEmbedUrl(data.streaming.path) ? 'col-md-8' : ''
            ]"
          >
            <iframe
              width="100%"
              :height="getVideoHeight(data.streaming.path)"
              :src="getLiveVideoEmbedUrl(data.streaming.path)"
              frameborder="0"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            >
            </iframe>
          </div>
          <div
            class="col-12 col-md-4"
            v-if="
              getLiveVideoChatEmbedUrl(data.streaming.path) &&
                isChatVisible(data.streaming.path)
            "
          >
            <iframe
              scrolling="<scrolling>"
              width="100%"
              :height="data.streaming.path.includes('facebook') ? 700 : 500"
              :src="getLiveVideoChatEmbedUrl(data.streaming.path)"
              frameborder="0"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            >
            </iframe>
          </div>
        </div>

        <h3 v-else>There is no streaming now</h3>
      </div>
      <div
        v-if="activeTabIndex === 4"
        :class="['tab-pane fade', activeTabIndex === 4 ? 'show active' : '']"
        id="nav-contact"
        role="tabpanel"
        aria-labelledby="nav-contact-tab"
      >
        <h3
          :class="isContactTitleArabicText ? 'tab-title--ar' : 'tab-title--en'"
        >
          {{ data.contacts.title }}
        </h3>
        <div class="description-container" v-html="data.contacts.content"></div>
      </div>
      <div class="lower-segment">
        <div class="lower-segment--right"></div>
        <div class="lower-segment--left"></div>
      </div>
    </div>
    <!-- ************************** -->
    <div class="clipped-section-tabs is-view--mobile">
      <nav>
        <div class="nav" id="nav-tab" role="tablist" style="flex-wrap: nowrap;">
          <a
            v-for="(tab, index) in tabs"
            :key="index"
            :class="[
              'upper-segment-tabs',
              activeTabIndex === index ? 'active' : ''
            ]"
            id="nav-home-tab"
            data-toggle="tab"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
            @click="selectClickAction(tab, index)"
          >
            <div
              class="clipped-section-tabs__top-right-corner"
              v-if="activeTabIndex === index"
            />
            {{ tab }}</a
          >
          <!-- <div
            class="col-lg-4 d-flex align-items-center justify-content-end tab-pane__custom-button-wrapper"
            role="button"
          >
            <div
              class="tab-pane__custom-button-wrapper__outside"
              @click="redirectTo"
            >
              REGISTER
            </div>
          </div> -->
          <div class="upper-segment-tabs__mask"></div>
        </div>
      </nav>
      <div class="body-tabs">
        <div class="segment upper-segment-tabs-main" />
        <div class="clipped-section-tabs__top-right-corner-main" />
        <div
          :class="
            `body-tabs__top-clipped--right body-tabs__top-clipped--right--tab${activeTabIndex +
              1}`
          "
        ></div>
        <div
          :class="
            `body-tabs__top-clipped--left body-tabs__top-clipped--left--tab${activeTabIndex +
              1}`
          "
        ></div>
        <div
          v-if="activeTabIndex === 0"
          :class="['tab-pane fade', activeTabIndex === 0 ? 'show active' : '']"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          <div class="container grid-view__container">
            <div class="row grid-view__row">
              <div class="col-4 col-md-2 grid-view__col">
                <img
                  v-if="data.images.img_logo !== null"
                  :src="data.images.img_logo.path"
                  :alt="data.initial_title + 'background'"
                  class="tab-wrapper__details__img"
                />
              </div>
              <div class="col-8 col-md-10 tab-wrapper__details__content">
                <div class="row">
                  <div class="col-12 col-md-9">
                    <div class="row d-flex">
                      <h1 class="tab-wrapper__details__title">
                        {{ data.initial_title }}
                      </h1>
                      <span class="tab-wrapper__details__format">
                        {{ data.format }}
                      </span>
                    </div>
                    <div class="row d-flex mt-1 mb-1">
                      <span class="tab-wrapper__details__platform">
                        {{ data.platform }}
                      </span>
                      -
                      <span class="tab-wrapper__details__region">
                        {{ data.region }}
                      </span>
                    </div>
                    <div class="row">
                      <span
                        class="badge badge-pill badge-secondary tab-wrapper__details__kick-off"
                        ><img
                          src="/website/img/calendar.svg"
                          alt="calendar icon"
                        />
                        <span>{{
                          data.kick_off_date.split(" ")[0]
                        }}</span></span
                      >
                    </div>
                  </div>
                  <div class="col-12 col-md-3 tab-wrapper__details__register">
                    <div :class="getCSSClass(data.register_status)"></div>
                    <span v-if="data.register_status === 'open'"
                      >Registeration is now open</span
                    >
                    <span v-else-if="data.register_status === 'closed'"
                      >Register was closed</span
                    >
                    <span v-else-if="data.register_status === 'soon'"
                      >Register coming soon</span
                    >
                  </div>
                </div>
                <div class="row">
                  <div class="col-12" style="padding:0">
                    <div
                      class="tab-wrapper__details__description"
                      v-html="data.initial_description"
                    ></div>
                  </div>
                </div>
                <div class="register__custom-button-wrapper float-right">
                  <div class="register__custom-button-wrapper__mask"></div>
                  <div
                    class="register__custom-button-wrapper__outside"
                    role="button"
                    @click="redirectTo"
                  >
                    REGISTER
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="activeTabIndex === 1"
          :class="['tab-pane fade', activeTabIndex === 1 ? 'show active' : '']"
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          <h3
            :class="isRuleTitleArabicText ? 'tab-title--ar' : 'tab-title--en'"
          >
            {{ data.rules.title }}
          </h3>
          <div class="description-container" v-html="data.rules.content"></div>
        </div>
        <div
          v-if="activeTabIndex === 2"
          :class="['tab-pane fade', activeTabIndex === 2 ? 'show active' : '']"
          id="nav-contact"
          role="tabpanel"
          aria-labelledby="nav-contact-tab"
        >
          <div class="row">
            <div class="col-12">
              <h3 class="pl-3">{{ data.schedule_title }}</h3>
            </div>
            <div class="col-12">
              <img
                v-if="data.images.img_schedule !== null"
                :src="data.images.img_schedule.path"
                :alt="data.schedule_title + 'background'"
                class="w-100 p-3"
              />
            </div>
          </div>
        </div>
        <div
          v-if="activeTabIndex === 3"
          :class="['tab-pane fade', activeTabIndex === 3 ? 'show active' : '']"
          id="nav-contact"
          role="tabpanel"
          aria-labelledby="nav-contact-tab"
        >
          <div
            class="row"
            v-if="
              data.streaming !== null &&
                data.streaming.path !== null &&
                data.streaming.path !== ''
            "
          >
            <div
              :class="[
                'col-12 ',
                getLiveVideoChatEmbedUrl(data.streaming.path) ? 'col-md-8' : ''
              ]"
            >
              <iframe
                width="100%"
                :height="getVideoHeight(data.streaming.path)"
                :src="getLiveVideoEmbedUrl(data.streaming.path)"
                frameborder="0"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              >
              </iframe>
            </div>
            <div
              class="col-12 col-md-4"
              v-if="
                getLiveVideoChatEmbedUrl(data.streaming.path) &&
                  isChatVisible(data.streaming.path)
              "
            >
              <iframe
                scrolling="<scrolling>"
                width="100%"
                :height="data.streaming.path.includes('facebook') ? 700 : 500"
                :src="getLiveVideoChatEmbedUrl(data.streaming.path)"
                frameborder="0"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              >
              </iframe>
            </div>
          </div>

          <h3 v-else>There is no streaming now</h3>
        </div>
        <div
          v-if="activeTabIndex === 4"
          :class="['tab-pane fade', activeTabIndex === 4 ? 'show active' : '']"
          id="nav-contact"
          role="tabpanel"
          aria-labelledby="nav-contact-tab"
        >
          <h3
            :class="
              isContactTitleArabicText ? 'tab-title--ar' : 'tab-title--en'
            "
          >
            {{ data.contacts.title }}
          </h3>
          <div
            class="description-container"
            v-html="data.contacts.content"
          ></div>
        </div>
      </div>
      <div class="segment lower-segment-tabs" />
      <div class="clipped-section-tabs__bottom-left-corner" />
      <div class="clipped-section-tabs__bottom-right-corner" />
    </div>
    <!-- ************************** -->
  </div>
</template>

<script>
import redirectToNewTab from "../helpers/RedirectToNewTab";
import isDeviceSmart from "../helpers/DetectIsDeviceSmart";
import { changeTextDirection } from "../helpers/StringsHelper";
import {
  liveVideoEmbedFormatter,
  liveVideoChatEmbedFormatter
} from "../../dashboard/helpers/LiveVideoEmbedFormater";

export default {
  props: ["data", "redirectTo"],
  data() {
    return {
      activeTabIndex: 0,
      tabs: ["Details", "Rules Book", "Schedule", "Streaming", "Contacts"]
    };
  },
  methods: {
    setActiveTabIndex(index) {
      this.activeTabIndex = index;
    },
    selectClickAction(tab, index) {
      tab === "Rules Book" && !this.data.has_rules
        ? () => {}
        : this.setActiveTabIndex(index);
    },
    getCSSClass(status) {
      if (status === "open") return "tab-wrapper__details__register--open";
      if (status === "closed") return "tab-wrapper__details__register--closed";
      if (status === "soon") return "tab-wrapper__details__register--soon";
    },
    getVideoHeight(path) {
      if (isDeviceSmart() && path.includes("facebook")) return 180;
      if (!isDeviceSmart() && path.includes("facebook")) return 650;
      if (isDeviceSmart() && !path.includes("facebook")) return 200;
      if (!isDeviceSmart() && !path.includes("facebook")) return 500;
    },
    getLiveVideoEmbedUrl(url) {
      return liveVideoEmbedFormatter(url);
    },
    getLiveVideoChatEmbedUrl(url) {
      return liveVideoChatEmbedFormatter(url);
    },
    isChatVisible(url) {
      return !(isDeviceSmart() && !url.includes("twitch"));
    }
  },
  updated() {
    redirectToNewTab("description-container");
  },
  computed: {
    isRuleTitleArabicText() {
      return changeTextDirection(this.data.rules.title);
    },
    isContactTitleArabicText() {
      return changeTextDirection(this.data.contacts.title);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/sass/website/shared/tabs.scss";
.tab-title {
  &--ar {
    text-align: right;
  }
  &--en {
    text-align: left;
  }
}
</style>
