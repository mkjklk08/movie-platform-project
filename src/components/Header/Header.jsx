import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);
  const { favorites } = useSelector((state) => state.movies);

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" className="logo-link" onClick={closeMenu}>
            <span className="logo-text">Movie<span className="logo-highlight">-Platform</span></span>
          </Link>
        </div>
        
        <button 
          className={`burger-menu ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          {user ? (
            <>
              <Link to="/movies" className="nav-link" onClick={closeMenu}>
                <span className="nav-icon">📽️</span>
                <span className="nav-text">Movies</span>
              </Link>
              <Link to="/favorites" className="nav-link" onClick={closeMenu}>
                <span className="nav-icon">❤️</span>
                <span className="nav-text">Favorites</span>
                {favorites.length > 0 && (
                  <span className="fav-count">{favorites.length}</span>
                )}
              </Link>
              {role === 'admin' && (
                <Link to="/admin" className="nav-link admin" onClick={closeMenu}>
                  <span className="nav-icon">⚙️</span>
                  <span className="nav-text">Admin</span>
                </Link>
              )}
              <div className="user-menu">
                <div className="user-avatar">
                  {user?.name?.charAt(0)}
                </div>
                <div className="user-info">
                  <span className="user-name">{user?.name} {user?.surname}</span>
                </div>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link to="/login" className="login-link" onClick={closeMenu}>
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;