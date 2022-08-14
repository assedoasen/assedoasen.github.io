<template>
  <div class="app flex-row align-items-center">
    <div class="container" v-if="user">
      <h1>Your Profile</h1>
      <div class="row">
        <div class="col">
          <b-card no-body>
            <b-card-body class="d-flex flex-column align-items-center">
              <div class="text-center h2 mb-3">
                Greetings, <span class="text-primary font-weight-bold">{{ user.fullname }}</span>
              </div>
              <div
                class="image-wrapper position-relative p-1 mb-3 border rounded bg-light"
                @click="$store.dispatch('setFullScreenPreview', user.avatar)"
                title="Click to open full-screen preview"
              >
                <div class="magnify position-absolute rounded-circle bg-white border">
                  <i class="fa fa-search p-2"></i>
                </div>
                <img
                  :src="user.avatar"
                  :alt="`${user.fullname} Login App Image`"
                  class="w-100 h-100"
                />
              </div>
              <b-button
                variant="primary"
                class="px-4"
                @click="logout"
              >
                Logout
              </b-button>
            </b-card-body>
          </b-card>
        </div>
      </div>
    </div>
    <div class="container text-center" v-else>
      <router-link  :to="{ name: `Login` }">Back to Login page</router-link>
    </div>
  </div>
</template>

<script>
import auth from "./../auth";

export default {
  name: "profile",
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    async logout() {
      await auth.logout();
      this.$router.push({ name: `Login` });
    }
  }
}
</script>

<style lang="scss" scoped>
  .image-wrapper {
    width: 200px;
    height: 200px;
    cursor: pointer;

    .magnify {
      top: 10px;
      right: 10px;
    }

    img {
      object-fit: cover;
    }
  }
</style>
