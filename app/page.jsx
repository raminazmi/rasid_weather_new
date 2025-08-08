'use client'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    fetchCurrentWeather,
    fetchForecast,
    fetchWeatherByLocation,
    addToSearchHistory,
    addToFavorites,
    removeFromFavorites
} from '../store/weatherSlice'
import HeroSection from '../components/sections/HeroSection'
import WeatherSection from '../components/sections/WeatherSection'
import WeeklyForecastSection from '../components/sections/WeeklyForecastSection'
import LatestNewsSection from '../components/sections/LatestNewsSection'
import WeatherNewsBanner from '../components/sections/WeatherNewsBanner'

export default function HomePage() {
    const dispatch = useDispatch()
    const {
        currentWeather,
        forecast,
        loading,
        error,
        favorites,
        searchHistory
    } = useSelector((state) => state.weather)

    const [showWeatherSection, setShowWeatherSection] = useState(false)

    const handleSearch = async (query) => {
        try {
            await dispatch(fetchCurrentWeather({ city: query }))
            await dispatch(fetchForecast({ city: query }))
            dispatch(addToSearchHistory(query))
            setShowWeatherSection(true)
        } catch (error) {
            console.error('Search error:', error)
        }
    }

    const handleLocationClick = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords
                    try {
                        await dispatch(fetchWeatherByLocation({ lat: latitude, lon: longitude }))
                        setShowWeatherSection(true)
                    } catch (error) {
                        console.error('Location error:', error)
                    }
                },
                (error) => {
                    console.error('Geolocation error:', error)
                }
            )
        }
    }

    return (
        <div className="min-h-screen">
            <HeroSection onSearch={handleSearch} />
            <WeatherSection />
            <WeeklyForecastSection />
            <LatestNewsSection />
            <div className="px-4 py-8 pb-48 bg-rasid-gray-light">
                <div className="max-w-6xl mx-auto">
                    <WeatherNewsBanner />
                </div>
            </div>
        </div>
    )
} 