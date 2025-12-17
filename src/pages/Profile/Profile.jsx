import { useSelector } from 'react-redux'
import './Profile.css'

const Profile = () => {
  const { user, role } = useSelector((state) => state.auth)
  const { favorites } = useSelector((state) => state.movies)

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="profile-title">
            <h1>{user?.name}</h1>
            <div className={`profile-role ${role}`}>
              {role === 'admin' ? 'Administrator' : 'Regular User'}
            </div>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h2>Account Information</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Personal Details</h3>
              <div className="info-item">
                <span className="info-label">Full Name:</span>
                <span className="info-value">{user?.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{user?.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">User ID:</span>
                <span className="info-value">{user?.id}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Account Type:</span>
                <span className={`info-value role ${role}`}>
                  {role === 'admin' ? 'Administrator' : 'Standard User'}
                </span>
              </div>
            </div>

            <div className="info-card">
              <h3>Statistics</h3>
              <div className="info-item">
                <span className="info-label">Favorites:</span>
                <span className="info-value">{favorites.length} movies</span>
              </div>
              <div className="info-item">
                <span className="info-label">Member Since:</span>
                <span className="info-value">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Last Login:</span>
                <span className="info-value">Just now</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Account Features</h2>
          <div className="features-grid">
            {role === 'admin' ? (
              <>
                <div className="feature-card admin">
                  <h3>Admin Panel</h3>
                  <p>Full access to manage all movies and content</p>
                </div>
                <div className="feature-card admin">
                  <div className="feature-icon">➕</div>
                  <h3>Add Movies</h3>
                  <p>Add new movies to the platform</p>
                </div>
                <div className="feature-card admin">
                  <h3>Edit Content</h3>
                  <p>Edit existing movies and information</p>
                </div>
                <div className="feature-card admin">
                  <h3>Remove Content</h3>
                  <p>Delete movies from the platform</p>
                </div>
              </>
            ) : (
              <>
                <div className="feature-card">
                  <h3>Browse Movies</h3>
                  <p>Access to all movies in the catalog</p>
                </div>
                <div className="feature-card">
                  <h3>Favorites</h3>
                  <p>Save your favorite movies</p>
                </div>
                <div className="feature-card">
                  <h3>Rate Movies</h3>
                  <p>Rate and review movies you've watched</p>
                </div>
                <div className="feature-card">
                  <h3>Search & Filter</h3>
                  <p>Find movies by genre, rating, and more</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile