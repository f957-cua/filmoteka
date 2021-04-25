import { writeUserData, readUserData  } from './firebase';
import { onClickBtnPopular, onClickBtnTopRated } from './gallery-section-filter';
import refs from './refs';
import galleryHbs from '../templates/gallery-list.hbs';

function addListenerOnBtnModal(data) {
  const buttonAddToWatched = document.querySelector('.add-t-w');
  const buttonAddToQueue = document.querySelector('.add-t-q');
  buttonAddToWatched.addEventListener('click', () => {
    writeUserData('/watched', data);
    buttonAddToWatched.disabled = true;
    buttonAddToWatched.textContent = 'Added to Watched';
  });
  buttonAddToQueue.addEventListener('click', () => {
    writeUserData('/queue', data);
    buttonAddToQueue.disabled = true;
    buttonAddToQueue.textContent = 'Added to Queue'
  });
}

function toggleCurrentLink(e) {
  if (!e.target.classList.contains('current')) {
    refs.myLibrary.classList.toggle('current');
    refs.home.firstElementChild.classList.toggle('current')
  }
}

function changeGalleryToMyLibrary() {
  refs.gallery.innerHTML = '';
  refs.gallery.nextElementSibling.style.display = 'none';
  refs.btnPopular.removeEventListener('click', onClickBtnPopular);
  refs.btnTopRated.removeEventListener('click', onClickBtnTopRated);
  refs.btnPopular.addEventListener('click', watched);
  refs.btnTopRated.addEventListener('click', queue);
  refs.btnPopular.textContent = 'Watched';
  refs.btnTopRated.textContent = 'Queue';
}


function changeGalleryToMyHome() {
  refs.gallery.nextElementSibling.style.display = 'block';
  refs.btnPopular.addEventListener('click', onClickBtnPopular);
  refs.btnTopRated.addEventListener('click', onClickBtnTopRated);
  refs.btnPopular.removeEventListener('click', watched);
  refs.btnTopRated.removeEventListener('click', queue);
  refs.btnPopular.textContent = 'popular';
  refs.btnTopRated.textContent = 'top rated';
}

function myLibraryRendering(library) {
  readUserData(library).then((results) => {
    refs.gallery.innerHTML = galleryHbs(results);
  })
  .catch(error => console.log(error));
}

function watched() {
  myLibraryRendering('/watched')
}

function queue() {
  myLibraryRendering('/queue')
}

export {
  addListenerOnBtnModal, toggleCurrentLink, changeGalleryToMyLibrary,
  changeGalleryToMyHome, myLibraryRendering
}