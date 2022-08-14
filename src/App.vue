<template>
  <div>
    <router-view />
    <toast position="ne"></toast>
    <FullScreenPreview v-if="$store.state.fullScreenPreview" />
  </div>
</template>

<script>
import { Toast } from "vuex-toast";
import FullScreenPreview from "@/components/FullScreenPreview";

export default {
  name: "app",
  metaInfo: {
    title: "No Page",
    titleTemplate: "%s | Simple Login"
  },
  components: {
    Toast,
    FullScreenPreview,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import "~bootstrap-vue/dist/bootstrap-vue.css";
@import "assets/scss/style";

/* Import Font Awesome Icons Set */
$fa-font-path: "~font-awesome/fonts/";
@import "~font-awesome/scss/font-awesome.scss";

html,
body {
  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
  background-color: #e4e5e6;
}
</style>
