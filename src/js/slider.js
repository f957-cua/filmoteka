import Glide from '@glidejs/glide';
import apiService from './apiService.js';
import cardSliderTpl from '../templates/card-slider.hbs';
import  refs from './refs';




const glide = new Glide('.glide', {
  type: 'slider',
  startAt: 0,
  perView: 7,
  autoplay: 4000,
  hoverpause: true,
  bound: true,
  gap: 30,
  animationDuration: 700,
  breakpoints: {
    920: {
      perView: 5,
    },
    767: {
      perView: 3,
    },
  },
});

glide.mount();

apiService
    .getUpcoming()
    .then(( results ) => {
        refs.sliderContainer.innerHTML = cardSliderTpl(results);
    })

    .catch(err => {
      console.log(err);
  });

