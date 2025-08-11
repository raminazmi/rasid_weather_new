'use client'

import { X } from 'lucide-react'
import Image from 'next/image'

const AppBanner = ({ isVisible, onClose }) => {
    const handleGooglePlay = () => {
        if (typeof window !== 'undefined') {
            window.open('https://play.google.com/store/apps/details?id=com.rasidweather', '_blank')
        }
    }

    const handleAppStore = () => {
        if (typeof window !== 'undefined') {
            window.open('https://apps.apple.com/app/rasid-weather/', '_blank')
        }
    }

    if (!isVisible) {
        return null
    }

    return (
        <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-rasid-blue to-rasid-blue-light text-white py-3 px-4 shadow-lg z-[60] border-b border-white/10" style={{ top: '60px' }}>
            <div className="absolute inset-0 bg-[url('/images/bg_section.svg')] bg-cover opacity-10"></div>

            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="flex items-center justify-between gap-4">
                    {/* أيقونة التطبيق والنص */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="flex-shrink-0 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                            <Image
                                src="/images/logo.svg"
                                alt="راصد ويذر"
                                width={32}
                                height={32}
                                className="w-8 h-8"
                            />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-sm md:text-base font-custom">
                                تطبيق راصد ويذر
                            </h3>
                            <p className="text-xs md:text-sm opacity-90 font-custom truncate">
                                🌤️ احصل على تحديثات الطقس المباشرة على جهازك
                            </p>
                        </div>
                    </div>

                    {/* أزرار التحميل */}
                    <div className="flex items-center gap-2">
                        {/* زر Google Play */}
                        <button
                            onClick={handleGooglePlay}
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 text-xs md:text-sm font-custom hover:scale-105"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                            </svg>
                            <span className="hidden md:inline">Google Play</span>
                        </button>

                        {/* زر App Store */}
                        <button
                            onClick={handleAppStore}
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 text-xs md:text-sm font-custom hover:scale-105"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                            </svg>
                            <span className="hidden md:inline">App Store</span>
                        </button>
                    </div>

                    {/* زر الإغلاق */}
                    <button
                        onClick={onClose}
                        className="flex-shrink-0 p-2 hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-110"
                        aria-label="إغلاق البانر"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AppBanner
