import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import * as firebaseUi from 'firebaseui';
import refs from './refs';

const firebaseConfig = {
    apiKey: "AIzaSyDCrVa6zpkJN0MnC22HGNcfi7vaIe8Op8M",
    authDomain: "filmoteka-bl1.firebaseapp.com",
    projectId: "filmoteka-bl1",
    storageBucket: "filmoteka-bl1.appspot.com",
    messagingSenderId: "616243203343",
    appId: "1:616243203343:web:c89027d397f3da6ce4827a",
    measurementId: "G-3Z1JDDZM39"
};

firebase.initializeApp(firebaseConfig);
firebase.auth();
const ui = new firebaseUi.auth.AuthUI(firebase.auth());

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      // document.getElementById('loader').style.display = 'none';
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
  tosUrl: 'https://www.termsfeed.com/live/6606e203-ca11-437b-b584-e1765cda9c0e>',
  // Privacy policy url.
  privacyPolicyUrl: 'https://www.privacypolicies.com/live/5a40fc7e-8fd2-4cd0-8754-e6ebf6281fb4'
};
const initApp = function() {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
          
            user.getIdToken().then(function(accessToken) {
              refs.myLibrary.textContent = 'my library';
              refs.registrationBtn.textContent = 'Sign out';
              refs.registrationBtn.addEventListener('click', ()=>firebase.auth().signOut().then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
}));
              refs.accountInfo.insertAdjacentHTML("afterbegin",
              `<ul class="user">
              <li class="user-item">
              <p>User: ${displayName}</p>
              <p>Email: ${email}</p>
              </li>
              <li class="user-item">
              <img  class="user-img" src= ${photoURL} alt= ${displayName}>
              </li>
              </ul>`)
              });
          } else {
            // User is signed out.
            refs.myLibrary.textContent = 'Signed out';
            refs.registrationBtn.textContent = 'Sign in';
            refs.accountInfo.textContent = "";
          }
        }, function(error) {
          console.log(error);
        });
      };

export { ui, uiConfig, initApp };



