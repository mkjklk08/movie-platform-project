import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Dashboard.css';

const Dashboard = () => {
  const { user, role } = useSelector((state) => state.auth);
  const { movies, favorites } = useSelector((state) => state.movies);

  const topMovies = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 5);
  const newMovies = [...movies].sort((a, b) => b.id - a.id).slice(0, 4);
  const favoriteMovies = movies.filter(movie => favorites.includes(movie.id)).slice(0, 4);

  return (
    <div className="dashboard">
      <div className="dashboard-hero">
        <div className="hero-content">
          <h1 className="hero-greeting">
            <span className="greeting-text">Hello, {user?.name}!</span>
            <span className="wave">👋</span>
          </h1>
          <p className="hero-subtitle">
            Welcome to your personal movie library. You have 
            <span className="highlight"> {favorites.length} </span> 
            {favorites.length === 1 ? 'movie' : 'movies'} in your favorites.
          </p>
          <div className="hero-actions">
            <Link to="/movies" className="hero-btn primary">Browse Movies</Link>
            <Link to="/favorites" className="hero-btn secondary">View Favorites</Link>
            {role === 'admin' && (
              <Link to="/admin" className="hero-btn tertiary">Admin Panel</Link>
            )}
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-badge">
            <span className="stat-number">{movies.length}</span>
            <span className="stat-label">Total Movies</span>
          </div>
          <div className="stat-badge highlight">
            <span className="stat-number">{favorites.length}</span>
            <span className="stat-label">Your Favorites</span>
          </div>
          <div className="stat-badge">
            <span className="stat-number">{topMovies[0]?.rating?.toFixed(1)}</span>
            <span className="stat-label">Top Rating</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <section className="quick-access">
          <h2 className="section-title"><span className="title-icon">⚡</span>Quick Access</h2>
          <div className="access-grid">
            <Link to="/movies" className="access-card">
              <div className="access-icon">🎬</div>
              <h3>All Movies</h3>
              <p>Full catalog</p>
            </Link>
            <Link to="/favorites" className="access-card highlight">
              <div className="access-icon">❤️</div>
              <h3>Favorites</h3>
              <p>Your saved list</p>
              {favorites.length > 0 && <div className="access-count">{favorites.length}</div>}
            </Link>
            <Link to="/profile" className="access-card">
              <div className="access-icon">👤</div>
              <h3>Profile</h3>
              <p>Account settings</p>
            </Link>
            {role === 'admin' && (
              <Link to="/admin" className="access-card admin">
                <h3>Admin Panel</h3>
                <p>Content management</p>
              </Link>
            )}
          </div>
        </section>

        {favorites.length > 0 && (
          <section className="favorites-section">
            <div className="section-header">
              <h2 className="section-title"><span className="title-icon"></span>Your Favorite Movies</h2>
              <Link to="/favorites" className="section-link">View All ({favorites.length}) →</Link>
            </div>
            {favoriteMovies.length > 0 ? (
              <div className="movies-grid">
                {favoriteMovies.map(movie => (
                  <Link key={movie.id} to={`/movies/${movie.id}`} className="movie-card-preview favorite">
                    <div className="movie-poster-wrapper">
                      <img src={movie.poster} alt={movie.title} />
                      <div className="favorite-badge" title="In your favorites">❤️</div>
                      <div className="movie-overlay"><span className="overlay-text">View Details</span></div>
                    </div>
                    <div className="movie-preview-info">
                      <h4>{movie.title}</h4>
                      <div className="preview-meta">
                        <span className="preview-genre">{movie.genre.split('/')[0]}</span>
                        <span className="preview-rating">★ {movie.rating?.toFixed(1)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
                {favorites.length > 4 && (
                  <div className="view-more-card">
                    <div className="view-more-content">
                      <h3>More Favorites</h3>
                      <p>You have {favorites.length - 4} more movies in your favorites</p>
                      <Link to="/favorites" className="view-more-btn">View All Favorites</Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="no-favorites-message"><p>Loading your favorite movies...</p></div>
            )}
          </section>
        )}

        <section className="top-movies">
          <div className="section-header">
            <h2 className="section-title"><span className="title-icon">⭐</span>Top 5 Movies</h2>
            <Link to="/movies" className="section-link">View All →</Link>
          </div>
          <div className="movies-grid compact">
            {topMovies.map((movie, index) => (
              <div key={movie.id} className="movie-card-compact">
                <div className="movie-rank">{index + 1}</div>
                <img src={movie.poster} alt={movie.title} className="movie-poster-small" />
                <div className="movie-info-compact">
                  <h4>{movie.title}</h4>
                  <p className="movie-genre-small">{movie.genre.split('/')[0]}</p>
                  <div className="movie-rating-small">
                    <span className="rating-star">★</span>
                    <span>{movie.rating?.toFixed(1)}</span>
                  </div>
                </div>
                <Link to={`/movies/${movie.id}`} className="movie-view-btn">→</Link>
              </div>
            ))}
          </div>
        </section>

        <section className="new-movies">
          <div className="section-header">
            <h2 className="section-title"><span className="title-icon"></span>New Arrivals</h2>
          </div>
          <div className="movies-grid">
            {newMovies.map(movie => (
              <Link key={movie.id} to={`/movies/${movie.id}`} className="movie-card-preview">
                <div className="movie-poster-wrapper">
                  <img src={movie.poster} alt={movie.title} />
                  <div className="movie-overlay"><span className="overlay-text">View Details</span></div>
                </div>
                <div className="movie-preview-info">
                  <h4>{movie.title}</h4>
                  <div className="preview-meta">
                    <span className="preview-genre">{movie.genre.split('/')[0]}</span>
                    <span className="preview-rating">★ {movie.rating?.toFixed(1)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;