import refs from "./refs";

let searchQuery = '';

const KEY = '1a7532c831c19ca759402dbd11644ca2';
const MAIN_URL = 'https://api.themoviedb.org/3/';

export default  {
  getByTrend() {
    const url = `${MAIN_URL}trending/all/day?api_key=${KEY}`;
   return fetch(url)
      .then(response => response.json())
  },
  getBySearchQuery(searchQuery, page = 1) {
    const url = `${MAIN_URL}search/movie?api_key=${KEY}&language=en-US&page=${page}&query=${searchQuery}`;
    return fetch(url)
      .then(response => response.json())
  },
  incrementPage(page) {
    page += 1;
  },
  decrementPage(page) {
    page -= 1;
  }
}
