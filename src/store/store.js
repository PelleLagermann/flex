import dayjs from 'dayjs';
import firebase from 'firebase';
import Vue from 'vue';
import Vuex from 'vuex';
import registrationsModule from './modules/registrations-module';
import userModule from './modules/user-module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    registrations: registrationsModule,
    user: userModule,
  },
  state: {
    activeDate: dayjs(new Date()),
    menuHasBeenOpened: false,
    menuOpen: null,
    showAddRegistration: false,
    currentUser: {},
    snackbars: []
  },
  getters: {
    loadingData(state) {
      return state.user.userDataLoading || 
             state.registrations.userRegistrationsLoading;
    }
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
    toggleAddRegistration(state, payload) {
      if (payload && payload.forceOpen) {
        state.showAddRegistration = true;
      } else if (payload && payload.forceClose) {
        state.showAddRegistration = false;
      } else {
        state.showAddRegistration = !state.showAddRegistration;
      }
    }
  },
  actions: {

  },
});
