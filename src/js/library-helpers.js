import { writeUserData, readUserData, deleteUserData  } from './firebase';
import { onClickBtnPopular, onClickBtnTopRated } from './gallery-section-filter';
import refs from './refs';
import galleryHbs from '../templates/gallery-list.hbs';

function addListenerOnBtnModal(data) {
  const buttonAddToWatched = document.querySelector('.add-t-w');
  const buttonAddToQueue = document.querySelector('.add-t-q');
  buttonAddToWatched.addEventListener('click', () => {
    const checkData = async () => await readUserData('/watched');
    checkData().then(rez => {
      if (!rez[data.id]) {
        writeUserData('/watched', data);
        buttonAddToWatched.textContent = 'Remove from Watched';
        return;
      }
      deleteUserData('/watched', data.id);
      buttonAddToWatched.textContent = 'Add to Watched';

     })
   
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

export {
  addListenerOnBtnModal, toggleCurrentLink, changeGalleryToMyLibrary,
  changeGalleryToMyHome, myLibraryRendering,  toggleBtnActive
}