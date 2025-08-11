'use client'

import { useState, useEffect } from 'react'

export const useAppBanner = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // التحقق من localStorage عند التحميل
        if (typeof window !== 'undefined') {
            const isClosed = localStorage.getItem('appBannerClosed')
            if (isClosed !== 'true') {
                setIsVisible(true)
            }
        }
    }, [])

    const closeBanner = () => {
        setIsVisible(false)
        // حفظ الحالة في localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('appBannerClosed', 'true')
        }
    }

    return { isVisible, closeBanner }
}