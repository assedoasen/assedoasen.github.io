import axios from "axios";
import store from "@/store";

const APP_SERVER_URL = process.env.VUE_APP_SERVER_URL;
const APP_SERVER_KEY = process.env.VUE_APP_SERVER_KEY;

export default {
  login(loginName, password, cb) {
    cb = arguments[arguments.length - 1];
    if (localStorage.token) {
      if (cb) cb(true);
      return;
    }

    axios
      .post(
        `${APP_SERVER_URL}/user/login`,
        {
          login: loginName,
          password: password,
        },
        {
          headers: {
            "app-key": APP_SERVER_KEY,
          },
        }
      )
      .then(response => {
        if (response.status === 200 && response.data && response.data.access_token) {
          localStorage.token = response.data.access_token;

          if (cb) {
            cb(true);
          }
        }
      })
      .catch(error => {
        if (cb) {
          cb(false);
        }
      });
  },

  logout() {
    // we always logout from this app, no matter if logout on api was successfull or not
    delete localStorage.token;

    return true;
  },

  async loggedIn() {
    if (!localStorage.token) {
      store.dispatch("setUser", null);
      return false;
    }

    const result = await axios
      .get(
        `${APP_SERVER_URL}/user/me`,
        {
          headers: {
            "access-token": localStorage.token
          },
        }
      )
      .then(response => {
        if (response.status === 200) {
          return response.data;
        }
      })
      .catch(error => {
        return false;
      });

    if (result.status !== 1) {
      delete localStorage.token;
      store.dispatch("setUser", null);

      return false;
    }

    store.dispatch("setUser", result);

    return !!localStorage.token;
  },
};
