import refs from './refs';
import { signOut } from './firebase';

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

function signedUser(url, name) {
  refs.registrationBtn.textContent = '';
  refs.registrationBtn.insertAdjacentHTML('afterbegin', '<svg class="registration-icon besom-broom" role="img" aria-label="Иконка метлы" width="48" height="48"><use href="./images/sprite.svg#besom-broom"></use></svg>');
  refs.registrationBtn.style.marginRight = "0px";
  refs.registrationBtn.addEventListener('click', signOut);
  refs.accountInfo.insertAdjacentHTML("afterbegin",`<img  class="user-img" src= ${url} alt= ${name} width="48px">`);
}

function noSignedUser() {
  refs.registrationBtn.textContent = '';
  refs.registrationBtn.insertAdjacentHTML('afterbegin', '<svg class="registration-icon" role="img" aria-label="Иконка магической шляпы" width="48" height="48"><use href="./images/sprite.svg#sorting-hat"></use></svg>');
  refs.registrationBtn.style.marginRight = "60px";
  refs.accountInfo.textContent = "";
  refs.registrationBtn.removeEventListener('click', signOut);
}

export { signedUser, noSignedUser, openCloseModal }