import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import * as firebaseui from 'firebaseui';

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
firebase.analytics();
firebase.auth();
const ui = new firebaseui.auth.AuthUI(firebase.auth());

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
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '<url-to-redirect-to-on-success>',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};
const initApp = function() {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
          
            user.getIdToken().then(function(accessToken) {
              document.getElementById('sign-in-status').textContent = 'Signed in';
              document.getElementById('sign-in').textContent = 'Sign out';
              document.getElementById('sign-in').addEventListener('click', ()=>firebase.auth().signOut().then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
}));
              document.getElementById('account-details').insertAdjacentHTML("afterbegin", `<ul><li>User: ${displayName}</li>
              <li>Email: ${email}</li>
              <li><img src= ${photoURL} alt= ${displayName}></li></ul>`)
              });
          } else {
            // User is signed out.
            document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('sign-in').textContent = 'Sign in';
            document.getElementById('sign-in').addEventListener('click', () => ui.start('#firebaseui-auth-container', uiConfig));
            document.getElementById('account-details').textContent = 'null';
          }
        }, function(error) {
          console.log(error);
        });
      };

export  { ui, uiConfig, initApp };