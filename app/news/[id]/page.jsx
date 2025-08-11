'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import CustomButton from '../../../components/ui/CustomButton'
import { fetchNewsDetail, fetchComments, addComment, fetchFeaturedNews, fetchHomeNews, toggleArticleLike, toggleArticleFavorite, isTokenValid, getToken } from '../../../utils/api'

const NewsDetailPage = () => {
    const params = useParams()
    const [news, setNews] = useState(null)
    const [loading, setLoading] = useState(true)
    const [relatedNewsLoading, setRelatedNewsLoading] = useState(true)
    const [comment, setComment] = useState('')
    const [email, setEmail] = useState('')
    const [comments, setComments] = useState([])
    const [commentsLoading, setCommentsLoading] = useState(true)
    const [commentsError, setCommentsError] = useState(null)
    const [submittingComment, setSubmittingComment] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [likesCount, setLikesCount] = useState(0)
    const [actionLoading, setActionLoading] = useState(false)

    useEffect(() => {
        fetchNewsDetailData()
        fetchCommentsData()
        setIsLoggedIn(isTokenValid())
        const handleStorageChange = () => {
            setIsLoggedIn(isTokenValid())
        }

        window.addEventListener('storage', handleStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
        }
    }, [params.id])

    const fetchCommentsData = async () => {
        try {
            setCommentsLoading(true)
            const data = await fetchComments(params.id)

            if (data.success && data.body && data.body.data) {
                setComments(data.body.data)
            } else {
                throw new Error('فشل في جلب التعليقات')
            }
        } catch (error) {
            console.error('Error fetching comments:', error)
            setCommentsError(error.message)
        } finally {
            setCommentsLoading(false)
        }
    }

    const fetchRelatedNews = async () => {
        try {
            const data = await fetchHomeNews('sa')
            if (data.success && data.body) {
                let allNews = []
                data.body.forEach(section => {
                    if (section.list && section.list.data) {
                        allNews = [...allNews, ...section.list.data]
                    }
                })

                const filteredNews = allNews
                    .filter(item => item.id !== parseInt(params.id))
                    .slice(0, 4)
                    .map(item => ({
                        id: item.id,
                        title: item.title,
                        date: item.created_at ? new Date(item.created_at).toLocaleDateString('ar-SA') : "تاريخ غير محدد",
                        comments: item.count_comments || 0,
                        image: item.main_image?.main || item.main_image?.thumb || "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop"
                    }))

                return filteredNews
            }
        } catch (error) {
            console.error('Error fetching related news from home API:', error)
        }

        try {
            const fallbackData = await fetchFeaturedNews('sa')
            if (fallbackData.success && fallbackData.body && fallbackData.body.data) {
                return fallbackData.body.data
                    .filter(item => item.id !== parseInt(params.id))
                    .slice(0, 10)
                    .map(item => ({
                        id: item.id,
                        title: item.title,
                        date: item.created_at ? new Date(item.created_at).toLocaleDateString('ar-SA') : "تاريخ غير محدد",
                        comments: item.count_comments || 0,
                        image: item.main_image?.main || item.main_image?.thumb || "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop"
                    }))
            }
        } catch (fallbackError) {
            console.error('Error fetching fallback news:', fallbackError)
        }

        return []
    }

    const fetchNewsDetailData = async () => {
        try {
            setLoading(true)
            const data = await fetchNewsDetail(params.id)

            if (data.success && data.body) {
                const newsData = data.body

                const newsDetail = {
                    id: newsData.id,
                    title: newsData.title,
                    category: newsData.categories?.[0]?.title || "أخبار عامة",
                    image: newsData.main_image?.main || newsData.main_image?.thumb || "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
                    views: newsData.views,
                    likes: newsData.count_likes,
                    author: newsData.author?.name || "محرر الأخبار",
                    date: newsData.created_at ? new Date(newsData.created_at).toLocaleDateString('ar-SA', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    }) : "تاريخ غير محدد",
                    content: newsData.content || newsData.description || `تفاصيل الخبر: ${newsData.title}`,
                    comments: newsData.comments || [],
                    relatedNews: [],
                    originalData: newsData
                }

                const relatedNewsData = await fetchRelatedNews()
                newsDetail.relatedNews = relatedNewsData

                setNews(newsDetail)
                setRelatedNewsLoading(false)

                setIsLiked(newsData.is_liked || false)
                setIsBookmarked(newsData.has_favorited || false)
                setLikesCount(newsData.count_likes || 0)

                if (newsData.comments && newsData.comments.length > 0) {
                    setComments(newsData.comments)
                    setCommentsLoading(false)
                }
            } else {
                throw new Error('فشل في جلب بيانات الخبر')
            }
        } catch (error) {
            console.error('Error fetching news detail:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleCommentSubmit = async (e) => {
        e.preventDefault()
        if (!comment.trim()) return

        setSubmittingComment(true)
        try {
            const data = await addComment({
                article_id: params.id,
                content: comment.trim(),
                email: email.trim() || null
            })

            if (data.success) {
                await fetchCommentsData()
                setComment('')
                setEmail('')
            } else {
                throw new Error(data.message || 'فشل في إضافة التعليق')
            }
        } catch (error) {
            console.error('Error submitting comment:', error)
            const errorMessage = error.message || 'فشل في إضافة التعليق. يرجى المحاولة مرة أخرى.'
        } finally {
            setSubmittingComment(false)
        }
    }

    const handleEmailSubmit = (e) => {
        e.preventDefault()
        console.log('Email submitted:', email)
        setEmail('')
    }

    const handleLike = async () => {
        if (!isLoggedIn) {
            window.location.href = '/login'
            return
        }

        if (actionLoading) return

        const newLikedState = !isLiked
        const oldLikesCount = likesCount

        setIsLiked(newLikedState)
        setLikesCount(prev => newLikedState ? Number(prev) + 1 : Math.max(0, prev - 1))
        setActionLoading(true)

        try {
            await toggleArticleLike(params.id, newLikedState)
        } catch (error) {
            console.error('Error toggling like:', error)
            setIsLiked(!newLikedState)
            setLikesCount(oldLikesCount)
        } finally {
            setActionLoading(false)
        }
    }

    const handleBookmark = async () => {
        if (!isLoggedIn) {
            window.location.href = '/login'
            return
        }

        if (actionLoading) return

        const newBookmarkedState = !isBookmarked

        setIsBookmarked(newBookmarkedState)
        setActionLoading(true)

        try {
            await toggleArticleFavorite(params.id, newBookmarkedState)
        } catch (error) {
            console.error('Error toggling favorite:', error)
            setIsBookmarked(!newBookmarkedState)
        } finally {
            setActionLoading(false)
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
                    <img
                        src="/images/shape3.svg"
                        alt="background shape 3"
                        className="absolute bottom-28 left-1/2 transform -translate-x-1/2 w-80 h-80 opacity-15 rotate-45"
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
                        <div className="h-96 bg-gray-300 rounded mb-4"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        )
    }

    if (!news) {
        return (
            <div className="min-h-screen pt-32 pb-44 bg-rasid-gray-light">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-2xl font-bold text-rasid-blue">الخبر غير موجود</h1>
                </div>
            </div>
        )
    }

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
                <img
                    src="/images/shape3.svg"
                    alt="background shape 3"
                    className="absolute bottom-28 left-1/2 transform -translate-x-1/2 w-80 h-80 opacity-15 rotate-45"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3">
                        <article className="rounded-lg overflow-hidden mb-8">
                            <div className="relative">
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="w-full h-96 object-cover"
                                    onError={(e) => {
                                        e.target.src = "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop"
                                    }}
                                />
                                <div className="absolute top-4 right-4">
                                    <span className="text-white text-sm px-3 py-1 bg-black/50 rounded-full font-semibold font-custom">
                                        {news.category}
                                    </span>
                                </div>

                                {news.originalData?.is_featured && (
                                    <div className="absolute top-4 left-4">
                                        <span className="text-white text-xs px-2 py-1 bg-red-500 rounded-full font-semibold font-custom">
                                            مميز
                                        </span>
                                    </div>
                                )}

                                {news.originalData?.is_premium && (
                                    <div className="absolute top-12 left-4">
                                        <span className="text-white text-xs px-2 py-1 bg-yellow-500 rounded-full font-semibold font-custom">
                                            مدفوع
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                                    <div className="flex items-center space-x-4 space-x-reverse">
                                        <span className="flex items-center gap-2">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                            </svg>
                                            {news.date}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                            {news.author}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <button
                                                onClick={handleLike}
                                                disabled={actionLoading}
                                                className={`flex items-center gap-1 px-2 py-1 rounded transition-colors disabled:opacity-50 ${isLiked
                                                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                                    : 'hover:bg-gray-100'
                                                    }`}
                                            >
                                                <svg className={`w-4 h-4 mr-1 ${isLiked ? 'text-red-500 fill-current' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                </svg>
                                                {likesCount}
                                            </button>
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                            </svg>
                                            {news.views} مشاهدة
                                        </span>
                                    </div>
                                </div>

                                <h1 className="text-2xl lg:text-2xl font-bold text-rasid-orange-dark mb-6 leading-relaxed">
                                    {news.title}
                                </h1>

                                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                                    {news.content && news.content.includes('<') ? (
                                        <div dangerouslySetInnerHTML={{ __html: news.content }} />
                                    ) : (
                                        news.content.split('\n\n').map((paragraph, index) => (
                                            <p key={index} className="mb-4 text-justify">
                                                {paragraph}
                                            </p>
                                        ))
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={handleLike}
                                            disabled={actionLoading}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 font-custom ${isLiked
                                                ? 'bg-red-500 text-white hover:bg-red-600'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                            </svg>
                                            {isLiked ? 'تم الإعجاب' : 'أعجبني'} ({likesCount})
                                        </button>

                                        <button
                                            onClick={handleBookmark}
                                            disabled={actionLoading}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 font-custom ${isBookmarked
                                                ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                                            </svg>
                                            {isBookmarked ? 'في المفضلة' : 'إضافة للمفضلة'}
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        {actionLoading && (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-rasid-blue"></div>
                                                <span>جاري التحديث...</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </article>

                        <div className="rounded-lg p-6 mb-8">
                            <h3 className="text-xl font-bold text-rasid-blue mb-4">
                                التعليقات ({comments.length})
                            </h3>

                            <div className="mb-6">
                                {commentsLoading ? (
                                    <div className="flex items-center justify-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rasid-blue"></div>
                                        <span className="mr-2 text-rasid-blue">جاري تحميل التعليقات...</span>
                                    </div>
                                ) : commentsError ? (
                                    <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-4">
                                        <p className="text-red-700 text-center">خطأ في تحميل التعليقات: {commentsError}</p>
                                    </div>
                                ) : comments.length > 0 ? (
                                    <div className="space-y-4">
                                        {comments.map((commentItem, index) => (
                                            <div key={commentItem.id || index} className="bg-gray-50 rounded-lg p-4 border-r-4 border-rasid-blue">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="relative">
                                                            {commentItem.user?.avatar?.main ? (
                                                                <img
                                                                    src={commentItem.user.avatar.main}
                                                                    alt={commentItem.user.name || 'صورة المستخدم'}
                                                                    className="w-8 h-8 rounded-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-8 h-8 bg-rasid-blue rounded-full flex items-center justify-center">
                                                                    <span className="text-white text-sm font-bold">
                                                                        {(() => {
                                                                            const name = commentItem.user?.name || commentItem.author || 'مستخدم';
                                                                            return typeof name === 'string' ? name.charAt(0) : 'م';
                                                                        })()}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-medium text-gray-800">
                                                                {(() => {
                                                                    const name = commentItem.user?.name || commentItem.author;
                                                                    return (typeof name === 'string' && name.trim()) ? name : 'مستخدم';
                                                                })()}
                                                            </span>
                                                            {commentItem.user?.bio && (
                                                                <span className="text-xs text-gray-500">
                                                                    {commentItem.user.bio}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <span className="text-sm text-gray-500">
                                                        {commentItem.created_at ? new Date(commentItem.created_at).toLocaleDateString('ar-SA') : ''}
                                                    </span>
                                                </div>
                                                <p className="text-gray-700 leading-relaxed">
                                                    {commentItem.content || commentItem.comment}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <p>لا توجد تعليقات حتى الآن</p>
                                        <p className="text-sm">كن أول من يعلق على هذا الخبر</p>
                                    </div>
                                )}
                            </div>

                            <h4 className="text-lg font-bold text-rasid-blue mb-3">إضافة تعليق جديد</h4>

                            {!isLoggedIn ? (
                                <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mb-4 text-center">
                                    <p className="text-gray-600 mb-4">يجب تسجيل الدخول لإضافة تعليق</p>
                                    <a
                                        href="/login"
                                        className="bg-rasid-blue text-white px-6 py-2 rounded-lg hover:bg-rasid-blue/90 transition-colors inline-block"
                                    >
                                        تسجيل الدخول
                                    </a>
                                </div>
                            ) : (
                                <form onSubmit={handleCommentSubmit} className="mb-4">
                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="اضف تعليق"
                                        className="bg-transparent w-full p-3 border border-gray-300 rounded-lg resize-none h-24 focus:ring-2 focus:ring-rasid-blue focus:border-transparent"
                                        required
                                        disabled={submittingComment}
                                    />
                                    <div className="flex justify-between items-center mt-4">
                                        <div className="flex space-x-2 space-x-reverse">
                                            {submittingComment && (
                                                <div className="flex items-center gap-2 text-rasid-blue">
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-rasid-blue"></div>
                                                    <span className="text-sm">جاري الإرسال...</span>
                                                </div>
                                            )}
                                        </div>
                                        <CustomButton
                                            text={submittingComment ? "جاري الإرسال..." : "ارسال"}
                                            onClick={() => { }}
                                            type="submit"
                                            variant="primary"
                                            loading={submittingComment}
                                            disabled={submittingComment}
                                        />
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="p-6 mb-6 relative">
                            <div className="flex items-center justify-center mb-4">
                                <div className={`flex-1 h-[2px] sm:h-[3px] bg-rasid-blue`}></div>
                                <h1 className={`text-md text-rasid-blue font-bold px-2 font-custom flex items-center`}>
                                    يمكنك متابعتنا ايضا عبر
                                </h1>
                                <div className={`flex-1 h-[2px] sm:h-[3px] bg-rasid-blue`}></div>
                            </div>
                            <div className="flex items-center justify-center gap-4">
                                <img src="/images/whatsapp.svg" alt="whatsapp" className='h-7 w-7' />
                                <img src="/images/facebook.svg" alt="facebook" className='h-6 w-6' />
                                <img src="/images/instagram.svg" alt="instagram" className='h-6 w-6' />
                            </div>
                        </div>

                        <div className="p-2 mb-6">
                            <div className="flex items-center justify-center mb-4">
                                <h1 className={`text-rasid-orange-dark text-md font-bold px-2 font-custom flex items-center`}>
                                    <span className={`w-6 h-6 rounded-full bg-rasid-blue flex items-end justify-end`}>
                                        المـ
                                    </span>
                                    زيد من الاخبار
                                </h1>
                                <div className={`flex-1 h-[1px] bg-rasid-blue`}></div>
                            </div>
                            <div className="space-y-4">
                                {relatedNewsLoading ? (
                                    <div className="text-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rasid-blue mx-auto mb-2"></div>
                                        <p className="text-sm text-gray-500">جاري تحميل المزيد من الأخبار...</p>
                                    </div>
                                ) : news.relatedNews && news.relatedNews.length > 0 ? (
                                    news.relatedNews.map((item) => (
                                        <article key={item.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                                            <a href={`/news/${item.id}`} className="block hover:bg-gray-50 rounded-lg p-2 transition-colors">
                                                <div className="flex space-x-3 space-x-reverse">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-28 h-22 object-cover rounded-lg flex-shrink-0"
                                                        onError={(e) => {
                                                            e.target.src = "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop"
                                                        }}
                                                    />
                                                    <div className="flex flex-col items-between gap-3 min-w-0">
                                                        <h4 className="text-sm font-medium text-rasid-blue line-clamp-2 leading-tight mb-1 hover:text-rasid-orange-dark transition-colors">
                                                            {item.title}
                                                        </h4>
                                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                                            <span>{item.date}</span>
                                                            <span className="flex items-center">
                                                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                                                </svg>
                                                                {item.comments}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </article>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <p className="text-sm">لا توجد أخبار مرتبطة حالياً</p>
                                        <p className="text-xs mt-1">جرب تحديث الصفحة</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsDetailPage 