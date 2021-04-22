import refs from './refs';
import apiService from './apiService';
import galleryHbs from '../templates/gallery-list.hbs';

apiService
  .getByTrend()
  .then(( results ) => {
    refs.gallery.insertAdjacentHTML('beforeend', galleryHbs(results));
  })
  .catch(error => console.log(error));
