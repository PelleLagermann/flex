import dayjs from 'dayjs';
import firebase from 'firebase';
// import enLocale from 'dayjs/locale/en-gb';
import daLocale from 'dayjs/locale/da';

dayjs.locale(daLocale);

const registrationsModule = {
  namespaced: true,
  state: {    
    registrations: {}
  },
  getters: {    
    activeWeek: (rootState) => {
      const activeWeek = [];
      const firstDayOfWeek = dayjs(rootState.activeDate).startOf('week');
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
    updateRegistrations(state, registrations) {
      console.log("updateRegistrations", registrations);
      state.registrations = registrations;
      // registrations.forEach((registration) => {
      //   console.log('registration date', typeof registration.date);
      //   const regDate = registration.date instanceof Date ? registration.date : registration.date.toDate();
      //   console.log("regDate", regDate);
      
      //   const regKey = `${regDate.getFullYear()}-${regDate.getMonth()}-${regDate.getDate()}`;        
      //   state.registrations[regKey] = registration;
      // });
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
      while(tmpDate.isBefore(toDate)) {
        registrations.push({
          'date': tmpDate.clone()
        });              
        tmpDate = tmpDate.add(1, 'day');
      }
      console.log(tmpDate, fromDate);

      firebase.firestore().collection('registrations')
      .where('userId', '==', firebase.auth().currentUser.uid)
      .where('date', '>=', fromDate.toDate())
      .where('date', '<', toDate.toDate())
      .orderBy("date")
      .get()
      .then(function(querySnapshot) {                
        querySnapshot.forEach(function(doc) {
          const registration = doc.data();                    
          registration.date = dayjs(registration.date.toDate());

          registrations.forEach((reg, i) => {
            if (reg.date.isSame(registration.date)) {
              registrations[i] = registration;
            }
          });          
        });

        commit('updateRegistrations', registrations);
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });

    },
    /*
      payload: {        
        date:             [JS DATE OBJ],
        from (optional):  [JS DATE OBJ],
        to (optional):    [JS DATE OBJ],
        hours:            [Int],
        minutes:          [Int],
      }
    */ 
    submitRegistration({ rootState }, payload) { //commit, state      
      const userId = firebase.auth().currentUser.uid;
      let date = payload.date || rootState.activeDate;
      if (!dayjs.isDayjs(date)) {
        date = dayjs(date);
      }

      const regId = `${date.format('YYYYMMDD')}-${userId}`;  
      const regRef = firebase.firestore().collection('registrations').doc(regId);
      let registration = {
        userId: userId,
        date: date.toDate(),
        registrations: []
      };
      
      // load existing registration data
      regRef.get().then(function(doc) {
        if (doc.exists) {          
          Object.assign(registration, doc.data());          
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      }).finally(function ()  {
        console.log("registration:", registration);

        registration.registrations.push({
          hours: payload.hours,
          minutes: payload.minutes
        });
              
        console.log("registration:", registration);

        regRef.set(registration, { merge: true });  
      });      
    },
  },
};

export default registrationsModule;
