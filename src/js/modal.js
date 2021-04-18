import refs from './refs';
import apiService from './apiService';
import filmInfo from '../templates/film-info.hbs';

refs.gallery.addEventListener('click', onFilmCardClick)
refs.btnModalClose.addEventListener('click', closeModal)
refs.filmModal.addEventListener('click', closeModal)
window.addEventListener('keydown', onEscCloseModal)

function onFilmCardClick(evt) {
//   const source = evt.target.getAttribute('data-source')
//   const selectedCard = document.querySelector('.photo-card')
//   selectedCa.setAttribute('src', '')
    const isCard = evt.target.closest('.photo-card');
    if (!isCard) {
        return
    }  
    refs.filmModal.classList.remove('is-hidden')       
    // selectedImage.setAttribute('src', source)
    refs.filmInfoContainer.innerHTML = filmInfo(evt);
}

function closeModal() {
    const isClosed = refs.filmModal.classList.contains('is-hidden')
    if (isClosed) {
        return
    }
    return refs.filmModal.classList.add('is-hidden')
}

function onEscCloseModal(evt) {
    if (evt.code === 'Escape') {
        return closeModal()
    }
}