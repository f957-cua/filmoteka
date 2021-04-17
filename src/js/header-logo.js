import refs from './refs';
import apiService from './apiService';
import galleryHbs from '../templates/gallery-list.hbs';

const onLogoClick = e => {
  e.preventDefault();
  apiService.page = 1;
  apiService.getByTrend().then(({ results }) => {
    refs.gallery.innerHTML = galleryHbs(results);
  })
};

refs.logo.addEventListener('click', onLogoClick);
refs.home.addEventListener('click', onLogoClick);