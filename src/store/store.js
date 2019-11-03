import dayjs from 'dayjs';
import firebase from 'firebase';
import Vue from 'vue';
import Vuex from 'vuex';
import registrationsModule from './modules/registrations-module';
import settingsModule from './modules/settings-module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    registrations: registrationsModule,
    settings: settingsModule,
  },
  state: {
    activeDate: dayjs(new Date()),
    menuHasBeenOpened: false,
    menuOpen: null,
    currentUser: {},
    snackbars: []
  },
  mutations: {
    setCurrentUser(state) {
      state.currentUser = firebase.auth().currentUser;
    },
    addSnackbar(state, snackbar) {
      /*
        snackbar : {
          message: '...',
          action: '...',
          handler. function() { ... },
          type: '...' //['info', 'success', 'warning', 'error']
        }
      */
      const newSnackbar = Object.assign(snackbar, {
        key: performance.now() + ''
      });      
      
      setTimeout(() => {
        state.snackbars.unshift(newSnackbar);
      }, snackbar.delay || 0);      
      
      setTimeout(function () {
        state.snackbars.pop();
      }, 5000);
    },
    setActiveDate(state, dateStr) {
      state.activeDate = dayjs(dateStr);
    },
    toggleMenu(state, payload) {
      if (payload && payload.forceOpen) {
        state.menuOpen = true;
      } else if (payload && payload.forceClose) {
        state.menuOpen = false;
      } else {
        state.menuOpen = !state.menuOpen;
      }

      if (state.menuOpen) {
        state.menuHasBeenOpened = true;
      }
    },
  },
  actions: {

  },
});
