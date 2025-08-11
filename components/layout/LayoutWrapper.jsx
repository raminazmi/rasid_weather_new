'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import AppBanner from '../ui/AppBanner'
import { useAppBanner } from '../../hooks/useAppBanner'

const LayoutWrapper = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const pathname = usePathname()
    const { favorites, searchHistory } = useSelector((state) => state.weather)
    const { isVisible: bannerVisible, closeBanner } = useAppBanner()

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const handleLocationClick = () => {
        console.log('موقعي الحالي')
    }

    const getHeaderBgColor = () => {
        const whiteBgPages = ['/', '/contact']

        if (whiteBgPages.includes(pathname)) {
            return 'bg-rasid-blue'
        }
        return 'bg-white'
    }

    return (
        <>
            <AppBanner isVisible={bannerVisible} onClose={closeBanner} />
            <Header onToggleSidebar={toggleSidebar} headerBgColor={getHeaderBgColor()} />
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onLocationClick={handleLocationClick}
                favorites={favorites || []}
                recentSearches={searchHistory || []}
            />
            <main className={`transition-all duration-300 ${bannerVisible ? "pt-[124px]" : "pt-[60px]"}`}>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default LayoutWrapper 