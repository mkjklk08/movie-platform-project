import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../store/slices/moviesSlice';
import RatingStars from '../RatingStars/RatingStars';
import './MovieCard.css';

const MovieCard = ({ movie, showAdminControls = false, onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.movies);
  const { role } = useSelector((state) => state.auth);
  const [showDetails, setShowDetails] = useState(false);

  const isFavorite = favorites.includes(movie.id);
  const isAdminMovie = movie.source === 'admin';
  const canEdit = role === 'admin' && isAdminMovie && showAdminControls;

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie.id));
    }
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={movie.poster} alt={movie.title} loading="lazy" />
        <div className="movie-rating">
          <span className="rating-star">★</span>
          <span className="rating-value">{movie.rating?.toFixed(1)}</span>
        </div>
        {isAdminMovie && (
          <div className="movie-source">Added by Admin</div>
        )}
      </div>

      <div className="movie-info">
        <div className="movie-header">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-genre">{movie.genre}</p>
        </div>
        
        {showDetails && (
          <p className="movie-description">{movie.description}</p>
        )}

        <div className="movie-actions">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="details-btn"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
          
          <button
            onClick={handleFavoriteToggle}
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? '★ Remove' : '☆ Add to Favorites'}
          </button>
          
          <a
            href={movie.watchLink}
            target="_blank"
            rel="noopener noreferrer"
            className="watch-btn"
          >
            Watch Now
          </a>

          {canEdit && (
            <>
              <button
                onClick={() => onEdit(movie)}
                className="edit-btn"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(movie.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </>
          )}
        </div>

        <div className="movie-rating-section">
          <RatingStars movieId={movie.id} />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;