import dayjs from 'dayjs';
import firebase from 'firebase';
// import enLocale from 'dayjs/locale/en-gb';
import daLocale from 'dayjs/locale/da';

dayjs.locale(daLocale);

const registrationsModule = {
  namespaced: true,
  state: {
    activeDate: dayjs(new Date()),
    registrations: {}
  },
  getters: {    
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
    updateRegistrations(state, registrations) {
      console.log("updateRegistrations", registrations);
      registrations.forEach((registration) => {
        console.log('registration date', typeof registration.Date);
        const regDate = registration.Date instanceof Date ? registration.Date : registration.Date.toDate();
        console.log("regDate", regDate);
      
        const regKey = `${regDate.getFullYear()}-${regDate.getMonth()}-${regDate.getDate()}`;        
        state.registrations[regKey] = registration;
      });
    }
  },
  actions: {
    getRegistrations({ commit, state }, payload) {
      const settings = Object.assign({}, payload);
      const fromDate = settings.fromDate || dayjs(state.activeDate).startOf('week');
      const toDate = settings.toDate || dayjs(state.activeDate).startOf('week').add(7, 'day');
      
      // Build empty data objects
      const registrations = [];
      let tmpDate = fromDate.clone();
      let i = 0;
      while(tmpDate.isBefore(toDate) && i < 10) {
        registrations.push({
          'Date': tmpDate.clone()
        });        
        i++;
        tmpDate = tmpDate.add(1, 'day');
      }
      console.log(tmpDate, fromDate);

      firebase.firestore().collection('registrations')
      .where('UserId', '==', firebase.auth().currentUser.uid)
      .where('Date', '>=', fromDate.toDate())
      .where('Date', '<', toDate.toDate())
      .get()
      .then(function(querySnapshot) {                
        querySnapshot.forEach(function(doc) {
          const registration = doc.data();
          registration.id = doc.id;
          registration.Date = dayjs(registration.Date.toDate());
          registrations.push(registration);                    
        });

        commit('updateRegistrations', registrations);
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });

    }
  },
};

export default registrationsModule;
