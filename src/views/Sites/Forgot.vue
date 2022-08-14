<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form @submit.prevent="request">
                  <router-link :to="{ name: `Login` }">
                    Back to Login page
                  </router-link>
                  <h1 class="mt-2">Forgot Password?</h1>
                  <p class="text-muted">
                    Enter your Email address to reset the password.
                  </p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="fa fa-user"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="email"
                      class="form-control"
                      placeholder="Email"
                      autocomplete="email"
                      v-model="email"
                    />
                  </b-input-group>
                  <b-row class="pb-10">
                    <b-col cols="6">
                      <b-button
                        id="forgot-button"
                        variant="primary"
                        class="px-4"
                        type="submit"
                        :disabled="submitButtonDisabled"
                      >
                        Reset
                      </b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="d-none d-lg-flex text-white bg-primary py-5">
              <b-card-body class="d-flex flex-column align-items-center justify-content-center">
                <h2>{{ siteName }}</h2>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Forgot",
  data() {
    return {
      email: "",
      submitButtonDisabled: false,
    };
  },
  computed: {
    siteName() {
      return process.env.VUE_APP_APP_TITLE;
    },
  },
  methods: {
    async request() {
      if (!this.email) {
        return this.$store.dispatch("informUserError", "Please enter a valid email address!");
      }

      this.submitButtonDisabled = true;

      // TODO: add /user/reset-password request
      // TODO: Uncomment this when the endpoint is added
      /*
      const result = await axios
        .post(
          `${process.env.VUE_APP_SERVER_URL}/user/reset-password`,
          {
            "email": this.email,
          },
          {
            headers: {
              "app-key": process.env.VUE_APP_SERVER_KEY,
            },
          }
        )
        .then(response => {
          if (response.status === 200) {
            return response.data;
          }
        })
        .catch(error => {
          return error;
        });
      */

      const result = await this.generateFakeSuccess(); // TODO: Remove this line when the endpoint is added

      this.submitButtonDisabled = false;

      if (result && result.success) {
        this.$store.dispatch("informUserSuccess", "Success! Please check your email");
        return this.$router.push({ name: `Login` });
      } else {
        if (result) {
          this.$store.dispatch("informUserError", result);
        } else {
          this.$store.dispatch("informUserError", "Oops! Something went wrong! Please try again");
        }
      }
    },
    // TODO: Remove this method when the endpoint is added
    generateFakeSuccess() {
      return {success: true};
    }
  },
};
</script>
