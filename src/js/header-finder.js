import refs from './refs';
import apiService from './apiService';
import galleryHbs from '../templates/gallery-list.hbs'
let searchQuery = ''

// const onSearchSubmit = e => {
  
// }

refs.headerSearchForm.addEventListener('submit', e => {
  e.preventDefault();
  searchQuery = e.target[0].value;
  
  apiService.getBySearchQuery(searchQuery).then(({ results }) => {
    refs.gallery.innerHTML = galleryHbs(results);
  })
  
})