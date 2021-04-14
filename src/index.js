import '../src/sass/main.scss';

let searchQuery = 'club'
const KEY = '1a7532c831c19ca759402dbd11644ca2'
fetch(`https://api.tmdb.org/3/search/movie?api_key=${KEY}&language=en-US&page=1&include_adult=false&query=${searchQuery}`).then(res => res.json()).then(r => {
  console.log(r.results);
})

