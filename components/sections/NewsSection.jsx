'use client'

import { useState, useEffect } from 'react'
import { Share2, Bookmark, MessageCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import CustomButton from '../ui/CustomButton'
import { fetchHomeNews, fetchFeaturedNews, toggleArticleLike, toggleArticleFavorite, isTokenValid } from '../../utils/api'

const NewsSection = () => {
    const [news, setNews] = useState([])
    const [displayedNews, setDisplayedNews] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [error, setError] = useState(null)
    const [itemsToShow, setItemsToShow] = useState(8)
    const itemsPerLoad = 8

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true)
                const data = await fetchHomeNews('sa')

                if (data.success && data.body) {
                    let allNews = []
                    data.body.forEach(section => {
                        if (section.list && section.list.data) {
                            allNews = [...allNews, ...section.list.data]
                        }
                    })
                    setNews(allNews)
                    setDisplayedNews(allNews.slice(0, itemsToShow))
                } else {
                    throw new Error('فشل في جلب البيانات')
                }
            } catch (err) {
                console.error('خطأ في جلب الأخبار:', err)
                setError(err.message)
                try {
                    const fallbackData = await fetchFeaturedNews('sa')
                    if (fallbackData.success && fallbackData.body && fallbackData.body.data) {
                        setNews(fallbackData.body.data)
                        setDisplayedNews(fallbackData.body.data.slice(0, itemsToShow))
                    }
                } catch (fallbackErr) {
                    console.error('خطأ في جلب البيانات البديلة:', fallbackErr)
                }
            } finally {
                setLoading(false)
            }
        }

        fetchNews()
    }, [])

    useEffect(() => {
        if (news.length > 0) {
            setDisplayedNews(news.slice(0, itemsToShow))
        }
    }, [itemsToShow, news])

    const loadMoreNews = async () => {
        setLoadingMore(true)

        setTimeout(() => {
            const newItemsToShow = itemsToShow + itemsPerLoad
            setItemsToShow(newItemsToShow)
            setLoadingMore(false)
        }, 500)
    }

    const hasMoreNews = itemsToShow < news.length

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

    if (error && displayedNews.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-white mb-4">عذراً، حدث خطأ في تحميل الأخبار</h2>
                    <p className="text-white/70 mb-4">يرجى المحاولة مرة أخرى لاحقاً</p>
                    <CustomButton
                        text="إعادة المحاولة"
                        onClick={() => window.location.reload()}
                    />
                </div>
            </div>
        )
    }

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {displayedNews.map((item) => (
                    <NewsCard key={item.id} item={item} />
                ))}
            </div>

            {hasMoreNews && (
                <div className="text-center">
                    <CustomButton
                        text={loadingMore ? "جاري التحميل..." : "عرض المزيد"}
                        onClick={loadMoreNews}
                        icon={loadingMore ?
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> :
                            <ArrowLeft className="w-5 h-5" />
                        }
                        disabled={loadingMore}
                    />
                </div>
            )}

            {!hasMoreNews && displayedNews.length > 0 && (
                <div className="text-center">
                    <p className="text-black/70 font-custom">
                        تم عرض جميع الأخبار المتاحة ({displayedNews.length} من {news.length})
                    </p>
                </div>
            )}
        </section>
    )
}

const NewsCard = ({ item }) => {
    const [isLiked, setIsLiked] = useState(item.is_liked || false)
    const [isBookmarked, setIsBookmarked] = useState(item.has_favorited || false)
    const [likesCount, setLikesCount] = useState(item.count_likes || 0)
    const [isLoading, setIsLoading] = useState(false)
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
    const viewsCount = item.views || 0

    // دالة للتعامل مع الإعجاب
    const handleLike = async (e) => {
        e.preventDefault()

        if (!isTokenValid()) {
            // إعادة توجيه لصفحة تسجيل الدخول
            window.location.href = '/login'
            return
        }

        if (isLoading) return

        const newLikedState = !isLiked
        const oldLikesCount = likesCount

        setIsLiked(newLikedState)
        setLikesCount(prev => newLikedState ? Number(prev) + 1 : Math.max(0, prev - 1))
        setIsLoading(true)

        try {
            await toggleArticleLike(item.id, newLikedState)
        } catch (error) {
            console.error('Error toggling like:', error)
            setIsLiked(!newLikedState)
            setLikesCount(oldLikesCount)
        } finally {
            setIsLoading(false)
        }
    }

    // دالة للتعامل مع المفضلة
    const handleBookmark = async (e) => {
        e.preventDefault()

        if (!isTokenValid()) {
            // إعادة توجيه لصفحة تسجيل الدخول
            window.location.href = '/login'
            return
        }

        if (isLoading) return

        const newBookmarkedState = !isBookmarked

        // تحديث الحالة مباشرة
        setIsBookmarked(newBookmarkedState)
        setIsLoading(true)

        try {
            await toggleArticleFavorite(item.id, newBookmarkedState)
        } catch (error) {
            console.error('Error toggling favorite:', error)
            // إعادة الحالة السابقة في حالة الخطأ
            setIsBookmarked(!newBookmarkedState)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Link href={`/news/${item.id}`} className="block">
            <div className="rounded-xl overflow-hidden transition-all duration-300 hover:scale-105">
                <div className="relative">
                    <img
                        src={newsImage}
                        alt={newsTitle}
                        className="rounded-xl w-full h-48 object-cover"
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop"
                        }}
                    />

                    <div className="absolute top-2 start-3 w-20 h-6 pb-1 bg-black/50 rounded-full font-semibold font-custom flex items-center justify-center">
                        <span className="text-white text-xs">
                            {newsCategory}
                        </span>
                    </div>

                    {item.is_featured && (
                        <div className="absolute top-2 end-3 w-12 h-5 pb-1 bg-red-500 flex items-center justify-center rounded-full font-semibold font-custom  text-center">
                            <span className="text-white text-xs">
                                مميز
                            </span>
                        </div>
                    )}

                    <div className="absolute bottom-3 left-3 w-[91%] flex justify-between items-center gap-2">
                        <button
                            onClick={handleBookmark}
                            disabled={isLoading}
                            className={`p-2 rounded-full transition-colors disabled:opacity-50 ${isBookmarked
                                ? 'bg-yellow-500 text-white'
                                : 'bg-black/30 text-white hover:bg-yellow-500/70'
                                }`}
                        >
                            <Bookmark className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleLike}
                            disabled={isLoading}
                            className={`p-2 rounded-full transition-colors disabled:opacity-50 ${isLiked
                                ? 'bg-red-500 text-white'
                                : 'bg-black/30 text-white hover:bg-red-500/70'
                                }`}
                        >
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="p-2 py-4">
                    <h3 className="text-rasid-orange-dark font-custom text-md font-semibold mb-3 line-clamp-3">
                        {newsTitle}
                    </h3>

                    <div className="flex items-center justify-between gap-2 bg-white w-full p-2 px-3 rounded-full text-rasid-orange-dark text-xs">
                        <span className="font-custom truncate flex-1">{newsDate}</span>
                        <div className="flex items-center justify-end gap-3 flex-shrink-0">
                            <div className="flex items-center gap-1">
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span className="font-custom">{commentsCount}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Share2 className={`w-3.5 h-3.5 ${isLiked ? 'text-red-500' : ''}`} />
                                <span className="font-custom">{likesCount}</span>
                            </div>
                            {viewsCount > 0 && (
                                <div className="flex items-center gap-1">
                                    <span className="font-custom text-xs">👁</span>
                                    <span className="font-custom">{viewsCount}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NewsSection 