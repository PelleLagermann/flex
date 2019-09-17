import { db, auth, usersCollection } from '@/assets/scripts/firebase';
import router from '@/router';

const authModule = {
  namespaced: true,
  state: {
    user: null,
    userData: {},
    authError: '',
    overlayShown: false,
  },
  getters: {
    authenticatedUser(state) {
      return state.user && !state.user.isAnonymous;
    },
  },
  mutations: {
    SET_USER(state, payload) {
      if (payload) {
        console.log('SET_USER - user', payload.user);
        console.log('SET_USER - userData', payload.userData);
        console.log('SET_USER - currentUser', auth.currentUser);

        state.user = payload.user;
        state.userData = payload.userData || {};
        if (payload.user) {
          console.log('Logged in as ', payload.user.displayName, payload.user);
        }
      }
    },
    REMOVE_USER(state) {
      state.user = {};
      state.userData = {};
    },
    setAuthError(state, error) {
      state.authError = error;
    },
  },
  actions: {
    initAuth({ commit, dispatch }) {
      auth.onAuthStateChanged((user) => {
        if (user) {
          commit('SET_USER', { user });
          dispatch('getExtraUserData');
          // dispatch('getUserDetails');
          router.push({ name: 'home' });
          // dispatch('projects/getProjects', null, { root: true });
          // dispatch('prototype/initFirestore', null, { root: true }); //Moved to initApp
        } else {
          commit('SET_USER', null);
          dispatch('signInAnonymously');
        }

        commit('toggleNav', { forceClose: true, redirect: 'home' }, { root: true });
        console.log('spinner: false');
        commit('toggleSpinner', false, { root: true });
      });
    },
    signIn({ commit }, credentials) {
      console.log('spinner: true');
      commit('toggleSpinner', true, { root: true });

      auth.signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(() => {
          // router.push({ name: 'home' });
        })
        .catch((error) => {
          commit('setAuthError', error);
          return error;
        });
    },
    signInAnonymously({ commit }) {
      auth.signInAnonymously()
        .then(() => {
          commit('toggleNav', { forceClose: true, redirect: 'signIn' }, { root: true });
        })
        .catch((error) => {
          commit('toggleNav', { forceClose: true, redirect: 'signIn' }, { root: true });
          commit('setAuthError', error);
          return error;
        });
    },
    signUp({ state }, credentials) {
      auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then((res) => {
          const userCollection = db.collection('users');
          userCollection.doc(res.user.uid).set({
            isAdmin: false,
          });
          router.push({ name: 'home' });
        })
        .catch((error) => {
          state.authError = error;
          return error;
        });
    },
    signOut({ commit }) {
      commit('toggleSpinner', true, { root: true });
      auth.signOut();
    },
    getExtraUserData({ commit }) {
      if (auth.currentUser) {
        // When user signs in, get additional userdata
        usersCollection.where('uid', '==', auth.currentUser.uid).limit(1)
          .get()
          .then((userRef) => {
            const setUserPayload = {
              user: auth.currentUser,
              userData: {
                household: {},
              },
            };

            if (!userRef.empty) {
              const userData = userRef.docs[0].data();
              setUserPayload.userData.name = userData.name;

              userData.householdRef.get()
                .then((householdRef) => {
                  setUserPayload.userData.household.id = householdRef.id;
                  Object.assign(setUserPayload.userData.household, householdRef.data());

                  commit('SET_USER', setUserPayload);
                })
                .catch((error) => {
                  console.log('Error:', error);
                });
            }
          })
          .catch((error) => {
            console.log('Error getting document:', error);
          });
      } else {
        commit('SET_USER', auth.currentUser);
      }
    },
  },
};

export default authModule;
