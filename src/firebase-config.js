// This import loads the firebase namespace along with all its type information.
import * as firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/firestore';
/*
  firebase-app - The core firebase client (required).
  firebase-auth - Firebase Authentication (optional).
  firebase-database - The Firebase Realtime Database (optional).
  firebase-firestore - Cloud Firestore (optional).
  firebase-storage - Firebase Storage (optional).
  firebase-messaging - Firebase Cloud Messaging (optional).
  firebase-functions - Firebase Cloud Functions (optional).
*/

const firebaseConfig = {
  apiKey: 'AIzaSyBjUKE0EHZxX9A9dCSZpQYOA4a-rB6m8h4',
  authDomain: 'reggie-f6e50.firebaseapp.com',
  databaseURL: 'https://reggie-f6e50.firebaseio.com',
  projectId: 'reggie-f6e50',
  storageBucket: 'reggie-f6e50.appspot.com',
  messagingSenderId: '91799208991',
  appId: '1:91799208991:web:f6f3aa22f7ac137004412a',
};
firebase.initializeApp(firebaseConfig);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const { currentUser } = auth;

// window.db = db;

// firebase collections
const usersCollection = db.collection('users');
const registrationsCollection = db.collection('registrations');

export {
  firebase,
  db,
  auth,
  currentUser,
  usersCollection,
  registrationsCollection,
};
