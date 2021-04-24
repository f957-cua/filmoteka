import { ui, uiConfig, initApp, writeUserData, readUserData, openCloseModal } from './firebase';
import refs from './refs';
import 'firebaseui/dist/firebaseui.css';

refs.myLibrary.addEventListener('click', (e) => {
  e.preventDefault();
  if (refs.registrationBtn.textContent === 'Sign in') {
    openCloseModal();
    ui.start('#firebaseui-auth-container', uiConfig);
    return;
  }
  readUserData();
});

refs.registrationBtn.addEventListener('click', () => {
  if (refs.registrationBtn.textContent === 'Sign out') return;
   openCloseModal();
   ui.start('#firebaseui-auth-container', uiConfig);
});
 
window.addEventListener('load', () => initApp());

