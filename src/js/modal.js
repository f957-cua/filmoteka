import refs from './refs';
import apiService from './apiService';
import filmInfo from '../templates/film-info.hbs';

refs.gallery.addEventListener('click', onFilmCardClick)
refs.btnModalClose.addEventListener('click', closeModal)
refs.filmModal.addEventListener('click', onBdpClick)
window.addEventListener('keydown', onEscCloseModal)

function onFilmCardClick(e) {
    refs.filmInfoContainer.innerHTML = ''
    const isCard = e.target.closest('.photo-card');    
    if (!isCard) {
        return
    }
    let filmId = isCard.getAttribute('data')
    apiService.getById(filmId).then((res) => {
        console.log(res);
        return refs.filmInfoContainer.innerHTML = filmInfo(res)

    })
    refs.filmModal.classList.remove('is-hidden');
    
    
}

function closeModal() {
    const isClosed = refs.filmModal.classList.contains('is-hidden')
    if (isClosed) {
        return
    }
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