import { getMoviesFromTMDB } from './tmdbApi'
import { getMoviesFromMockAPI } from './mockApi'

export const getAllMovies = async () => {
  try {
    const [tmdbMovies, adminMovies] = await Promise.all([
      getMoviesFromTMDB(),
      getMoviesFromMockAPI()
    ])
    
    const allMovies = [
      ...tmdbMovies.map(movie => ({ ...movie, source: movie.source || 'tmdb' })),
      ...adminMovies.map(movie => ({ ...movie, source: movie.source || 'admin' }))
    ]
    
    return allMovies
  } catch (error) {
    console.error('Error fetching movies:', error)
    return []
  }
}

export const getUniqueGenres = (movies) => {
  const genres = new Set()
  movies.forEach(movie => {
    if (movie.genre) {
      const genreList = movie.genre.split('/')
      genreList.forEach(genre => genres.add(genre.trim()))
    }
  })
  return Array.from(genres).sort()
}