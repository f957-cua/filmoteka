import { writeUserData, readUserData, deleteUserData  } from './firebase';
import { onClickBtnPopular, onClickBtnTopRated } from './gallery-section-filter';
import refs from './refs';
import galleryHbs from '../templates/gallery-list.hbs';

function addListenerOnBtnModal(data) {
  const buttonAddToWatchedRef = document.querySelector('.add-t-w');
  const buttonAddToQueueRef = document.querySelector('.add-t-q');
  const dataKey = data.id ?? data.title;
   
  checkDataChangeModalBtn(dataKey, buttonAddToWatchedRef, buttonAddToQueueRef);

  buttonAddToWatchedRef.addEventListener('click', () => {
    if (buttonAddToWatchedRef.textContent === 'add to watched') {
      writeUserData('/watched', data);
      buttonAddToWatchedRef.textContent = 'remove from watched';
      return;
    }

    deleteUserData('/watched', dataKey);
    buttonAddToWatchedRef.textContent = 'add to watched';

  });
   
  buttonAddToQueueRef.addEventListener('click', () => {
    if (buttonAddToQueueRef.textContent === 'add to queue') {
      writeUserData('/queue', data);
      buttonAddToQueueRef.textContent = 'remove from queue';
      return;
    }
    deleteUserData('/queue', dataKey);
    buttonAddToQueueRef.textContent = 'add to queue';
  });
}

function toggleCurrentLink(e) {
  if (!e.target.classList.contains('current')) {
    refs.myLibrary.classList.toggle('current');
    refs.home.firstElementChild.classList.toggle('current')
  }
  if (e.currentTarget.classList.contains('logo')) {
    refs.home.firstElementChild.classList.add('current');
    refs.myLibrary.classList.remove('current');
  }
}

function changeGalleryToMyLibrary(e) {
  refs.gallery.innerHTML = '';
  refs.gallery.nextElementSibling.style.display = 'none';
  refs.btnPopular.removeEventListener('click', onClickBtnPopular);
  refs.btnTopRated.removeEventListener('click', onClickBtnTopRated);
  refs.btnPopular.addEventListener('click', watched);
  refs.btnTopRated.addEventListener('click', queue);
  refs.btnPopular.textContent = 'Watched';
  refs.btnTopRated.textContent = 'Queue';
  toggleBtnActive(e);
}

function changeGalleryToMyHome(e) {
  refs.gallery.nextElementSibling.style.display = 'block';
  refs.btnPopular.addEventListener('click', onClickBtnPopular);
  refs.btnTopRated.addEventListener('click', onClickBtnTopRated);
  refs.btnPopular.removeEventListener('click', watched);
  refs.btnTopRated.removeEventListener('click', queue);
  refs.btnPopular.textContent = 'popular';
  refs.btnTopRated.textContent = 'top rated';
  toggleBtnActive(e);
 }

function myLibraryRendering(library) {
  readUserData(library).then((results) => {
    refs.gallery.innerHTML = galleryHbs(results);
  })
  .catch(error => console.log(error));
}

function watched(e) {
  myLibraryRendering('/watched');
  toggleBtnActive(e);
}

function queue(e) {
  myLibraryRendering('/queue');
  toggleBtnActive(e);
}

function toggleBtnActive(e) {
  if (e.target === refs.btnPopular) {
    refs.btnPopular.classList.add('active');
    refs.btnTopRated.classList.remove('active');
  }
  if (e.target === refs.btnTopRated) {
    refs.btnPopular.classList.remove('active');
    refs.btnTopRated.classList.add('active');
  }
  if (e.target === refs.home.firstElementChild ) {
    refs.btnPopular.classList.remove('active');
    refs.btnTopRated.classList.remove('active');
  }
  if (e.target === refs.myLibrary) {
    refs.btnPopular.classList.add('active');
    refs.btnTopRated.classList.remove('active');
  }
  if (e.currentTarget.classList.contains('logo')) {
    refs.btnPopular.classList.remove('active');
    refs.btnTopRated.classList.remove('active');
  }
}

function checkDataChangeModalBtn(key,btn1Ref, brn2Ref) {
  const checkDataWatched = async () => await readUserData('/watched');
  const checkDataQueue = async () => await readUserData('/queue');

  checkDataWatched().then(rez => {
    if (rez&&rez[key]) {
      btn1Ref.textContent = 'remove from watched';
    }
  });
  checkDataQueue().then(rez => {
    if (rez&&rez[key]) {
      brn2Ref.textContent = 'remove from queue';
    }
  });  
}

function renderLibraryOnCloseModal() {
  if (refs.btnPopular.classList.contains('active')
    && refs.btnPopular.textContent === 'Watched') {
  myLibraryRendering('/watched');
}
  if (refs.btnTopRated.classList.contains('active')
  && refs.btnTopRated.textContent === 'Queue') {
  myLibraryRendering('/queue');
}
  
}

export {
  addListenerOnBtnModal, toggleCurrentLink, changeGalleryToMyLibrary,
  changeGalleryToMyHome, myLibraryRendering, toggleBtnActive,
  renderLibraryOnCloseModal }
