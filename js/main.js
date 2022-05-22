let elForm = $(".js-form");
let elInput = $(".js-input");
let elList = $(".result-list");
let elTemplate = $("#movies-template").content;
movies.splice(100)

let normalizedMovies = movies.map((movie, i) => {

  return {
    id: i + 1,
    title: movie.Title,
    fulltitle: movie.fulltitle,
    categories: movie.Categories.split("|").join(", "),
    summary: movie.summary,
    imdbRating: movie.imdb_rating,
    runtime: movie.runtime,
    language: movie.language,
    trailer: `https://www.youtube.com/watch?v=${movie.ytid}`,
    smallPoster: `http://i3.ytimg.com/vi/${movie.ytid}/hqdefault.jpg`,
    bigPoster: `https://i3.ytimg.com/vi/${movie.ytid}/maxresdefault.jpg`,

  }
});

let createMovieElement = (movie) => {

  elList.innerHTML = "";

  let movieElement = elTemplate.cloneNode(true);

  $(".card-title", movieElement ).textContent = movie.title;
  $(".card-img-top",movieElement).src = movie.bigPoster;
  $(".card-img-top", movieElement).alt = movie.title;
  $(".card-summary", movieElement ).textContent = movie.summary;
  $(".card-genres", movieElement ).textContent = movie.genres;
  $(".card-year", movieElement ).textContent = movie.year;
  $(".card-trailer",  movieElement).href = movie.trailer;

  return movieElement;
} 

let renderMovies = (movies) => {
  let elResultFragment = document.createDocumentFragment();

  movies.forEach((movie) => {
    elResultFragment.appendChild(createMovieElement(movie));
  })

  elList.appendChild(elResultFragment)
} 

renderMovies(normalizedMovies);



elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let searchMovie = new RegExp (elInput.value.trim(), "gi");
  let searchResult = normalizedMovies.filter((movie) => {
    if (movie.title.match(searchMovie)); {
      return movie.title.match(searchMovie);
    };
  });

  renderMovies(searchResult);
});