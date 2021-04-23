import { ui, uiConfig, initApp } from './firebase';
import refs from './refs';
import 'firebaseui/dist/firebaseui.css';

refs.myLibrary.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.textContent === 'Signed out') {
    openCloseModal();
    ui.start('#firebaseui-auth-container', uiConfig);
      }
});
refs.registrationBtn.addEventListener('click', () => {
  if (refs.registrationBtn.textContent === 'Sign out') return;
   openCloseModal();
   ui.start('#firebaseui-auth-container', uiConfig);
 });
window.addEventListener('load', () => initApp());

function openCloseModal() {
  refs.registrationModal.classList.toggle('is-hidden');
  if (refs.registrationModal.classList.contains('is-hidden')) { 
    window.removeEventListener('keydown', onEscCloseRegModal);
    refs.registrationModal.querySelector('.modal-close')
    .removeEventListener('click', openCloseModal);
    refs.registrationModal.removeEventListener('click', onBdpRegClick);
    return;
  }
    window.addEventListener('keydown', onEscCloseRegModal);
    refs.registrationModal.querySelector('.modal-close')
    .addEventListener('click', openCloseModal);
    refs.registrationModal.addEventListener('click', onBdpRegClick);
}

function onBdpRegClick(e) {
    if (e.target !== refs.registrationModal) {
        return
    }
    openCloseModal()
}

function onEscCloseRegModal(e) {
    if (e.code === 'Escape') openCloseModal()
}