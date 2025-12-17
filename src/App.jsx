import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllMovies } from './store/slices/moviesSlice'

import Header from './components/Header/Header'
import ProtectedRoute, { AdminRoute } from './components/ProtectedRoute'

import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Movies from './pages/Movies/Movies'
import MovieDetail from './pages/MoviesDetail/MovieDetail'
import Admin from './pages/Admin/Admin'
import Profile from './pages/Profile/Profile'

import './App.css'

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchAllMovies())
  }, [dispatch])

  return (
    <Router>
      <div className={`App ${!isAuthenticated ? 'login-page' : ''}`}>
        {isAuthenticated && <Header />}
        
        <main className="main-content">
          <Routes>
            <Route 
              path="/login" 
              element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} 
            />
            
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/movies" element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            } />
            
            <Route path="/movies/:id" element={
              <ProtectedRoute>
                <MovieDetail />
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            
            <Route path="/admin" element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            } />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App