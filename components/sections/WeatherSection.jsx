'use client'

import { useState, useEffect } from 'react'
import { MapPin, Thermometer, Eye, Wind, Droplets, ArrowLeft, ArrowRight } from 'lucide-react'
import CustomButton from '../ui/CustomButton'
import MainText from '../MainText'

const WeatherSection = () => {
    const [weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [currentHour, setCurrentHour] = useState(0)
    const [loadingMore, setLoadingMore] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

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
            { time: "12:00pm", temp: 32, icon: "sunny", time_epoch: Date.now() },
            { time: "01:00pm", temp: 34, icon: "sunny", time_epoch: Date.now() + (1 * 60 * 60 * 1000) },
            { time: "02:00pm", temp: 35, icon: "sunny", time_epoch: Date.now() + (2 * 60 * 60 * 1000) },
            { time: "03:00pm", temp: 36, icon: "sunny-rainy", time_epoch: Date.now() + (3 * 60 * 60 * 1000) },
            { time: "04:00pm", temp: 35, icon: "cloudy", time_epoch: Date.now() + (4 * 60 * 60 * 1000) },
            { time: "05:00pm", temp: 33, icon: "cloudy", time_epoch: Date.now() + (5 * 60 * 60 * 1000) },
            { time: "06:00pm", temp: 31, icon: "cloudy", time_epoch: Date.now() + (6 * 60 * 60 * 1000) },
            { time: "07:00pm", temp: 29, icon: "rainy", time_epoch: Date.now() + (7 * 60 * 60 * 1000) },
            { time: "08:00pm", temp: 27, icon: "rainy", time_epoch: Date.now() + (8 * 60 * 60 * 1000) },
            { time: "09:00pm", temp: 25, icon: "thunderstorm", time_epoch: Date.now() + (9 * 60 * 60 * 1000) },
            { time: "10:00pm", temp: 24, icon: "rainy", time_epoch: Date.now() + (10 * 60 * 60 * 1000) },
            { time: "11:00pm", temp: 22, icon: "cloudy-moon-rain", time_epoch: Date.now() + (11 * 60 * 60 * 1000) },
            { time: "12:00am", temp: 21, icon: "cloudy-moon-rain", time_epoch: Date.now() + (12 * 60 * 60 * 1000) },
            { time: "01:00am", temp: 20, icon: "cloudy-moon-rain", time_epoch: Date.now() + (13 * 60 * 60 * 1000) },
            { time: "02:00am", temp: 19, icon: "cloudy", time_epoch: Date.now() + (14 * 60 * 60 * 1000) },
            { time: "03:00am", temp: 18, icon: "cloudy", time_epoch: Date.now() + (15 * 60 * 60 * 1000) },
            { time: "04:00am", temp: 17, icon: "cloudy", time_epoch: Date.now() + (16 * 60 * 60 * 1000) },
            { time: "05:00am", temp: 18, icon: "sunny", time_epoch: Date.now() + (17 * 60 * 60 * 1000) },
            { time: "06:00am", temp: 20, icon: "sunny", time_epoch: Date.now() + (18 * 60 * 60 * 1000) },
            { time: "07:00am", temp: 22, icon: "sunny", time_epoch: Date.now() + (19 * 60 * 60 * 1000) },
            { time: "08:00am", temp: 25, icon: "sunny", time_epoch: Date.now() + (20 * 60 * 60 * 1000) },
            { time: "09:00am", temp: 27, icon: "sunny-rainy", time_epoch: Date.now() + (21 * 60 * 60 * 1000) },
            { time: "10:00am", temp: 29, icon: "sunny-rainy", time_epoch: Date.now() + (22 * 60 * 60 * 1000) },
            { time: "11:00am", temp: 31, icon: "sunny", time_epoch: Date.now() + (23 * 60 * 60 * 1000) },

            // اليوم الثاني - ظهر وعصر
            { time: "12:00pm", temp: 33, icon: "sunny", time_epoch: Date.now() + (24 * 60 * 60 * 1000) },
            { time: "01:00pm", temp: 35, icon: "sunny", time_epoch: Date.now() + (25 * 60 * 60 * 1000) },
            { time: "02:00pm", temp: 37, icon: "sunny", time_epoch: Date.now() + (26 * 60 * 60 * 1000) },
            { time: "03:00pm", temp: 38, icon: "sunny-rainy", time_epoch: Date.now() + (27 * 60 * 60 * 1000) },
            { time: "04:00pm", temp: 36, icon: "cloudy", time_epoch: Date.now() + (28 * 60 * 60 * 1000) },
            { time: "05:00pm", temp: 34, icon: "cloudy", time_epoch: Date.now() + (29 * 60 * 60 * 1000) },
            { time: "06:00pm", temp: 32, icon: "rainy", time_epoch: Date.now() + (30 * 60 * 60 * 1000) },
            { time: "07:00pm", temp: 30, icon: "rainy", time_epoch: Date.now() + (31 * 60 * 60 * 1000) },
            { time: "08:00pm", temp: 28, icon: "thunderstorm", time_epoch: Date.now() + (32 * 60 * 60 * 1000) },
            { time: "09:00pm", temp: 26, icon: "rainy", time_epoch: Date.now() + (33 * 60 * 60 * 1000) },
            { time: "10:00pm", temp: 25, icon: "cloudy-moon-rain", time_epoch: Date.now() + (34 * 60 * 60 * 1000) },
            { time: "11:00pm", temp: 23, icon: "cloudy-moon-rain", time_epoch: Date.now() + (35 * 60 * 60 * 1000) }
        ]
    }

    useEffect(() => {
        fetchWeatherData()
    }, [])

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                setIsMobile(window.innerWidth < 768)
            }
        }

        handleResize()
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize)
            return () => window.removeEventListener('resize', handleResize)
        }
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
                    hourly: data.data?.forecast?.forecastday?.flatMap((day, dayIndex) =>
                        day.hour?.map(hour => ({
                            time: new Date(hour.time).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
                            temp: Math.round(hour.temp_c),
                            icon: hour.condition?.icon || 'cloudy-moon-rain',
                            time_epoch: new Date(hour.time).getTime()
                        })) || []
                    ) || mockWeatherData.hourly
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

    const nextHour = () => {
        if (weatherData && weatherData.hourly.length > 0 && currentHour < weatherData.hourly.length - 1) {
            setCurrentHour(prev => prev + 1)
        }
    }

    const prevHour = () => {
        if (weatherData && weatherData.hourly.length > 0 && currentHour > 0) {
            setCurrentHour(prev => prev - 1)
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

    const getWeatherDescription = (temp, iconType) => {
        if (temp >= 35) return 'حار جداً'
        if (temp >= 30) return 'حار'
        if (temp >= 25) return 'معتدل ودافئ'
        if (temp >= 20) return 'معتدل'
        if (temp >= 15) return 'بارد نسبياً'
        if (temp >= 10) return 'بارد'

        // وصف حسب نوع الطقس
        if (iconType === 'rainy' || iconType === 'cloudy-moon-rain') return 'ماطر'
        if (iconType === 'cloudy') return 'غائم'
        if (iconType === 'sunny' || iconType === 'sunny-rainy') return 'مشمس'
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

    const formatDate = () => {
        const now = new Date()
        const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
        const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
        return `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`
    }

    if (loading) {
        return (
            <section className="relative bg-rasid-gray-light min-h-screen overflow-hidden">
                <div className="absolute bottom-[68%] md:bottom-[61%] inset-0 bg-[url('/images/bg_section.svg')] bg-cover -rotate-180 scale-x-[-1]"></div>
                <div className="relative z-10 flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
                </div>
                <div className="absolute top-[62%] md:top-[56%] inset-0 bg-[url('/images/bg_section.svg')] bg-cover scale-x-[-1]"></div>
            </section>
        )
    }

    return (
        <section className="relative bg-rasid-gray-light min-h-screen overflow-hidden">
            <div className="absolute bottom-[68%] md:bottom-[61%] inset-0 bg-[url('/images/bg_section.svg')] bg-cover -rotate-180 scale-x-[-1]"></div>

            <div className="relative z-10 py-8">
                <div className="max-w-4xl mx-auto">
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

                    <div className="mb-24 mt-10 md:mt-2">
                        <div className="flex items-center justify-center gap-2">
                            <div className="relative">

                            </div>
                            <div className="flex flex-col justify-center items-center gap-2 md:gap-4">
                                <div className="flex items-center gap-1">
                                    <img
                                        src="/images/rasid/chilly.svg"
                                        alt="chilly"
                                        className="w-8 h-8 md:w-10 md:h-10"
                                    />
                                    <span className="text-4xl md:text-6xl font-bold text-white">{weatherData.current.temp}°</span>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <img
                                        src="/images/rasid/clear-sunny.svg"
                                        alt="clear-sunny"
                                        className="w-10 h-10 md:w-14 md:h-14"
                                    />
                                    <div className="text-white text-center">
                                        <div className="text-md md:text-xl font-custom mb-1">{weatherData.current.condition}</div>
                                        <div className="text-sm md:text-md opacity-90">المحسوسة {weatherData.current.feels_like}°</div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="flex items-center justify-center gap-8 mt-3 md:mt-6">
                            <div className="text-white text-center">
                                <div className="text-md md:text-2xl font-bold">{weatherData.current.min}°</div>
                                <div className="text-sm md:text-md opacity-90">الصغرى</div>
                            </div>
                            <div className="w-px h-8 bg-white/30"></div>
                            <div className="text-white text-center">
                                <div className="text-md md:text-2xl font-bold">{weatherData.current.max}°</div>
                                <div className="text-sm md:text-md  opacity-90">العظمى</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 place-items-center gap-6 md:gap-14 md:flex justify-center items-center mb-12 mx-auto">
                        <div className="relative flex justify-center items-center w-28 h-28 md:w-36 md:h-36 group bg-white/40 backdrop-blur-sm rounded-full p-4 md:p-6 text-center border-2 border-blue-400 hover:bg-white/20 transition-colors cursor-pointer">
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-rasid-blue-light text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                                نسبة الرطوبة في الهواء
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-rasid-blue-light"></div>
                            </div>

                            <div className="absolute top-0 -start-1 w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                                <Droplets className="w-6 h-6 md:w-10 md:h-10 text-blue-300" />
                            </div>
                            <div>
                                <div className="text-rasid-blue-light font-bold text-sm md:text-lg font-custom mb-1">الرطوبة</div>
                                <div className="text-rasid-blue-light text-xl md:text-3xl font-bold">{weatherData.details.humidity}%</div>
                            </div>
                        </div>

                        <div className="relative flex justify-center items-center w-28 h-28 md:w-36 md:h-36 group bg-white/40 backdrop-blur-sm rounded-full p-4 md:p-6 text-center border-2 border-rasid-orange-dark hover:bg-white/20 transition-colors cursor-pointer">
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-rasid-orange-dark text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                                سرعة الرياح الحالية
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-rasid-orange-dark"></div>
                            </div>

                            <div className="absolute top-0 -start-1 w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                                <Wind className="w-6 h-6 md:w-10 md:h-10 text-rasid-orange-dark" />
                            </div>
                            <div>
                                <div className="text-rasid-orange-dark font-bold text-sm md:text-lg font-custom mb-1">سرعة الرياح</div>
                                <div className="text-rasid-orange-dark text-xl md:text-3xl font-bold">{weatherData.details.wind_speed}km/h</div>
                            </div>
                        </div>

                        <div className="relative flex justify-center items-center w-28 h-28 md:w-36 md:h-36 group bg-white/40 backdrop-blur-sm rounded-full p-4 md:p-6 text-center border-2 border-rasid-green hover:bg-white/20 transition-colors cursor-pointer">
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-rasid-green text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                                مدى الرؤية الحالي
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-rasid-green"></div>
                            </div>

                            <div className="absolute top-0 -start-1 w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center">
                                <Eye className="w-6 h-6 md:w-10 md:h-10 text-rasid-green" />
                            </div>
                            <div>
                                <div className="text-rasid-green font-bold text-sm md:text-lg font-custom mb-1">الرؤية</div>
                                <div className="text-rasid-green text-xl md:text-3xl font-bold">{weatherData.details.visibility}km</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-4xl mx-auto mt-20">
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
                    <div className="relative">
                        <button
                            onClick={prevHour}
                            className={`absolute right-2 md:right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 md:p-3 shadow-lg transition-all duration-300 ${currentHour === 0
                                ? 'opacity-30 cursor-not-allowed pointer-events-none'
                                : 'opacity-100 hover:scale-110'
                                }`}
                            disabled={currentHour === 0}
                            title="السابق"
                        >
                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                        </button>

                        <div className=" px-8 md:px-12" dir="rtl">
                            <div
                                className="flex gap-4 transition-transform duration-500 ease-in-out"
                                style={{
                                    transform: `translateX(${currentHour * (isMobile ? 300 : 156)}px)`
                                }}
                            >
                                {weatherData.hourly.map((hour, index) => {
                                    // التحقق من تغيير اليوم
                                    const currentHourDate = new Date(hour.time_epoch || Date.now() + (index * 60 * 60 * 1000))
                                    const prevHourDate = index > 0 ? new Date((weatherData.hourly[index - 1].time_epoch || Date.now() + ((index - 1) * 60 * 60 * 1000))) : null
                                    const isDayChange = prevHourDate && currentHourDate.getDate() !== prevHourDate.getDate()

                                    const getDayName = (date) => {
                                        const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
                                        return days[date.getDay()]
                                    }

                                    return (
                                        <div key={index} className="flex items-center gap-4">
                                            {isDayChange && (
                                                <div className="flex justify-center items-center bg-white backdrop-blur-sm rounded-xl px-4 py-6 text-center min-w-[100px]">
                                                    <div className='text-center'>
                                                        <div className="text-black text-sm font-bold">
                                                            {getDayName(currentHourDate)}
                                                        </div>
                                                        <div className="text-black text-xs opacity-80 mt-1">
                                                            {currentHourDate.getDate()}/{currentHourDate.getMonth() + 1}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <div className={`relative bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-[120px] md:min-w-[120px] w-full md:w-auto hover:bg-white/20 transition-colors cursor-pointer group flex-shrink-0 ${index === currentHour ? 'scale-102' : 'md:scale-95'}`}>
                                                <div className="absolute top-[-45px] left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
                                                    {getWeatherDescription(hour.temp, hour.icon)}
                                                    <div className="absolute top-full left-1/2 rotate-180 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-blue-500"></div>
                                                </div>

                                                <div className="text-white text-sm mb-2">{hour.time}</div>
                                                <div className="w-16 h-16 mx-auto mb-3">
                                                    <img
                                                        src={getWeatherIcon(hour.icon)}
                                                        alt="weather"
                                                        className="w-full h-full"
                                                    />
                                                </div>
                                                <div className="text-2xl font-bold text-white">{hour.temp}°</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <button
                                onClick={nextHour}
                                className={`absolute left-2 md:left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 md:p-3 shadow-lg transition-all duration-300 ${currentHour === weatherData.hourly.length - 1
                                    ? 'opacity-30 cursor-not-allowed pointer-events-none'
                                    : 'opacity-100 hover:scale-110'
                                    }`}
                                disabled={currentHour === weatherData.hourly.length - 1}
                                title="التالي"
                            >
                                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
                            </button>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <CustomButton
                            text={loadingMore ? "جاري التحميل..." : "المزيد"}
                            onClick={() => {
                                setLoadingMore(true)
                                setTimeout(() => {
                                    console.log('More weather data')
                                    setLoadingMore(false)
                                }, 1000)
                            }}
                            loading={loadingMore}
                        />
                    </div>
                </div>
            </div>

            <div className="absolute top-[62%] md:top-[56%] inset-0 bg-[url('/images/bg_section.svg')] bg-cover scale-x-[-1]"></div>
        </section>
    )
}

export default WeatherSection 