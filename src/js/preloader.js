import refs from './refs';

window.addEventListener('load', () => {
    setTimeout(() => {
        refs.preloader.classList.add('hidden');
        setTimeout(() => {
            refs.preloader.remove();
        }, 2000);
    
    },500)
})

