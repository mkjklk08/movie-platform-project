import { useState, useEffect } from 'react'
import './MovieForm.css'

const MovieForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    rating: 0,
    poster: '',
    watchLink: '',
  })

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        genre: initialData.genre || '',
        rating: initialData.rating || 0,
        poster: initialData.poster || '',
        watchLink: initialData.watchLink || '',
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title || !formData.description || !formData.genre) {
      alert('Please fill in all required fields')
      return
    }
    onSubmit(formData)
  }

  const genreOptions = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime',
    'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance',
    'Sci-Fi', 'Thriller', 'Documentary', 'Family', 'Music'
  ]

  return (
    <form onSubmit={handleSubmit} className="movie-form">
      <h3>{initialData.id ? 'Edit Movie' : 'Add New Movie'}</h3>
      
      <div className="form-group">
        <label>Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Movie title"
        />
      </div>
      
      <div className="form-group">
        <label>Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Movie description"
          rows="3"
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Genre *</label>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          >
            <option value="">Select a genre</option>
            {genreOptions.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Rating (0-10)</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="0"
            max="10"
            step="0.1"
            placeholder="0-10"
          />
        </div>
      </div>
      
      <div className="form-group">
        <label>Poster URL *</label>
        <input
          type="url"
          name="poster"
          value={formData.poster}
          onChange={handleChange}
          required
          placeholder="https://example.com/poster.jpg"
        />
      </div>
      
      <div className="form-group">
        <label>Watch Link *</label>
        <input
          type="url"
          name="watchLink"
          value={formData.watchLink}
          onChange={handleChange}
          required
          placeholder="https://streaming-service.com/movie"
        />
      </div>
      
      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {initialData.id ? 'Update Movie' : 'Add Movie'}
        </button>
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  )
}

export default MovieForm