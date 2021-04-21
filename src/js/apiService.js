import refs from './refs.js';

const KEY = '1a7532c831c19ca759402dbd11644ca2';
const MAIN_URL = 'https://api.themoviedb.org/3/';

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
      return results
    })
  },
  getBySearchQuery() {
    this.galleryStatus = 'BySearchQuery';
    const url = `${MAIN_URL}search/movie?api_key=${KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`;
    return fetch(url).then(response => response.json()).then(({ results }) => {
      this.titleValidation(results)
      this.releaseDateValidation(results)
      return results
    });
  },
  getByPopular() {
    this.galleryStatus = 'ByPopular';
    const url = `${MAIN_URL}movie/popular?api_key=${KEY}&language=en-US&page=${this.page}`;
    return fetch(url).then(response => response.json()).then(({ results }) => {
      this.titleValidation(results)
      this.releaseDateValidation(results)
      return results
    });
  },
  getByTopRated() {
    this.galleryStatus = 'ByTopRated';
    const url = `${MAIN_URL}movie/top_rated?api_key=${KEY}&language=en-US&page=${this.page}`;
    return fetch(url).then(response => response.json()).then(({ results }) => {
      this.titleValidation(results)
      this.releaseDateValidation(results)
      return results
    });
  },

  getById(id) {
    const url = `${MAIN_URL}movie/${id}?api_key=${KEY}&language=en-US`;
    return fetch(url).then(response => response.json());
  },

  getUpcoming() {
    const url = `${MAIN_URL}movie/upcoming?api_key=${KEY}&language=en-US&page=${this.page}`;
    return fetch(url).then(response => response.json()).then(({ results }) => {
      this.titleValidation(results)
      this.releaseDateValidation(results)
      return results
    });
  },

  titleValidation(results) {
   return results.forEach(item => {
        if (!item.original_title) {
          return item.original_title = item.name
        }})
  },
  releaseDateValidation(results) {
    return results.forEach(item => {
      if (!item.release_date) {
      return item.release_date = '2077-01-02'        
      }
    })
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
