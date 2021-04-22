const refs = {
  body: document.body,
  logo: document.querySelector('.js-logo'),
  gallery: document.querySelector('.js-fetch-list'),
  home: document.querySelector('.js-header-home'),
  sliderContainer: document.querySelector('.js-slider-container'),
  headerSearchForm: document.querySelector('.js-form'),
  prevBtn: document.querySelector('.js-btn-p'),
  nextBtn: document.querySelector('.js-btn-n'),
  btnPopular: document.querySelector('[data-action="popular"]'),
  btnTopRated: document.querySelector('[data-action="top rated"]'),
  btnModalClose: document.querySelector('.modal-close'),
  filmInfoContainer: document.querySelector('.film-info-container'),
  filmModal: document.querySelector('.backdrop'),

  preloader: document.querySelector('.preloader'),


  titleFilm: document.querySelector('.photo-card-title'),
};


export default refs;
