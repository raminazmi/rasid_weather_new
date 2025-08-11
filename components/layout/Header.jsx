'use client'

import { Menu, User, LogOut, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { getUserData, getToken, logout, isTokenValid } from '../../utils/api'

const Header = ({ onToggleSidebar, headerBgColor = "bg-rasid-blue" }) => {
    const pathname = usePathname()
    const router = useRouter()
    const [activeItem, setActiveItem] = useState('/')
    const [user, setUser] = useState(null)
    const [showUserMenu, setShowUserMenu] = useState(false)

    const menuItems = [
        { id: 'home', label: 'الرئيسية', href: '/' },
        { id: 'news', label: 'الاخبار', href: '/news' },
        { id: 'subscriptions', label: 'الاشتراكات', href: '/subscriptions' },
        { id: 'terms', label: 'الشروط والاحكام', href: '/terms' },
        { id: 'contact', label: 'تواصل معنا', href: '/contact' },
    ]

    useEffect(() => {
        const currentItem = menuItems.find(item => item.href === pathname)
        if (currentItem) {
            setActiveItem(currentItem.id)
        } else {
            setActiveItem('home')
        }

        checkUserData()

        const handleClickOutside = (event) => {
            if (showUserMenu && !event.target.closest('.user-menu')) {
                setShowUserMenu(false)
            }
        }

        const handleStorageChange = () => {
            checkUserData()
        }

        document.addEventListener('mousedown', handleClickOutside)
        window.addEventListener('storage', handleStorageChange)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            window.removeEventListener('storage', handleStorageChange)
        }
    }, [pathname, showUserMenu])

    const checkUserData = () => {
        if (isTokenValid()) {
            const userData = getUserData()
            setUser(userData)
        } else {
            setUser(null)
        }
    }

    const handleNavClick = (itemId, href, e) => {
        e.preventDefault()
        setActiveItem(itemId)
        router.push(href)
    }

    const handleLogin = () => {
        router.push('/login')
    }

    const handleLogout = () => {
        logout()
        setUser(null)
        setShowUserMenu(false)
        router.push('/')
    }

    const isWhiteBg = headerBgColor === 'bg-white'
    const textColor = isWhiteBg ? 'text-rasid-blue' : 'text-white'
    const hoverBg = isWhiteBg ? 'hover:bg-rasid-blue/10' : 'hover:bg-white/10'
    const activeBg = isWhiteBg ? 'bg-rasid-blue/20 border-rasid-blue/30' : 'bg-white/20 border-white/30'
    const borderColor = isWhiteBg ? 'border-rasid-blue/20' : 'border-white/20'

    return (
        <header className="bg-rasid-blue lg:bg-transparent backdrop-blur-sm border-b rounded-b-xl md:rounded-b-none shadow-xl md:shadow-none border-white/20 fixed left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onToggleSidebar}
                            className="lg:hidden p-2 rounded-md text-white hover:bg-white/10 transition-colors"
                        >
                            <Menu size={24} />
                        </button>

                        <div className="hidden lg:flex flex-shrink-0 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                            <Image
                                src="/images/logo.svg"
                                alt="راصد ويذر"
                                width={32}
                                height={32}
                                className="h-10 w-auto"
                            />
                        </div>
                    </div>

                    <nav className="hidden lg:flex items-center space-x-8 space-x-reverse">
                        {menuItems.map((item) => (
                            <Link
                                key={item.id}
                                href={item.href}
                                onClick={(e) => handleNavClick(item.id, item.href, e)}
                                className={`${textColor} font-medium transition-colors duration-200 hover:text-rasid-orange font-custom ${activeItem === item.id
                                    ? `${activeBg} px-4 py-2 rounded-lg border`
                                    : `${hoverBg} px-4 py-2 rounded-lg`
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center">
                        {user ? (
                            <div className="relative user-menu">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className={`${textColor} flex items-center space-x-2 space-x-reverse hover:${hoverBg} px-3 py-2 rounded-lg transition-colors duration-200`}
                                >
                                    <div className="flex items-center space-x-2 space-x-reverse">
                                        {user.avatar?.main ? (
                                            <img
                                                src={user.avatar.main}
                                                alt={user.name || 'المستخدم'}
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 bg-rasid-orange rounded-full flex items-center justify-center">
                                                <User size={16} className="text-white" />
                                            </div>
                                        )}
                                        <span className={`text-sm text-black`}>
                                            {user.name || user.email || 'مستخدم'}
                                        </span>
                                    </div>
                                </button>

                                {showUserMenu && (
                                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                        <div className="px-4 py-2 border-b border-gray-200">
                                            <p className="text-sm text-gray-600">{user.email}</p>
                                            {user.isVerified === "1" && (
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 mt-1">
                                                    موثق
                                                </span>
                                            )}
                                        </div>
                                        <Link
                                            href="/profile"
                                            className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 space-x-reverse"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            <User size={16} />
                                            <span>الملف الشخصي</span>
                                        </Link>
                                        <Link
                                            href="/favorites"
                                            className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 space-x-reverse"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            <Heart size={16} />
                                            <span>المفضلة</span>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2 space-x-reverse"
                                        >
                                            <LogOut size={16} />
                                            <span>تسجيل الخروج</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2 space-x-reverse">
                                <Link
                                    href="/register"
                                    className={`${isWhiteBg ? 'bg-rasid-orange text-white' : 'bg-rasid-orange text-white'} hover:bg-rasid-orange/90 text-sm md:text-md px-2 py-1 md:px-4 md:py-2 rounded-lg transition-colors duration-200 border ${borderColor} font-custom text-sm`}
                                >
                                    إنشاء حساب
                                </Link>
                                <button
                                    onClick={handleLogin}
                                    className={`${isWhiteBg ? 'bg-rasid-blue text-white' : 'bg-rasid-blue-light text-white'} hover:bg-white/20 text-sm md:text-md px-2 py-1 md:px-4 md:py-2 rounded-lg transition-colors duration-200 border ${borderColor} font-custom text-sm`}
                                >
                                    تسجيل دخول
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header 