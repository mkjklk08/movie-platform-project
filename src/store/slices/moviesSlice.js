import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllMovies } from '../../services/moviesService'
import { addMovieToMockAPI, updateMovieInMockAPI, deleteMovieFromMockAPI } from '../../services/mockApi'

export const fetchAllMovies = createAsyncThunk(
  'movies/fetchAll',
  async () => {
    const movies = await getAllMovies()
    return movies
  }
)

export const addMovie = createAsyncThunk(
  'movies/add',
  async (movieData, { rejectWithValue }) => {
    try {
      const response = await addMovieToMockAPI(movieData)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add movie')
    }
  }
)

export const updateMovie = createAsyncThunk(
  'movies/update',
  async ({ id, movieData }, { rejectWithValue }) => {
    try {
      const response = await updateMovieInMockAPI(id, movieData)
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update movie')
    }
  }
)

export const deleteMovie = createAsyncThunk(
  'movies/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteMovieFromMockAPI(id)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete movie')
    }
  }
)

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    filteredMovies: [],
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    isLoading: false,
    error: null,
    searchQuery: '',
    selectedGenre: '',
    sortBy: 'rating',
  },
  reducers: {
    filterByGenre: (state, action) => {
      state.selectedGenre = action.payload
      applyFilters(state)
    },
    searchMovies: (state, action) => {
      state.searchQuery = action.payload
      applyFilters(state)
    },
    sortMovies: (state, action) => {
      state.sortBy = action.payload
      applyFilters(state)
    },
    addToFavorites: (state, action) => {
      const movieId = action.payload
      if (!state.favorites.includes(movieId)) {
        state.favorites.push(movieId)
        localStorage.setItem('favorites', JSON.stringify(state.favorites))
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(id => id !== action.payload)
      localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },
    clearFilters: (state) => {
      state.searchQuery = ''
      state.selectedGenre = ''
      state.filteredMovies = state.movies
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovies.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        state.isLoading = false
        state.movies = action.payload
        state.filteredMovies = action.payload
      })
      .addCase(fetchAllMovies.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload)
        applyFilters(state)
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex(m => m.id === action.payload.id)
        if (index !== -1) {
          state.movies[index] = action.payload
          applyFilters(state)
        }
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter(movie => movie.id !== action.payload)
        applyFilters(state)
      })
  }
})

function applyFilters(state) {
  let filtered = [...state.movies]
  
  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase()
    filtered = filtered.filter(movie =>
      movie.title.toLowerCase().includes(query) ||
      movie.description.toLowerCase().includes(query)
    )
  }
  
  if (state.selectedGenre) {
    filtered = filtered.filter(movie =>
      movie.genre && movie.genre.includes(state.selectedGenre)
    )
  }
  
  filtered.sort((a, b) => {
    switch (state.sortBy) {
      case 'rating':
        return b.rating - a.rating
      case 'title':
        return a.title.localeCompare(b.title)
      case 'newest':
        return b.id - a.id
      default:
        return 0
    }
  })
  
  state.filteredMovies = filtered
}

export const {
  filterByGenre,
  searchMovies,
  sortMovies,
  addToFavorites,
  removeFromFavorites,
  clearFilters
} = moviesSlice.actions

export default moviesSlice.reducer