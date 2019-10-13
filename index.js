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

      genreData = movieData.filter(movie => movie.genres.indexOf(1) > 0)

      renderCard(genreData)
    })
    .catch(error => console.log(error))
  
  function renderGroupList(genresLists) {
    let listTabTemplate = ''
    let tabContentTemplate = ''

    for (let index in genresLists) {
      let genre = genresLists[index].toLowerCase()
      const activeClass = (index === '1') ? 'active' : ''

      listTabTemplate += `
        <a class="list-group-item list-group-item-action ${activeClass}" id="list-${genre}-list" data-toggle="list" href="#list-${genre}" role="tab" aria-controls="${genre}">${genresLists[index]}</a>
      `

      tabContentTemplate += `
        <div class="tab-pane fade show ${activeClass}" id="list-${genre}" role="tabpanel" aria-labelledby="list-${genre}-list"></div>
      `
    }

    listTab.innerHTML = listTabTemplate
    navTabContent.innerHTML = tabContentTemplate
  }

  function renderCard(cards) {
    let cardTemplate = ''
    let genresTemplate = ''
    const cardDeck = document.createElement('div')
    cardDeck.classList.add('card-deck', 'row')

    cards.forEach(card => {
      const genres = card.genres

      genresTemplate = genres.map(genreNum => `<span class="d-inline-block bg-light p-1 mr-1 font-weight-bold rounded text-secondary" style="font-size: 12px;">${genresMapping[genreNum]}</span>`).join('')

      cardTemplate += `
        <div class="col-lg-3 col-md-4 col-sm-6">
          <div class="card mb-2">
            <img src="${IMAGE_URL}${card.image}" class="card-img-top" alt="${card.title} image">
            <div class="card-body">
              <h5 class="card-title">${card.title}</h5>
              ${genresTemplate}
            </div>
          </div>
        </div>
      `
    })

    cardDeck.innerHTML = cardTemplate

    navTabContent.firstElementChild.appendChild(cardDeck)
  }

  renderGroupList(genresMapping)
})()