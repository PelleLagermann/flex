const settingsModule = {
  namespaced: true,
  state: {
    firstDayOfWeek: '1', // Sunday - Saturday : 0 - 6
    hoursPerWeek: -1, //
    language: 'DA', // [ 'EN', 'DA' ]
    timezone: '',
  },
  getters: {

  },
  mutations: {

  },
  actions: {
    // Load settings from Firebase
    // Set dayjs locale based on language
  },
};

export default settingsModule;
