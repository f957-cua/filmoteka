import { writeUserData, readUserData, deleteUserData  } from './firebase';
import { onClickBtnPopular, onClickBtnTopRated } from './gallery-section-filter';
import refs from './refs';
import galleryHbs from '../templates/gallery-list.hbs';

function addListenerOnBtnModal(data) {
  const buttonAddToWatched = document.querySelector('.add-t-w');
  const buttonAddToQueue = document.querySelector('.add-t-q');
  const dataKey = data.id ?? data.title;
   
  checkDataChangeModalBtn(dataKey);

  buttonAddToWatched.addEventListener('click', () => {
    if (buttonAddToWatched.textContent === 'add to watched') {
      writeUserData('/watched', data);
      buttonAddToWatched.textContent = 'remove from watched';
      return;
    }

    deleteUserData('/watched', dataKey);
    buttonAddToWatched.textContent = 'add to watched';

  });
   
  buttonAddToQueue.addEventListener('click', () => {
    if (buttonAddToQueue.textContent === 'add to queue') {
      writeUserData('/queue', data);
      buttonAddToQueue.textContent = 'remove from queue';
      return;
    }
    deleteUserData('/queue', dataKey);
    buttonAddToQueue.textContent = 'add to queue';
  });
}

function toggleCurrentLink(e) {
  if (!e.target.classList.contains('current')) {
    refs.myLibrary.classList.toggle('current');
    refs.home.firstElementChild.classList.toggle('current')
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
  refs.btnPopular.classList.toggle('active');
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
  if (!e.target.classList.contains('active')) {
    refs.btnPopular.classList.toggle('active');
    refs.btnTopRated.classList.toggle('active');
  }
  if (e.target === refs.home.firstElementChild || e.target === refs.myLibrary) {
    refs.btnPopular.classList.add('active');
    refs.btnTopRated.classList.remove('active');
  }
}

function checkDataChangeModalBtn(key) {
  const checkDataWatched = async () => await readUserData('/watched');
  const checkDataQueue = async () => await readUserData('/queue');

  checkDataWatched().then(rez => {
    if (!!rez??rez[key]) {
      buttonAddToWatched.textContent = 'remove from watched';
    }
  });
  checkDataQueue().then(rez => {
    if (!!rez??rez[key]) {
      buttonAddToQueue.textContent = 'remove from queue';
    }
  });  
}

export {
  addListenerOnBtnModal, toggleCurrentLink, changeGalleryToMyLibrary,
  changeGalleryToMyHome, myLibraryRendering,  toggleBtnActive
}