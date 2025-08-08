'use client'

import { useState, useEffect } from 'react'
import { MapPin, Thermometer, Eye, Wind, Droplets, ArrowLeft, ArrowRight } from 'lucide-react'
import CustomButton from '../ui/CustomButton'
import MainText from '../MainText'

const WeatherSection = () => {
    const [weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [currentHour, setCurrentHour] = useState(0)

    const mockWeatherData = {
        location: "القاهرة",
        current: {
            temp: 36,
            feels_like: 29,
            condition: "صافي",
            icon: "sunny-rainy",
            min: 22,
            max: 30
        },
        details: {
            visibility: 32,
            wind_speed: 20,
            humidity: 85
        },
        hourly: [
            { time: "12:00pm", temp: 22, icon: "cloudy-moon-rain" },
            { time: "01:00pm", temp: 20, icon: "cloudy-moon-rain" },
            { time: "02:00pm", temp: 20, icon: "cloudy-moon-rain" },
            { time: "03:00pm", temp: 19, icon: "cloudy-moon-rain" },
            { time: "04:00pm", temp: 17, icon: "cloudy-moon-rain" },
            { time: "05:00pm", temp: 22, icon: "cloudy-moon-rain" },
            { time: "06:00pm", temp: 21, icon: "cloudy-moon-rain" }
        ]
    }

    useEffect(() => {
        fetchWeatherData()
    }, [])

    const fetchWeatherData = async () => {
        try {
            const response = await fetch('https://rasidweather.com/api/weather?latitude=31.03408&longitude=30.46823&timezone=Africa/Cairo&country_code=eg')
            if (response.ok) {
                const data = await response.json()
                const formattedData = {
                    location: data.data?.location?.name || mockWeatherData.location,
                    current: {
                        temp: data.data?.current?.temp || mockWeatherData.current.temp,
                        feels_like: data.data?.current?.feels_like || mockWeatherData.current.feels_like,
                        condition: data.data?.current?.condition?.text || mockWeatherData.current.condition,
                        icon: data.data?.current?.condition?.icon || mockWeatherData.current.icon,
                        min: data.data?.forecast?.forecastday?.[0]?.day?.mintemp_c || mockWeatherData.current.min,
                        max: data.data?.forecast?.forecastday?.[0]?.day?.maxtemp_c || mockWeatherData.current.max
                    },
                    details: {
                        visibility: data.data?.current?.vis_km || mockWeatherData.details.visibility,
                        wind_speed: data.data?.current?.wind_kph || mockWeatherData.details.wind_speed,
                        humidity: data.data?.current?.humidity || mockWeatherData.details.humidity
                    },
                    hourly: data.data?.forecast?.forecastday?.[0]?.hour?.map(hour => ({
                        time: new Date(hour.time).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
                        temp: Math.round(hour.temp_c),
                        icon: hour.condition?.icon || 'cloudy-moon-rain'
                    })) || mockWeatherData.hourly
                }
                setWeatherData(formattedData)
            } else {
                setWeatherData(mockWeatherData)
            }
        } catch (error) {
            console.error('Error fetching weather data:', error)
            setWeatherData(mockWeatherData)
        } finally {
            setLoading(false)
        }
    }

    const getWeatherIcon = (iconType) => {
        const iconMap = {
            'sunny': '/images/rasid/9.svg',
            'cloudy': '/images/rasid/1.svg',
            'rainy': '/images/rasid/4.svg',
            'thunderstorm': '/images/rasid/3.svg',
            'sunny-rainy': '/images/rasid/7.svg',
            'cloudy-moon-rain': '/images/rasid/8.svg'
        }
        return iconMap[iconType] || '/images/rasid/9.svg'
    }

    const formatDate = () => {
        const now = new Date()
        const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
        const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
        return `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`
    }

    if (loading) {
        return (
            <div className="relative bg-gradient-to-br from-orange-400 to-orange-500 min-h-screen">
                <div className="absolute inset-0 bg-[url('/images/bg_section.svg')] bg-cover bg-center opacity-20"></div>
                <div className="relative z-10 flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
                </div>
            </div>
        )
    }

    return (
        <section className="relative bg-rasid-gray-light min-h-screen overflow-hidden">
            <div className="absolute bottom-[63%] inset-0 bg-[url('/images/bg_section.svg')] bg-cover -rotate-180 scale-x-[-1]"></div>

            <div className="relative z-10 px-4 py-8">
                <div className="max-w-4xl mx-auto mb-12">
                    <MainText
                        title="طقس الان"
                        titleHighlight="الـ"
                        titleColor="text-white"
                        highlightColor="text-white"
                        highlightBgColor="bg-rasid-blue-light"
                        location={weatherData.location}
                        locationIconColor="text-rasid-blue-light"
                        description={formatDate()}
                        descriptionColor="!text-white"
                        lineColor="bg-white"
                    />

                    <div className="mb-24">
                        <div className="flex items-center justify-center gap-2">
                            <div className="relative">

                            </div>
                            <div className="flex flex-col justify-center items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <img
                                        src="/images/rasid/chilly.svg"
                                        alt="chilly"
                                        className="w-10 h-10"
                                    />
                                    <span className="text-6xl font-bold text-white">{weatherData.current.temp}°</span>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <img
                                        src="/images/rasid/clear-sunny.svg"
                                        alt="clear-sunny"
                                        className="w-14 h-14"
                                    />
                                    <div className="text-white text-center">
                                        <div className="text-xl font-custom mb-1">{weatherData.current.condition}</div>
                                        <div className="text-md opacity-90">المحسوسة {weatherData.current.feels_like}°</div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="flex items-center justify-center gap-8 mt-6">
                            <div className="text-white text-center">
                                <div className="text-2xl font-bold">{weatherData.current.min}°</div>
                                <div className="text-sm opacity-90">الصغرى</div>
                            </div>
                            <div className="w-px h-8 bg-white/30"></div>
                            <div className="text-white text-center">
                                <div className="text-2xl font-bold">{weatherData.current.max}°</div>
                                <div className="text-sm opacity-90">العظمى</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:flex justify-center items-center gap-14 mb-12">
                        <div className="relative flex justify-center items-center w-36 h-36 group bg-white/40 backdrop-blur-sm rounded-full p-6 text-center border-2 border-blue-400 hover:bg-white/20 transition-colors cursor-pointer">
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-rasid-blue-light text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                                نسبة الرطوبة في الهواء
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-rasid-blue-light"></div>
                            </div>

                            <div className="absolute top-0 -start-1 w-12 h-12 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                                <Droplets className="w-10 h-10 text-blue-300" />
                            </div>
                            <div>
                                <div className="text-rasid-blue-light font-bold text-lg font-custom mb-1">الرطوبة</div>
                                <div className="text-rasid-blue-light text-3xl font-bold">{weatherData.details.humidity}%</div>
                            </div>
                        </div>

                        <div className="relative flex justify-center items-center w-36 h-36 group bg-white/40 backdrop-blur-sm rounded-full p-6 text-center border-2 border-rasid-orange-dark hover:bg-white/20 transition-colors cursor-pointer">
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-rasid-orange-dark text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                                سرعة الرياح الحالية
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-rasid-orange-dark"></div>
                            </div>

                            <div className="absolute top-0 -start-1 w-12 h-12 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                                <Wind className="w-10 h-10 text-rasid-orange-dark" />
                            </div>
                            <div>
                                <div className="text-rasid-orange-dark font-bold text-lg font-custom mb-1">سرعة الرياح</div>
                                <div className="text-rasid-orange-dark text-3xl font-bold">{weatherData.details.wind_speed}km/h</div>
                            </div>
                        </div>

                        <div className="relative flex justify-center items-center w-36 h-36 group bg-white/40 backdrop-blur-sm rounded-full p-6 text-center border-2 border-rasid-green hover:bg-white/20 transition-colors cursor-pointer">
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-rasid-green text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                                مدى الرؤية الحالي
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-rasid-green"></div>
                            </div>

                            <div className="absolute top-0 -start-1 w-12 h-12 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                                <Eye className="w-10 h-10 text-rasid-green" />
                            </div>
                            <div>
                                <div className="text-rasid-green font-bold text-lg font-custom mb-1">الرؤية</div>
                                <div className="text-rasid-green text-3xl font-bold">{weatherData.details.visibility}km</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-4xl mx-auto pt-16">
                    <MainText
                        title="قعات الطقس الساعي"
                        titleHighlight="تو"
                        titleColor="text-white"
                        highlightColor="text-white"
                        highlightBgColor="bg-yellow-400"
                        location={weatherData.location}
                        locationIconColor="text-yellow-300"
                        description={formatDate()}
                        descriptionColor="!text-white"
                        lineColor="bg-gray-300"
                    />
                </div>
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-end mb-6">
                        <div className="bg-blue-500 rounded-full px-4 py-2 text-white text-sm">
                            صاف بشكل كبير
                        </div>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setCurrentHour(prev => Math.max(0, prev - 1))}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 rounded-full p-2 text-white hover:bg-white/30 transition-colors hover:scale-110 active:scale-95"
                            title="السابق"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>

                        <div className="flex gap-4 overflow-x-auto scrollbar-hide px-12">
                            {weatherData.hourly.map((hour, index) => (
                                <div
                                    key={index}
                                    className="relative bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-[120px] hover:bg-white/20 transition-colors cursor-pointer group"
                                >
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                                        {hour.time} - {hour.temp}°
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
                                    </div>

                                    <div className="text-gray-300 text-sm mb-2">{hour.time}</div>
                                    <div className="w-16 h-16 mx-auto mb-3">
                                        <img
                                            src={getWeatherIcon(hour.icon)}
                                            alt="weather"
                                            className="w-full h-full"
                                        />
                                    </div>
                                    <div className="text-2xl font-bold text-white">{hour.temp}°</div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentHour(prev => Math.min(weatherData.hourly.length - 1, prev + 1))}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 rounded-full p-2 text-white hover:bg-white/30 transition-colors hover:scale-110 active:scale-95"
                            title="التالي"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="text-center mt-8">
                        <CustomButton
                            text="المزيد"
                            onClick={() => {
                                console.log('More weather data')
                            }}
                            icon={<ArrowLeft className="w-5 h-5" />}
                        />
                    </div>
                </div>
            </div>

            <div className="absolute top-[50%] inset-0 bg-[url('/images/bg_section.svg')] bg-cover scale-x-[-1]"></div>

        </section>
    )
}

export default WeatherSection 