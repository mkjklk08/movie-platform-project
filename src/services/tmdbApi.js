import { getTMDBMovies } from '../data/tmdbMovies'

export const getMoviesFromTMDB = async () => {
  return getTMDBMovies()
}

export const searchMoviesOnTMDB = async (query) => {
  const movies = getTMDBMovies()
  return movies.filter(movie =>
    movie.title.toLowerCase().includes(query.toLowerCase()) ||
    movie.description.toLowerCase().includes(query.toLowerCase())
  )
}