import refs from './refs';
import apiService from './apiService';
import filmInfo from '../templates/film-info.hbs';
import { addListenerOnBtnModal } from './library-helpers';

refs.gallery.addEventListener('click', onFilmCardClick)
refs.btnModalClose.addEventListener('click', closeModal)
refs.filmModal.addEventListener('click', onBdpClick)
refs.sliderContainer.addEventListener('click', onSlideCardClick)
window.addEventListener('keydown', onEscCloseModal)

let filmId = null;
let isCard = null;

function onFilmCardClick(e) {
    refs.filmInfoContainer.innerHTML = ''
    isCard = e.target.closest('.photo-card');    
    if (!isCard) {
        return
    }
    apiService.getById(filmId).then((res) => {        
      modalValidation(res)
        refs.filmInfoContainer.innerHTML = filmInfo(res);
        return res;
    }).then(addListenerOnBtnModal).catch(console.log);
    refs.filmModal.classList.remove('is-hidden');  
    document.body.style.overflow = 'hidden';  

}

function onSlideCardClick(e) {
    refs.filmInfoContainer.innerHTML = ''
    isCard = e.target.closest('.card-slider');    
    if (!isCard) {
        return
    }
    filmId = isCard.getAttribute('data-action')
    apiService.getById(filmId).then((res) => {
        modalValidation(res)
        refs.filmInfoContainer.innerHTML = filmInfo(res);
        return res;
    }).then(addListenerOnBtnModal).catch(console.log);
    refs.filmModal.classList.remove('is-hidden');
    document.body.style.overflow = 'hidden';

}

function closeModal() {
    const isClosed = refs.filmModal.classList.contains('is-hidden')
    if (isClosed) {
        return
    }
     document.body.style.overflow = 'visible';
    return refs.filmModal.classList.add('is-hidden')
}

function onBdpClick(e) {
    if (e.target !== refs.filmModal) {
        return
    }
    closeModal()
}

function onEscCloseModal(evt) {
    if (evt.code === 'Escape') {
        return closeModal()
    }
}

function modalValidation(res) {
    let filmId = isCard.getAttribute('data')
    let dataImg = isCard.getAttribute('data-img')
    let dataTitle = isCard.getAttribute('data-title')
    let dataPop = isCard.getAttribute('data-pop')
    let dataVA = isCard.getAttribute('data-v_a')
    let dataVC = isCard.getAttribute('data-v_c')
    let dataOverview = isCard.getAttribute('data-overview')
    let dataGenres = isCard.getAttribute('data-genres')
        if (!res.poster_path) {
            res.poster_path = dataImg
        }
        if (!res.title) {
            res.title = dataTitle
        }
        if (!res.popularity) {
            res.popularity = dataPop
        }
        if (!res.original_title) {
            res.original_title = dataTitle
        }
        if (!res.overview) {
            res.overview = dataOverview
        }
        if (!res.vote_average) {
            res.vote_average = dataVA
        }
        if (!res.vote_count) {
            res.vote_count = dataVC
        }

        if (!res.genres) {
            res.genres = dataGenres.split(' ').map(el => {return {name: el}})
        }
 }