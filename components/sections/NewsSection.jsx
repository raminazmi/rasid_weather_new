'use client'

import { useState } from 'react'
import { Share2, Bookmark, MessageCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import CustomButton from '../ui/CustomButton'

const NewsSection = ({ news, loading }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6

    // Mock data for demonstration (since API might not be available)
    const mockNews = [
        {
            id: 1,
            title: "منخفض حراري ديناميكي يجلب هبات رياح وموجات غبار محتملة للعراق والكويت وشمال شرق السعودية",
            image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop",
            category: "اخبار محلية",
            date: "الجمعة، 6 يونيو 2025 10:03 ص",
            comments: 2,
            featured: true
        },
        {
            id: 2,
            title: "نشاط خلايا صيفية محتمل في المناطق الساحلية العمانية",
            image: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=400&h=300&fit=crop",
            category: "اخبار محلية",
            date: "الجمعة، 6 يونيو 2025 09:45 ص",
            comments: 1,
            featured: false
        },
        {
            id: 3,
            title: "منخفض جوي بارد يؤثر على درجات الحرارة في السعودية ودول الخليج خلال عيد الأضحى",
            image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop",
            category: "اخبار محلية",
            date: "الجمعة، 6 يونيو 2025 09:30 ص",
            comments: 3,
            featured: true
        },
        {
            id: 4,
            title: "توقعات بتحسن الأحوال الجوية في الأيام القادمة",
            image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=400&h=300&fit=crop",
            category: "اخبار محلية",
            date: "الجمعة، 6 يونيو 2025 09:15 ص",
            comments: 0,
            featured: false
        },
        {
            id: 5,
            title: "تحذيرات من عواصف رملية في مناطق متفرقة",
            image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop",
            category: "اخبار محلية",
            date: "الجمعة، 6 يونيو 2025 09:00 ص",
            comments: 1,
            featured: false
        }
    ]

    const displayNews = news.length > 0 ? news : mockNews
    const totalPages = Math.ceil(displayNews.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentNews = displayNews.slice(startIndex, endIndex)

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="bg-white/10 rounded-lg p-4 animate-pulse">
                            <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                            <div className="space-y-2">
                                <div className="bg-gray-300 h-4 rounded"></div>
                                <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                                <div className="bg-gray-300 h-4 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {currentNews.map((item) => (
                    <NewsCard key={item.id} item={item} />
                ))}
            </div>

            <div className="text-center">
                <CustomButton
                    text="المزيد"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    icon={<ArrowLeft className="w-5 h-5" />}
                />
            </div>
        </section>
    )
}

const NewsCard = ({ item }) => {
    const [isLiked, setIsLiked] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)

    return (
        <Link href={`/news/${item.id}`} className="block">
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
                    <h3 className="text-rasid-orange-dark font-custom text-md font-semibold mb-3 line-clamp-3">
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
        </Link>
    )
}

export default NewsSection 