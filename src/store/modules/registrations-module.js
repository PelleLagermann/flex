import Vue from 'vue';
import dayjs from 'dayjs';
import firebase from 'firebase';
// import enLocale from 'dayjs/locale/en-gb';
import daLocale from 'dayjs/locale/da';

dayjs.locale(daLocale);

const registrationsModule = {
  namespaced: true,
  state: {
    userRegistrationsLoading: false,
    userRegistrations: []
  },
  getters: {    
    registrations: (state, getters, rootState) => {      
      const registrations = [];
      const startDate = rootState?.user?.userData?.startDate;
      const endDate = dayjs().endOf('year');
      const userRegistrations = state.userRegistrations.slice(0);      

      if (startDate) {
        let dateIterator = startDate.clone();

        // Build array of registrations
        while(dateIterator.isBefore(endDate)) {
          const registration = {
            date: dateIterator.clone(),
            registrations: [],
          };

          if (userRegistrations.length > 0) {
            const userReg = userRegistrations.find(reg => reg.date.isSame(dateIterator, 'day'));          
            if (userReg) {            
              Object.assign(registration.registrations, userReg.registrations);
            }
          }          

          registrations.push(registration);

          dateIterator = dateIterator.add(1, 'day');
        }
      }

      return registrations;
    },
    activeDay: (state, getters, rootState) => {      
      if (getters.registrations.length > 0) {        
        return getters.registrations.find(reg => reg.date.isSame(rootState.activeDate, 'day'));        
      }            
    },
    activeWeek: (state, getters, rootState) => {
      const activeWeek = [];
      
      if (getters.registrations.length > 0) {
        const firstDayOfWeek = dayjs(rootState.activeDate).startOf('week');
      
        const firstDayIndex = getters.registrations.findIndex(reg => reg.date.isSame(firstDayOfWeek, 'day'));

        for (let i = firstDayIndex; i < firstDayIndex + 7; i++) {          
          activeWeek.push(getters.registrations[i]);
        }
      }      

      return activeWeek;
    },
    // activeMonth: (state, getters, rootState) => {

    // },
  },
  mutations: {
    setLoadingUserRegistrations(state, isLoading) {
      state.userRegistrationsLoading = isLoading;
    },
    setUserRegistrations(state, registrations) {
      state.userRegistrations = registrations;
    },
    updateUserRegistration(state, registration) {     
      if (!dayjs.isDayjs(registration.date)) {
        registration.date = dayjs(registration.date.toDate());
      }
      console.log('updateUserRegistration', registration); 
      let userRegIndex = state.userRegistrations.findIndex(item => item.date.isSame(registration.date, 'day'));
      console.log('updateUserRegistration - userRegIndex', userRegIndex); 
      Vue.set(state.userRegistrations, userRegIndex, registration);
      console.log('updateUserRegistration - userReg', state.userRegistrations[userRegIndex]); 
    },
    updateUserRegistrations(state, registrations) {
      registrations.forEach((reg) => {
        let userRegIndex = state.userRegistrations.findIndex(item => item.date.isSame(reg.date, 'day'));
        Vue.set(state.userRegistrations, userRegIndex, reg);        
      });
    }
  },
  actions: {
    getAllRegistrations({commit}) {
      commit('setLoadingUserRegistrations', true);

      firebase.firestore().collection('registrations')
      .where('userId', '==', firebase.auth().currentUser.uid)
      .orderBy("date")
      .get()
      .then(function(querySnapshot) {         
        let registrations = [];
        
        querySnapshot.forEach(function(doc) {
          const registration = doc.data();          
          registration.date = dayjs(registration.date.toDate());

          registrations.push(registration);        
        });

        commit('setUserRegistrations', registrations);
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      })
      .finally(() => {
        commit('setLoadingUserRegistrations', false);
      });
    },
    reloadRegistrations({ commit }, payload) {      
      if (!payload.fromDate || !payload.toDate) {
        console.error("reloadRegistrations called without from or to date");
        return;
      }
      // Build empty data objects
      const registrations = [];
      firebase.firestore().collection('registrations')
      .where('userId', '==', firebase.auth().currentUser.uid)
      .where('date', '>=', payload.fromDate.toDate())
      .where('date', '<', payload.toDate.toDate())
      .orderBy("date")
      .get()
      .then(function(querySnapshot) {                
        querySnapshot.forEach(function(doc) {
          const registration = doc.data();                    
          registration.date = dayjs(registration.date.toDate());

          registrations.push(registration);          
        });

        commit('updateUserRegistrations', registrations);
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
    submitRegistration({ rootState, commit }, payload) { //commit, state      
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

        // Calculate new total
        let hours = 0;
        let minutes = 0;        

        registration.registrations.forEach(reg => {
          hours += reg.hours;
          minutes += reg.minutes;

          if (minutes >= 60) {
            hours += 1;
            minutes -= 60;
          }
        });
        
        registration.total = `${hours}:${minutes}`;
              
        console.log("registration:", registration);

        regRef.set(registration, { merge: true });  
        commit('updateUserRegistration', registration);
      });      
    },
  },
};

export default registrationsModule;
