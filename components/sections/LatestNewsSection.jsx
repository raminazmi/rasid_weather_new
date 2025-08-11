'use client'

import { useState, useEffect } from 'react'
import { Share2, Bookmark, MessageCircle, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import MainText from '../MainText'
import { fetchHomeNews } from '../../utils/api'

const LatestNewsSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [newsData, setNewsData] = useState([])
    const [loading, setLoading] = useState(true)
    const [isPaused, setIsPaused] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

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

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true)
                const data = await fetchHomeNews('sa')

                if (data.success && data.body) {
                    const latestSection = data.body.find(section => section.type === 'latests')
                    if (latestSection && latestSection.list && latestSection.list.data) {
                        setNewsData(latestSection.list.data.slice(0, 6))
                    } else {
                        let allNews = []
                        data.body.forEach(section => {
                            if (section.list && section.list.data) {
                                allNews = [...allNews, ...section.list.data]
                            }
                        })
                        setNewsData(allNews.slice(0, 6))
                    }
                } else {
                    throw new Error('فشل في جلب البيانات')
                }
            } catch (err) {
                console.error('خطأ في جلب الأخبار:', err)
                setNewsData([])
            } finally {
                setLoading(false)
            }
        }

        fetchNews()
    }, [])

    useEffect(() => {
        if (newsData.length > 1 && !isPaused) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => {
                    if (prev >= newsData.length - 1) {
                        return 0
                    }
                    return prev + 1
                })
            }, 6000)

            return () => clearInterval(interval)
        }
    }, [newsData.length, isPaused, currentSlide])

    const nextSlide = () => {
        if (newsData.length > 0 && currentSlide < newsData.length - 1) {
            setCurrentSlide(prev => prev + 1)
        }
    }

    const prevSlide = () => {
        if (newsData.length > 0 && currentSlide > 0) {
            setCurrentSlide(prev => prev - 1)
        }
    }

    if (loading) {
        return (
            <section className="relative bg-rasid-blue py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <MainText
                            title="أحـدث الأخبار"
                            titleHighlight="اخـ"
                            titleColor="text-white"
                            highlightColor="text-white"
                            highlightBgColor="bg-rasid-blue-light"
                            lineColor="bg-transparent"
                        />

                        <div className="flex gap-6 overflow-hidden px-16">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="flex-shrink-0 w-80 animate-pulse">
                                    <div className="bg-white/10 rounded-xl p-4">
                                        <div className="bg-gray-300 h-48 rounded-xl mb-4"></div>
                                        <div className="space-y-2">
                                            <div className="bg-gray-300 h-4 rounded"></div>
                                            <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                                            <div className="bg-gray-300 h-4 rounded w-1/2"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    if (newsData.length === 0) {
        return (
            <section className="relative bg-rasid-blue py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto text-center">
                        <MainText
                            title="أحـدث الأخبار"
                            titleHighlight="اخـ"
                            titleColor="text-white"
                            highlightColor="text-white"
                            highlightBgColor="bg-rasid-blue-light"
                            lineColor="bg-transparent"
                        />
                        <p className="text-white/70 mt-8">لا توجد أخبار متاحة حالياً</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="relative bg-rasid-gray-light overflow-hidden pt-12">
            <div className="absolute inset-0 bg-[url('/images/bg_section.svg')] bg-cover"></div>

            <div className="relative z-10 px-0 md:px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <MainText
                        title="ر اخبار الطقس"
                        titleHighlight="اخـ"
                        titleColor="text-white"
                        highlightColor="text-white"
                        highlightBgColor="bg-rasid-blue-light"
                        lineColor="bg-transparent"
                    />

                    <div
                        className="relative"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <button
                            onClick={prevSlide}
                            className={`absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 md:p-3 shadow-lg transition-all duration-300 ${currentSlide === 0
                                ? 'opacity-30 cursor-not-allowed pointer-events-none'
                                : 'opacity-100 hover:scale-110'
                                }`}
                            disabled={currentSlide === 0}
                        >
                            <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-gray-700" />
                        </button>

                        <button
                            onClick={nextSlide}
                            className={`absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 md:p-3 shadow-lg transition-all duration-300 ${currentSlide === newsData.length - 1
                                ? 'opacity-30 cursor-not-allowed pointer-events-none'
                                : 'opacity-100 hover:scale-110'
                                }`}
                            disabled={currentSlide === newsData.length - 1}
                        >
                            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-gray-700" />
                        </button>

                        <div className="overflow-hidden px-4 md:px-16" dir="rtl">
                            <div
                                className="flex gap-4 md:gap-6 transition-transform duration-500 ease-in-out"
                                style={{
                                    transform: `translateX(${currentSlide * (isMobile ? 300 : 274)}px)`
                                }}
                            >
                                {newsData.map((item, index) => (
                                    <NewsCard
                                        key={item.id}
                                        item={item}
                                        isActive={index === currentSlide}
                                        titleColor="text-white"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* مؤشرات النقاط */}
                        <div className="flex justify-center gap-2 mt-6">
                            {newsData.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide
                                        ? 'bg-white'
                                        : 'bg-white/50 hover:bg-white/70'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const NewsCard = ({ item, isActive, titleColor = "text-rasid-orange-dark" }) => {
    const [isLiked, setIsLiked] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const newsImage = item.main_image?.main || item.main_image?.thumb || item.image
    const newsTitle = item.title
    const newsCategory = item.categories?.[0]?.title || item.category || "أخبار عامة"
    const newsDate = item.created_at ? new Date(item.created_at).toLocaleDateString('ar-SA', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }) : item.date
    const commentsCount = item.count_comments || item.comments || 0

    return (
        <Link href={`/news/${item.id}`} className="block">
            <div className={`flex-shrink-0 w-full md:w-80 transition-all duration-300 ${isActive ? 'scale-102' : 'md:scale-90'}`}>
                <div className="rounded-xl overflow-hidden transition-all duration-300 hover:scale-102">
                    <div className="relative">
                        <img
                            src={newsImage}
                            alt={newsTitle}
                            className="rounded-xl w-full h-40 md:h-48 object-cover"
                            onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop"
                            }}
                        />

                        <div className="absolute top-2 start-3">
                            <span className="text-white text-sm px-2 py-1 bg-black/50 rounded-full font-semibold font-custom">
                                {newsCategory}
                            </span>
                        </div>

                        {item.is_featured && (
                            <div className="absolute top-2 right-3">
                                <span className="text-white text-xs px-2 py-1 bg-red-500 rounded-full font-semibold font-custom">
                                    مميز
                                </span>
                            </div>
                        )}

                        {item.is_premium && (
                            <div className="absolute top-8 right-3">
                                <span className="text-white text-xs px-2 py-1 bg-gold-500 rounded-full font-semibold font-custom">
                                    مدفوع
                                </span>
                            </div>
                        )}

                        <div className="absolute bottom-3 left-3 w-[91%] flex justify-between items-center gap-2">
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    setIsBookmarked(!isBookmarked)
                                }}
                                className={`p-2 rounded-full transition-colors ${isBookmarked ? 'bg-yellow-500 text-white' : 'bg-black/30 text-white hover:bg-yellow-500/70'
                                    }`}
                            >
                                <Bookmark className="w-4 h-4" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    setIsLiked(!isLiked)
                                }}
                                className={`p-2 rounded-full transition-colors ${isLiked ? 'bg-red-500 text-white' : 'bg-black/30 text-white hover:bg-red-500/70'
                                    }`}
                            >
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="p-2 py-4">
                        <h3 className={`${titleColor} font-custom text-md font-semibold mb-3 line-clamp-3`}>
                            {newsTitle}
                        </h3>

                        <div className="flex items-center justify-between gap-2 bg-white w-fit p-2 px-3 rounded-full text-rasid-orange-dark text-xs min-w-full">
                            <span className="font-custom truncate flex-1">{newsDate}</span>
                            <div className="flex items-center justify-end gap-1 flex-shrink-0">
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span className="font-custom">{commentsCount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default LatestNewsSection 