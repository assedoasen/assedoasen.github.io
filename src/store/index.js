import Vue from 'vue';
import Vuex from 'vuex';
import { createModule } from 'vuex-toast';
import { ADD_TOAST_MESSAGE } from 'vuex-toast';
import 'vuex-toast/dist/vuex-toast.css';
import $helpers from '@/utils/helpers';

Vue.use(Vuex);

const debug = process.env.VUE_APP_ENV !== 'production';

const state = {
  fullScreenPreview: null,
  user: null,
};

export default new Vuex.Store({
  modules: {
    toast: createModule({
      dismissInterval: 8000,
    }),
  },
  strict: debug,
  state,
  mutations: $helpers.mutationMapper(state),
  actions: {
    setUser({ commit }, payload) {
      commit('setUser', payload);
    },
    setFullScreenPreview({ commit }, payload) {
      commit('setFullScreenPreview', payload);
    },
    informUserSuccess({ dispatch }, text) {
      dispatch(ADD_TOAST_MESSAGE, {
        text,
        type: 'success',
        dismissAfter: 10000,
      });
    },
    informUserError({ dispatch }, text) {
      dispatch(ADD_TOAST_MESSAGE, {
        text,
        type: 'danger',
        dismissAfter: 10000,
      });
    },
    informUserInfo({ dispatch }, text) {
      dispatch(ADD_TOAST_MESSAGE, {
        text,
        type: 'info',
        dismissAfter: 10000,
      });
    },
  },
});
