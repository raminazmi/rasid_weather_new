'use client'

import { Menu } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const Header = ({ onToggleSidebar, headerBgColor = "bg-rasid-blue" }) => {
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

    const isWhiteBg = headerBgColor === 'bg-white'
    const textColor = isWhiteBg ? 'text-rasid-blue' : 'text-white'
    const hoverBg = isWhiteBg ? 'hover:bg-rasid-blue/10' : 'hover:bg-white/10'
    const activeBg = isWhiteBg ? 'bg-rasid-blue/20 border-rasid-blue/30' : 'bg-white/20 border-white/30'
    const borderColor = isWhiteBg ? 'border-rasid-blue/20' : 'border-white/20'

    return (
        <header className="bg-rasid-blue lg:bg-transparent backdrop-blur-sm border-b rounded-b-xl md:rounded-b-none shadow-xl md:shadow-none border-white/20 fixed top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onToggleSidebar}
                            className="lg:hidden p-2 rounded-md text-white hover:bg-white/10 transition-colors"
                        >
                            <Menu size={24} />
                        </button>

                        <Image
                            src="/images/logo.svg"
                            alt="راصد ويذر"
                            width={120}
                            height={48}
                            className="hidden lg:flex h-12 w-auto"
                        />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8 space-x-reverse">
                        {menuItems.map((item) => (
                            <a
                                key={item.id}
                                href={item.href}
                                onClick={() => handleNavClick(item.id)}
                                className={`${textColor} font-medium transition-colors duration-200 hover:text-rasid-orange font-custom ${activeItem === item.id
                                    ? `${activeBg} px-4 py-2 rounded-lg border`
                                    : `${hoverBg} px-4 py-2 rounded-lg`
                                    }`}
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    {/* Login Button */}
                    <div className="flex items-center">
                        <a href="/login" className={`${isWhiteBg ? 'bg-rasid-blue text-white' : 'bg-rasid-blue-light text-white'} hover:bg-white/20 font-medium px-6 py-2 rounded-lg transition-colors duration-200 border ${borderColor} font-custom`}>
                            تسجيل دخول
                        </a>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header 