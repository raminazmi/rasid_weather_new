'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import MainText from '../../../components/MainText'
import CustomButton from '../../../components/ui/CustomButton'

const NewsDetailPage = () => {
    const params = useParams()
    const [news, setNews] = useState(null)
    const [loading, setLoading] = useState(true)
    const [comment, setComment] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        fetchNewsDetail()
    }, [params.id])

    const fetchNewsDetail = async () => {
        try {
            const newsDetail = {
                id: params.id,
                title: "سلطنة عمان | نشاط محتمل لخلايا صيفية الطابع في مسقط و جنوب الباطنة و قبالة سواحل الشرقية مع توقعات باستمرارها حتى ساعات الليل",
                category: "اخبار محلية",
                image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
                views: 122,
                likes: 12,
                author: "د/ محمد راشد",
                date: "الجمعة، 6 يونيو 2025 10:03 ص",
                content: `راصد ويذر - يتوقع ان تشهد مجدداً منطقة الرياض والشرقية و الكويت فرص ظهور خلايا رعدية ممطرة مصحوبة برياح هابطة شديدة مثيرة للغبار ساعات المساء من اليوم الاثنين 5 مايو حيث يتوقع ان تشمل المناطق التالية:

• منطقة الرياض: شمال الرياض، شرق الرياض، جنوب الرياض
• المنطقة الشرقية: الدمام، الخبر، الظهران، الجبيل، رأس تنورة
• الكويت: العاصمة، حولي، الجهراء، الفروانية، مبارك الكبير

كما تتوقع الأرصاد الجوية في المملكة العربية السعودية والكويت استمرار نشاط الخلايا الرعدية في المناطق الشرقية والوسطى مع احتمالية هطول أمطار غزيرة في بعض المناطق.

يرجى توخي الحيطة والحذر لاحتمالية حدوث رياح هابطة شديدة من الخلايا الرعدية الممطرة الجافة هذا والله اعلم.`,
                relatedNews: [
                    {
                        id: 1,
                        title: "جنوب السعودية | فرص محتملة لظهور خلايا رعدية ممطرة في مرتفعات عسير أبها رجال ألمع و الباحة و مرتفعات جازان تطال مرتفعات الطائف مع اجواء معتدلة خلال عطلة العيد",
                        date: "الجمعة، 6 يونيو 2025 10:03 ص",
                        comments: 2,
                        image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop"
                    },
                    {
                        id: 2,
                        title: "جنوب السعودية | فرص محتملة لظهور خلايا رعدية ممطرة في مرتفعات عسير أبها رجال ألمع و الباحة و مرتفعات جازان تطال مرتفعات الطائف مع اجواء معتدلة خلال عطلة العيد",
                        date: "الجمعة، 6 يونيو 2025 10:03 ص",
                        comments: 2,
                        image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop"
                    },
                    {
                        id: 3,
                        title: "جنوب السعودية | فرص محتملة لظهور خلايا رعدية ممطرة في مرتفعات عسير أبها رجال ألمع و الباحة و مرتفعات جازان تطال مرتفعات الطائف مع اجواء معتدلة خلال عطلة العيد",
                        date: "الجمعة، 6 يونيو 2025 10:03 ص",
                        comments: 2,
                        image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop"
                    },
                    {
                        id: 4,
                        title: "جنوب السعودية | فرص محتملة لظهور خلايا رعدية ممطرة في مرتفعات عسير أبها رجال ألمع و الباحة و مرتفعات جازان تطال مرتفعات الطائف مع اجواء معتدلة خلال عطلة العيد",
                        date: "الجمعة، 6 يونيو 2025 10:03 ص",
                        comments: 2,
                        image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop"
                    },
                    {
                        id: 5,
                        title: "جنوب السعودية | فرص محتملة لظهور خلايا رعدية ممطرة في مرتفعات عسير أبها رجال ألمع و الباحة و مرتفعات جازان تطال مرتفعات الطائف مع اجواء معتدلة خلال عطلة العيد",
                        date: "الجمعة، 6 يونيو 2025 10:03 ص",
                        comments: 2,
                        image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop"
                    }
                ]
            }
            setNews(newsDetail)
        } catch (error) {
            console.error('Error fetching news detail:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault()
        console.log('Comment submitted:', comment)
        setComment('')
    }

    const handleEmailSubmit = (e) => {
        e.preventDefault()
        console.log('Email submitted:', email)
        setEmail('')
    }

    if (loading) {
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

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content - Right Side */}
                    <div className="lg:col-span-3">
                        {/* Featured Article */}
                        <article className="rounded-lg overflow-hidden mb-8">
                            {/* Article Image */}
                            <div className="relative">
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="w-full h-96 object-cover"
                                />
                                <div className="absolute top-4 right-4">
                                    <span className="text-white text-sm px-2 rounded-full font-semibold font-custom">
                                        {news.category}
                                    </span>
                                </div>
                            </div>

                            {/* Article Content */}
                            <div className="p-6">
                                {/* Article Stats */}
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
                                            <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                            </svg>
                                            {news.likes}
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

                                {/* Article Title */}
                                <h1 className="text-2xl lg:text-2xl font-bold text-rasid-orange-dark mb-6 leading-relaxed">
                                    {news.title}
                                </h1>

                                {/* Article Body */}
                                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                                    {news.content.split('\n\n').map((paragraph, index) => (
                                        <p key={index} className="mb-4 text-justify">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </article>

                        {/* Comment Section */}
                        <div className="rounded-lg p-6 mb-8">
                            <h3 className="text-xl font-bold text-rasid-blue mb-4">إضافة تعليق</h3>
                            <form onSubmit={handleCommentSubmit} className="mb-4">
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="اضف تعليق"
                                    className="bg-transparent w-full p-3 border border-gray-300 rounded-lg resize-none h-24 focus:ring-2 focus:ring-rasid-blue focus:border-transparent"
                                    required
                                />
                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex space-x-2 space-x-reverse">
                                    </div>
                                    <CustomButton
                                        text="ارسال"
                                        onClick={() => { }}
                                        type="submit"
                                        variant="primary"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar - Left Side */}
                    <div className="lg:col-span-1">
                        {/* Mobile Phone Weather Widget */}
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

                        {/* Featured Topics Section */}
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
                                {news.relatedNews.map((item) => (
                                    <article key={item.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                                        <div className="flex space-x-3 space-x-reverse">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-28 h-22 object-cover rounded-lg flex-shrink-0"
                                            />
                                            <div className="flex flex-col items-between gap-3 min-w-0">
                                                <h4 className="text-sm font-medium text-rasid-blue line-clamp-2 leading-tight mb-1">
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
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsDetailPage 