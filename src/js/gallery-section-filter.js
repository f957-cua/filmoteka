import refs from './refs';
import apiService from './apiService';
import galleryHbs from '../templates/gallery-list.hbs';

refs.btnPopular.addEventListener('click', onClickBtnPopular);
refs.btnTopRated.addEventListener('click', onClickBtnTopRated);

function onClickBtnPopular() {
  apiService.getByPopular().then(({ results }) => {
    refs.gallery.innerHTML = galleryHbs(results);
  });
}

function onClickBtnTopRated() {
  apiService.getByTopRated().then(({ results }) => {
    refs.gallery.innerHTML = galleryHbs(results);
  });
}
