import refs from './refs';
import apiService from './apiService';
import galleryHbs from '../templates/gallery-list.hbs';

let searchQuery = '';

refs.nextBtn.addEventListener('click', onNextBtnClick)
refs.prevBtn.addEventListener('click', onPrevBtnClick)

function onPrevBtnClick() {
    apiService.decrementPage()
    apiService.getByTrend().then(({ results }) => {
    refs.gallery.innerHTML = galleryHbs(results);
  })
}

function onNextBtnClick() {
    apiService.incrementPage()
     apiService.getByTrend().then(({ results }) => {
    refs.gallery.innerHTML = galleryHbs(results);
  })
 }