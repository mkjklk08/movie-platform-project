import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addMovie, updateMovie, deleteMovie } from '../../store/slices/moviesSlice'
import MovieCard from '../../components/MovieCard/MovieCard'
import MovieForm from '../../components/MovieForm/MovieForm'
import './Admin.css'

const Admin = () => {
  const dispatch = useDispatch()
  const { movies } = useSelector((state) => state.movies)
  const [showForm, setShowForm] = useState(false)
  const [editingMovie, setEditingMovie] = useState(null)
  const [formMode, setFormMode] = useState('add')

  const adminMovies = movies.filter(movie => movie.source === 'admin')

  const handleAddMovie = () => {
    setFormMode('add')
    setEditingMovie(null)
    setShowForm(true)
  }

  const handleEditMovie = (movie) => {
    setFormMode('edit')
    setEditingMovie(movie)
    setShowForm(true)
  }

  const handleDeleteMovie = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        dispatch(deleteMovie(id))
      } catch (error) {
        console.error('Failed to delete movie:', error)
      }
    }
  }

  const handleFormSubmit = async (formData) => {
    try {
      if (formMode === 'add') {
        dispatch(addMovie(formData))
      } else if (formMode === 'edit' && editingMovie) {
        dispatch(updateMovie({ id: editingMovie.id, movieData: formData }))
      }
      setShowForm(false)
      setEditingMovie(null)
    } catch (error) {
      console.error('Failed to save movie:', error)
    }
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingMovie(null)
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <p className="admin-subtitle">
          Manage movies in the platform. You can add, edit, or delete movies.
        </p>
      </div>

      <div className="admin-stats">
        <div className="admin-stat">
          <h3>Total Movies</h3>
          <p className="stat-number">{movies.length}</p>
        </div>
        <div className="admin-stat">
          <h3>Admin Movies</h3>
          <p className="stat-number">{adminMovies.length}</p>
        </div>
        <div className="admin-stat">
          <h3>TMDB Movies</h3>
          <p className="stat-number">{movies.length - adminMovies.length}</p>
        </div>
      </div>

      <div className="admin-actions">
        <button onClick={handleAddMovie} className="add-movie-btn">
          + Add New Movie
        </button>
      </div>

      {showForm && (
        <div className="form-modal">
          <div className="form-modal-content">
            <MovieForm
              initialData={editingMovie || {}}
              onSubmit={handleFormSubmit}
              onCancel={handleCancelForm}
            />
          </div>
        </div>
      )}

      <div className="admin-movies-section">
        <h2>Movies Added by Admin ({adminMovies.length})</h2>
        {adminMovies.length === 0 ? (
          <div className="no-admin-movies">
            <p>No movies added by admin yet.</p>
            <button onClick={handleAddMovie} className="btn-primary">
              Add Your First Movie
            </button>
          </div>
        ) : (
          <div className="admin-movies-grid">
            {adminMovies.map(movie => (
              <div key={movie.id} className="admin-movie-item">
                <MovieCard
                  movie={movie}
                  showAdminControls={true}
                  onEdit={handleEditMovie}
                  onDelete={handleDeleteMovie}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin