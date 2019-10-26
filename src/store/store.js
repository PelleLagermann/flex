import Vue from 'vue';
import Vuex from 'vuex';
import calendarModule from './modules/calendar-module';
import settingsModule from './modules/settings-module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    calendar: calendarModule,
    settings: settingsModule,
  },
  state: {
    menuHasBeenOpened: false,
    menuOpen: null,
  },
  mutations: {
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
