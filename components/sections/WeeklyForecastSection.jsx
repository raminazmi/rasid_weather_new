'use client'

import { useState, useEffect } from 'react'
import { MapPin, ArrowLeft } from 'lucide-react'
import MainText from '../MainText'
import CustomButton from '../ui/CustomButton'

const WeeklyForecastSection = () => {
    const [forecastData, setForecastData] = useState(null)
    const [loading, setLoading] = useState(true)

    const mockForecastData = {
        location: "القاهرة",
        forecast: [
            {
                day: "السبت",
                date: "6/1",
                minTemp: 28,
                maxTemp: 31,
                humidity: 56,
                icon: "sunny-cloudy"
            },
            {
                day: "الاحد",
                date: "6/2",
                minTemp: 28,
                maxTemp: 31,
                humidity: 56,
                icon: "sunny-cloudy"
            },
            {
                day: "الاثنين",
                date: "6/3",
                minTemp: 28,
                maxTemp: 31,
                humidity: 56,
                icon: "sunny-cloudy"
            },
            {
                day: "الثلاثاء",
                date: "6/4",
                minTemp: 28,
                maxTemp: 31,
                humidity: 56,
                icon: "sunny-cloudy"
            },
            {
                day: "الاربعاء",
                date: "6/5",
                minTemp: 28,
                maxTemp: 31,
                humidity: 56,
                icon: "sunny-cloudy"
            },
            {
                day: "الخميس",
                date: "6/6",
                minTemp: 28,
                maxTemp: 31,
                humidity: 56,
                icon: "sunny-cloudy"
            },
            {
                day: "الجمعة",
                date: "6/7",
                minTemp: 28,
                maxTemp: 31,
                humidity: 56,
                icon: "sunny-cloudy"
            }
        ]
    }

    useEffect(() => {
        fetchForecastData()
    }, [])

    const fetchForecastData = async () => {
        try {
            const response = await fetch('https://rasidweather.com/api/weather?latitude=31.03408&longitude=30.46823&timezone=Africa/Cairo&country_code=eg')
            if (response.ok) {
                const data = await response.json()
                const formattedData = {
                    location: data.data?.location?.name || mockForecastData.location,
                    forecast: data.data?.forecast?.forecastday?.map((day, index) => {
                        const date = new Date(day.date)
                        const days = ['الاحد', 'الاثنين', 'الثلاثاء', 'الاربعاء', 'الخميس', 'الجمعة', 'السبت']
                        return {
                            day: days[date.getDay()],
                            date: `${date.getMonth() + 1}/${date.getDate()}`,
                            minTemp: Math.round(day.day.mintemp_c),
                            maxTemp: Math.round(day.day.maxtemp_c),
                            humidity: day.day.avghumidity,
                            icon: day.day.condition?.icon || 'sunny-cloudy'
                        }
                    }) || mockForecastData.forecast
                }
                setForecastData(formattedData)
            } else {
                setForecastData(mockForecastData)
            }
        } catch (error) {
            console.error('Error fetching forecast data:', error)
            setForecastData(mockForecastData)
        } finally {
            setLoading(false)
        }
    }

    const getWeatherIcon = (iconType) => {
        const iconMap = {
            'sunny': '/images/rasid/clear-sunny.svg',
            'cloudy': '/images/rasid/cloudy.svg',
            'rainy': '/images/rasid/rainy-cloud.svg',
            'thunderstorm': '/images/rasid/thunderstorm.svg',
            'sunny-cloudy': '/images/rasid/sunny-storm.svg',
            'cloudy-moon-rain': '/images/rasid/rainy-cloud.svg'
        }
        return iconMap[iconType] || '/images/rasid/sunny-storm.svg'
    }

    if (loading) {
        return (
            <div className="relative bg-gradient-to-br from-orange-100 to-blue-100 min-h-screen">
                <div className="absolute inset-0 bg-[url('/images/bg_section.svg')] bg-cover bg-center opacity-10"></div>
                <div className="relative z-10 flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-400"></div>
                </div>
            </div>
        )
    }

    return (
        <section className="relative bg-rasid-gray-light overflow-hidden">
            <div className="relative z-10 px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <MainText
                        title="قعات الطقس 7 ايام"
                        titleHighlight="تو"
                        titleColor="text-rasid-orange"
                        highlightColor="text-rasid-orange"
                        highlightBgColor="bg-rasid-blue-light"
                        location="القاهرة"
                        locationIconColor="text-rasid-blue-light"
                        lineColor="bg-rasid-blue-light"
                    />

                    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
                        <div className="space-y-4">
                            {forecastData.forecast.map((day, index) => (
                                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                                    <div className="text-orange-500 text-lg font-semibold text-right min-w-[80px]">
                                        {day.day} {day.date}
                                    </div>

                                    <div className="w-8 h-8 mx-4">
                                        <img
                                            src={getWeatherIcon(day.icon)}
                                            alt="weather"
                                            className="w-full h-full"
                                        />
                                    </div>

                                    <div className="text-gray-700 text-lg font-semibold w-16 text-center">
                                        {day.humidity}%
                                    </div>

                                    <div className="text-blue-400 text-lg font-semibold w-12 text-center">
                                        {day.minTemp}°
                                    </div>

                                    <div className="flex-1 mx-4">
                                        <div className="h-2 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-full relative">
                                            <div
                                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full"
                                                style={{
                                                    width: `${((day.maxTemp - day.minTemp) / 20) * 100}%`,
                                                    left: `${((day.minTemp - 15) / 20) * 100}%`
                                                }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="text-gray-700 text-lg font-semibold w-12 text-center">
                                        {day.maxTemp}°
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <CustomButton
                            text="اعرض المزيد للطقس الساعي ل كل يوم"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WeeklyForecastSection 