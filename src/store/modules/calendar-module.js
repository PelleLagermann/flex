import dayjs from 'dayjs';
// import enLocale from 'dayjs/locale/en-gb';
import daLocale from 'dayjs/locale/da';

dayjs.locale(daLocale);

const calendarModule = {
  namespaced: true,
  state: {
    activeDate: dayjs(new Date()),
  },
  getters: {
    // startOfWeek: (state, getters, rootState) => {
    //   dayjs.locale('daLocale'); // use loaded locale globally
    //   // const date = new Date(state.activeDate);
    //   // const date = dayjs(state.activeDate);
    //   const firstDayOfWeek = dayjs(state.activeDate).startOf('week');
    //   // const { firstDayOfWeek } = rootState.settings;
    //   // const daysSinceStartOfWeek = date.getDay() - firstDayOfWeek;
    //   // const weekStartDate =

    //   return firstDayOfWeek;
    // },
    activeWeek: (state) => {
      const activeWeek = [];
      const firstDayOfWeek = dayjs(state.activeDate).startOf('week');
      console.log('firstDayOfWeek', firstDayOfWeek.format('dddd'));
      for (let i = 0; i < 7; i++) {
        const date = firstDayOfWeek.add(i, 'day');
        activeWeek.push({
          date,
        });
      }

      return activeWeek;
    },
    // activeMonth: (state, getters, rootState) => {

    // },
  },
  mutations: {
    setActiveDate(state, dateStr) {
      state.activeDate = dayjs(dateStr);
    },
  },
  actions: {

  },
};

export default calendarModule;
