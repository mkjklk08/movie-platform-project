import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './MoviesDetail.css'

const MovieDetail = () => {
  const { id } = useParams()
  const { movies } = useSelector((state) => state.movies)
  const { favorites } = useSelector((state) => state.movies)

  const movie = movies.find(m => m.id === parseInt(id))
  
  if (!movie) {
    return (
      <div className="movie-not-found">
        <h2>Movie not found</h2>
        <p>The movie you're looking for doesn't exist.</p>
        <Link to="/movies" className="back-btn">
          ← Back to Movies
        </Link>
      </div>
    )
  }

  const isFavorite = favorites.includes(movie.id)
  const isAdminMovie = movie.source === 'admin'

  const genreList = movie.genre?.split('/') || []

  return (
    <div className="movie-detail">
      <div className="movie-backdrop">
        <img src={movie.poster} alt={movie.title} />
        <div className="backdrop-overlay">
          <div className="container">
            <h1>{movie.title}</h1>
            <div className="movie-meta">
              <span className="rating">⭐ {movie.rating?.toFixed(1)}</span>
              <span className="source">{isAdminMovie ? 'Added by Admin' : 'From TMDB'}</span>
              {isFavorite && <span className="favorite-badge">In Your Favorites</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="movie-content">
          <div className="movie-poster-large">
            <img src={movie.poster} alt={movie.title} />
            <a
              href={movie.watchLink}
              target="_blank"
              rel="noopener noreferrer"
              className="watch-now-btn"
            >
              Watch Now
            </a>
          </div>

          <div className="movie-info">
            <div className="genres">
              {genreList.map((genre, index) => (
                <span key={index} className="genre-tag">
                  {genre.trim()}
                </span>
              ))}
            </div>

            <h2>Description</h2>
            <p className="description">{movie.description}</p>

            <div className="movie-stats">
              <div className="stat">
                <span className="stat-label">Rating</span>
                <span className="stat-value">⭐ {movie.rating?.toFixed(1)}/10</span>
              </div>
              <div className="stat">
                <span className="stat-label">Source</span>
                <span className={`stat-value ${isAdminMovie ? 'admin' : 'tmdb'}`}>
                  {isAdminMovie ? 'Admin Added' : 'The Movie DB'}
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Status</span>
                <span className={`stat-value ${isFavorite ? 'favorite' : ''}`}>
                  {isFavorite ? 'In Favorites' : 'Not in Favorites'}
                </span>
              </div>
            </div>

            <div className="action-buttons">
              <Link to="/movies" className="back-to-list">
                ← Back to Movies
              </Link>
              <a
                href={movie.watchLink}
                target="_blank"
                rel="noopener noreferrer"
                className="external-watch-btn"
              >
                Watch on External Site →
              </a>
            </div>
          </div>
        </div>

        <div className="similar-movies">
          <h3>You might also like</h3>
          <div className="similar-grid">
            {movies
              .filter(m => 
                m.id !== movie.id && 
                m.genre && 
                genreList.some(genre => m.genre.includes(genre))
              )
              .slice(0, 4)
              .map(similarMovie => (
                <Link 
                  key={similarMovie.id} 
                  to={`/movies/${similarMovie.id}`}
                  className="similar-card"
                >
                  <img src={similarMovie.poster} alt={similarMovie.title} />
                  <div className="similar-info">
                    <h4>{similarMovie.title}</h4>
                    <p className="similar-rating">⭐ {similarMovie.rating?.toFixed(1)}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail