import refs from './refs';
import apiService from './apiService';
import galleryHbs from '../templates/gallery-list.hbs'

const onSearchSubmit = e => {
  e.preventDefault();
  apiService.searchQuery = e.target[0].value
  if (apiService.searchQuery === '') {
    return
  }
  e.target[0].value = '';
  apiService.getBySearchQuery().then(({ results }) => {
    console.log(results);
    refs.gallery.innerHTML = galleryHbs(results);
  })
}
refs.headerSearchForm.addEventListener('submit', onSearchSubmit)
  