const API_KEY = '76a5c60d4eb397b26f90d390c849ccbf'

const popular = document.querySelector('#popular-movies')
const upcoming = document.querySelector('#upcoming-movies')
const now = document.querySelector('#now-playing')
const filmes = document.querySelector('.filmes')
const infoFilme = document.querySelector('#infoFilme')
const search = document.querySelector('#search')
const button = document.querySelector('#button')
const modal = document.querySelector('#modal')
const genres = ''

const upcomingMovies = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=pt-BR`
const popularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`
const nowPlayingMovies = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=pt-BR`
const partialImgURL = 'https://image.tmdb.org/t/p/w500'
const genreMovie = `https://api.themoviedb.org/3/genre/${genres}/movies?api_key=${API_KEY}&language=pt-BR`

const searchMovie = (searchValue) =>
  `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${searchValue}`

/* Função para retornar os filmes populares do momento, para completar, 
 * é necessário ordenar por popularidade e inseri-la */
const getPopularMovies = () => {
  fetch(popularMovies)
    .then(resposta => resposta.json())
    .then((data) => {
      filmes.innerHTML = responsePopular(data)
    })

  const responsePopular = (data) => (
    data.results/*.filter(() => 'vote_average' > 5.0
      )*/.map(item => (
      `<div class="imgFilme">
        <a href="#" onclick="getMovieInfo(${item.id})">
          <img src="https://image.tmdb.org/t/p/w500/${item.poster_path}">
        </a>
      <div class="popularity">${item.vote_average}</div>
      <div class="nameFilme titlePopular">${item.title}</div></div>`
    )).join('')
  )
}

/*const filteredPopular = (pop) => {
  fetch(popularMovies)
    .then(resposta => resposta.json())
    .then((data) =>{
      return ${pop.vote_average} > 5.0
    })
}*/

const getMovieInfo = (id) => {
  const infoMovie = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`
  fetch(infoMovie)
    .then(resposta => resposta.json())
    .then((data) => {
      infoFilme.innerHTML = `<p> ${data.title}</p>`
    })
}

popular.addEventListener('click', () => {
  getPopularMovies()
})

// Função para pegar os filmes que serão lançados, falta realização de filtros de data
const getUpcomingMovies = () => {
  fetch(upcomingMovies)
    .then(resposta => resposta.json())
    .then((data) => {
      filmes.innerHTML = responseUpcoming(data);
    });

  const responseUpcoming = (data) => {
    return data.results
      .map(
        item =>
          `<div class="imgFilme"><a href="#" onclick="getMovieInfo(${item.id})">
            <img src="https://image.tmdb.org/t/p/w500/${item.poster_path}"></a>
            <div class="nameFilme">${item.title}</div></div> `
      )
      .join('')
  }
}

// const getMovieInfo = (id) => {
//   // fazer o fetch do tmdb baseado no ID
//   fetch(URL)
//     .then(r => r.json())
//     .then(data => {
//       modal.innerHTML = `
//         <h2>${data.nome}</h2>
//         <p>${data.description}</p>
//       `;

//       modal.style.display = 'block';
//     })
// }

upcoming.addEventListener('click', () => {
  getUpcomingMovies()
})

// Função para retorno do que está em cartaz, falta realização de filtros de data!!
const getPlayingNow = () => {
  fetch(nowPlayingMovies)
    .then(resposta => resposta.json())
    .then((data) => {
      filmes.innerHTML = responseNow(data)
    })

  const responseNow = (data) => {
    return data.results
      .map(
        item =>
          `<div class="imgFilme"><a href="#" onclick="getMovieInfo(${item.id})">
            <img src="https://image.tmdb.org/t/p/w500/${item.poster_path}"></a>
            <div class="nameFilme">${item.title}</div></div> `
      )
      .join('')
  }
}
now.addEventListener('click', () => {
  getPlayingNow()
})

// Função para retorno da busca do formulário, falta realização de filtros de imagens que não aparece
const searchMovies = () => {
  fetch(searchMovie(search.value))
    .then(resposta => resposta.json())
    .then((data) => {
      filmes.innerHTML = responseSearch(data)
    })
  const responseSearch = (data) => {
    return data.results
      .map(
        item =>
          `<div class="imgFilme">
            <a href="#" onclick="getMovieInfo(${item.id})">
              <img src="https://image.tmdb.org/t/p/w500/${item.poster_path}">
            </a>
          <div class="nameFilme">${item.title}</div></div> `
      )
      .join('')
  }
}

button.addEventListener('click', (event) => {
  event.preventDefault()
  searchMovies()
})

let a = getPopularMovies() + getPlayingNow() + getUpcomingMovies()
filmes.insertAdjacentHTML('beforeend', a)
