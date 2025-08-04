'use client'

import { X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const Sidebar = ({ isOpen, onClose, onLocationClick, favorites, recentSearches }) => {
    const pathname = usePathname()
    const [activeItem, setActiveItem] = useState('home')

    const menuItems = [
        { id: 'home', label: 'الرئيسية', href: '/' },
        { id: 'news', label: 'الاخبار', href: '/news' },
        { id: 'terms', label: 'الشروط والاحكام', href: '/terms' },
        { id: 'contact', label: 'تواصل معنا', href: '/contact' },
    ]

    useEffect(() => {
        // تحديث الحالة النشطة بناءً على المسار الحالي
        const currentItem = menuItems.find(item => item.href === pathname)
        if (currentItem) {
            setActiveItem(currentItem.id)
        } else {
            setActiveItem('home')
        }
    }, [pathname])

    const handleNavClick = (itemId) => {
        setActiveItem(itemId)
    }

    return (
        <>
            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
            )}

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden fixed top-0 right-0 h-full w-80 bg-rasid-blue shadow-lg transform transition-transform duration-300 ease-in-out z-50">
                    <div className="flex flex-col h-full">
                        {/* Close Button */}
                        <div className="p-4 border-b border-white/20">
                            <div className="flex items-center justify-between">
                                <Image
                                    src="/images/logo.svg"
                                    alt="راصد ويذر"
                                    width={120}
                                    height={48}
                                    className="h-12 w-auto"
                                />
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-md text-white hover:bg-white/10 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 p-4">
                            <div className="space-y-2">
                                {menuItems.map((item) => (
                                    <a
                                        key={item.id}
                                        href={item.href}
                                        onClick={() => {
                                            handleNavClick(item.id)
                                            onClose()
                                        }}
                                        className={`block px-3 py-2 rounded-md text-white font-medium transition-colors duration-200 hover:bg-white/10 font-custom ${activeItem === item.id ? 'bg-white/20' : ''
                                            }`}
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </div>

                            {/* Location Button */}
                            <div className="mt-4">
                                <button
                                    onClick={() => {
                                        onLocationClick()
                                        onClose()
                                    }}
                                    className="w-full text-right px-3 py-2 rounded-md text-white font-medium transition-colors duration-200 hover:bg-white/10 font-custom"
                                >
                                    موقعي الحالي
                                </button>
                            </div>

                            {/* Favorites */}
                            {favorites && favorites.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="text-white/80 text-sm font-medium mb-2 px-3 font-custom">المفضلة</h4>
                                    {favorites.map((fav) => (
                                        <div key={fav.id} className="px-3 py-1 text-white/70 text-sm font-custom">
                                            {fav.name}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Recent Searches */}
                            {recentSearches && recentSearches.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="text-white/80 text-sm font-medium mb-2 px-3 font-custom">البحث الأخير</h4>
                                    {recentSearches.slice(0, 3).map((search, index) => (
                                        <div key={index} className="px-3 py-1 text-white/70 text-sm font-custom">
                                            {search}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Login Button */}
                            <div className="mt-6">
                                <a href="/login" className="block w-full bg-rasid-blue-light hover:bg-white/20 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200 border border-white/20 font-custom text-center">
                                    تسجيل دخول
                                </a>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </>
    )
}

export default Sidebar 