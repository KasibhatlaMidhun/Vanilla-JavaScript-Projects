const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=aebf525ee979ac495e57fd1f67c04c64&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=aebf525ee979ac495e57fd1f67c04c64&query='";

const Main = document.getElementById('main');
const form = document.getElementById('form');
const Search = document.getElementById('search');

// Get initial movies
getMovies(API_URL);

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results);
}

function showMovies(movies) {
    Main.innerHTML = "";

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRating(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>`

        main.appendChild(movieEl);
    })
}

function getClassByRating(vote) {
    if(vote > 8) {
        return "green";
    } else if(vote > 5 && vote < 8) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const search_Item = Search.value;
    if(search_Item && search_Item !== "") {
        getMovies(SEARCH_API + search_Item);
        Search.value = "";
    } else {
        window.location.reload();
    }
    
})