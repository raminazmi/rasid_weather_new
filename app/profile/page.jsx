'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { fetchUserProfile, logout, getToken } from '../../utils/api'

export default function ProfilePage() {
    const [userProfile, setUserProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [loggingOut, setLoggingOut] = useState(false)
    const router = useRouter()

    useEffect(() => {
        loadUserProfile()
    }, [])

    const loadUserProfile = async () => {
        try {
            const token = getToken()

            if (!token) {
                router.push('/login')
                return
            }

            const data = await fetchUserProfile()

            if (data.success) {
                const userInfo = data.user || data.body
                setUserProfile(userInfo)
            } else {
                throw new Error(data.message || 'Failed to fetch profile')
            }
        } catch (error) {
            console.error('Error fetching profile:', error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        try {
            setLoggingOut(true)
            await logout()
            router.push('/login')

        } catch (error) {
            console.error('Logout error:', error)
            router.push('/login')
        } finally {
            setLoggingOut(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">خطأ</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => router.push('/login')}
                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        تسجيل الدخول
                    </button>
                </div>
            </div>
        )
    }

    if (!userProfile) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">لم يتم العثور على الملف الشخصي</h2>
                    <button
                        onClick={() => router.push('/login')}
                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        تسجيل الدخول
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="relative pt-32 pb-44 bg-rasid-gray-light">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold text-gray-800">الملف الشخصي</h1>
                            <button
                                onClick={handleLogout}
                                disabled={loggingOut}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
                            >
                                {loggingOut ? (
                                    <>
                                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                                        جاري تسجيل الخروج...
                                    </>
                                ) : (
                                    'تسجيل الخروج'
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Profile Information */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <div className="flex items-start gap-6">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
                                    {userProfile.avatar?.main && typeof userProfile.avatar.main === 'string' ? (
                                        <img
                                            src={userProfile.avatar.main}
                                            alt={userProfile.name || 'User Avatar'}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none'
                                                e.target.nextElementSibling.style.display = 'flex'
                                            }}
                                        />
                                    ) : null}
                                    <div className={`w-full h-full flex items-center justify-center bg-blue-100 ${userProfile.avatar?.main && typeof userProfile.avatar.main === 'string' ? 'hidden' : ''}`}>
                                        <span className="text-4xl font-bold text-blue-600">
                                            {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* User Details */}
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h2 className="text-2xl font-bold text-gray-800">{userProfile.name}</h2>
                                    {userProfile.verified && (
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                                            ✓ موثق
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-600 mb-2">{userProfile.email}</p>
                                {userProfile.bio && (
                                    <p className="text-gray-700 leading-relaxed">{userProfile.bio}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Account Information */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">معلومات الحساب</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-semibold text-gray-700 mb-2">البريد الإلكتروني</h4>
                                <p className="text-gray-600">{userProfile.email}</p>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-semibold text-gray-700 mb-2">حالة التحقق</h4>
                                <div className="flex items-center gap-2">
                                    <span className={`w-3 h-3 rounded-full ${userProfile.verified ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    <span className="text-gray-600">
                                        {userProfile.verified ? 'حساب موثق' : 'حساب غير موثق'}
                                    </span>
                                </div>
                            </div>

                            {userProfile.phone && (
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold text-gray-700 mb-2">رقم الهاتف</h4>
                                    <p className="text-gray-600">{userProfile.phone}</p>
                                </div>
                            )}

                            {userProfile.location && (
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold text-gray-700 mb-2">الموقع</h4>
                                    <p className="text-gray-600">{userProfile.location}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Subscription Information */}
                    {userProfile.subscription && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">معلومات الاشتراك</h3>
                            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-blue-800">
                                        {userProfile.subscription.plan_name || 'خطة الاشتراك'}
                                    </h4>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${userProfile.subscription.status === 'active'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}>
                                        {userProfile.subscription.status === 'active' ? 'نشط' : 'غير نشط'}
                                    </span>
                                </div>
                                {userProfile.subscription.expires_at && (
                                    <p className="text-blue-600">
                                        تاريخ انتهاء الاشتراك: {new Date(userProfile.subscription.expires_at).toLocaleDateString('ar-SA')}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
