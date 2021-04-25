
function addListenerOnBtnModal(data) {
  const buttonAddToWatched = document.querySelector('.add-t-w');
  const buttonAddToQueue = document.querySelector('.add-t-q');
  buttonAddToWatched.addEventListener('click', ()=> writeUserData('/watched', data));
  buttonAddToQueue.addEventListener('click',()=> writeUserData('/queue', data));
}

export {addListenerOnBtnModal}