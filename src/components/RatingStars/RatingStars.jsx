import { useState, useEffect } from 'react'
import { saveUserRating, getUserRating } from '../../services/mockApi'
import './RatingStars.css'

const RatingStars = ({ movieId }) => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  useEffect(() => {
    const loadRating = async () => {
      const savedRating = await getUserRating(movieId)
      setRating(savedRating)
    }
    loadRating()
  }, [movieId])

  const handleRating = async (newRating) => {
    setRating(newRating)
    try {
      await saveUserRating(movieId, newRating)
    } catch (error) {
      console.error('Failed to save rating:', error)
    }
  }

  return (
    <div className="rating-stars">
      <p className="rating-label">Your Rating:</p>
      <div className="stars-container">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleRating(ratingValue)}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
              className="star-btn"
              aria-label={`Rate ${ratingValue} out of 5 stars`}
            >
              <span
                className={`star ${
                  ratingValue <= (hover || rating) ? 'filled' : 'empty'
                }`}
              >
                ★
              </span>
            </button>
          )
        })}
      </div>
      <span className="rating-text">
        {rating > 0 ? `${rating}/5 stars` : 'Click to rate'}
      </span>
    </div>
  )
}

export default RatingStars