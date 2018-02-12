const API_KEY = '76a5c60d4eb397b26f90d390c849ccbf'

const home = document.querySelector('#home-movies')
const popular = document.querySelector('#popular-movies')
const upcoming = document.querySelector('#upcoming-movies')
const now = document.querySelector('#now-playing')  
const contentPopularMovies = document.querySelector('#content-popular-movies')
const contentNowPlaying = document.querySelector('#content-now-playing')
const contentUpComingMovies = document.querySelector('#content-upcoming-movies')
const contentsearchMovies = document.querySelector('#search-movies')
const contentInfoMovie = document.querySelector('#info-movie')
const search = document.querySelector('#search')
const button = document.querySelector('#button')

const upcomingMovies = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=pt-BR`
const popularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`
const nowPlayingMovies = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=pt-BR`

searchMovie = (searchValue) =>
  `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${searchValue}`

getMovieInfo = (id) => {
    const infoMovie = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`
    fetch(infoMovie)
      .then(resposta => resposta.json())
      .then((data) => {
        let result = 
          `<div class="contentInfo">
          <div class="imgInfo"><img src="https://image.tmdb.org/t/p/w500/${data.poster_path}
          " width="500" height="732"></div>
          <div class="textInfo"><h1>${data.title}</h1>
            <p>${data.overview}</p>
            <div id="atores">
            </div>
          </div>
          </div>`
        contentInfoMovie.innerHTML = result
		
		const atores = document.querySelector('#atores')
		getMovieActor(id, atores)
		
		//console.log(result);
      })
  }
  
getMovieVideos = (id) => {
    const videoMovie = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
    fetch(videoMovie)
      .then(resposta => resposta.json())
      .then((data) => {
        infoMovie.innerHTML = `<div><a href="https://www.youtube.com/watch?v=${data.key}"></a></div>`
      })
  }

getMovieActor = (id, atores) => {
    const actors = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
    fetch(actors)
      .then(resposta => resposta.json())
      .then((data) => {
         atores.innerHTML = `<div><p>${data.character}</p></div>
          <div><p>${data.name}</p></div>
          <div><img src="https://image.tmdb.org/t/p/w500/${data.profile_path}"></div>`
    
      })
  }

/* Função para retornar os filmes populares do momento */
getPopularMovies = () => {
  fetch(popularMovies)
    .then(resposta => resposta.json())
    .then((data) => {
      contentPopularMovies.innerHTML = responsePopular(data)
    })

const responsePopular = (data) => (
    data.results
      .sort((a, b) => b.vote_average - a.vote_average)
      .map(item => (
      `<div class="imgFilme">
        <a href="javascript:;" data-fancybox data-src="#info-movie" onclick="getMovieInfo(${item.id})">
          <img src="https://image.tmdb.org/t/p/w500/${item.poster_path}">
        </a>
        <div class="popularity">${item.vote_average.toFixed(1)}</div>
        <div class="nameFilme titlePopular">${item.title}</div>
      </div>`
    )).join('')
  )
}



// Função para pegar os filmes que serão lançados, falta realização de filtros de data
getUpcomingMovies = () => {
  fetch(upcomingMovies)
    .then(resposta => resposta.json())
    .then((data) => {
      contentUpComingMovies.innerHTML = responseUpcoming(data);
});

const responseUpcoming = (data) => {
    return data.results
      .map(
        item =>
          `<div class="imgFilme"><a href="javascript:;" data-fancybox data-src="#info-movie" onclick="getMovieInfo(${item.id})">
            <img src="https://image.tmdb.org/t/p/w500/${item.poster_path}"></a>
            <div class="nameFilme">${item.title}</div></div> `
      )
      .join('')
  }
}



// Função para retorno do que está em cartaz, falta realização de filtros de data!!
getPlayingNow = () => {
  fetch(nowPlayingMovies)
    .then(resposta => resposta.json())
    .then((data) => {
     contentNowPlaying.innerHTML = responseNow(data)
    })

  const responseNow = (data) => {
    return data.results
      .map(
        item =>
          `<div class="imgFilme"><a href="javascript:;" data-fancybox data-src="#info-movie" onclick="getMovieInfo(${item.id})">
            <img src="https://image.tmdb.org/t/p/w500/${item.poster_path}"></a>
            <div class="nameFilme">${item.title}</div></div> `
      )
      .join('')
  }
}



// Função para retorno da busca do formulário, falta realização de filtros de imagens que não aparece
searchMovies = () => {
  fetch(searchMovie(search.value))
    .then(resposta => resposta.json())
    .then((data) => {
      contentsearchMovies.innerHTML = responseSearch(data)
    })
	const responseSearch = (data) => {
    return data.results
      .map(
        item =>
          `<div class="imgFilme">
            <a href="javascript:;" " data-fancybox data-src="#info-movie" onclick="getMovieInfo(${item.id})">
              <img src="https://image.tmdb.org/t/p/w500/${item.poster_path}">
            </a>
          <div class="nameFilme">${item.title}</div></div> `
      )
      .join('')
  }
}

button.addEventListener('click', (event) => {
  event.preventDefault()
  contentPopularMovies.classList.add('hidden')
	contentUpComingMovies.classList.add('hidden')
	contentNowPlaying.classList.add('hidden')
	contentsearchMovies.classList.remove('hidden')
	contentsearchMovies.classList.add('flex')
  searchMovies()
})


home.addEventListener('click', () => {
	contentPopularMovies.classList.remove('hidden','flex')
	contentUpComingMovies.classList.remove('hidden','flex')
	contentNowPlaying.classList.remove('hidden','flex')
	contentsearchMovies.classList.add('hidden')
	if(!contentPopularMovies.classList.contains('slick-initialized'))
	$('#content-popular-movies').slick();
	if(!contentNowPlaying.classList.contains('slick-initialized'))
	$('#content-now-playing').slick();
	if(!contentUpComingMovies.classList.contains('slick-initialized'))
	$('#content-upcoming-movies').slick();
	
})

popular.addEventListener('click', () => {
	if(contentPopularMovies.classList.contains('slick-initialized'))
	$('#content-popular-movies').slick("unslick");
	contentPopularMovies.classList.remove('hidden')
	contentUpComingMovies.classList.add('hidden')
	contentNowPlaying.classList.add('hidden')
	contentPopularMovies.classList.add('flex')
	contentsearchMovies.classList.add('hidden')
}) 

upcoming.addEventListener('click', () => {
	if(contentUpComingMovies.classList.contains('slick-initialized'))
	$('#content-upcoming-movies').slick("unslick");
	contentPopularMovies.classList.add('hidden')
	contentUpComingMovies.classList.remove('hidden')
	contentNowPlaying.classList.add('hidden')
	contentUpComingMovies.classList.add('flex')
	contentsearchMovies.classList.add('hidden')
})

now.addEventListener('click', () => {
	if(contentNowPlaying.classList.contains('slick-initialized'))
	$('#content-now-playing').slick("unslick");
	contentPopularMovies.classList.add('hidden')
	contentUpComingMovies.classList.add('hidden')
	contentNowPlaying.classList.remove('hidden')
	contentNowPlaying.classList.add('flex')
	contentsearchMovies.classList.add('hidden')
})

getPopularMovies();
getUpcomingMovies() ;
getPlayingNow();

$(document).ready(function () {
	$("[data-fancybox]").fancybox({
		smallBtn:true,
		buttons : [
			'fullScreen',
			'share',
			'close',
		],

	})
	
	$('#content-popular-movies').slick();
	$('#content-now-playing').slick();
	$('#content-upcoming-movies').slick();
	
});
