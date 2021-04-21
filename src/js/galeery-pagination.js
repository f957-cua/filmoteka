import refs from './refs';
import apiService from './apiService';
import galleryHbs from '../templates/gallery-list.hbs';

refs.nextBtn.addEventListener('click', onNextBtnClick);
refs.prevBtn.addEventListener('click', onPrevBtnClick);

function onNextBtnClick() {
  if (apiService.galleryStatus === "ByTrend") {
    return onTrendNextBtnClick()
  }
  if (apiService.galleryStatus === "BySearchQuery") {
    return onSearchNextBtnClick()
  }
  if (apiService.galleryStatus === "ByPopular") {
    return onPopularNextBtnClick()
  }
  if (apiService.galleryStatus === "ByTopRated") {
    return onTopRatedNextBtnClick()
  }
  
}

function onPrevBtnClick() {
  if (apiService.galleryStatus === "ByTrend") {
    return onTrendPrevBtnClick()
  }
  if (apiService.galleryStatus === "BySearchQuery") {
    return onSearchPrevBtnClick()
  }
  if (apiService.galleryStatus === "ByPopular") {
    return onPopularPrevBtnClick()
  }
  if (apiService.galleryStatus === "ByTopRated") {
    return onTopRatedPrevBtnClick()
  }
}

function onTrendPrevBtnClick() {
    apiService.decrementPage()
    apiService.getByTrend().then(( results ) => {
    refs.gallery.innerHTML = galleryHbs(results);
    })
  window.scrollTo({
  top: 0,
  left: 0,
  behavior: 'smooth'
});
}

function onTrendNextBtnClick() {
    apiService.incrementPage()
    apiService.getByTrend().then(( results ) => {
    refs.gallery.innerHTML = galleryHbs(results);
  })
  window.scrollTo({
  top: 0,
  left: 0,
  behavior: 'smooth'
});
 }

function onSearchPrevBtnClick() {
    apiService.decrementPage()
    apiService.getBySearchQuery().then(( results ) => {
    refs.gallery.innerHTML = galleryHbs(results);
  })
  window.scrollTo({
  top: 0,
  left: 0,
  behavior: 'smooth'
});
}

function onSearchNextBtnClick() {
    apiService.incrementPage()
    apiService.getBySearchQuery().then(( results ) => {
    refs.gallery.innerHTML = galleryHbs(results);
    })
  window.scrollTo({
  top: 0,
  left: 0,
  behavior: 'smooth'
});
  
}

function onPopularPrevBtnClick() {
    apiService.decrementPage()
    apiService.getByPopular().then(( results ) => {
    refs.gallery.innerHTML = galleryHbs(results);
    });
  window.scrollTo({
  top: 0,
  left: 0,
  behavior: 'smooth'
});
}

function onPopularNextBtnClick() {
    apiService.incrementPage()
    apiService.getByPopular().then(( results ) => {
    refs.gallery.innerHTML = galleryHbs(results);
    });
  window.scrollTo({
  top: 0,
  left: 0,
  behavior: 'smooth'
});
}
function onTopRatedPrevBtnClick() {
    apiService.decrementPage()
    apiService.getByTopRated().then(( results ) => {
    refs.gallery.innerHTML = galleryHbs(results);
    });
  window.scrollTo({
  top: 0,
  left: 0,
  behavior: 'smooth'
});
}

function onTopRatedNextBtnClick() {
    apiService.incrementPage()
    apiService.getByTopRated().then(( results ) => {
    refs.gallery.innerHTML = galleryHbs(results);
    });
  window.scrollTo({
  top: 0,
  left: 0,
  behavior: 'smooth'
});
}