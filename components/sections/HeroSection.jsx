'use client'

import { useState } from 'react'
import { Search, MapPin } from 'lucide-react'

const HeroSection = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            onSearch(searchQuery.trim())
        }
    }

    return (
        <section className="relative min-h-screen overflow-hidden pt-8">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/images/hero-bg.png')",
                }}
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex-1 text-start lg:ps-12 mb-12 lg:mb-14">
                    <div className="max-w-2xl mx-auto lg:mx-0">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in font-custom">
                            مرحبا بك في راصد ويذر !
                        </h1>

                        <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-8 animate-slide-up font-custom">
                            موقع "راصد ويذر" هو موقع يُستخدم لمتابعة حالة الطقس وعرض آخر الأخبار. يتيح للمستخدمين معرفة المعلومات الجوية المحدثة والتنبؤات الجوية لمنطقتهم بالإضافة إلى تصفح آخر الأخبار والأحداث الهامة. كما يساعد الموقع في اتخاذ القرار والاستعداد للظروف الجوية القاسية المتوقعة في حياتنا اليومية والبقاء على اطلاع دائم بمستجدات الأحداث في مجال اخبار الطقس.
                        </p>

                        <form onSubmit={handleSearch} className="max-w-md mx-auto lg:mx-0">
                            <div className="relative flex items-center bg-white rounded-lg shadow-lg overflow-hidden">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="اختار منطقتك"
                                    className="flex-1 px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none text-right font-custom"
                                    dir="rtl"
                                />
                                <button
                                    type="submit"
                                    className="bg-rasid-red hover:bg-rasid-red-dark text-white p-3.5 transition-colors duration-200 flex items-center justify-center"
                                >
                                    <Search size={20} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="flex-1 relative">
                    <img src="/images/right_side.svg" alt="right_side" />
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-rasid-blue-dark/50 to-transparent" />
        </section>
    )
}

export default HeroSection 