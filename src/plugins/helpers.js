import helpers from "@/utils/helpers"

export default {
  install(Vue) {
    Vue.prototype.$helpers = helpers
    Vue.$helpers = helpers
  }
}
