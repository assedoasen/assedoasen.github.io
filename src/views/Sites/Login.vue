<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form @submit.prevent="login">
                  <h1>Login</h1>
                  <p class="text-muted">Sign in to your account</p>
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
                      autocomplete="username login"
                      v-model="loginName"
                    />
                  </b-input-group>
                  <b-input-group class="mb-3">
                    <b-input-group-prepend>
                      <b-input-group-text>
                        <i class="fa fa-lock"></i>
                      </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                      type="password"
                      class="form-control"
                      placeholder="Password"
                      autocomplete="current-password"
                      v-model="password"
                    />
                  </b-input-group>
                  <b-row>
                    <b-col cols="12" class="text-right">
                      <router-link :to="{ name: `Forgot` }">Forgot password?</router-link>
                    </b-col>
                  </b-row>
                  <b-row class="mb-3 align-items-center justify-start">
                    <b-col md="6">
                      <b-button
                        id="login-button"
                        variant="primary"
                        class="px-4"
                        type="submit"
                        :disabled="submitButtonDisabled"
                      >Login</b-button>
                    </b-col>
                    <p v-if="submitButtonDisabled">Login initiated...</p>
                  </b-row>
                  <b-row>
                    <b-col>
                      or <router-link :to="{ name: `Register` }">Sign Up now!</router-link>
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
import auth from "../../auth";

export default {
  name: "Login",
  data() {
    return {
      loginName: "",
      password: "",
      submitButtonDisabled: false,
    };
  },
  created() {
    const result = auth.loggedIn()
      .then(response => {
        if (response.status === 200) {
          return response.data;
        }
      })
      .catch(error => {
        return false;
      });

    if (result && result.id) {
      return this.$router.replace(this.$route.query.redirect || "/");
    }
  },
  computed: {
    siteName() {
      return process.env.VUE_APP_APP_TITLE;
    },
  },
  methods: {
    login() {
      if (!this.loginName || !this.password) {
        return this.$store.dispatch("informUserError", "Please make sure all fields are filled in!");
      }

      this.submitButtonDisabled = true;

      auth.login(this.loginName, this.password, (loggedIn) => {
        if (!loggedIn) {
          this.submitButtonDisabled = false;
        } else {
          this.$router.replace(this.$route.query.redirect || "/");
        }
      });
    },
  },
};
</script>
