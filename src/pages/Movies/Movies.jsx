import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  filterByGenre, 
  searchMovies, 
  sortMovies,
  clearFilters 
} from '../../store/slices/moviesSlice';
import MovieCard from '../../components/MovieCard/MovieCard';
import { getUniqueGenres } from '../../services/moviesService';
import './Movies.css';

const Movies = () => {
  const dispatch = useDispatch();
  const { filteredMovies, movies, searchQuery, selectedGenre, sortBy, isLoading } = useSelector((state) => state.movies);
  
  const [genres, setGenres] = useState([]);
  const [localSearch, setLocalSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const uniqueGenres = getUniqueGenres(movies);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGenres(uniqueGenres);
  }, [movies]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    dispatch(searchMovies(value));
  };

  const handleGenreChange = (genre) => {
    dispatch(filterByGenre(genre));
    if (window.innerWidth < 768) {
      setShowFilters(false);
    }
  };

  const handleSortChange = (value) => {
    dispatch(sortMovies(value));
  };

  const handleClearFilters = () => {
    setLocalSearch('');
    dispatch(clearFilters());
    setShowFilters(false);
  };

  if (isLoading) {
    return (
      <div className="movies-loading">
        <div className="loading-spinner"></div>
        <p>Loading movies...</p>
      </div>
    );
  }

  const filteredCount = filteredMovies.length;
  const totalCount = movies.length;

  return (
    <div className="movies-page">
      <div className="movies-hero">
        <div className="hero-content">
          <h1 className="hero-title">Movie Collection</h1>
          <p className="hero-subtitle">
            Discover {totalCount} amazing films from different genres and eras
          </p>
        </div>
      </div>

      <div className="movies-container">
        <div className="movies-main">
          <div className="movies-controls">
            <div className="search-container">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search movies by title, description..."
                  value={localSearch}
                  onChange={handleSearch}
                  className="search-input"
                />
                {localSearch && (
                  <button 
                    className="clear-search-btn"
                    onClick={() => {
                      setLocalSearch('');
                      dispatch(searchMovies(''));
                    }}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>
              
              <div className="controls-right">
                <div className="movies-stats">
                  <span className="stat-badge">
                    {filteredCount} of {totalCount} movies
                  </span>
                </div>
                
                <button 
                  className="filter-toggle-btn"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
              </div>
            </div>

            {(searchQuery || selectedGenre) && (
              <div className="active-filters">
                <span className="filters-label">Active filters:</span>
                {searchQuery && (
                  <span className="active-filter">
                    Search: "{searchQuery}"
                    <button 
                      onClick={() => {
                        setLocalSearch('');
                        dispatch(searchMovies(''));
                      }}
                      className="remove-filter-btn"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedGenre && (
                  <span className="active-filter">
                    Genre: {selectedGenre}
                    <button 
                      onClick={() => dispatch(filterByGenre(''))}
                      className="remove-filter-btn"
                    >
                      ×
                    </button>
                  </span>
                )}
                <button 
                  onClick={handleClearFilters}
                  className="clear-all-filters-btn"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>

          <div className={`filters-panel ${showFilters ? 'open' : ''}`}>
            <div className="filters-header">
              <h3>Filters & Sorting</h3>
            </div>

            <div className="filter-section">
              <h4>Sort By</h4>
              <div className="sort-options">
                <button
                  className={`sort-option ${sortBy === 'rating' ? 'active' : ''}`}
                  onClick={() => handleSortChange('rating')}
                >
                  Highest Rating
                </button>
                <button
                  className={`sort-option ${sortBy === 'title' ? 'active' : ''}`}
                  onClick={() => handleSortChange('title')}
                >
                  Title A-Z
                </button>
                <button
                  className={`sort-option ${sortBy === 'newest' ? 'active' : ''}`}
                  onClick={() => handleSortChange('newest')}
                >
                  Newest First
                </button>
              </div>
            </div>

            <div className="filter-section">
              <h4>Genres</h4>
              <div className="genres-grid">
                <button
                  className={`genre-tag ${!selectedGenre ? 'active' : ''}`}
                  onClick={() => handleGenreChange('')}
                >
                  All Genres
                </button>
                {genres.map(genre => (
                  <button
                    key={genre}
                    className={`genre-tag ${selectedGenre === genre ? 'active' : ''}`}
                    onClick={() => handleGenreChange(genre)}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Movies Grid */}
          {filteredCount === 0 ? (
            <div className="no-results">
              <h3>No movies found</h3>
              <p>Try adjusting your search or filter criteria</p>
              <button onClick={handleClearFilters} className="primary-btn">
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="movies-grid-header">
                <h2>
                  {selectedGenre ? `${selectedGenre} Movies` : 'All Movies'}
                  <span className="movies-count"> ({filteredCount})</span>
                </h2>
                <div className="view-toggle">
                  <button className="view-option active">
                    <span className="view-icon">☷</span>
                    Grid
                  </button>
                  <button className="view-option">
                    <span className="view-icon">☰</span>
                    List
                  </button>
                </div>
              </div>

              <div className="movies-grid">
                {filteredMovies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movies;