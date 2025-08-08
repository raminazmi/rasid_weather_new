'use client'


import { useState, useRef, useEffect } from 'react'
import { Heart, MapPin, Thermometer, Droplets, Wind } from 'lucide-react'

const WeatherCard = ({ weather, isFavorite = false, onToggleFavorite, className = '' }) => {
  const [showDetails, setShowDetails] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setShowDetails(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  if (!weather) return null

  const getWeatherIcon = (weatherCode) => {
    const icons = {
      '01': '☀️',
      '02': '⛅',
      '03': '☁️',
      '04': '☁️',
      '09': '🌧️',
      '10': '🌦️',
      '11': '⛈️',
      '13': '🌨️',
      '50': '🌫️',
    }

    const code = weatherCode.toString().slice(0, 2)
    return icons[code] || '🌤️'
  }

  const getWeatherColor = (temp) => {
    if (temp >= 30) return 'text-red-500'
    if (temp >= 20) return 'text-orange-500'
    if (temp >= 10) return 'text-yellow-500'
    return 'text-blue-500'
  }

  return (
    <div
      ref={cardRef}
      className={`weather-card bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer rounded-lg p-6 ${className}`}
      onClick={() => setShowDetails(!showDetails)}
    >
      <div className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-600">
              {weather.name}, {weather.sys?.country}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite?.(weather)
            }}
            className={`p-1 rounded-full transition-colors ${isFavorite
              ? 'text-red-500 hover:text-red-600'
              : 'text-gray-400 hover:text-red-500'
              }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <div className="text-4xl mb-2">
            {getWeatherIcon(weather.weather[0]?.id)}
          </div>

          <div className={`text-3xl font-bold ${getWeatherColor(weather.main?.temp)}`}>
            {Math.round(weather.main?.temp)}°C
          </div>

          <div className="text-sm text-gray-600 mb-3">
            {weather.weather[0]?.description}
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Thermometer className="w-3 h-3" />
              <span>يشعر بـ {Math.round(weather.main?.feels_like)}°</span>
            </div>
            <div className="flex items-center gap-1">
              <Droplets className="w-3 h-3" />
              <span>{weather.main?.humidity}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Wind className="w-3 h-3" />
              <span>{Math.round(weather.wind?.speed)} كم/س</span>
            </div>
          </div>
        </div>

        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-200 animate-slide-up">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">الضغط:</span>
                <span className="font-medium mr-1">{weather.main?.pressure} hPa</span>
              </div>
              <div>
                <span className="text-gray-500">الرؤية:</span>
                <span className="font-medium mr-1">{weather.visibility / 1000} كم</span>
              </div>
              <div>
                <span className="text-gray-500">الرطوبة:</span>
                <span className="font-medium mr-1">{weather.main?.humidity}%</span>
              </div>
              <div>
                <span className="text-gray-500">سرعة الرياح:</span>
                <span className="font-medium mr-1">{Math.round(weather.wind?.speed)} كم/س</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WeatherCard 