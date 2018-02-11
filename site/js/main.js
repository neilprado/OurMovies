const API_KEY = '76a5c60d4eb397b26f90d390c849ccbf'

const popular = document.querySelector('#popular-movies')
const upcoming = document.querySelector('#upcoming-movies')
const now = document.querySelector('#now-playing')
const filmes = document.querySelector('.filmes')
const infoFilme = document.querySelector('#infoFilme')
const search = document.querySelector('#search')
const button = document.querySelector('#button')

const upcomingMovies = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=pt-BR`
const popularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`
const nowPlayingMovies = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=pt-BR`

const searchMovie = (searchValue) =>
  `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${searchValue}`

  const getMovieInfo = (id) => {
    const infoMovie = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`
    fetch(infoMovie)
      .then(resposta => resposta.json())
      .then((data) => {
        let result = 
          `<div><img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" width="500" height="732"></div>
          <div class="info"><h1>${data.title}</h1><p>${data.overview}</p></div>`
        infoFilme.innerHTML = result
      })
  }
  
  const getMovieVideos = (id) => {
    const videoMovie = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
    fetch(videoMovie)
      .then(resposta => resposta.json())
      .then((data) => {
        infoFilme.innerHTML = `<div><a href="https://www.youtube.com/watch?v=${data.key}"></a></div>`
      })
  }

  const getMovieActor = (id) => {
    const actors = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
    fetch(actors)
      .then(resposta => resposta.json())
      .then((data) => {
        let result = 
          `<div><p>${data.character}</p></div>
          <div><p>${data.name}</p></div>
          <div><img src="https://image.tmdb.org/t/p/w500/${data.profile_path}"></div>`
        infoFilme.innerHTML = result
      })
  }

/* Função para retornar os filmes populares do momento */
const getPopularMovies = () => {
  fetch(popularMovies)
    .then(resposta => resposta.json())
    .then((data) => {
      filmes.innerHTML = responsePopular(data)
    })

  const responsePopular = (data) => (
    data.results
      .sort((a, b) => b.vote_average - a.vote_average)
      .map(item => (
      `<div class="imgFilme">
        <a href="javascript:;" data-fancybox="modal" data-src="#infoFilme" onclick="getMovieInfo(${item.id})">
          <img src="https://image.tmdb.org/t/p/w500/${item.poster_path}">
        </a>
      <div class="popularity">${item.vote_average.toFixed(1)}</div>
      <div class="nameFilme titlePopular">${item.title}</div></div>`
    )).join('')
  )
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
          `<div class="imgFilme"><a href="javascript:;" data-fancybox="modal" data-src="#infoFilme" onclick="getMovieInfo(${item.id})">
            <img src="https://image.tmdb.org/t/p/w500/${item.poster_path}"></a>
            <div class="nameFilme">${item.title}</div></div> `
      )
      .join('')
  }
}

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
          `<div class="imgFilme"><a href="javascript:;" data-fancybox="modal" data-src="#infoFilme" onclick="getMovieInfo(${item.id})">
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
            <a href="javascript:;" data-fancybox="modal" data-src="#infoFilme" onclick="getMovieInfo(${item.id})">
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

$().fancybox({
  //options
});
