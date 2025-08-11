'use client'

import { useState, useEffect } from 'react'
import { MapPin, ArrowLeft } from 'lucide-react'
import MainText from '../MainText'
import CustomButton from '../ui/CustomButton'

const WeeklyForecastSection = () => {
    const [forecastData, setForecastData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)

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

    const getWeatherDescription = (minTemp, maxTemp, iconType) => {
        const avgTemp = (minTemp + maxTemp) / 2
        if (avgTemp >= 35) return 'حار جداً'
        if (avgTemp >= 30) return 'حار'
        if (avgTemp >= 25) return 'معتدل ودافئ'
        if (avgTemp >= 20) return 'معتدل'
        if (avgTemp >= 15) return 'بارد نسبياً'
        if (avgTemp >= 10) return 'بارد'

        // وصف حسب نوع الطقس
        if (iconType === 'rainy' || iconType === 'cloudy-moon-rain') return 'ماطر'
        if (iconType === 'cloudy') return 'غائم'
        if (iconType === 'sunny' || iconType === 'sunny-cloudy') return 'مشمس'
        if (iconType === 'thunderstorm') return 'عاصف'

        return 'صاف بشكل كبير'
    }

    const getHumidityDescription = (humidity) => {
        if (humidity >= 80) return 'رطوبة عالية جداً'
        if (humidity >= 70) return 'رطوبة عالية'
        if (humidity >= 60) return 'رطوبة معتدلة'
        if (humidity >= 50) return 'رطوبة منخفضة نسبياً'
        if (humidity >= 40) return 'رطوبة منخفضة'
        return 'رطوبة منخفضة جداً'
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
            <div className="relative z-10 py-8">
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

                    <div className="bg-white mx-4 rounded-2xl border border-gray-200 shadow-lg p-4 md:p-6">
                        <div className="space-y-4">
                            {forecastData.forecast.map((day, index) => (
                                <div key={index} className="grid grid-cols-2 gap-2 md:gap-6 items-center pb-3 border-b border-gray-100 last:border-b-0">
                                    <div className='grid grid-cols-4 items-center'>
                                        <div className="text-orange-500 text-xs md:text-lg font-semibold text-right">
                                            {day.day} {day.date}
                                        </div>

                                        <div className="w-6 h-6 md:w-8 md:h-8 relative group cursor-pointer">
                                            {/* Tooltip لوصف الطقس فوق الأيقونة */}
                                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-blue-500 text-white text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                                                {getWeatherDescription(day.minTemp, day.maxTemp, day.icon)}
                                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-500"></div>
                                            </div>

                                            <img
                                                src={getWeatherIcon(day.icon)}
                                                alt="weather"
                                                className="w-full h-full"
                                            />
                                        </div>

                                        <div className="text-gray-700 text-xs md:text-lg font-semibold text-center relative group cursor-pointer">
                                            {/* Tooltip لوصف الرطوبة فوق النسبة المئوية */}
                                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-cyan-500 text-white text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                                                {getHumidityDescription(day.humidity)}
                                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-cyan-500"></div>
                                            </div>

                                            {day.humidity}%
                                        </div>
                                        <div className='hidden md:block md:col-span-2'>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-6 gap-4 items-center'>
                                        <div className='col-span-1 md:col-span-2'>
                                        </div>
                                        <div className="col-span-1 text-blue-400 text-xs md:text-lg font-semibold text-center">
                                            {day.minTemp}°
                                        </div>

                                        <div className="col-span-3 md:col-span-2">
                                            <div className="h-1.5 md:h-2 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-full relative">
                                                <div
                                                    className="absolute top-0 right-0 h-full bg-gradient-to-l from-yellow-300 to-yellow-500 rounded-full"
                                                    style={{
                                                        width: `${((day.maxTemp - day.minTemp) / 20) * 100}%`,
                                                        right: `${((day.minTemp - 15) / 20) * 100}%`
                                                    }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="col-span-1 text-gray-700 text-xs md:text-lg font-semibold text-center">
                                            {day.maxTemp}°
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <CustomButton
                            text={loadingMore ? "جاري التحميل..." : "اعرض المزيد للطقس الساعي ل كل يوم"}
                            onClick={() => {
                                setLoadingMore(true)
                                setTimeout(() => {
                                    console.log('More weekly forecast data')
                                    setLoadingMore(false)
                                }, 1000)
                            }}
                            loading={loadingMore}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WeeklyForecastSection 