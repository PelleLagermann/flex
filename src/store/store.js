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

  },
  mutations: {

  },
  actions: {

  },
});
