import refs from './refs';
checkPreloader();

function checkPreloader() {
    setTimeout(() => {
        if (sessionStorage.preload) {
       refs.preloader.remove() ;
  } else {
    deletePreloader();
  }
    },700)
}

function deletePreloader() {
  setTimeout(() => {
    refs.preloader.remove();
    sessionStorage.setItem('preload', 'done');
  }, 2100);
}