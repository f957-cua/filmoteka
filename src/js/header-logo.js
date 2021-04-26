import refs from './refs';
import apiService from './apiService';
import galleryHbs from '../templates/gallery-list.hbs';
import { toggleCurrentLink, changeGalleryToMyHome } from './library-helpers';

const onLogoClick = e => {
  refs.prevBtn.classList.remove('js-top-rated-prev')
  refs.nextBtn.classList.remove('js-top-rated-next')
  refs.prevBtn.classList.remove('js-by-popular-prev')
  refs.nextBtn.classList.remove('js-by-popular-next')
  refs.prevBtn.classList.add('js-by-trend-prev');
  refs.nextBtn.classList.add('js-by-trend-next');
  toggleCurrentLink(e);
  changeGalleryToMyHome(e);
  e.preventDefault();
  apiService.page = 1;
  apiService.getByTrend().then((results) => {
    refs.gallery.innerHTML = galleryHbs(results);
  })
};

refs.logo.addEventListener('click', onLogoClick);
refs.home.addEventListener('click', onLogoClick);