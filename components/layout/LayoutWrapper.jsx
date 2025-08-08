'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

const LayoutWrapper = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const pathname = usePathname()
    const { favorites, searchHistory } = useSelector((state) => state.weather)

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const handleLocationClick = () => {
        console.log('موقعي الحالي')
    }

    const getHeaderBgColor = () => {
        const whiteBgPages = ['/', '/contact', '/login', '/register', '/terms']

        if (whiteBgPages.includes(pathname)) {
            return 'bg-rasid-blue'
        }
        return 'bg-white'
    }

    return (
        <>
            <Header onToggleSidebar={toggleSidebar} headerBgColor={getHeaderBgColor()} />
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onLocationClick={handleLocationClick}
                favorites={favorites || []}
                recentSearches={searchHistory || []}
            />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default LayoutWrapper 