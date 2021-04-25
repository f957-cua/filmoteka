import { ui, uiConfig, initApp } from './firebase';
import { openCloseModal } from './registration-helpers';
import refs from './refs';
import 'firebaseui/dist/firebaseui.css';

window.addEventListener('load', () => initApp());

refs.registrationBtn.addEventListener('click', () => {
  if (refs.registrationBtn.textContent === 'Sign out') return;

  openCloseModal();
  ui.start('#firebaseui-auth-container', uiConfig);
});