'use client'

import { useState, useEffect } from 'react'
import { Check, Star, Crown, Zap, ArrowLeft, Loader2, Smartphone } from 'lucide-react'
import Image from 'next/image'
import MainText from '../../components/MainText'
import CustomButton from '../../components/ui/CustomButton'
import { fetchSubscriptionPlans } from '../../utils/api'

const SubscriptionsPage = () => {
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [loadingContact, setLoadingContact] = useState(false)

    useEffect(() => {
        fetchSubscriptionPlansData()
    }, [])

    const fetchSubscriptionPlansData = async () => {
        try {
            setLoading(true)
            const data = await fetchSubscriptionPlans()

            if (data.success) {
                setPlans(data.body || [])
            } else {
                throw new Error('فشل في جلب خطط الاشتراك')
            }
        } catch (err) {
            console.error('Error fetching subscription plans:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const getPlanIcon = (planName) => {
        if (planName.includes('الذهبية')) {
            return <Crown className="w-8 h-8 text-yellow-400" />
        } else if (planName.includes('المميزة')) {
            return <Star className="w-8 h-8 text-purple-400" />
        } else {
            return <Zap className="w-8 h-8 text-green-400" />
        }
    }

    const getPlanColor = (planName) => {
        if (planName.includes('الذهبية')) {
            return {
                gradient: 'from-yellow-400 to-amber-500',
                border: 'border-yellow-400',
                bg: 'bg-yellow-400/10',
                text: 'text-yellow-400',
                button: 'bg-yellow-400 hover:bg-yellow-500'
            }
        } else if (planName.includes('المميزة')) {
            return {
                gradient: 'from-purple-400 to-purple-600',
                border: 'border-purple-400',
                bg: 'bg-purple-400/10',
                text: 'text-purple-400',
                button: 'bg-purple-400 hover:bg-purple-500'
            }
        } else {
            return {
                gradient: 'from-green-400 to-green-600',
                border: 'border-green-400',
                bg: 'bg-green-400/10',
                text: 'text-green-400',
                button: 'bg-green-400 hover:bg-green-500'
            }
        }
    }

    const formatDuration = (days) => {
        if (days === '30') return '30 يوم'
        if (days === '365') return 'سنة واحدة'
        return `${days} يوم`
    }

    const stripHtmlTags = (html) => {
        return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ')
    }

    const handleSubscribe = (plan) => {
        const confirmSubscription = window.confirm(`هل تريد الاشتراك في ${plan.name} بسعر ${plan.discount} ريال؟`)
        if (!confirmSubscription) return
        const isAndroid = /Android/i.test(navigator.userAgent)
        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)

        if (isAndroid) {
            window.open(`https://play.google.com/store/apps/details?id=com.rasidweather&sku=${plan.android_product_id}`, '_blank')
        } else if (isIOS) {
            window.open(`https://apps.apple.com/app/rasid-weather/id${plan.ios_product_id}`, '_blank')
        } else {
            alert('يرجى تحميل التطبيق من متجر التطبيقات للاشتراك')
            window.open('https://apps.apple.com/app/rasid-weather/', '_blank')
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen relative pt-24 pb-44 bg-rasid-gray-light">
                <div className="absolute inset-0 bg-[url('/images/bg_section.svg')] bg-cover bg-center opacity-10"></div>
                <div className="relative z-10 flex items-center justify-center min-h-screen">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="animate-spin h-32 w-32 text-rasid-blue" />
                        <p className="text-rasid-blue font-custom text-xl">جاري تحميل خطط الاشتراك...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen relative pt-24 pb-44 bg-rasid-gray-light">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/bg_section.svg')] bg-cover bg-center opacity-5"></div>
                <img
                    src="/images/shape1.svg"
                    alt="background shape 1"
                    className="absolute top-40 -right-40 w-120 h-120 opacity-40 -rotate-6"
                />
                <img
                    src="/images/shape2.svg"
                    alt="background shape 2"
                    className="absolute top-40 -left-80 w-90 h-90 opacity-50 rotate-12"
                />
                <img
                    src="/images/shape3.svg"
                    alt="background shape 3"
                    className="absolute bottom-28 left-1/2 transform -translate-x-1/2 w-80 h-80 opacity-15 rotate-45"
                />
            </div>

            <div className="relative z-10 px-4">
                <MainText
                    title="طط الاشتراكات"
                    titleHighlight="خـ"
                    titleColor=""
                    highlightColor=""
                    highlightBgColor="bg-weather-sunny"
                    description="اختر الخطة المناسبة لك واستمتع بجميع مميزات راصد ويذر"
                    descriptionColor="text-rasid-orange-dark"
                    lineColor="bg-weather-sunny"
                />

                <div className="max-w-6xl mx-auto">
                    {error && (
                        <div className="mb-8 p-4 bg-red-100 border border-red-300 rounded-lg">
                            <p className="text-red-700 font-custom text-center">{error}</p>
                        </div>
                    )}

                    <div className="mb-8 bg-gradient-to-r from-rasid-blue to-rasid-blue-light rounded-2xl shadow-lg p-6 text-white text-center">
                        <h3 className="text-xl font-bold font-custom mb-2 flex items-center justify-center gap-2">
                            <Smartphone className="w-6 h-6" />
                            يتطلب تحميل التطبيق للاشتراك
                        </h3>
                        <p className="font-custom">
                            لإتمام عملية الاشتراك، يرجى تحميل تطبيق راصد ويذر من متجر التطبيقات
                        </p>
                        <div className="flex sm:flex-row flex-wrap gap-4 justify-center mt-4">
                            <a
                                href="https://play.google.com/store/apps/details?id=com.rasidweather"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-fit flex justify-center items-center bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div className="text-left">
                                    <div className="text-xs font-medium">GET IT ON</div>
                                    <div className="text-sm font-bold">GOOGLE PLAY</div>
                                </div>
                                <Image
                                    src="/images/google_play.svg"
                                    alt="Google Play"
                                    width={28}
                                    height={28}
                                    className="mr-3"
                                />
                            </a>

                            <a
                                href="https://apps.apple.com/app/rasid-weather/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-fit flex justify-center items-center bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <div className="text-left">
                                    <div className="text-xs font-medium">GET IT ON</div>
                                    <div className="text-sm font-bold">APP STORE</div>
                                </div>
                                <Image
                                    src="/images/apple.svg"
                                    alt="App Store"
                                    width={28}
                                    height={28}
                                    className="mr-3"
                                />
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {plans.map((plan) => {
                            const colors = getPlanColor(plan.name)
                            const isPopular = plan.all_features

                            return (
                                <div
                                    key={plan.id}
                                    className={`relative bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl ${isPopular ? 'border-yellow-400 ring-4 ring-yellow-100' : colors.border
                                        }`}
                                >
                                    {isPopular && (
                                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                                            <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-4 py-1 rounded-full text-sm font-bold font-custom shadow-lg">
                                                الأكثر شعبية
                                            </div>
                                        </div>
                                    )}

                                    <div className={`h-1/3 bg-gradient-to-r rounded-t-2xl ${colors.gradient} p-6 text-white text-center relative overflow-hidden`}>
                                        <div className="absolute inset-0 opacity-20">
                                            <div className="absolute inset-0" style={{
                                                backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                                                backgroundSize: '20px 20px'
                                            }} />
                                        </div>

                                        <div className="relative z-10">
                                            <div className="flex justify-center mb-4">
                                                {getPlanIcon(plan.name)}
                                            </div>
                                            <h3 className="text-2xl font-bold font-custom mb-2">
                                                {plan.name}
                                            </h3>
                                            <div className="flex items-center justify-center gap-2">
                                                <span className="text-3xl font-bold">{plan.discount}</span>
                                                <span className="text-lg">ريال</span>
                                            </div>
                                            <p className="text-white/90 font-custom text-sm">
                                                لمدة {formatDuration(plan.duration)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='relative p-6 flex flex-col justify-between gap-4 h-2/3 '>
                                        <div className="">
                                            <div className="mb-6">
                                                <div
                                                    className="text-gray-600 font-custom leading-relaxed"
                                                    dangerouslySetInnerHTML={{ __html: plan.description }}
                                                />
                                            </div>

                                            <div className="mb-6">
                                                <h4 className="text-lg font-bold text-gray-800 font-custom mb-3">المميزات:</h4>
                                                <ul className="space-y-2">
                                                    <li className="flex items-center gap-2">
                                                        <Check className="w-5 h-5 text-green-500" />
                                                        <span className="text-gray-600 font-custom">تنبؤات الطقس المتقدمة</span>
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <Check className="w-5 h-5 text-green-500" />
                                                        <span className="text-gray-600 font-custom">إشعارات فورية</span>
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <Check className="w-5 h-5 text-green-500" />
                                                        <span className="text-gray-600 font-custom">خرائط الطقس التفاعلية</span>
                                                    </li>
                                                    {plan.all_features && (
                                                        <>
                                                            <li className="flex items-center gap-2">
                                                                <Check className="w-5 h-5 text-yellow-500" />
                                                                <span className="text-gray-600 font-custom font-semibold">جميع المميزات المتاحة</span>
                                                            </li>
                                                            <li className="flex items-center gap-2">
                                                                <Check className="w-5 h-5 text-yellow-500" />
                                                                <span className="text-gray-600 font-custom font-semibold">دعم فني متقدم</span>
                                                            </li>
                                                        </>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="mb-2">
                                            <button
                                                onClick={() => handleSubscribe(plan)}
                                                className={`w-full ${colors.button} text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 font-custom text-lg shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95`}
                                            >
                                                اشترك الآن
                                            </button>

                                            <p className="text-center text-sm text-gray-500 font-custom mt-3">
                                                صالح لمدة {formatDuration(plan.duration)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 text-center">
                        <h3 className="text-2xl font-bold text-rasid-blue font-custom mb-4">
                            لماذا تختار راصد ويذر؟
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-rasid-blue/10 rounded-full flex items-center justify-center mb-3">
                                    <Check className="w-8 h-8 text-rasid-blue" />
                                </div>
                                <h4 className="font-bold text-gray-800 font-custom mb-2">دقة عالية</h4>
                                <p className="text-gray-600 font-custom text-sm">
                                    تنبؤات دقيقة تصل إلى 95% بالاعتماد على أحدث التقنيات
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-rasid-orange/10 rounded-full flex items-center justify-center mb-3">
                                    <Zap className="w-8 h-8 text-rasid-orange" />
                                </div>
                                <h4 className="font-bold text-gray-800 font-custom mb-2">تحديثات فورية</h4>
                                <p className="text-gray-600 font-custom text-sm">
                                    إشعارات فورية لأي تغييرات جوية مهمة في منطقتك
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-rasid-green/10 rounded-full flex items-center justify-center mb-3">
                                    <Crown className="w-8 h-8 text-rasid-green" />
                                </div>
                                <h4 className="font-bold text-gray-800 font-custom mb-2">خدمة متميزة</h4>
                                <p className="text-gray-600 font-custom text-sm">
                                    دعم فني 24/7 وخدمة عملاء متميزة لضمان راحتك
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-gray-600 font-custom mb-4">
                            هل تحتاج مساعدة في اختيار الخطة المناسبة؟
                        </p>
                        <CustomButton
                            text={loadingContact ? "جاري التحميل..." : "تواصل معنا"}
                            onClick={() => {
                                setLoadingContact(true)
                                setTimeout(() => {
                                    window.location.href = '/contact'
                                }, 1000)
                            }}
                            loading={loadingContact}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionsPage
