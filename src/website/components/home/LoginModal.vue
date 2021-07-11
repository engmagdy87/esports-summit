<template>
  <div
    class="login-modal"
    :style="showFlag ? 'display:block' : 'display:none'"
    @click.self.prevent="closeModal"
  >
    <!-- Modal content -->
    <div
      class="login-modal-content is-view--desktop"
      @click="
        e => {
          e.stopPropagation();
        }
      "
    >
      <div class="login-modal-header">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Login</h2>
      </div>
      <div class="login-modal-body">
        <form>
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="login-username"
              aria-describedby="usernameHelp"
              placeholder="Enter Username"
              v-model="username"
              :class="[
                'form-control',
                errors.username !== undefined ? 'is-invalid' : '',
                errors.username === undefined ? 'registeration-style' : ''
              ]"
              v-on:keyup.enter="onEnter"
            />
            <p class="error-message" v-if="errors.username !== undefined">
              {{ errors.username }}
            </p>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="login-password"
              placeholder="Enter Password"
              v-model="password"
              :class="[
                'form-control',
                errors.password !== undefined ? 'is-invalid' : '',
                errors.password === undefined ? 'registeration-style' : ''
              ]"
              v-on:keyup.enter="onEnter"
            />
            <p class="error-message" v-if="errors.password !== undefined">
              {{ errors.password }}
            </p>
          </div>
          <a href="/forgot">
            Forgot Password?
          </a>
          <button
            type="button"
            class="btn btn-primary float-right"
            @click="getUserPersona"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    <div class="is-view--mobile">
      <span class="close" @click="closeModal">&times;</span>
      <div class="is-view--mobile__content">
        <ClippedBox>
          <div class="login-modal-header">
            <h2>Login</h2>
          </div>
          <div class="login-modal-body">
            <form>
              <label for="username" style="font-size:24px">Username</label>
              <div class="form-group-mobile">
                <div></div>
                <input
                  type="text"
                  id="login-username"
                  aria-describedby="usernameHelp"
                  placeholder="Enter Username"
                  v-model="username"
                  :class="[
                    'form-control',
                    errors.username !== undefined ? 'is-invalid' : '',
                    errors.username === undefined ? 'registeration-style' : ''
                  ]"
                  v-on:keyup.enter="onEnter"
                />
                <p class="error-message" v-if="errors.username !== undefined">
                  {{ errors.username }}
                </p>
              </div>
              <label for="password" style="font-size:24px">Password</label>
              <div class="form-group-mobile">
                <div></div>
                <input
                  type="password"
                  id="login-password"
                  placeholder="Enter Password"
                  v-model="password"
                  :class="[
                    'form-control',
                    errors.password !== undefined ? 'is-invalid' : '',
                    errors.password === undefined ? 'registeration-style' : ''
                  ]"
                  v-on:keyup.enter="onEnter"
                />
                <p class="error-message" v-if="errors.password !== undefined">
                  {{ errors.password }}
                </p>
              </div>
              <div class="actions">
                <a href="/forgot" style="color: #2af3f3">
                  Forgot Password?
                </a>
                <button
                  type="button"
                  class="btn btn-primary float-right"
                  @click="getUserPersona"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </ClippedBox>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import store from "../../../store/index";
import types from "../../../store/types";
import ClippedBox from "../../shared/ClippedBox";
import { setUserCookie } from "../../../website/helpers/CookieHelper";

export default {
  data() {
    return {
      username: "",
      password: "",
      errors: {}
    };
  },
  props: ["showFlag", "setShowLoginModal"],
  methods: {
    ...mapActions({
      fetchUserPersona: types.user.actions.FETCH_USER_PERSONA
    }),
    ...mapMutations({
      setUserVerificationStatus: types.user.mutations.SET_VERIFIED_USER_STATUS
    }),
    notifyVue(message, color) {
      this.$notifications.notify({
        message: `<span>${message}</span>`,
        horizontalAlign: "right",
        verticalAlign: "top",
        type: color
      });
    },

    async getUserPersona() {
      const payload = { username: this.username, password: this.password };
      try {
        const data = await this.fetchUserPersona(payload);
        if (!data.user.email_verified_at) {
          this.setUserVerificationStatus({
            status: false,
            email: data.user.email
          });
        } else {
          this.setUserVerificationStatus({
            status: true,
            email: data.user.email
          });
          setUserCookie(data);
          store.commit(types.home.mutations.SET_SPINNER_FLAG, false);
          this.username = "";
          this.password = "";
          this.errors = {};
          this.notifyVue("Successful Login", "success");
        }
        this.setShowLoginModal(false);
      } catch (error) {
        if (
          error.data.errors !== undefined &&
          error.data.message === undefined
        ) {
          this.errors = { ...error.data.errors };
          Object.keys(error.data.errors).forEach(err => {
            const errorMessage = error.data.errors[err][0];
            this.notifyVue(errorMessage, "danger");
            this.errors = { ...this.errors, [err]: errorMessage };
          });
        } else {
          this.notifyVue(
            "Username or Password is incorrect, Please try again!",
            "danger"
          );
        }
        store.commit(types.home.mutations.SET_SPINNER_FLAG, false);
      }
    },
    closeModal() {
      this.setShowLoginModal(false);
      this.username = "";
      this.password = "";
      this.errors = {};
    },
    onEnter() {
      this.getUserPersona();
    }
  },
  components: {
    ClippedBox
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/sass/website/components/home/login-modal.scss";
</style>
