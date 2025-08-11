'use client'

import { useState, useEffect } from 'react'

export const useAppBanner = () => {
    const [isVisible, setIsVisible] = useState(true)

    const closeBanner = () => {
        setIsVisible(false)
    }

    return { isVisible, closeBanner }
}