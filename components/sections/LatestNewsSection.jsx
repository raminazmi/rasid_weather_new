'use client'

import { useState } from 'react'
import { Share2, Bookmark, MessageCircle, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import MainText from '../MainText'

const LatestNewsSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0)

    // Mock data for demonstration
    const newsData = [
        {
            id: 1,
            title: "سلطنة عمان | نشاط محتمل لخلايا صيفية",
            description: "الطابع في مسقط و جنوب الباطنة و قبالة سواحل الشرقية مع توقعات باستمرارها حتى ساعات الليل",
            image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop",
            category: "اخبار محلية",
            date: "الجمعة، 6 يونيو 2025 10:03 م",
            comments: 2,
            featured: false
        },
        {
            id: 2,
            title: "سلطنة عمان | نشاط محتمل لخلايا صيفية",
            description: "الطابع في مسقط و جنوب الباطنة و قبالة سواحل الشرقية مع توقعات باستمرارها حتى ساعات الليل",
            image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=400&h=300&fit=crop",
            category: "اخبار محلية",
            date: "الجمعة، 6 يونيو 2025 10:03 م",
            comments: 1,
            featured: true,
            premium: true
        },
        {
            id: 3,
            title: "سلطنة عمان | نشاط محتمل لخلايا صيفية",
            description: "الطابع في مسقط و جنوب الباطنة و قبالة سواحل الشرقية مع توقعات باستمرارها حتى ساعات الليل",
            image: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=400&h=300&fit=crop",
            category: "اخبار محلية",
            date: "الجمعة، 6 يونيو 2025 10:03 م",
            comments: 2,
            featured: false
        }
    ]

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % newsData.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + newsData.length) % newsData.length)
    }

    return (
        <section className="relative bg-rasid-gray-light overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/images/bg_section.svg')] bg-cover"></div>

            <div className="relative z-10 px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <MainText
                        title="ر اخبار الطقس"
                        titleHighlight="اخـ"
                        titleColor="text-white"
                        highlightColor="text-white"
                        highlightBgColor="bg-rasid-blue-light"
                        lineColor="bg-transparent"
                    />

                    {/* News Carousel */}
                    <div className="relative">
                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-700" />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-colors"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-700" />
                        </button>

                        {/* News Cards Container */}
                        <div className="flex gap-6 overflow-hidden px-16">
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
                </div>
            </div>
        </section>
    )
}

const NewsCard = ({ item, isActive, titleColor = "text-rasid-orange-dark" }) => {
    const [isLiked, setIsLiked] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)

    return (
        <div className={`flex-shrink-0 w-80 transition-all duration-300 ${isActive ? 'scale-105' : 'scale-95'}`}>
            <div className="rounded-xl overflow-hidden transition-all duration-300 hover:scale-105">
                {/* Image Container */}
                <div className="relative">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="rounded-xl w-full h-48 object-cover"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-2 start-3">
                        <span className="text-white text-sm px-2 rounded-full font-semibold font-custom">
                            {item.category}
                        </span>
                    </div>

                    {/* Action Icons */}
                    <div className="absolute bottom-3 left-3 w-[91%] flex justify-between items-center gap-2">
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                setIsBookmarked(!isBookmarked)
                            }}
                            className={`p-2 rounded-full transition-colors ${isBookmarked ? 'bg-yellow-500 text-white' : 'bg-transparent text-white hover:bg-white/30'
                                }`}
                        >
                            <Bookmark className="w-4 h-4" />
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                setIsLiked(!isLiked)
                            }}
                            className={`p-2 rounded-full transition-colors ${isLiked ? 'bg-red-500 text-white' : 'bg-transparent text-white hover:bg-white/30'
                                }`}
                        >
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-2 py-4">
                    <h3 className={`${titleColor} font-custom text-md font-semibold mb-3 line-clamp-3`}>
                        {item.title}
                    </h3>

                    <div className="flex items-center justify-between gap-2 bg-white w-fit p-1 px-2 rounded-full text-rasid-orange-dark text-xs">
                        <span className="font-custom">{item.date}</span>
                        <div className="flex items-center justify-start gap-1">
                            <MessageCircle className="w-3.5 h-3.5 mt-0.5" />
                            <span className="font-custom">{item.comments}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LatestNewsSection 