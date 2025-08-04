import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// API Configuration
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || 'your-api-key'
const BASE_URL = process.env.NEXT_PUBLIC_WEATHER_BASE_URL || 'https://rasidweather.com/api'

export const fetchCurrentWeather = createAsyncThunk(
    'weather/fetchCurrentWeather',
    async ({ lat, lon, city }) => {
        try {
            let url = `${BASE_URL}/weather`
            const params = {
                timezone: 'Asia/Riyadh',
                country_code: 'SA'
            }

            if (lat && lon) {
                params.latitude = lat
                params.longitude = lon
            } else if (city) {
                params.latitude = 24.7136
                params.longitude = 46.6753
            }

            const response = await axios.get(url, {
                params,
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'ik': API_KEY,
                    'Accept': 'application/json'
                }
            })
            return response.data
        } catch (error) {
            throw error.response?.data || error.message
        }
    }
)

export const fetchForecast = createAsyncThunk(
    'weather/fetchForecast',
    async ({ lat, lon, city }) => {
        try {
            let url = `${BASE_URL}/weather/chart`
            const params = {
                timezone: 'Asia/Riyadh',
                country_code: 'SA'
            }

            if (lat && lon) {
                params.latitude = lat
                params.longitude = lon
            } else if (city) {
                params.latitude = 24.7136
                params.longitude = 46.6753
            }

            const response = await axios.get(url, {
                params,
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'ik': API_KEY,
                    'Accept': 'application/json'
                }
            })
            return response.data
        } catch (error) {
            throw error.response?.data || error.message
        }
    }
)

export const fetchWeatherByLocation = createAsyncThunk(
    'weather/fetchWeatherByLocation',
    async ({ lat, lon }, { dispatch }) => {
        try {
            await dispatch(fetchCurrentWeather({ lat, lon }))
            await dispatch(fetchForecast({ lat, lon }))

            return { lat, lon }
        } catch (error) {
            throw error
        }
    }
)

const initialState = {
    currentWeather: null,
    forecast: null,
    location: null,
    loading: false,
    error: null,
    searchHistory: [],
    favorites: [],
}

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload
        },
        addToSearchHistory: (state, action) => {
            const newSearch = {
                city: action.payload,
                timestamp: new Date().toISOString(),
            }
            state.searchHistory = [newSearch, ...state.searchHistory.slice(0, 9)]
        },
        addToFavorites: (state, action) => {
            if (!state.favorites.find(fav => fav.id === action.payload.id)) {
                state.favorites.push(action.payload)
            }
        },
        removeFromFavorites: (state, action) => {
            state.favorites = state.favorites.filter(fav => fav.id !== action.payload)
        },
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            // Current Weather
            .addCase(fetchCurrentWeather.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
                state.loading = false
                state.currentWeather = action.payload
                state.error = null
            })
            .addCase(fetchCurrentWeather.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // Forecast
            .addCase(fetchForecast.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchForecast.fulfilled, (state, action) => {
                state.loading = false
                state.forecast = action.payload
                state.error = null
            })
            .addCase(fetchForecast.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // Location
            .addCase(fetchWeatherByLocation.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchWeatherByLocation.fulfilled, (state, action) => {
                state.loading = false
                state.location = action.payload
                state.error = null
            })
            .addCase(fetchWeatherByLocation.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    },
})

export const {
    setLocation,
    addToSearchHistory,
    addToFavorites,
    removeFromFavorites,
    clearError,
} = weatherSlice.actions

export default weatherSlice.reducer 