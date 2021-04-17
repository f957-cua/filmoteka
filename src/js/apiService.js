import refs from './refs';

let searchQuery = '';

const KEY = '1a7532c831c19ca759402dbd11644ca2';
const MAIN_URL = 'https://api.themoviedb.org/3/';


export default {
  page: 1,
  getByTrend() {
    const url = `${MAIN_URL}trending/all/day?api_key=${KEY}&page=${this.page}`;
    return fetch(url).then(response => response.json());
  },
  getBySearchQuery(searchQuery) {
    const url = `${MAIN_URL}search/movie?api_key=${KEY}&language=en-US&page=${this.page}&query=${searchQuery}`;
    return fetch(url).then(response => response.json());
  },
  incrementPage() {
    return this.page += 1;
  },
  decrementPage() {
    if (this.page === 1) {
      return
    }
    return this.page -= 1;
  },
};
