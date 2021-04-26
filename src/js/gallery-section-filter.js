import refs from './refs';
import apiService from './apiService';
import galleryHbs from '../templates/gallery-list.hbs';

refs.btnPopular.addEventListener('click', onClickBtnPopular);
refs.btnTopRated.addEventListener('click', onClickBtnTopRated);

function onClickBtnPopular() {
  apiService.page = 1;
  apiService.getByPopular().then(( results ) => {
    refs.gallery.innerHTML = galleryHbs(results);
  });
}

function onClickBtnTopRated() {
  apiService.page = 1;
  apiService.getByTopRated().then(( results ) => {
    refs.gallery.innerHTML = galleryHbs(results);
  });
}
 export { onClickBtnPopular, onClickBtnTopRated }