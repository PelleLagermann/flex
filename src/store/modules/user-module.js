import firebase from 'firebase';
import dayjs from 'dayjs';

const userModule = {
  namespaced: true,
  state: {
    userDataLoading: false,
    userData: {},
    firstDayOfWeek: '1', // Sunday - Saturday : 0 - 6
    hoursPerWeek: -1, //
    language: 'DA', // [ 'EN', 'DA' ]
    timezone: '',
  },
  getters: {

  },
  mutations: {
    setUserDataLoading(state, isLoading) {
      state.userDataLoading = isLoading;
    },
    setUserData(state, userData) {
      Object.assign(state.userData, userData);
  }
  },
  actions: {
    initSettingsForNewUser() {
      const userId = firebase.auth().currentUser.uid;
        
      const usersRef = firebase.firestore().collection('users');
      usersRef.doc(userId).set({
          userId: userId,
          tmpId: firebase.auth().currentUser.email,
          startDate: dayjs(new Date().setHours(0,0,0,0)).toDate(),
      })
      .then(function() {
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
    },

    getUserData({commit}) {
      commit('setUserDataLoading', true);
      const userId = firebase.auth().currentUser.uid;

      firebase.firestore().collection('users')
      .doc(userId)
      .get()
      .then(function(userData) {
        const data = userData.data();
        data.startDate = dayjs(data.startDate.toDate())
        commit('setUserData', data);
      }).finally(() => {
        commit('setUserDataLoading', false);
      });
    }
    // Load settings from Firebase
    // Set dayjs locale based on language
  },
};

export default userModule;
