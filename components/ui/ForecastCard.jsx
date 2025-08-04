'use client'

import { Calendar, Clock, Thermometer, Droplets, Wind } from 'lucide-react'

const ForecastCard = ({ forecast }) => {
    if (!forecast || !forecast.list) return null

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

    const getDayName = (dateString) => {
        const date = new Date(dateString)
        const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
        return days[date.getDay()]
    }

    const getTime = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleTimeString('ar-EG', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        })
    }

    // Group forecast by day
    const groupedForecast = forecast.list.reduce((acc, item) => {
        const date = new Date(item.dt * 1000).toDateString()
        if (!acc[date]) {
            acc[date] = []
        }
        acc[date].push(item)
        return acc
    }, {})

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4 font-custom">توقعات الطقس</h3>

            <div className="grid gap-4">
                {Object.entries(groupedForecast).slice(0, 5).map(([date, items]) => (
                    <div key={date} className="bg-white/90 backdrop-blur-sm border-0 shadow-md rounded-lg">
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-500" />
                                    <span className="font-medium text-gray-700 font-custom">
                                        {getDayName(date)}
                                    </span>
                                </div>
                                <span className="text-sm text-gray-500 font-custom">
                                    {new Date(date).toLocaleDateString('ar-EG')}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {items.slice(0, 4).map((item, index) => (
                                    <div key={index} className="text-center p-2 bg-gray-50 rounded-lg">
                                        <div className="text-sm text-gray-500 mb-1 flex items-center justify-center gap-1 font-custom">
                                            <Clock className="w-3 h-3" />
                                            {getTime(item.dt * 1000)}
                                        </div>

                                        <div className="text-2xl mb-1">
                                            {getWeatherIcon(item.weather[0]?.id)}
                                        </div>

                                        <div className="text-lg font-semibold text-gray-800 font-custom">
                                            {Math.round(item.main?.temp)}°C
                                        </div>

                                        <div className="text-xs text-gray-600 mb-2 font-custom">
                                            {item.weather[0]?.description}
                                        </div>

                                        <div className="space-y-1 text-xs text-gray-500 font-custom">
                                            <div className="flex items-center justify-center gap-1">
                                                <Thermometer className="w-3 h-3" />
                                                <span>يشعر بـ {Math.round(item.main?.feels_like)}°</span>
                                            </div>
                                            <div className="flex items-center justify-center gap-1">
                                                <Droplets className="w-3 h-3" />
                                                <span>{item.main?.humidity}%</span>
                                            </div>
                                            <div className="flex items-center justify-center gap-1">
                                                <Wind className="w-3 h-3" />
                                                <span>{Math.round(item.wind?.speed)} كم/س</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ForecastCard 