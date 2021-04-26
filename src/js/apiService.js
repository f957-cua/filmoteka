import genresData from './genres-data.js'
const KEY = '1a7532c831c19ca759402dbd11644ca2';
const MAIN_URL = 'https://api.themoviedb.org/3/';
const POSTER_PATH = 'https://image.tmdb.org/t/p/w500'
// const DEFAULT_POSTER = 'https://i.pinimg.com/originals/28/46/5d/28465d2416bd742f22374136e2c50061.jpg'
const DEFAULT_POSTER = 'https://i.pinimg.com/originals/d9/c4/1b/d9c41b5b1197e78fe5a6423a01734917.jpg'

export default {
  searchQuery: '',
  galleryStatus: 'ByTrend',
  page: 1,
  getByTrend() {
    this.galleryStatus = 'ByTrend';
    const url = `${MAIN_URL}trending/all/day?api_key=${KEY}&page=${this.page}`;
    return fetch(url).then(response => response.json()).then(({ results }) => {
      this.titleValidation(results)
      this.releaseDateValidation(results)
      this.posterValidation(results)
      this.genresValidation(results, genresData)
      return results
    })
  },
  getBySearchQuery() {
    this.galleryStatus = 'BySearchQuery';
    const url = `${MAIN_URL}search/movie?api_key=${KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`;
    return fetch(url).then(response => response.json()).then(({ results }) => {
      this.titleValidation(results)
      this.releaseDateValidation(results)
      this.posterValidation(results)
      this.genresValidation(results, genresData)
      return results
    });
  },
  getByPopular() {
    this.galleryStatus = 'ByPopular';
    const url = `${MAIN_URL}movie/popular?api_key=${KEY}&language=en-US&page=${this.page}`;
    return fetch(url).then(response => response.json()).then(({ results }) => {
      this.titleValidation(results)
      this.releaseDateValidation(results)
      this.posterValidation(results)
      this.genresValidation(results, genresData)
      return results
    });
  },
  getByTopRated() {
    this.galleryStatus = 'ByTopRated';
    const url = `${MAIN_URL}movie/top_rated?api_key=${KEY}&language=en-US&page=${this.page}`;
    return fetch(url).then(response => response.json()).then(({ results }) => {
      this.titleValidation(results)
      this.releaseDateValidation(results)
      this.posterValidation(results)
      this.genresValidation(results, genresData)
      return results
    });
  },

  getById(id) {
    const url = `${MAIN_URL}movie/${id}?api_key=${KEY}&language=en-US`;
    return fetch(url).then(response => response.json())
  },

  getUpcoming() {
    const url = `${MAIN_URL}movie/upcoming?api_key=${KEY}&language=en-US&page=${this.page}`;
    return fetch(url).then(response => response.json()).then(({ results }) => {
      this.titleValidation(results)
      this.releaseDateValidation(results)
      this.posterValidation(results)
      this.genresValidation(results, genresData)
      return results
    });
  },

  titleValidation(results) {
   return results.forEach(item => {
        if (!item.original_title) {
          return item.original_title = item.name
        }
        if (!item.name) {
          return item.original_title = item.title
        }
        if (!item.title) {
          return item.original_title = 'Sorry, No Info'
      }
   })
        
  },
  releaseDateValidation(results) {
    return results.forEach(item => {
      if (!item.release_date) {
      return item.release_date = '2077'        
      }
      item.release_date = item.release_date.slice(0, 4)
    })
  },

  posterValidation(results) {
    return results.forEach(item => {
      if (!item.poster_path) {
        return item.poster_path = DEFAULT_POSTER;
      }
      return item.poster_path = POSTER_PATH + item.poster_path
    })
  },

  genresValidation(results, genresData) {
     results.forEach(item => {
      genresData.forEach(genre => {
        if (item.genre_ids.includes(genre.id) ) {
          item.genre_ids.push(genre.name)
        }
      })
       item.genre_ids = item.genre_ids.filter(x => isNaN(x)).join(', ');
      
     })
    return results
    },
  
  getTrailerById (id) {
    const url = `${MAIN_URL}movie/${id}/videos?api_key=${KEY}&language=en-US`;
   return fetch(url).then(response => response.json());
  },

  incrementPage() {
    return (this.page += 1);
  },
  decrementPage() {
    if (this.page === 1) {
      return;
    }
    return (this.page -= 1);
  },
};
