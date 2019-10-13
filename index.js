(function() {
  const BASE_URL = 'https://movie-list.alphacamp.io/api/v1/'
  const INDEX_URL = BASE_URL + 'movies'
  const IMAGE_URL = 'https://movie-list.alphacamp.io/posters/'
  const genresMapping = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }
  const listTab = document.querySelector('#list-tab')
  const navTabContent = document.querySelector('#nav-tabContent')
  const movieData = []

  axios.get(INDEX_URL)
    .then(response => {
      const movies = response.data.results

      movieData.push(...movies)
    })
    .catch(error => console.log(error))
})()