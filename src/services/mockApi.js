let nextMovieId = 1000

const getMoviesFromStorage = () => {
  const movies = localStorage.getItem('adminMovies')
  return movies ? JSON.parse(movies) : []
}

const saveMoviesToStorage = (movies) => {
  localStorage.setItem('adminMovies', JSON.stringify(movies))
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getMoviesFromMockAPI = async () => {
  await delay(500) 
  const movies = getMoviesFromStorage()
  return movies.map(movie => ({
    ...movie,
    source: 'admin'
  }))
}

export const addMovieToMockAPI = async (movieData) => {
  await delay(500)
  const movies = getMoviesFromStorage()
  const newMovie = {
    ...movieData,
    id: nextMovieId++,
    source: 'admin'
  }
  movies.push(newMovie)
  saveMoviesToStorage(movies)
  return newMovie
}

export const updateMovieInMockAPI = async (id, movieData) => {
  await delay(500)
  const movies = getMoviesFromStorage()
  const index = movies.findIndex(m => m.id === id)
  if (index !== -1) {
    movies[index] = { ...movies[index], ...movieData }
    saveMoviesToStorage(movies)
    return movies[index]
  }
  throw new Error('Movie not found')
}

export const deleteMovieFromMockAPI = async (id) => {
  await delay(500)
  const movies = getMoviesFromStorage()
  const filteredMovies = movies.filter(m => m.id !== id)
  saveMoviesToStorage(filteredMovies)
  return { success: true }
}

export const saveUserRating = async (movieId, rating) => {
  await delay(300)
  const ratings = JSON.parse(localStorage.getItem('ratings') || '{}')
  ratings[movieId] = rating
  localStorage.setItem('ratings', JSON.stringify(ratings))
  return { success: true }
}

export const getUserRating = async (movieId) => {
  await delay(300)
  const ratings = JSON.parse(localStorage.getItem('ratings') || '{}')
  return ratings[movieId] || 0
}