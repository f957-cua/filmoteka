import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import * as firebaseUi from 'firebaseui';
import { signedUser, noSignedUser, openCloseModal } from './registration-helpers';

const firebaseConfig = {
  apiKey: "AIzaSyDCrVa6zpkJN0MnC22HGNcfi7vaIe8Op8M",
  authDomain: "filmoteka-bl1.firebaseapp.com",
  databaseURL: "https://filmoteka-bl1-default-rtdb.firebaseio.com",
  projectId: "filmoteka-bl1",
  storageBucket: "filmoteka-bl1.appspot.com",
  messagingSenderId: "616243203343",
  appId: "1:616243203343:web:c89027d397f3da6ce4827a",
  measurementId: "G-3Z1JDDZM39"
};
firebase.initializeApp(firebaseConfig);
const ui = new firebaseUi.auth.AuthUI(firebase.auth());
const database = firebase.database();

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult) {
      openCloseModal();
      // User successfully signed in.
      return false;
    },
    uiShown: function () {
            // The widget is rendered.
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: 'https://www.termsfeed.com/live/6606e203-ca11-437b-b584-e1765cda9c0e',
  // Privacy policy url.
  privacyPolicyUrl: 'https://www.privacypolicies.com/live/5a40fc7e-8fd2-4cd0-8754-e6ebf6281fb4'
}

function initApp() {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            signedUser(user.photoURL, user.displayName);
          } else {
            // User is signed out.
            noSignedUser();
          }
        }, function(error) {
          console.log(error);
        });
}

function signOut() {
  firebase.auth().signOut();
  document.getElementById('home').click();
}

function writeUserData(library, filmInfoObj) {
  const userId = firebase.auth().currentUser.uid;
  const filmKey = filmInfoObj.id ?? filmInfoObj.title;
  const update = {};
  update[filmKey] = filmInfoObj;
  database.ref('users/' + userId + library).update(update);
  }

function readUserData(library) {
  const userId = firebase.auth().currentUser.uid;
  return database.ref('users/' + userId + library).get().then((snapshot) => {
   if (snapshot.exists()) {
    return snapshot.val()
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
}

function deleteUserData(library, dataId) {
  const userId = firebase.auth().currentUser.uid;
  database.ref('users/' + userId + library + '/' + dataId).remove();
}

export { ui, uiConfig, initApp, writeUserData, readUserData, deleteUserData, signOut };