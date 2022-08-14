<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form @submit.prevent="signUp">
                  <h1>Sign Up</h1>
                  <p class="text-muted">Create your brand-new account</p>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="fa fa-user"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      autocomplete="off"
                      v-model="loginName"
                    />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="fa fa-lock"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="password"
                      class="form-control"
                      placeholder="Password"
                      autocomplete="off"
                      v-model="password"
                    />
                  </b-input-group>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="fa fa-user"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="text"
                      class="form-control"
                      placeholder="Your full name"
                      autocomplete="off"
                      v-model="fullName"
                    />
                  </b-input-group>
                  <b-row class="mb-3">
                    <b-col md="6">
                      <b-button
                        id="register-button"
                        variant="primary"
                        class="px-4"
                        type="submit"
                        :disabled="submitButtonDisabled"
                      >Sign Up</b-button>
                    </b-col>
                    <p v-if="submitButtonDisabled">Signing you up...</p>
                  </b-row>
                  <b-row>
                    <b-col>
                      or <router-link :to="{ name: `Login` }">go back to the Login Page</router-link>
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
  name: "Register",
  data() {
    return {
      id: "",
      loginName: "",
      password: "",
      fullName: "",
      submitButtonDisabled: false,
    };
  },
  computed: {
    siteName() {
      return process.env.VUE_APP_APP_TITLE;
    },
  },
  methods: {
    async signUp() {
      if (!this.loginName || !this.password || !this.fullName) {
        return this.$store.dispatch("informUserError", "Please make sure all fields are filled in!");
      }

      this.submitButtonDisabled = true;

      const result = await axios
        .post(
          `${process.env.VUE_APP_SERVER_URL}/user/sign-up`,
          {
            "login": this.loginName,
            "password": this.password,
            "fullname": this.fullName
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

      this.submitButtonDisabled = false;

      if (result && result.id) {
        this.$store.dispatch("informUserSuccess", "You have successfully signed up! Now you can login");
        return this.$router.push({ name: `Login` });
      } else {
        if (result) {
          this.$store.dispatch("informUserError", result);
        } else {
          this.$store.dispatch("informUserError", "Oops! Something went wrong! Please try again");
        }
      }
    },
  },
};
</script>
