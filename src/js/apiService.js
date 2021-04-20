

const KEY = '1a7532c831c19ca759402dbd11644ca2';
const MAIN_URL = 'https://api.themoviedb.org/3/';


export default {
  searchQuery: '',
  galleryStatus: "ByTrend",
  page: 1,
  getByTrend() {
    this.galleryStatus = "ByTrend";
    const url = `${MAIN_URL}trending/all/day?api_key=${KEY}&page=${this.page}`;
    return fetch(url).then(response => response.json());
  },

  getBySearchQuery() {
    this.galleryStatus = "BySearchQuery";
    const url = `${MAIN_URL}search/movie?api_key=${KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`;
    return fetch(url).then(response => response.json());
  },
  getByPopular() {
    this.galleryStatus = "ByPopular";
    const url = `${MAIN_URL}movie/popular?api_key=${KEY}&language=en-US&page=${this.page}`;
    return fetch(url).then(response => response.json());
  },
  getByTopRated() {
    this.galleryStatus = "ByTopRated";
    const url = `${MAIN_URL}movie/top_rated?api_key=${KEY}&language=en-US&page=${this.page}`;
    return fetch(url).then(response => response.json());
  },
  
  getById(id) {
    const url = `${MAIN_URL}movie/${id}?api_key=${KEY}&language=en-US`    
    return fetch(url).then(response => response.json());

  },

  getUpcoming() {
    const url = `${MAIN_URL}movie/upcoming?api_key=${KEY}&language=en-US&page=${this.page}`;
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



