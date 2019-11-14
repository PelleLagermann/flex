import firebase from 'firebase';
import dayjs from 'dayjs';

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
    // Load settings from Firebase
    // Set dayjs locale based on language
  },
};

export default settingsModule;
