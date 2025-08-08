'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Share2, MessageCircle, Calendar, User } from 'lucide-react'
import Link from 'next/link'
import MainText from '../../components/MainText'
import { fetchArticleFavorites, toggleArticleFavorite, isTokenValid } from '../../utils/api'

const FavoritesPage = () => {
    const router = useRouter()
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!isTokenValid()) {
            router.push('/login')
            return
        }

        fetchFavorites()
    }, [router])

    const fetchFavorites = async () => {
        try {
            setLoading(true)
            const data = await fetchArticleFavorites()

            if (data.success && data.body) {
                setFavorites(data.body.data || [])
            } else {
                throw new Error('فشل في جلب المفضلة')
            }
        } catch (err) {
            console.error('Error fetching favorites:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleRemoveFromFavorites = async (articleId) => {
        try {
            await toggleArticleFavorite(articleId, false)
            setFavorites(prev => prev.filter(item => item.id !== articleId))
        } catch (error) {
            console.error('Error removing from favorites:', error)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen pt-32 pb-44 bg-rasid-gray-light">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="/images/shape1.svg"
                        alt="background shape 1"
                        className="absolute top-40 -right-40 w-120 h-120 opacity-15 -rotate-6"
                    />
                    <img
                        src="/images/shape2.svg"
                        alt="background shape 2"
                        className="absolute top-40 -left-80 w-90 h-90 opacity-15 rotate-12"
                    />
                </div>

                <div className="relative z-10 px-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="bg-white/10 rounded-lg p-4 animate-pulse">
                                    <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                                    <div className="space-y-2">
                                        <div className="bg-gray-300 h-4 rounded"></div>
                                        <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen pt-32 pb-44 bg-rasid-gray-light">
                <div className="relative z-10 px-4">
                    <MainText
                        title="مفضلة"
                        titleHighlight="الـ"
                        titleColor="text-rasid-orange-dark"
                        highlightColor="text-orange-dark"
                        highlightBgColor="bg-rasid-blue"
                        lineColor="bg-rasid-blue"
                        descriptionColor="text-rasid-orange-dark"
                    />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="text-center">
                            <h2 className="text-xl font-bold text-rasid-blue mb-4">عذراً، حدث خطأ</h2>
                            <p className="text-gray-600 mb-4">{error}</p>
                            <button
                                onClick={fetchFavorites}
                                className="bg-rasid-blue text-white px-6 py-2 rounded-lg hover:bg-rasid-blue/90 transition-colors"
                            >
                                إعادة المحاولة
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-32 pb-44 bg-rasid-gray-light">
            {/* Background Shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src="/images/shape1.svg"
                    alt="background shape 1"
                    className="absolute top-40 -right-40 w-120 h-120 opacity-15 -rotate-6"
                />
                <img
                    src="/images/shape2.svg"
                    alt="background shape 2"
                    className="absolute top-40 -left-80 w-90 h-90 opacity-15 rotate-12"
                />
                <img
                    src="/images/shape3.svg"
                    alt="background shape 3"
                    className="absolute bottom-28 left-1/2 transform -translate-x-1/2 w-80 h-80 opacity-15 rotate-45"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 px-4">
                <MainText
                    title="مفضلة"
                    titleHighlight="الـ"
                    description="جميع الأخبار التي أضفتها لقائمة المفضلة"
                    titleColor="text-rasid-orange-dark"
                    highlightColor="text-orange-dark"
                    highlightBgColor="bg-rasid-blue"
                    lineColor="bg-rasid-blue"
                    descriptionColor="text-rasid-orange-dark"
                />

                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {favorites.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {favorites.map((item) => (
                                <FavoriteCard
                                    key={item.id}
                                    item={item}
                                    onRemove={handleRemoveFromFavorites}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="mb-6">
                                <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                                </svg>
                                <h3 className="text-xl font-bold text-rasid-blue mb-2">لا توجد أخبار مفضلة</h3>
                                <p className="text-gray-600 mb-6">لم تقم بإضافة أي أخبار لقائمة المفضلة بعد</p>
                                <Link
                                    href="/news"
                                    className="bg-rasid-blue text-white px-6 py-3 rounded-lg hover:bg-rasid-blue/90 transition-colors inline-block font-custom"
                                >
                                    تصفح الأخبار
                                </Link>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}

const FavoriteCard = ({ item, onRemove }) => {
    const [removing, setRemoving] = useState(false)

    const newsImage = item.main_image?.main || item.main_image?.thumb || "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop"
    const newsTitle = item.title
    const newsCategory = item.categories?.[0]?.title || "أخبار عامة"
    const newsDate = item.created_at ? new Date(item.created_at).toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : "تاريخ غير محدد"
    const commentsCount = item.count_comments || 0
    const likesCount = item.count_likes || 0

    const handleRemove = async (e) => {
        e.preventDefault()
        if (removing) return

        setRemoving(true)
        try {
            await onRemove(item.id)
        } finally {
            setRemoving(false)
        }
    }

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
            <Link href={`/news/${item.id}`} className="block">
                <div className="relative">
                    <img
                        src={newsImage}
                        alt={newsTitle}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop"
                        }}
                    />

                    {/* Category Badge */}
                    <div className="absolute top-2 start-3 bg-black/50 px-3 py-1 rounded-full">
                        <span className="text-white text-xs font-custom">
                            {newsCategory}
                        </span>
                    </div>

                    {/* Featured Badge */}
                    {item.is_featured && (
                        <div className="absolute top-2 end-3 bg-red-500 px-2 py-1 rounded-full">
                            <span className="text-white text-xs font-custom">
                                مميز
                            </span>
                        </div>
                    )}
                </div>

                <div className="p-4">
                    <h3 className="text-rasid-blue font-custom text-lg font-semibold mb-3 line-clamp-2 leading-tight">
                        {newsTitle}
                    </h3>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span className="font-custom">{newsDate}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                                <Share2 className="w-4 h-4 text-red-500" />
                                <span className="font-custom">{likesCount}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" />
                                <span className="font-custom">{commentsCount}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>

            {/* Remove Button */}
            <div className="px-4 pb-4">
                <button
                    onClick={handleRemove}
                    disabled={removing}
                    className="w-full bg-red-100 text-red-600 hover:bg-red-200 py-2 px-4 rounded-lg transition-colors disabled:opacity-50 font-custom text-sm"
                >
                    {removing ? 'جاري الإزالة...' : 'إزالة من المفضلة'}
                </button>
            </div>
        </div>
    )
}

export default FavoritesPage
